import {guideField,type ModeKind} from './coursePhysics';
export function fieldValue(kind:ModeKind,m:number,n:number,a:number,b:number,beta:number,x:number,y:number,phase:number,field:'E'|'H',quantity:'magnitude'|'longitudinal'){
 const v=guideField(kind,m,n,a,b,beta,x,y,phase);
 if(quantity==='longitudinal')return field==='E'?v.ez:v.hz;
 const kc=Math.hypot(m*Math.PI/a,n*Math.PI/b),q=beta/kc;
 // A phase-independent bound keeps a zero field dark instead of rescaling it to a false maximum.
 const transverse=Math.max(Math.abs(m*Math.PI/a),Math.abs(n*Math.PI/b))/kc;
 const bound=(kind==='TE'&&field==='H')||(kind==='TM'&&field==='E')?Math.max(1,q*transverse):transverse;
 return (field==='E'?Math.hypot(v.ex,v.ey,v.ez):Math.hypot(v.hx,v.hy,v.hz))/bound;
}
export function heatColor(value:number,signed:boolean):[number,number,number]{
 const stops=signed?[[0,53,98,190],[.5,248,250,252],[1,205,72,59]]:[[0,18,51,125],[.25,39,152,215],[.5,59,207,156],[.75,255,211,86],[1,207,55,58]];
 const t=Math.max(0,Math.min(1,signed?(value+1)/2:value));
 const index=Math.min(stops.length-2,stops.findIndex((s,i)=>i<stops.length-1&&t<=stops[i+1][0]));
 const lo=stops[Math.max(0,index)],hi=stops[Math.max(0,index)+1],ratio=(t-lo[0])/(hi[0]-lo[0]);
 return [1,2,3].map(i=>Math.round(lo[i]+ratio*(hi[i]-lo[i]))) as [number,number,number];
}

// A complete-cycle peak for the chosen spatial slice, independent of the animated phase.
export function fieldReferencePeak(kind:ModeKind,m:number,n:number,a:number,b:number,beta:number,field:'E'|'H',quantity:'magnitude'|'longitudinal',plane:'xy'|'xz'){
 let peak=0;
 for(let i=0;i<=40;i++)for(let j=0;j<=(plane==='xy'?40:0);j++){
  const x=i/40,y=plane==='xy'?j/40:.5;
  for(const phase of [0,Math.PI/2])peak=Math.max(peak,Math.abs(fieldValue(kind,m,n,a,b,beta,x,y,phase,field,quantity)));
 }
 return peak<1e-12?0:peak;
}
