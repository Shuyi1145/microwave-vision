import {describe,it,expect} from 'vitest';
import {normalize,reflection,rotate,vswr,impedance,magnitude,wave} from './physics';
describe('lossless transmission line reference cases',()=>{
 it('normalizes physical impedance and rejects invalid input',()=>{expect(normalize(100,50,50)).toEqual({re:2,im:1}); expect(()=>normalize(1,0,0)).toThrow();expect(()=>normalize(-1,0,50)).toThrow();expect(()=>normalize(NaN,0,50)).toThrow();});
 it('matched load has zero reflection and unit VSWR',()=>{const g=reflection({re:1,im:0});expect(magnitude(g)).toBe(0);expect(vswr(g)).toBe(1);});
 it('short, open and reactive loads lie on unit circle',()=>{expect(reflection({re:0,im:0})).toEqual({re:-1,im:0});expect(impedance({re:1,im:0})).toBeNull();expect(vswr({re:1,im:0})).toBe(Infinity);expect(magnitude(reflection({re:0,im:2}))).toBeCloseTo(1);});
 it('100+j50 ohms on 50 ohm line gives 0.4+j0.2',()=>{expect(reflection(normalize(100,50,50))).toEqual({re:0.4,im:0.2});});
 it('quarter wave inverts impedance, half wave repeats it',()=>{const g=reflection({re:2,im:0});expect(impedance(rotate(g,.25))?.re).toBeCloseTo(.5);expect(rotate(g,.5).re).toBeCloseTo(g.re);expect(rotate(g,.125).im).toBeLessThan(0);});
 it('round trips passive complex loads and preserves radius',()=>{for(const r of [0,.2,1,5])for(const x of [-4,-1,0,2]){const z={re:r,im:x},g=reflection(z),back=impedance(g)!;expect(back.re).toBeCloseTo(r);expect(back.im).toBeCloseTo(x);expect(magnitude(rotate(g,.123))).toBeCloseTo(magnitude(g));}});
 it('waves satisfy short/open voltage boundary conditions',()=>{for(const t of [0,.13,.25,.57])expect(wave({re:-1,im:0},0,t).total).toBeCloseTo(0);expect(wave({re:1,im:0},0,0).total).toBe(2);});
 it('envelope matches local reflection coefficient',()=>{const g={re:.4,im:.2};for(const s of [0,.125,.25,.37]){const local=rotate(g,s);expect(wave(g,s,0).envelope**2).toBeCloseTo((1+local.re)**2+local.im**2);}});
});

it("five-question reference matches independent rectangular values",()=>{const g=reflection(normalize(100,50,50));expect(magnitude(g)**2).toBeCloseTo(.2,12);expect(vswr(g)).toBeCloseTo(2.61803398875,10);const shifted=rotate(g,.125);expect(shifted.re).toBeCloseTo(.2,12);expect(shifted.im).toBeCloseTo(-.4,12);});
