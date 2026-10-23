import {reflection,rotate,impedance} from './physics';
export const C0=299792458;
export const ETA0=376.730313668;
export type ModeKind='TE'|'TM';
export function lineParameters(lNh:number,cPf:number,fMHz:number){
 if(![lNh,cPf,fMHz].every(v=>Number.isFinite(v)&&v>0))throw Error('Positive line parameters required');
 const l=lNh*1e-9,c=cPf*1e-12,f=fMHz*1e6;
 if(1/Math.sqrt(l*c)>C0*(1+1e-10))throw Error('LC parameters exceed the nondispersive physical velocity limit');
 return {z0:Math.sqrt(l/c),velocity:1/Math.sqrt(l*c),lambda:1/(f*Math.sqrt(l*c)),beta:2*Math.PI*f*Math.sqrt(l*c)};
}
export function coax(inner:number,outer:number,er:number){
 if(![inner,outer,er].every(Number.isFinite)||inner<=0||outer<=inner||er<1)throw Error('Invalid coax geometry');
 return {z0:ETA0/(2*Math.PI*Math.sqrt(er))*Math.log(outer/inner),velocity:C0/Math.sqrt(er)};
}
export function guide(kind:ModeKind,m:number,n:number,aMm:number,bMm:number,fGHz:number,er=1){
 if(![m,n].every(Number.isInteger)||m<0||n<0||(m===0&&n===0)||(kind==='TM'&&(m===0||n===0)))throw Error('Invalid mode indices');
 if(![aMm,bMm,fGHz,er].every(v=>Number.isFinite(v)&&v>0))throw Error('Invalid guide parameters');
 const kx=m*Math.PI/(aMm/1000),ky=n*Math.PI/(bMm/1000),kc=Math.hypot(kx,ky),velocity=C0/Math.sqrt(er),fc=velocity*kc/(2*Math.PI),f=fGHz*1e9,k=2*Math.PI*f/velocity;
 const state=f>fc*(1+1e-10)?'propagating':f<fc*(1-1e-10)?'evanescent':'cutoff';
 const beta=state==='propagating'?Math.sqrt(k*k-kc*kc):0,alpha=state==='evanescent'?Math.sqrt(kc*kc-k*k):0;
 return {kx,ky,kc,fc,beta,alpha,state,velocity,lambdaG:beta?2*Math.PI/beta:Infinity,vp:beta?2*Math.PI*f/beta:Infinity,vg:beta?velocity*beta/k:0};
}
// Instantaneous fields at z=0, exp(+jwt-j*beta*z), per-family amplitude normalization.
// TE: H normalized to H0, E to omega*mu*H0/kc. TM: E to E0, H to omega*eps*E0/kc.
export function guideField(kind:ModeKind,m:number,n:number,a:number,b:number,beta:number,x:number,y:number,phase:number){
 const kx=m*Math.PI/a,ky=n*Math.PI/b,kc=Math.hypot(kx,ky),sx=Math.sin(m*Math.PI*x),cx=Math.cos(m*Math.PI*x),sy=Math.sin(n*Math.PI*y),cy=Math.cos(n*Math.PI*y),s=Math.sin(phase),c=Math.cos(phase),q=beta/kc;
 if(kind==='TE')return {ex:-ky/kc*cx*sy*s,ey:kx/kc*sx*cy*s,ez:0,hx:-q*kx/kc*sx*cy*s,hy:-q*ky/kc*cx*sy*s,hz:cx*cy*c};
 return {ex:q*kx/kc*cx*sy*s,ey:q*ky/kc*sx*cy*s,ez:sx*sy*c,hx:-ky/kc*sx*cy*s,hy:kx/kc*cx*sy*s,hz:0};
}
export function quarterMatch(z0:number,load:number,ratio:number){
 if(![z0,load,ratio].every(v=>Number.isFinite(v)&&v>0))throw Error('Positive matching parameters required');
 const transformer=Math.sqrt(z0*load),g=rotate(reflection({re:load/transformer,im:0}),ratio/4),zin=impedance(g)!;
 const input={re:zin.re*transformer,im:zin.im*transformer};
 return {transformer,input,gamma:reflection({re:input.re/z0,im:input.im/z0})};
}
