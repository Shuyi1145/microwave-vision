import {useEffect,useState} from 'react';
import {Capacitor} from '@capacitor/core';
import {App} from '@capacitor/app';
import './mobile.css';
let active=true;
export function isAppActive(){return !document.hidden&&active;}
export function useAppActive(){
 const [visible,setVisible]=useState(()=>isAppActive());
 useEffect(()=>{const update=()=>setVisible(isAppActive());document.addEventListener('visibilitychange',update);window.addEventListener('native-activity',update);return()=>{document.removeEventListener('visibilitychange',update);window.removeEventListener('native-activity',update);};},[]);
 return visible;
}
export function parentRoute(hash:string){
 if(hash.startsWith('#/labs/'))return '#/labs';
 if(hash==='#/microwave')return '#/labs';
 if(hash.startsWith('#/microwave/')||hash==='#/labs')return '#/hub';
 if(hash==='#/hub')return '#/';
 return null;
}
export async function initializeMobile(){
 if(!Capacitor.isNativePlatform())return;
 document.documentElement.classList.add('native-app');
 await App.addListener('appStateChange',({isActive})=>{active=isActive;window.dispatchEvent(new Event('native-activity'));});
 await App.addListener('backButton',()=>{
  const dialog=document.querySelector<HTMLDialogElement>('dialog[open]');
  if(dialog){dialog.dispatchEvent(new Event('cancel',{cancelable:true}));return;}
  const parent=parentRoute(location.hash);
  if(parent)location.hash=parent;else void App.minimizeApp();
 });
}
