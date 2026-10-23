import {afterEach,it,expect,vi} from 'vitest';
import {isAppActive,parentRoute} from './MobileApp';
afterEach(()=>vi.unstubAllGlobals());
it('blocks frame advancement immediately when document becomes hidden',()=>{
 const page={hidden:false};vi.stubGlobal('document',page);
 expect(isAppActive()).toBe(true);page.hidden=true;expect(isAppActive()).toBe(false);
 page.hidden=false;expect(isAppActive()).toBe(true);
});
it('native back follows learning hierarchy and minimizes at cover',()=>{
 expect(parentRoute('#/labs/te')).toBe('#/labs');
 expect(parentRoute('#/microwave')).toBe('#/labs');
 expect(parentRoute('#/microwave/records')).toBe('#/hub');
 expect(parentRoute('#/labs')).toBe('#/hub');
 expect(parentRoute('#/hub')).toBe('#/');
 expect(parentRoute('#/')).toBeNull();
});
