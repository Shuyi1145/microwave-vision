import type {ReactNode} from 'react';
export const CONTRACT_VERSION='1.2' as const;
export type TopicId='smith'|'line'|'tem'|'te'|'tm'|'matching';
export type AppRoute='#/'|'#/hub'|'#/labs'|'#/microwave'|'#/microwave/quiz'|'#/microwave/records'|'#/microwave/handbook'|`#/labs/${Exclude<TopicId,'smith'>}`;
export interface TopicSummary {readonly id:TopicId;readonly path:AppRoute;readonly title:string;readonly tag:string;readonly description:string;readonly goal:string;}
export interface PortalProps {readonly view:'landing'|'hub'|'catalog';readonly topics:readonly TopicSummary[];readonly onNavigate:(route:AppRoute)=>void;}
export interface LessonLayoutProps {readonly title:string;readonly summary:string;readonly onBack:()=>void;readonly figure:ReactNode;readonly controls:ReactNode;readonly explanation:ReactNode;readonly playbackAvailable?:boolean;readonly playing:boolean;readonly onPlayingChange:(playing:boolean)=>void;}
export type ErrorCategory='normalization'|'complex-division'|'amplitude-power'|'vswr'|'rotation';
export interface AnswerResult {readonly questionId:string;readonly selected:number;readonly correct:number;readonly firstCorrect:boolean;readonly category:ErrorCategory;}
export interface PracticeCompletion {readonly id:string;readonly completedAt:string;readonly score:number;readonly topic:string;readonly answers:readonly AnswerResult[];}
export interface PracticeProps {readonly onComplete:(result:PracticeCompletion)=>boolean;readonly onNavigate:(route:AppRoute)=>void;}
