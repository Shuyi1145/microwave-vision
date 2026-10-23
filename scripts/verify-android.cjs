const fs=require('fs'),cp=require('child_process');
const adb=process.argv[2],serial=process.argv[3],port=Number(process.argv[4]);
const run=(...args)=>cp.execFileSync(adb,['-s',serial,...args],{encoding:'utf8'}).trim();
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function connect(){const pid=run('shell','pidof','com.microwavevision.learning');run('forward','tcp:'+port,'localabstract:webview_devtools_remote_'+pid);let pages;for(let attempt=0;attempt<10;attempt++){try{pages=await(await fetch('http://127.0.0.1:'+port+'/json',{headers:{Connection:'close'}})).json();if(pages.length)break;}catch{}await pause(500);}if(!pages?.length)throw Error('WebView unavailable');const ws=new WebSocket(pages[0].webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const cb=pending.get(m.id);pending.delete(m.id);m.error?cb.reject(Error(JSON.stringify(m.error))):cb.resolve(m.result);}};return {ws,send:(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});const requestId=id;setTimeout(()=>{if(pending.has(requestId)){pending.delete(requestId);reject(Error('CDP timeout: '+method));}},8000).unref();ws.send(JSON.stringify({id,method,params}));})};}
(async()=>{
 run('shell','am','start','-n','com.microwavevision.learning/.MainActivity');await pause(1200);
 const report={serial,android:run('shell','getprop','ro.build.version.release'),checks:[]};let c=await connect();
 const evaluate=async expression=>{const r=await c.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const check=(name,value)=>{console.log(name,value);report.checks.push({name,value});if(!value)throw Error(name);};
 const route=async hash=>{await evaluate('location.hash='+JSON.stringify(hash));await pause(450);};
 const clickText=async text=>evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.includes(${JSON.stringify(text)}));if(!b)throw Error('Missing button');b.click();return true;})()`);
 const airplane=run('shell','settings','get','global','airplane_mode_on');
 const wifi=run('shell','settings','get','global','wifi_on'),data=run('shell','settings','get','global','mobile_data');
 try{
  run('shell','cmd','connectivity','airplane-mode','enable');run('shell','svc','wifi','disable');run('shell','svc','data','disable');await pause(600);report.network={airplane:run('shell','settings','get','global','airplane_mode_on'),wifi:run('shell','settings','get','global','wifi_on'),data:run('shell','settings','get','global','mobile_data')};
  await route('#/labs/te');check('offline course loaded',await evaluate("document.body.innerText.includes('TE10')&&document.querySelectorAll('canvas').length>0"));
  await evaluate("Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});} ))");check('offline images',await evaluate('[...document.images].every(i=>i.complete&&i.naturalWidth>0)'));
  await evaluate("document.querySelector('.reference-grid button').click()");await pause(250);check('preview open',await evaluate("!!document.querySelector('dialog[open]')"));run('shell','input','keyevent','4');await pause(350);check('native back closes preview',await evaluate("!document.querySelector('dialog[open]')&&location.hash==='#/labs/te'"));
  run('shell','input','keyevent','4');await pause(350);check('native back to catalog',await evaluate("location.hash==='#/labs'"));
  await route('#/microwave/quiz');const before=await evaluate("JSON.parse(localStorage.getItem('mw-records-v1')||'[]').length");
  for(const [step,selected] of [2,1,1,1,2].entries()){
   await evaluate(`document.querySelectorAll('.choices button')[${selected}].click()`);
   await pause(80);
   check('answer locked '+step,await evaluate("[...document.querySelectorAll('.choices button')].every(b=>b.disabled)"));
   await evaluate("document.querySelector('.feedback button').click()");await pause(100);
  }
  check('first answer score 80',await evaluate("document.querySelector('.quiz h1').textContent.includes('80')"));
  const records=await evaluate("JSON.parse(localStorage.getItem('mw-records-v1'))");check('one saved result',records.length===Math.min(50,before+1));report.result=records[0];
  await route('#/microwave');
  const bounds=await evaluate("(()=>{const r=document.querySelector('.smith').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,dpr:devicePixelRatio};})()");
  await evaluate("document.querySelector('.smith').scrollIntoView({block:'center'})");await pause(150);
  const rect=await evaluate("(()=>{const r=document.querySelector('.smith').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,dpr:devicePixelRatio};})()");
  const prior=await evaluate("document.querySelector('.metrics').innerText");
  const x=Math.round((rect.x+rect.w*.6)*rect.dpr),y=Math.round((rect.y+rect.h*.5)*rect.dpr+24*rect.dpr);
  run('shell','input','swipe',String(x),String(y),String(x+40),String(y-20),'350');await pause(200);
  check('native chart touch changes metrics',prior!==await evaluate("document.querySelector('.metrics').innerText"));
  check('no selected text',await evaluate("getSelection().toString()===''"));report.touch={bounds,x,y};
  await c.send('Runtime.enable');run('shell','input','keyevent','3');await pause(1200);for(let i=0;i<10;i++){if(await evaluate('document.hidden'))break;await pause(300);}check('background page hidden',await evaluate('document.hidden'));await pause(500);const stopped=await evaluate("JSON.stringify([...document.querySelectorAll('.waves path')].map(p=>p.getAttribute('d')))");await pause(400);check('background animation paused',stopped===await evaluate("JSON.stringify([...document.querySelectorAll('.waves path')].map(p=>p.getAttribute('d')))"));
  run('shell','am','start','-n','com.microwavevision.learning/.MainActivity');await pause(300);
  await route('#/microwave/records');
  run('shell','screencap','-p','/sdcard/mv-evidence.png');run('pull','/sdcard/mv-evidence.png','docs/delivery/android-'+report.android+'-records.png');
  c.ws.close();run('shell','am','force-stop','com.microwavevision.learning');run('shell','am','start','-n','com.microwavevision.learning/.MainActivity');await pause(2500);c=await connect();await route('#/microwave/records');
  check('records survive process restart',await evaluate(`JSON.parse(localStorage.getItem('mw-records-v1'))[0].id===${JSON.stringify(records[0].id)}`));
 }finally{
  if(airplane!=='1')run('shell','cmd','connectivity','airplane-mode','disable');if(wifi==='1')run('shell','svc','wifi','enable');if(data==='1')run('shell','svc','data','enable');c.ws.close();fs.writeFileSync('docs/delivery/android-'+report.android+'.json',JSON.stringify(report,null,2));
 }
 console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1;});
