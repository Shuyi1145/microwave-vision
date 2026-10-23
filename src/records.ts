import type {PracticeCompletion} from './collaboration/contracts';
export interface RecordItem {id?:string;date:string;score:number;topic:string;answers?:PracticeCompletion['answers'];}
type Store=Pick<Storage,'getItem'|'setItem'>;
const KEY='mw-records-v1';
export function readRecords(store:Pick<Storage,'getItem'>):RecordItem[]{
 const raw=store.getItem(KEY);
 if(!raw)return [];
 const data:unknown=JSON.parse(raw);
 if(!Array.isArray(data))throw new Error('Invalid record collection');
 return data.filter((v):v is RecordItem=>v!==null&&typeof v==='object'&&typeof v.date==='string'&&Number.isFinite(Date.parse(v.date))&&typeof v.topic==='string'&&Number.isFinite(v.score)&&v.score>=0&&v.score<=100).slice(0,50);
}
export function saveCompletion(store:Store,result:PracticeCompletion):RecordItem[]{
 const current=readRecords(store);
 if(current.some(v=>v.id===result.id))return current;
 const next=[{id:result.id,date:result.completedAt,score:result.score,topic:result.topic,answers:result.answers},...current].slice(0,50);
 // Write before acknowledging success; retries keep the same completion id.
 store.setItem(KEY,JSON.stringify(next));
 return next;
}
