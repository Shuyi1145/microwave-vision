export type Complex = { re: number; im: number };
export const magnitude = (z: Complex) => Math.hypot(z.re, z.im);
export function normalize(r: number, x: number, z0: number): Complex {
  if (![r,x,z0].every(Number.isFinite) || r<0 || z0<=0) throw new Error('Invalid passive impedance');
  return {re:r/z0, im:x/z0};
}
export function reflection(z: Complex): Complex {
  const d=(z.re+1)**2+z.im**2;
  return {re:(z.re*z.re+z.im*z.im-1)/d,im:2*z.im/d};
}
export function impedance(g: Complex): Complex | null {
  const d=(1-g.re)**2+g.im**2;
  if(d<1e-20) return null;
  return {re:Math.max(0,(1-g.re*g.re-g.im*g.im)/d),im:2*g.im/d};
}
export function rotate(g: Complex, wavelengths: number): Complex {
  const a=-4*Math.PI*wavelengths;
  return {re:g.re*Math.cos(a)-g.im*Math.sin(a),im:g.re*Math.sin(a)+g.im*Math.cos(a)};
}
export function vswr(g: Complex): number {
  const m=magnitude(g); return m>=1-1e-12 ? Infinity : (1+m)/(1-m);
}
// Distance s is positive from the load toward the generator; exp(+jwt) convention.
export function wave(g: Complex,s:number,t:number) {
  const a=2*Math.PI*s, b=2*Math.PI*t;
  const incident=Math.cos(b+a);
  const reflected=g.re*Math.cos(b-a)-g.im*Math.sin(b-a);
  return {incident,reflected,total:incident+reflected,envelope:Math.sqrt(1+magnitude(g)**2+2*(g.re*Math.cos(2*a)+g.im*Math.sin(2*a)))};
}
export const fmt=(n:number,d=3)=>Number.isFinite(n)?n.toFixed(d):'\u221e';
export const complexText=(z:Complex|null)=>z?`${fmt(z.re)} ${z.im<0?'\u2212':'+'} j${fmt(Math.abs(z.im))}`:'\u221e\uff08\u5f00\u8def\uff09';
