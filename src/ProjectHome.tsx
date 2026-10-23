import PortalFeature from './features/portal';
import type {AppRoute} from './collaboration/contracts';
import {useEffect,useState} from 'react';
import {lessonTopics} from './courseContent';
export const learningEntries = [
 {path:'#/labs',title:'\u5b9e\u9a8c\u5ba4',code:'EXPLORE',icon:'\u25c8',description:'\u9009\u62e9\u4f20\u8f93\u7ebf\u3001TEM\u3001TE\u3001TM\u3001\u53f2\u5bc6\u65af\u5706\u56fe\u6216\u963b\u6297\u5339\u914d\uff0c\u5c55\u5f00\u56fe\u89e3\u4e0e\u52a8\u753b\u5b9e\u9a8c\u3002',action:'\u8fdb\u5165\u5b9e\u9a8c\u5ba4'},
 {path:'#/microwave/quiz',title:'\u8bca\u65ad\u7ec3\u4e60',code:'PRACTICE',icon:'\u25ce',description:'\u5206\u6b65\u5b8c\u6210\u8ba1\u7b97\uff0c\u7528\u5177\u4f53\u7684\u9519\u56e0\u53cd\u9988\u4fee\u6b63\u7406\u89e3\uff0c\u5de9\u56fa\u5173\u952e\u6982\u5ff5\u3002',action:'\u5f00\u59cb\u7ec3\u4e60'},
 {path:'#/microwave/records',title:'\u5b66\u4e60\u8bb0\u5f55',code:'PROGRESS',icon:'\u25a4',description:'\u67e5\u770b\u5df2\u5b8c\u6210\u7ec3\u4e60\u7684\u5206\u6570\u4e0e\u65f6\u95f4\uff0c\u56de\u987e\u81ea\u5df1\u7684\u5b66\u4e60\u8f68\u8ff9\u3002',action:'\u67e5\u770b\u8bb0\u5f55'},
 {path:'#/microwave/handbook',title:'\u77e5\u8bc6\u624b\u518c',code:'REFERENCE',icon:'\u25c7',description:'\u67e5\u9605\u5f52\u4e00\u5316\u3001\u53cd\u5c04\u7cfb\u6570\u4e0e\u9a7b\u6ce2\u6bd4\u516c\u5f0f\uff0c\u7406\u89e3\u6a21\u578b\u7684\u9002\u7528\u8fb9\u754c\u3002',action:'\u6253\u5f00\u624b\u518c'}
];


const navigate=(route:AppRoute)=>{location.hash=route;};
export function ProjectHome(){return <PortalFeature view="landing" topics={lessonTopics} onNavigate={navigate}/>;}
export function LearningHub(){return <PortalFeature view="hub" topics={lessonTopics} onNavigate={navigate}/>;}

export function useProjectRoute(){
 const read=()=>{if(location.hash==='#/hub')return 'hub';if(location.hash==='#/labs')return 'catalog';if(location.hash==='#/microwave')return '\u5b9e\u9a8c\u5ba4';const topic=lessonTopics.find(v=>v.id!=='smith'&&v.path===location.hash);if(topic)return 'topic:'+topic.id;return learningEntries.find(entry=>entry.path===location.hash)?.title??null;};
 const [inProject,setInProject]=useState(read);
 useEffect(()=>{const sync=()=>{setInProject(read());window.scrollTo(0,0);};window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
 useEffect(()=>{document.title=inProject==='catalog'?'\u8bfe\u7a0b\u5b9e\u9a8c\u5ba4 | \u5fae\u6ce2\u89c6\u754c':inProject?.startsWith('topic:')?`${lessonTopics.find(v=>v.id===inProject.slice(6))?.title} | \u5fae\u6ce2\u89c6\u754c`:inProject==='hub'?'\u5b66\u4e60\u5de5\u4f5c\u53f0 | \u5fae\u6ce2\u89c6\u754c':inProject?`${inProject} | \u5fae\u6ce2\u89c6\u754c`:'\u5fae\u6ce2\u89c6\u754c | \u4ea4\u4e92\u5f0f\u5b66\u4e60\u7cfb\u7edf';const heading=document.querySelector('h1');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});},[inProject]);
 return inProject;
}
