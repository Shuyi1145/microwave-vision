import {AnimatedLink} from './Animations';
import {useEffect,useState} from 'react';
import {lessonTopics} from './courseContent';
export const learningEntries = [
 {path:'#/labs',title:'\u5b9e\u9a8c\u5ba4',code:'EXPLORE',icon:'\u25c8',description:'\u9009\u62e9\u4f20\u8f93\u7ebf\u3001TEM\u3001TE\u3001TM\u3001\u53f2\u5bc6\u65af\u5706\u56fe\u6216\u963b\u6297\u5339\u914d\uff0c\u5c55\u5f00\u56fe\u89e3\u4e0e\u52a8\u753b\u5b9e\u9a8c\u3002',action:'\u8fdb\u5165\u5b9e\u9a8c\u5ba4'},
 {path:'#/microwave/quiz',title:'\u8bca\u65ad\u7ec3\u4e60',code:'PRACTICE',icon:'\u25ce',description:'\u5206\u6b65\u5b8c\u6210\u8ba1\u7b97\uff0c\u7528\u5177\u4f53\u7684\u9519\u56e0\u53cd\u9988\u4fee\u6b63\u7406\u89e3\uff0c\u5de9\u56fa\u5173\u952e\u6982\u5ff5\u3002',action:'\u5f00\u59cb\u7ec3\u4e60'},
 {path:'#/microwave/records',title:'\u5b66\u4e60\u8bb0\u5f55',code:'PROGRESS',icon:'\u25a4',description:'\u67e5\u770b\u5df2\u5b8c\u6210\u7ec3\u4e60\u7684\u5206\u6570\u4e0e\u65f6\u95f4\uff0c\u56de\u987e\u81ea\u5df1\u7684\u5b66\u4e60\u8f68\u8ff9\u3002',action:'\u67e5\u770b\u8bb0\u5f55'},
 {path:'#/microwave/handbook',title:'\u77e5\u8bc6\u624b\u518c',code:'REFERENCE',icon:'\u25c7',description:'\u67e5\u9605\u5f52\u4e00\u5316\u3001\u53cd\u5c04\u7cfb\u6570\u4e0e\u9a7b\u6ce2\u6bd4\u516c\u5f0f\uff0c\u7406\u89e3\u6a21\u578b\u7684\u9002\u7528\u8fb9\u754c\u3002',action:'\u6253\u5f00\u624b\u518c'}
];


function OrbitArt({compact=false}:{compact?:boolean}){
 return <svg viewBox="0 0 500 350" aria-hidden="true" className={compact?'orbit-art compact':'orbit-art'}>
  <defs><linearGradient id={compact?'orbit-small':'orbit-large'} x2="1" y2="1"><stop stopColor="#eef9f7"/><stop offset="1" stopColor="#eaeafb"/></linearGradient></defs>
  <rect x="40" y="15" width="420" height="310" rx="32" fill={`url(#${compact?'orbit-small':'orbit-large'})`}/>
  <g transform="translate(250 170)" fill="none" stroke="#8eb8c1" strokeWidth="1">
   <circle r="122" stroke="#589399"/><ellipse rx="170" ry="63" transform="rotate(-28)" stroke="#b4aecf"/>
   <circle cx="61" r="61"/><circle cx="91.5" r="30.5"/>
   <path d="M-122 0H122M0-122V122" strokeDasharray="3 6"/><circle r="75" strokeDasharray="4 5" stroke="#15968c"/>
   <path d="M0 0L62-42" stroke="#d38d3e" strokeWidth="2"/>
   <circle cx="62" cy="-42" r="7" fill="#15968c" stroke="white" strokeWidth="3"/>
   <circle cx="-64" cy="39" r="5" fill="#a096ce" stroke="white" strokeWidth="2"/>
  </g>
  <rect x="17" y="60" width="117" height="45" rx="12" fill="white" stroke="#dce8e9"/>
  <text x="75" y="88" textAnchor="middle" fill="#25847e" fontSize="15" fontFamily="Georgia,serif">z = r + jx</text>
  <rect x="355" y="247" width="128" height="49" rx="12" fill="white" stroke="#dce8e9"/>
  <text x="419" y="277" textAnchor="middle" fill="#8274af" fontSize="15" fontFamily="Georgia,serif">{'\u0393 = (z\u22121)/(z+1)'}</text>
  <circle cx="420" cy="46" r="6" fill="#ecc788"/><circle cx="74" cy="288" r="4" fill="#a8d3c9"/>
 </svg>;
}

