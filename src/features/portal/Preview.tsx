/// <reference types="vite/client" />
import {useState} from 'react';
import PortalFeature from './index';
import type {AppRoute,TopicSummary} from '../../collaboration/contracts';

const viewOrder=['landing','hub','catalog'] as const;
const viewNames={landing:'\u5c01\u9762',hub:'\u5de5\u4f5c\u53f0',catalog:'\u8bfe\u7a0b\u76ee\u5f55'} as const;
type PortalView=typeof viewOrder[number];

function readView():PortalView{
 const value=new URLSearchParams(location.search).get('view');
 return viewOrder.find(item=>item===value)??'landing';
}

export default function PortalPreview({topics}:{topics:readonly TopicSummary[]}){
 const [view,setView]=useState<PortalView>(readView);
 const [trail,setTrail]=useState<readonly string[]>([]);
 const handleNavigate=(route:AppRoute)=>{
  setTrail(list=>[route,...list].slice(0,5));
  if(route==='#/')setView('landing');
  else if(route==='#/hub')setView('hub');
  else if(route==='#/labs')setView('catalog');
 };
 return <div className="mv-portal-preview">
  <div className="mv-preview-bar">
   <span className="mv-preview-title">&#x95e8;&#x6237;&#x4efb;&#x52a1;&#x72ec;&#x7acb;&#x9884;&#x89c8;</span>
   <div className="mv-preview-tabs">
    {viewOrder.map(item=><button className={item===view?'mv-preview-tab is-active':'mv-preview-tab'} key={item} type="button" onClick={()=>setView(item)}>{viewNames[item]}</button>)}
   </div>
   <p className="mv-preview-trail">&#x5bfc;&#x822a;&#x56de;&#x8c03;&#xff1a;{trail.length>0?trail.join('  '):'\u5c1a\u672a\u89e6\u53d1'}</p>
  </div>
  <PortalFeature view={view} topics={topics} onNavigate={handleNavigate}/>
 </div>;
}
