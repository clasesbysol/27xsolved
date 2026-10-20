// Mock de Supabase (Auth + PostgREST + RLS) para pruebas E2E con Playwright.
// Reproduce las políticas de supabase/schema.sql + migraciones (incluida 20261020).
const crypto=require('crypto');
const ADMIN='clasesbysol@gmail.com';
function b64(o){return Buffer.from(JSON.stringify(o)).toString('base64url')}
class MockSupabase{
  constructor({migration=true,confirmEmail=true}={}){
    this.migration=migration;this.confirmEmail=confirmEmail;
    this.users=new Map();   // email -> user
    this.tokens=new Map();  // access_token -> email
    this.refresh=new Map(); // refresh_token -> email
    this.db={access_profiles:[],access_grants:[],student_profiles:[],student_year_changes:[],student_planner:[],activity_events:[],course_sections:[],exercises:[],exercise_solutions:[]};
    this.log=[];
  }
  addUser(email,{password=null,provider='google',confirmed=true,meta={}}={}){
    const u={id:crypto.randomUUID(),email,password,provider,confirmed_at:confirmed?new Date().toISOString():null,user_metadata:meta};
    this.users.set(email,u);return u;
  }
  userJson(u){return{id:u.id,aud:'authenticated',role:'authenticated',email:u.email,email_confirmed_at:u.confirmed_at,confirmed_at:u.confirmed_at,app_metadata:{provider:u.provider,providers:[u.provider]},user_metadata:u.user_metadata,identities:[{provider:u.provider}],created_at:new Date().toISOString()}}
  session(email){
    const u=this.users.get(email);
    const exp=Math.floor(Date.now()/1000)+3600;
    const access_token=`${b64({alg:'HS256',typ:'JWT'})}.${b64({sub:u.id,email:u.email,role:'authenticated',exp,user_metadata:u.user_metadata,app_metadata:{provider:u.provider}})}.${crypto.randomBytes(8).toString('hex')}`;
    const refresh_token=crypto.randomBytes(12).toString('hex');
    this.tokens.set(access_token,email);this.refresh.set(refresh_token,email);
    return{access_token,token_type:'bearer',expires_in:3600,expires_at:exp,refresh_token,user:this.userJson(u)};
  }
  who(headers){
    const auth=headers['authorization']||'';const tok=auth.replace(/^Bearer\s+/i,'');
    const email=this.tokens.get(tok);if(!email)return null;
    const u=this.users.get(email);if(!u)return null;
    return{email,confirmed:!!u.confirmed_at,admin:email===ADMIN&&!!u.confirmed_at,user:u};
  }
  // ---------- RLS ----------
  canSelect(t,row,w){
    if(!w)return false;
    const own=String(row.email||'').toLowerCase()===w.email;
    switch(t){
      case 'access_profiles':case 'access_grants':return w.admin||(own&&w.confirmed);
      case 'student_profiles':case 'student_year_changes':return w.admin||own;
      case 'student_planner':return own;
      case 'activity_events':return w.admin;
      default:return w.admin;
    }
  }
  canWrite(t,row,w,op){
    if(!w)return false;
    const own=String(row.email||'').toLowerCase()===w.email;
    switch(t){
      case 'access_profiles':case 'access_grants':return w.admin;
      case 'student_profiles':return w.admin||own;
      case 'student_year_changes':return op==='insert'&&(w.admin||own);
      case 'student_planner':return own;
      case 'activity_events':return op==='insert'&&own;
      default:return w.admin;
    }
  }
  check(t,row){
    if(t==='access_grants'){
      const types=['unit','chapter','guide','practice','evaluation','partial','resource',...(this.migration?['node']:[])];
      if(!types.includes(row.grant_type))return{code:'23514',message:'new row for relation "access_grants" violates check constraint "access_grants_grant_type_check"'};
      if(row.grant_type==='node'&&!/^(\*|[A-Za-z0-9._-]+(\/[A-Za-z0-9._-]+)*)$/.test(row.grant_key))return{code:'23514',message:'violates check constraint "access_grants_node_key_check"'};
    }
    if(t==='student_profiles'&&row.year!=null&&!(row.year>=1&&row.year<=7))return{code:'23514',message:'year check'};
    return null;
  }
  pk(t){return{access_profiles:['email'],access_grants:['email','subject','unit_no','grant_type','grant_key'],student_profiles:['email'],student_planner:['email']}[t]||['id']}
  defaults(t,row){
    const now=new Date().toISOString();
    if(t==='access_profiles')return{max_unit:1,active:true,role:'student',created_at:now,updated_at:now,access_starts_at:now,access_expires_at:null,...row};
    if(t==='access_grants')return{subject:'chemistry',grant_key:'*',created_at:now,...row};
    if(t==='student_profiles')return{full_name:null,year:null,year_set_by:null,year_updated_at:null,activity_notice_at:null,seen:{},continue_item:null,last_seen_at:null,created_at:now,updated_at:now,...row};
    if(t==='activity_events'||t==='student_year_changes')return{id:Math.floor(Math.random()*1e9),created_at:now,changed_at:now,...row};
    return{...row};
  }
  filters(params){
    const out=[];
    for(const [k,v] of params){
      if(['select','order','limit','on_conflict','offset'].includes(k))continue;
      const m=/^(eq|neq|gte|lte|gt|lt|in|is)\.(.*)$/s.exec(v);if(!m)continue;
      out.push([k,m[1],m[2]]);
    }
    return row=>out.every(([k,op,val])=>{
      const cell=row[k];
      if(op==='eq')return String(cell)===val;
      if(op==='neq')return String(cell)!==val;
      if(op==='in'){const list=val.replace(/^\(|\)$/g,'').split(',').map(x=>x.replace(/^"|"$/g,''));return list.includes(String(cell))}
      if(op==='gte')return String(cell)>=val;
      if(op==='is')return val==='null'?cell==null:String(cell)===val;
      return true;
    });
  }
  async handle(route){
    const req=route.request();
    const url=new URL(req.url());
    const headers=req.headers();
    const method=req.method();
    const body=req.postData()?(()=>{try{return JSON.parse(req.postData())}catch(_){return null}})():null;
    const json=(status,data,h={})=>route.fulfill({status,contentType:'application/json',headers:{'access-control-allow-origin':'*',...h},body:data===undefined?'':JSON.stringify(data)});
    if(method==='OPTIONS')return route.fulfill({status:200,headers:{'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'}});
    this.log.push(`${method} ${url.pathname}${url.search}`);
    // ---------- Auth ----------
    if(url.pathname==='/auth/v1/user'){
      const w=this.who(headers);if(!w)return json(401,{code:401,msg:'invalid JWT'});
      if(method==='PUT'){if(body?.password)w.user.password=body.password;return json(200,this.userJson(w.user))}
      return json(200,this.userJson(w.user));
    }
    if(url.pathname==='/auth/v1/token'){
      const gt=url.searchParams.get('grant_type');
      if(gt==='password'){
        const u=this.users.get(String(body?.email||'').toLowerCase());
        if(!u||!u.password||u.password!==body.password)return json(400,{error:'invalid_grant',error_description:'Invalid login credentials',code:'invalid_credentials',msg:'Invalid login credentials'});
        if(!u.confirmed_at)return json(400,{error:'invalid_grant',error_description:'Email not confirmed',code:'email_not_confirmed',msg:'Email not confirmed'});
        return json(200,this.session(u.email));
      }
      if(gt==='refresh_token'){const email=this.refresh.get(body?.refresh_token);if(!email)return json(400,{error:'invalid_grant',error_description:'Invalid Refresh Token'});return json(200,this.session(email))}
      return json(400,{error:'unsupported'});
    }
    if(url.pathname==='/auth/v1/signup'){
      const email=String(body?.email||'').toLowerCase();
      if(this.users.has(email)){const u=this.users.get(email);return json(200,{...this.userJson(u),identities:[]})}
      const u=this.addUser(email,{password:body.password,provider:'email',confirmed:!this.confirmEmail,meta:body.data||{}});
      if(this.confirmEmail)return json(200,this.userJson(u));
      return json(200,this.session(email));
    }
    if(url.pathname==='/auth/v1/logout')return route.fulfill({status:204,headers:{'access-control-allow-origin':'*'}});
    if(url.pathname==='/auth/v1/recover')return json(200,{});
    if(url.pathname.startsWith('/auth/v1/'))return json(404,{msg:'not mocked'});
    // ---------- REST ----------
    const m=/^\/rest\/v1\/([a-z_]+)$/.exec(url.pathname);
    if(!m)return json(404,{message:'not found'});
    const t=m[1];
    if(!this.db[t])return json(404,{code:'PGRST205',message:`Could not find the table 'public.${t}' in the schema cache`});
    const w=this.who(headers);
    const match=this.filters(url.searchParams);
    const prefer=headers['prefer']||'';
    const rows=this.db[t];
    if(method==='GET'){
      let out=rows.filter(r=>this.canSelect(t,r,w)&&match(r));
      const order=url.searchParams.get('order');
      if(order){const [col,dir]=order.split('.');out=[...out].sort((a,b)=>(a[col]>b[col]?1:a[col]<b[col]?-1:0)*(dir==='desc'?-1:1))}
      const limit=Number(url.searchParams.get('limit')||0);if(limit)out=out.slice(0,limit);
      if((headers['accept']||'').includes('vnd.pgrst.object')){if(out.length!==1)return json(406,{code:'PGRST116',message:'JSON object requested, multiple (or no) rows returned'});return json(200,out[0])}
      return json(200,out);
    }
    if(method==='POST'){
      const list=Array.isArray(body)?body:[body];
      const upsert=/merge-duplicates/.test(prefer);
      const keys=this.pk(t);
      const staged=[];
      for(const raw of list){
        const row={...raw};if(row.email)row.email=String(row.email).toLowerCase();
        if(t==='activity_events'&&!row.email&&w)row.email=w.email;
        if(!this.canWrite(t,row,w,'insert'))return json(403,{code:'42501',message:`new row violates row-level security policy for table "${t}"`});
        const err=this.check(t,row);if(err)return json(400,err);
        staged.push(row);
      }
      for(const row of staged){
        const i=rows.findIndex(r=>keys.every(k=>String(r[k])===String(row[k])));
        if(i>=0){if(!upsert)return json(409,{code:'23505',message:'duplicate key value violates unique constraint'});rows[i]={...rows[i],...row}}
        else rows.push(this.defaults(t,row));
      }
      return /return=representation/.test(prefer)?json(201,staged):json(201,undefined);
    }
    if(method==='PATCH'){
      let n=0;rows.forEach((r,i)=>{if(match(r)&&this.canSelect(t,r,w)&&this.canWrite(t,r,w,'update')){const next={...r,...body};const err=this.check(t,next);if(!err){rows[i]=next;n++}}});
      return json(204,undefined);
    }
    if(method==='DELETE'){
      const before=rows.length;this.db[t]=rows.filter(r=>!(match(r)&&this.canSelect(t,r,w)&&this.canWrite(t,r,w,'delete')));
      return json(204,undefined);
    }
    return json(405,{message:'method'});
  }
  grants(email){return this.db.access_grants.filter(g=>g.email===email)}
}
module.exports={MockSupabase,ADMIN};
