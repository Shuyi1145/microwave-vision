import {useEffect,type ReactNode} from 'react';
import {LazyMotion,domAnimation,MotionConfig,m,useReducedMotion,useAnimationControls} from 'motion/react';
import './animations.css';

export function AnimationProvider({children}:{children:ReactNode}){
 return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">{children}</MotionConfig></LazyMotion>;
}
export function PageTransition({route,children}:{route:string;children:ReactNode}){
 const reduced=useReducedMotion(),controls=useAnimationControls();
 useEffect(()=>{if(reduced){controls.set({opacity:1,y:0});return;}controls.set({opacity:0,y:8});void controls.start({opacity:1,y:0,transition:{duration:.32,ease:'easeOut'}});},[route,reduced,controls]);
 return <m.div className="page-transition" animate={controls}>{children}</m.div>;
}
export function AnimatedLink({children,className,href,order=0}:{children:ReactNode;className:string;href:string;order?:number}){
 const reduced=useReducedMotion();
 return <m.a className={className} href={href} initial={reduced?false:{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.38,delay:reduced?0:Math.min(order,3)*.055,ease:'easeOut'}} whileHover={reduced?undefined:{y:-5,transition:{duration:.18}}} whileTap={reduced?undefined:{scale:.99,transition:{duration:.1}}}>{children}</m.a>;
}
export function RevealSection({children,className}:{children:ReactNode;className:string}){
 const reduced=useReducedMotion();
 return <m.section className={className} initial={reduced?false:{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.04}} transition={{duration:.35,ease:'easeOut'}}>{children}</m.section>;
}
export function StepSwap({children,step}:{children:ReactNode;step:number}){
 const reduced=useReducedMotion();
 return <m.article key={step} initial={reduced?false:{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.22}}>{children}</m.article>;
}
