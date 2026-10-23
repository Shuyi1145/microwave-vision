import {it,expect} from 'vitest';
import {readRecords,saveCompletion} from './records';
import {createSession,transition,completion} from './features/practice/model';
function result(){let s=createSession();for(const [step,selected] of [0,1,1,1,2].entries()){s=transition(s,{type:'answer',step,selected});s=transition(s,{type:'next',step});}return completion(s)!;}
it('preserves legacy records, persists feedback, and deduplicates retries',()=>{
 let raw=JSON.stringify([null,{date:'2026-10-23T00:00:00Z',score:60,topic:'legacy'}]);
 const store={getItem:()=>raw,setItem:(_key:string,value:string)=>{raw=value;}};
 const r=result();saveCompletion(store,r);saveCompletion(store,r);
 const loaded=readRecords(store);expect(loaded).toHaveLength(2);expect(loaded[0].score).toBe(100);expect(loaded[0].answers).toHaveLength(5);expect(loaded[1].topic).toBe('legacy');
});
it('failed writes can retry without acknowledging or duplicating a result',()=>{
 let raw='[]',fail=true;
 const store={getItem:()=>raw,setItem:(_key:string,value:string)=>{if(fail)throw Error('quota');raw=value;}};
 const r=result();expect(()=>saveCompletion(store,r)).toThrow('quota');expect(readRecords(store)).toEqual([]);
 fail=false;saveCompletion(store,r);saveCompletion(store,r);expect(readRecords(store)).toHaveLength(1);
});
it('corrupt collections are not overwritten by a save',()=>{
 for(const raw of ['{','null','{}']){let wrote=false;expect(()=>saveCompletion({getItem:()=>raw,setItem:()=>{wrote=true;}},result())).toThrow();expect(wrote).toBe(false);}
});
