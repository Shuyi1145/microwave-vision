const fs=require('fs');
const {chromium}=require(process.argv[2]||'playwright');
const base=process.argv[3]||'http://127.0.0.1:5174/';
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const context=await browser.newContext({reducedMotion:'reduce',hasTouch:true});const page=await context.newPage();
 const report={routes:[],checks:[],runtimeErrors:[]};page.on('pageerror',e=>report.runtimeErrors.push(e.message));
 const check=(name,value)=>{report.checks.push({name,value});if(!value)throw Error(name);};
 try{
  for(const width of [390,698,1024]){await page.setViewportSize({width,height:844});for(const route of ['#/','#/hub','#/labs','#/microwave','#/labs/line','#/labs/tem','#/labs/te','#/labs/tm','#/labs/matching','#/microwave/quiz','#/microwave/records','#/microwave/handbook']){
   await page.goto(base+route);await page.waitForTimeout(150);
   const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,formulaErrors:document.querySelectorAll('.katex-error').length}));report.routes.push({width,route,...result});if(result.overflow||result.formulaErrors)throw Error('layout/formula');
  }}
  await page.setViewportSize({width:390,height:844});await page.goto(base+'#/microwave/quiz');
  await page.evaluate(()=>{window.originalSet=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw Error('quota test');};});
  for(const [step,selected] of [2,1,1,1,2].entries()){
   await page.locator('.choices button').nth(selected).tap();
   check('answer locked '+step,await page.locator('.choices button:not(:disabled)').count()===0);
   await page.locator('.feedback button').tap();
  }
  check('first score 80',await page.locator('.quiz h1').innerText().then(t=>t.includes('80')));
  check('failure visible',await page.getByRole('button',{name:'\u91cd\u8bd5\u4fdd\u5b58'}).count()===1);
  await page.evaluate(()=>Storage.prototype.setItem=window.originalSet);
  await page.getByRole('button',{name:'\u91cd\u8bd5\u4fdd\u5b58'}).tap();
  check('retry stored once',await page.evaluate(()=>JSON.parse(localStorage.getItem('mw-records-v1')).length===1));
  await page.reload();await page.goto(base+'#/microwave/records');check('reload retains record',await page.locator('.records').innerText().then(t=>t.includes('80 / 100')));
  await page.screenshot({path:'docs/delivery/web-390-records.png',fullPage:true});
  await page.goto(base+'#/labs/te');await page.locator('.reference-grid button').first().tap();check('preview open',await page.locator('dialog[open]').count()===1);await page.keyboard.press('Escape');check('preview focus restored',await page.evaluate(()=>document.activeElement.classList.contains('reference-image')));
  await page.evaluate(async()=>Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode();})));
  await page.screenshot({path:'docs/delivery/web-390-te.png',fullPage:true});
  check('no runtime errors',report.runtimeErrors.length===0);
 }finally{fs.writeFileSync('docs/delivery/web.json',JSON.stringify(report,null,2));await browser.close();}
 console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1;});
