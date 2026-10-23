/// <reference types="vite/client" />
import {m,useReducedMotion} from 'motion/react';
import type {AppRoute,PortalProps,TopicSummary} from '../../collaboration/contracts';
import './portal.css';

const hubEntries=[
 {path:'#/labs',title:'\u5b9e\u9a8c\u5ba4',icon:'\u25c8',description:'\u9009\u62e9\u4f20\u8f93\u7ebf\u3001TEM\u3001TE\u3001TM\u3001\u53f2\u5bc6\u65af\u5706\u56fe\u6216\u963b\u6297\u5339\u914d\uff0c\u5c55\u5f00\u56fe\u89e3\u4e0e\u52a8\u753b\u5b9e\u9a8c\u3002',action:'\u8fdb\u5165\u5b9e\u9a8c\u5ba4'},
 {path:'#/microwave/quiz',title:'\u8bca\u65ad\u7ec3\u4e60',icon:'\u25ce',description:'\u5206\u6b65\u5b8c\u6210\u8ba1\u7b97\uff0c\u7528\u5177\u4f53\u7684\u9519\u56e0\u53cd\u9988\u4fee\u6b63\u7406\u89e3\uff0c\u5de9\u56fa\u5173\u952e\u6982\u5ff5\u3002',action:'\u5f00\u59cb\u7ec3\u4e60'},
 {path:'#/microwave/records',title:'\u5b66\u4e60\u8bb0\u5f55',icon:'\u25a4',description:'\u67e5\u770b\u5df2\u5b8c\u6210\u7ec3\u4e60\u7684\u5206\u6570\u4e0e\u65f6\u95f4\uff0c\u56de\u987e\u81ea\u5df1\u7684\u5b66\u4e60\u8f68\u8ff9\u3002',action:'\u67e5\u770b\u8bb0\u5f55'},
 {path:'#/microwave/handbook',title:'\u77e5\u8bc6\u624b\u518c',icon:'\u25c7',description:'\u67e5\u9605\u5f52\u4e00\u5316\u3001\u53cd\u5c04\u7cfb\u6570\u4e0e\u9a7b\u6ce2\u6bd4\u516c\u5f0f\uff0c\u7406\u89e3\u6a21\u578b\u7684\u9002\u7528\u8fb9\u754c\u3002',action:'\u6253\u5f00\u624b\u518c'}
] as const satisfies ReadonlyArray<{path:AppRoute;title:string;icon:string;description:string;action:string}>;

const topicIcons={smith:'\u25c9',line:'\u223f',tem:'\u2299',te:'TE',tm:'TM',matching:'\u03bb/4'} as const;

function HeroArt(){
 return <svg className="mv-hero-svg" viewBox="0 0 520 360" role="img" aria-label={'\u5f52\u4e00\u5316\u963b\u6297\u4e0e\u53cd\u5c04\u7cfb\u6570\u793a\u610f'}>
  <defs>
   <linearGradient id="mv-hero-panel" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#eef9f7"/><stop offset=".55" stopColor="#f2f1fb"/><stop offset="1" stopColor="#ecebfb"/></linearGradient>
   <linearGradient id="mv-hero-wave" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#168d83"/><stop offset="1" stopColor="#7a8fd4"/></linearGradient>
  </defs>
  <rect x="26" y="16" width="468" height="328" rx="36" fill="url(#mv-hero-panel)"/>
  <g transform="translate(258 148)" fill="none" strokeLinecap="round">
   <circle r="116" stroke="#d2e5e7"/>
   <path d="M-116 0H116M0-116V116" stroke="#d2e5e7" strokeDasharray="3 8"/>
   <circle cx="58" r="58" stroke="#8ab4af"/>
   <circle cx="87" r="29" stroke="#adc8c4"/>
   <circle r="72" stroke="#168d83" strokeDasharray="4 7" opacity=".5"/>
   <path d="M0 0L59-39" stroke="#d38d3e" strokeWidth="2"/>
   <circle cx="59" cy="-39" r="7.5" fill="#168d83" stroke="#ffffff" strokeWidth="3"/>
   <circle cx="-61" cy="37" r="5" fill="#8a7cc0" stroke="#ffffff" strokeWidth="2"/>
  </g>
  <path d="M56 302q27-30 54 0t54 0t54 0t54 0" fill="none" stroke="url(#mv-hero-wave)" strokeWidth="2.4" strokeLinecap="round"/>
  <circle cx="278" cy="302" r="4.5" fill="#168d83"/>
  <rect x="42" y="50" width="128" height="46" rx="13" fill="#ffffff" stroke="#dce8e9"/>
  <text x="106" y="79" textAnchor="middle" fill="#1f7f76" fontSize="15" fontFamily="Georgia,serif">z = r + jx</text>
  <rect x="350" y="256" width="142" height="48" rx="13" fill="#ffffff" stroke="#dce8e9"/>
  <text x="421" y="285" textAnchor="middle" fill="#7a6fae" fontSize="15" fontFamily="Georgia,serif">{'\u0393 = (z\u22121)/(z+1)'}</text>
 </svg>;
}

