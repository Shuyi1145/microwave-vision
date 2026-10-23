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
   const footer=await page.locator('footer').allTextContents();if(footer.some(t=>/\u7406\u60f3\u6a21\u578b|\u89c4\u5219\u8bca\u65ad|\u672c\u5730\u8bb0\u5f55/.test(t)))throw Error('decorative footer returned');
   const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,formulaErrors:document.querySelectorAll('.katex-error').length}));report.routes.push({width,route,...result});if(result.overflow||result.formulaErrors)throw Error('layout/formula');
  }}
  check('decorative footer removed on all routes',true);await page.goto(base+'#/labs/tem');check('TEM has no cutoff label',await page.locator('.course-stats').innerText().then(t=>t.includes('\u65e0\u622a\u6b62')));

  for(const width of [390,698,1024]){
   await page.setViewportSize({width,height:844});await page.goto(base+'#/labs/te');await page.reload();
   const panel=page.locator('.mv-lesson-ui__panel');check('W2 default panel '+width,await panel.evaluate(e=>e.open)===(width>=900));
   if(width<900)await panel.locator('summary').click();
   await page.getByRole('button',{name:'\u4f4e\u4e8e\u622a\u6b62',exact:true}).click();check('W2 real cutoff controls '+width,await page.locator('.mode-status').getAttribute('data-state')==='evanescent');
   await page.getByRole('button',{name:'\u9ad8\u4e8e\u622a\u6b62',exact:true}).click();check('W2 real propagation controls '+width,await page.locator('.mode-status').getAttribute('data-state')==='propagating');
   const play=page.locator('.mv-lesson-ui__play');check('W2 host playback initially reduced '+width,await play.getAttribute('aria-pressed')==='false');
   await play.click();check('W2 host play callback '+width,await play.getAttribute('aria-pressed')==='true');await play.click();
   check('W2 touch target '+width,(await play.boundingBox()).height>=44);
   await panel.locator('summary').focus();await page.keyboard.press('Enter');check('W2 keyboard collapse '+width,await panel.evaluate(e=>!e.open));
   await page.evaluate(()=>Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode();})));
   check('W2 heading stacks '+width,await page.locator('.mv-lesson-ui__heading').evaluate(e=>getComputedStyle(e).display==='block'));
   await page.screenshot({path:'docs/delivery/integrated-'+width+'-te.png',fullPage:true});
  }
  await page.goto(base+'#/labs/matching');check('static lesson has no fake playback',await page.locator('.mv-lesson-ui__play').count()===0);
  const favicon=await page.request.get(base+'favicon.svg');check('W4 favicon 200',favicon.status()===200);
  await page.goto(base+'#/labs/te');const outline=await page.locator('h1').evaluate(e=>getComputedStyle(e).outlineColor);check('W4 route focus is themed',outline==='rgb(155, 201, 193)');
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