export function ProjectHome(){
 return <div className="portal landing"><header className="portal-header"><div className="portal-brand"><span className="portal-mark">{'\u25c9'}</span><div>{'\u5fae\u6ce2\u89c6\u754c'}</div></div><span className="portal-local">{'\u4ea4\u4e92\u5f0f\u5b66\u4e60 \u00b7 \u667a\u6167\u6559\u80b2\u4e0e\u79d1\u666e'}</span></header><main className="portal-main">
   <section className="portal-hero"><div className="hero-copy"><div className="hero-kicker"><span/>{'\u8ba9\u77e5\u8bc6\u53d1\u751f\u5728\u4ea4\u4e92\u4e4b\u95f4'}</div><h1>{'\u4ece\u4e00\u4e2a\u597d\u5947\uff0c'}<br/><em>{'\u5f00\u59cb\u63a2\u7d22\u3002'}</em></h1><p>{'\u62d6\u52a8\u4e00\u4e2a\u70b9\uff0c\u89c2\u5bdf\u4e00\u675f\u6ce2\u3002'}<br/>{'\u5728\u53ef\u89c6\u5316\u5b9e\u9a8c\u4e2d\u53d1\u73b0\u89c4\u5f8b\uff0c\u8ba9\u62bd\u8c61\u77e5\u8bc6\u6210\u4e3a\u76f4\u89c9\u3002'}</p><a className="hero-cta" href="#/hub">{'\u8fdb\u5165\u7f51\u7ad9'}<span aria-hidden="true">{'\u2192'}</span></a><div className="hero-footnote"><span>{'\u89c2\u5bdf \u00b7 \u601d\u8003 \u00b7 \u9a8c\u8bc1'}</span></div></div><div className="hero-art"><OrbitArt/></div></section>
</main><footer className="portal-footer"><span>{'\u5fae\u6ce2\u89c6\u754c \u00b7 \u628a\u516c\u5f0f\u53d8\u6210\u76f4\u89c9'}</span></footer></div>;
}

export function LearningHub(){
 return <div className="portal hub"><header className="portal-header"><a className="home-return" href="#/">{'\u2190 \u8fd4\u56de\u5c01\u9762'}</a><div className="portal-brand">{'\u5fae\u6ce2\u89c6\u754c'}</div><span className="portal-local">{'\u9009\u62e9\u4e00\u4e2a\u6a21\u5757\uff0c\u5f00\u59cb\u5b66\u4e60'}</span></header><main className="portal-main"><div className="hub-intro"><h1>{'\u5b66\u4e60\u5de5\u4f5c\u53f0'}</h1><p>{'\u52a8\u624b\u63a2\u7d22\u3001\u5206\u6b65\u7ec3\u4e60\u3001\u67e5\u9605\u77e5\u8bc6\uff0c\u5728\u8fd9\u91cc\u8fde\u63a5\u8d77\u6765\u3002'}</p></div>
   <section id="project-list" className="project-section" aria-labelledby="project-heading"><div className="project-heading"><div><h2 id="project-heading">{'\u9009\u62e9\u8981\u8fdb\u5165\u7684\u5b66\u4e60\u6a21\u5757'}<span>{'\u5fae\u6ce2\u89c6\u754c \u00b7 \u4ece\u63a2\u7d22\u5230\u7ec3\u4e60\uff0c\u6309\u4f60\u7684\u8282\u594f\u5f00\u59cb'}</span></h2></div><span className="project-count">{'04 \u4e2a\u5b66\u4e60\u5165\u53e3'}</span></div>
    <div className="module-grid">{learningEntries.map((entry,i)=><AnimatedLink className={`module-card module-${i}`} href={entry.path} key={entry.path} order={i}><div className="module-top"><span>{`0${i+1}`}</span><span className="module-icon" aria-hidden="true">{entry.icon}</span></div><h3>{entry.title}</h3><p>{entry.description}</p><div className="module-action">{entry.action}<span aria-hidden="true">{'\u2197'}</span></div></AnimatedLink>)}</div>
   </section>
</main><footer className="portal-footer"><span>{'\u5fae\u6ce2\u89c6\u754c \u00b7 \u4ea4\u4e92\u5f0f\u5b66\u4e60\u7cfb\u7edf'}</span></footer></div>;
}

export function useProjectRoute(){
 const read=()=>{if(location.hash==='#/hub')return 'hub';if(location.hash==='#/labs')return 'catalog';if(location.hash==='#/microwave')return '\u5b9e\u9a8c\u5ba4';const topic=lessonTopics.find(v=>v.id!=='smith'&&v.path===location.hash);if(topic)return 'topic:'+topic.id;return learningEntries.find(entry=>entry.path===location.hash)?.title??null;};
 const [inProject,setInProject]=useState(read);
 useEffect(()=>{const sync=()=>{setInProject(read());window.scrollTo(0,0);};window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
 useEffect(()=>{document.title=inProject==='catalog'?'\u8bfe\u7a0b\u5b9e\u9a8c\u5ba4 | \u5fae\u6ce2\u89c6\u754c':inProject?.startsWith('topic:')?`${lessonTopics.find(v=>v.id===inProject.slice(6))?.title} | \u5fae\u6ce2\u89c6\u754c`:inProject==='hub'?'\u5b66\u4e60\u5de5\u4f5c\u53f0 | \u5fae\u6ce2\u89c6\u754c':inProject?`${inProject} | \u5fae\u6ce2\u89c6\u754c`:'\u5fae\u6ce2\u89c6\u754c | \u4ea4\u4e92\u5f0f\u5b66\u4e60\u7cfb\u7edf';const heading=document.querySelector('h1');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});},[inProject]);
 return inProject;
}