export default function PortalFeature({view,topics,onNavigate}:PortalProps){
 const reduced=useReducedMotion();
 const enter=()=>reduced?{opacity:1}:{opacity:0,y:14};
 if(view==='landing')return <div className="mv-portal mv-view mv-view-landing">
  <header className="mv-portal-top">
   <div className="mv-portal-brand"><span className="mv-portal-mark" aria-hidden="true">&#x25c9;</span><span>&#x5fae;&#x6ce2;&#x89c6;&#x754c;</span></div>
   <p className="mv-portal-slogan">&#x4ea4;&#x4e92;&#x5f0f;&#x5b66;&#x4e60; &#xb7; &#x667a;&#x6167;&#x6559;&#x80b2;&#x4e0e;&#x79d1;&#x666e;</p>
  </header>
  <main className="mv-portal-main">
   <section className="mv-hero">
    <m.div className="mv-hero-copy" initial={reduced?false:enter()} animate={{opacity:1,y:0}} transition={{duration:.42,ease:'easeOut'}}>
     <p className="mv-kicker"><span className="mv-kicker-dot" aria-hidden="true"/>&#x8ba9;&#x77e5;&#x8bc6;&#x53d1;&#x751f;&#x5728;&#x4ea4;&#x4e92;&#x4e4b;&#x95f4;</p>
     <h1 className="mv-hero-title">&#x4ece;&#x4e00;&#x4e2a;&#x597d;&#x5947;&#xff0c;<br/><em>&#x5f00;&#x59cb;&#x63a2;&#x7d22;&#x3002;</em></h1>
     <p className="mv-hero-lede">&#x62d6;&#x52a8;&#x4e00;&#x4e2a;&#x70b9;&#xff0c;&#x89c2;&#x5bdf;&#x4e00;&#x675f;&#x6ce2;&#x3002;<br/>&#x5728;&#x53ef;&#x89c6;&#x5316;&#x5b9e;&#x9a8c;&#x4e2d;&#x53d1;&#x73b0;&#x89c4;&#x5f8b;&#xff0c;&#x8ba9;&#x62bd;&#x8c61;&#x77e5;&#x8bc6;&#x6210;&#x4e3a;&#x76f4;&#x89c9;&#x3002;</p>
     <m.button className="mv-cta" type="button" onClick={()=>onNavigate('#/hub')} initial={reduced?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.38,delay:reduced?0:.16,ease:'easeOut'}} whileTap={reduced?undefined:{scale:.985}}>
      &#x8fdb;&#x5165;&#x7f51;&#x7ad9;<span className="mv-cta-arrow" aria-hidden="true">&#x2192;</span>
     </m.button>
     <p className="mv-hero-note">&#x89c2;&#x5bdf; &#xb7; &#x601d;&#x8003; &#xb7; &#x9a8c;&#x8bc1;</p>
    </m.div>
    <m.div className="mv-hero-art" initial={reduced?false:{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} transition={{duration:.5,ease:'easeOut'}}>
     <HeroArt/>
    </m.div>
   </section>
  </main>
  <footer className="mv-portal-foot"><span>&#x5fae;&#x6ce2;&#x89c6;&#x754c; &#xb7; &#x628a;&#x516c;&#x5f0f;&#x53d8;&#x6210;&#x76f4;&#x89c2;</span></footer>
 </div>;

 return <div className={`mv-portal mv-view mv-view-${view}`}>
  <header className="mv-portal-top">
   <button className="mv-back" type="button" onClick={()=>onNavigate(view==='catalog'?'#/hub':'#/')}>
    <span className="mv-back-arrow" aria-hidden="true">&#x2190;</span>{view==='catalog'?'\u8fd4\u56de\u5de5\u4f5c\u53f0':'\u8fd4\u56de\u5c01\u9762'}
   </button>
   <div className="mv-portal-brand"><span className="mv-portal-mark" aria-hidden="true">&#x25c9;</span><span>&#x5fae;&#x6ce2;&#x89c6;&#x754c;</span></div>
   <p className="mv-portal-slogan">{view==='catalog'?'\u8bfe\u7a0b\u5b9e\u9a8c\u5ba4 \u00b7 \u5148\u9009\u8bfe\uff0c\u518d\u5c55\u5f00':'\u9009\u62e9\u4e00\u4e2a\u6a21\u5757\uff0c\u5f00\u59cb\u5b66\u4e60'}</p>
  </header>
  <main className="mv-portal-main">
   <section className="mv-intro">
    <m.div initial={reduced?false:enter()} animate={{opacity:1,y:0}} transition={{duration:.36,ease:'easeOut'}}>
     <h1 className="mv-intro-title">{view==='catalog'?'\u4eca\u5929\uff0c\u63a2\u7d22\u54ea\u4e00\u79cd\u5fae\u6ce2\u73b0\u8c61\uff1f':'\u5b66\u4e60\u5de5\u4f5c\u53f0'}</h1>
     <p className="mv-intro-text">{view==='catalog'?'\u5148\u9009\u62e9\u5b66\u4e60\u5185\u5bb9\uff0c\u518d\u5c55\u5f00\u56fe\u89e3\u3001\u52a8\u753b\u4e0e\u53c2\u6570\u5b9e\u9a8c\u3002':'\u52a8\u624b\u63a2\u7d22\u3001\u5206\u6b65\u7ec3\u4e60\u3001\u67e5\u9605\u77e5\u8bc6\uff0c\u5728\u8fd9\u91cc\u8fde\u63a5\u8d77\u6765\u3002'}</p>
    </m.div>
    <span className="mv-intro-count">{view==='catalog'?'06 \u4e2a\u5b66\u4e60\u4e3b\u9898':'04 \u4e2a\u5b66\u4e60\u5165\u53e3'}</span>
   </section>
   {view==='hub'?<ul className="mv-grid mv-grid-hub">
    {hubEntries.map((entry,i)=><m.li className="mv-card mv-card-hub" key={entry.path} initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.36,delay:reduced?0:Math.min(i,3)*.05,ease:'easeOut'}}>
     <span className="mv-card-index" aria-hidden="true">{`0${i+1}`}</span>
     <span className="mv-card-icon" aria-hidden="true">{entry.icon}</span>
     <h2 className="mv-card-title"><button className="mv-card-link" type="button" onClick={()=>onNavigate(entry.path)}>{entry.title}</button></h2>
     <p className="mv-card-text">{entry.description}</p>
     <span className="mv-card-action" aria-hidden="true">{entry.action}<span className="mv-card-arrow">&#x2197;</span></span>
    </m.li>)}
   </ul>:<ul className="mv-grid mv-grid-topic">
    {topics.map((topic,i)=><m.li className="mv-card mv-card-topic" key={topic.id} initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.36,delay:reduced?0:Math.min(i,5)*.04,ease:'easeOut'}}>
     <span className="mv-card-index" aria-hidden="true">{`0${i+1}`}</span>
     <span className="mv-card-icon" aria-hidden="true">{topicIcons[topic.id]}</span>
     <p className="mv-card-tag">{topic.tag}</p>
     <h2 className="mv-card-title"><button className="mv-card-link" type="button" onClick={()=>onNavigate(topic.path)}>{topic.title}</button></h2>
     <p className="mv-card-text">{topic.description}</p>
     <p className="mv-card-goal"><span className="mv-card-goal-mark" aria-hidden="true">&#x25ce;</span>{topic.goal}</p>
     <span className="mv-card-action" aria-hidden="true">&#x5c55;&#x5f00;&#x5b66;&#x4e60;<span className="mv-card-arrow">&#x2197;</span></span>
    </m.li>)}
   </ul>}
  </main>
  <footer className="mv-portal-foot"><span>&#x5fae;&#x6ce2;&#x89c6;&#x754c; &#xb7; &#x4ea4;&#x4e92;&#x5f0f;&#x5b66;&#x4e60;&#x7cfb;&#x7edf;</span></footer>
 </div>;
}

export type {PortalProps,TopicSummary};
