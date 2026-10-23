import type {PracticeCompletion,ErrorCategory} from '../../collaboration/contracts';
import {questions} from './questions';
export interface Session {id:string;step:number;answers:readonly number[];done:boolean;completedAt?:string;}
export type Action={type:'answer';step:number;selected:number}|{type:'next';step:number};
let sequence=0;
export function createSession():Session {
 return {id:`practice-${Date.now()}-${++sequence}-${Math.random().toString(36).slice(2)}`,step:0,answers:[],done:false};
}
export function transition(state:Session,action:Action):Session {
 if(state.done||action.step!==state.step)return state;
 if(action.type==='answer'){
  if(state.answers[state.step]!==undefined||!Number.isInteger(action.selected)||action.selected<0||action.selected>=questions[state.step].choices.length)return state;
  return {...state,answers:[...state.answers,action.selected]};
 }
 if(state.answers[state.step]===undefined)return state;
 return state.step===questions.length-1?{...state,done:true,completedAt:new Date().toISOString()}:{...state,step:state.step+1};
}
const categories:ErrorCategory[]=['normalization','complex-division','amplitude-power','vswr','rotation'];
export function completion(state:Session):PracticeCompletion|null {
 if(!state.done||!state.completedAt)return null;
 return {id:state.id,completedAt:state.completedAt,score:state.answers.filter((v,i)=>v===questions[i].correct).length*20,
  topic:'\u963b\u6297 \u2192 \u53cd\u5c04 \u2192 \u529f\u7387 \u2192 \u9a7b\u6ce2 \u2192 \u6cbf\u7ebf\u79fb\u52a8',
  answers:state.answers.map((selected,i)=>({questionId:categories[i],selected,correct:questions[i].correct,firstCorrect:selected===questions[i].correct,category:categories[i]}))};
}
