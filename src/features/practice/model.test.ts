import {it,expect} from 'vitest';
import {createSession,transition,completion} from './model';
it('counts only first answers, ignores stale events and completes exactly once',()=>{
 let s=createSession();
 expect(transition(s,{type:'next',step:0})).toBe(s);
 for(const [step,selected] of [2,1,1,1,2].entries()){
  s=transition(s,{type:'answer',step,selected});
  expect(transition(s,{type:'answer',step,selected:0})).toBe(s);
  s=transition(s,{type:'next',step});
  expect(transition(s,{type:'next',step})).toBe(s);
 }
 expect(completion(s)?.score).toBe(80);
 expect(completion(s)?.answers[0].firstCorrect).toBe(false);
 expect(completion(s)).toEqual(completion(s));
 expect(createSession().answers).toEqual([]);
 expect(createSession().id).not.toBe(s.id);
});
it('rejects invalid selections and unfinished completion',()=>{
 const s=createSession();
 for(const selected of [-1,3,NaN,.5])expect(transition(s,{type:'answer',step:0,selected})).toBe(s);
 expect(completion(s)).toBeNull();
});
