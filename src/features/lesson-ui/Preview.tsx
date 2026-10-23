import {useState} from 'react';
import type {TopicSummary} from '../../collaboration/contracts';
import {Formula,formulaTex} from '../../Formula';
import LessonLayout from './index';
import './preview.css';

const LONG_TITLE_SUFFIX=' \u5e03\u5c40\u9884\u89c8\u5360\u4f4d\uff1a\u7528\u4e8e\u68c0\u67e5\u8d85\u957f\u4e2d\u6587\u6807\u9898\u7684\u6362\u884c\u4e0e\u9875\u9762\u4e0d\u6a2a\u5411\u6ea2\u51fa';
const PLACEHOLDER_NOTE='\u672c\u9875\u53ea\u6f14\u793a\u69fd\u4f4d\u5e03\u5c40\u3002\u56fe\u5f62\u3001\u53c2\u6570\u548c\u8bb2\u89e3\u5747\u4e3a\u5360\u4f4d\u6837\u4f8b\uff0c\u4e0d\u542b\u771f\u5b9e\u7269\u7406\u91cf\uff0c\u4e5f\u4e0d\u80fd\u5f53\u4f5c\u5b9e\u9a8c\u7ed3\u679c\u3002';

function SampleFigure(){
  return (
    <>
      <svg viewBox="0 0 640 360" role="img" aria-label={'\u77e9\u5f62\u6ce2\u5bfc\u6a2a\u622a\u9762\u5360\u4f4d\u793a\u610f\u56fe'}>
        <defs>
          <linearGradient id="mv-lesson-demo-core" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3faf8"/>
            <stop offset="1" stopColor="#d8eae4"/>
          </linearGradient>
        </defs>
        <rect x="22" y="22" width="596" height="316" rx="16" fill="#fcfefe" stroke="#d5e4e8"/>
        <rect x="120" y="84" width="400" height="192" rx="10" fill="url(#mv-lesson-demo-core)" stroke="#168d83" strokeWidth="2.5"/>
        {[180,260,340,420,500].map((x,index)=>(
          <path key={x} d={`M${x} 94V266`} stroke="#168d83" strokeWidth="1.5" strokeDasharray="6 7" opacity={0.26+0.13*index}/>
        ))}
        <path d="M120 180H520" stroke="#b56d23" strokeWidth="1.6" strokeDasharray="9 6" opacity=".65"/>
        <circle cx="320" cy="180" r="7" fill="#168d83"/>
        <path d="M120 298h400M120 292v12M520 292v12" stroke="#567183" strokeWidth="1.2"/>
        <path d="M556 84v192M550 84h12M550 276h12" stroke="#567183" strokeWidth="1.2"/>
      </svg>
      <p className="mv-lesson-ui-demo-caption">
        {'\u5360\u4f4d\u793a\u610f\u56fe\uff1a\u77e9\u5f62\u622a\u9762\u4e0e\u5750\u6807\u6807\u6ce8\uff0c\u4ec5\u7528\u4e8e\u9a8c\u8bc1\u56fe\u5f62\u69fd\u4e0d\u88ab\u5bb9\u5668\u88c1\u5207'}
      </p>
    </>
  );
}

function SampleControls(){
  const [frequency,setFrequency]=useState(10);
  const [width,setWidth]=useState(20);
  const [mode,setMode]=useState('te10');
  return (
    <div className="mv-lesson-ui-demo">
      <p className="mv-lesson-ui-demo-note">{'\u793a\u4f8b\u63a7\u4ef6\u53ea\u6539\u53d8\u6b64\u5904\u663e\u793a\u7684\u6570\u503c\uff0c\u4e0d\u505a\u4efb\u4f55\u7269\u7406\u8ba1\u7b97\uff0c\u4e5f\u4e0d\u5199\u56de\u5bbf\u4e3b\u72b6\u6001\u3002'}</p>
      <label className="mv-lesson-ui-demo-field">
        <span>{'\u5de5\u4f5c\u9891\u7387 f\uff08GHz\uff0c\u793a\u4f8b\uff09'}<b>{frequency.toFixed(1)}</b></span>
        <input
          type="range"
          min="1"
          max="20"
          step="0.5"
          value={frequency}
          aria-label={'\u793a\u4f8b\u9891\u7387\u6ed1\u5757'}
          onChange={event=>setFrequency(Number(event.target.value))}
        />
      </label>
      <label className="mv-lesson-ui-demo-field">
        <span>{'\u77e9\u5f62\u6ce2\u5bfc\u5bbd\u8fb9 a\uff08mm\uff0c\u793a\u4f8b\uff09'}<b>{width}</b></span>
        <input
          type="range"
          min="10"
          max="40"
          step="1"
          value={width}
          aria-label={'\u793a\u4f8b\u5bbd\u8fb9\u6ed1\u5757'}
          onChange={event=>setWidth(Number(event.target.value))}
        />
      </label>
      <label className="mv-lesson-ui-demo-field">
        <span>{'\u89c2\u5bdf\u6a21\u5f0f\uff08\u8d85\u957f\u4e2d\u6587\u6807\u7b7e\u793a\u4f8b\uff1a\u6a21\u5f0f\u4e0e\u8272\u6807\u53c2\u8003\u8bbe\u7f6e\uff0c\u68c0\u67e5\u6362\u884c\u4e0e\u4e0d\u6ea2\u51fa\uff09'}</span>
        <select value={mode} aria-label={'\u793a\u4f8b\u6a21\u5f0f\u9009\u62e9'} onChange={event=>setMode(event.target.value)}>
          <option value="te10">{'TE10 \u4e3b\u6a21'}</option>
          <option value="te20">{'TE20 \u9ad8\u6b21\u6a21'}</option>
          <option value="tm11">{'TM11 \u5bf9\u6bd4\u6a21'}</option>
        </select>
      </label>
    </div>
  );
}

function SampleExplanation(){
  return (
    <div className="mv-lesson-ui-demo">
      <p>{'\u8fd9\u4e00\u6bb5\u7528\u4e8e\u68c0\u67e5\u8bb2\u89e3\u69fd\u5728\u7a84\u5c4f\u4e0b\u7684\u6362\u884c\u3001\u884c\u8ddd\u4e0e\u6bb5\u95f4\u8ddd\uff1a\u4e2d\u6587\u6b63\u6587\u4e0d\u5e94\u88ab\u622a\u65ad\uff0c\u4e5f\u4e0d\u5e94\u628a\u9875\u9762\u6491\u51fa\u6a2a\u5411\u6eda\u52a8\u6761\u3002'}</p>
      <div className="mv-lesson-ui-demo-formula">
        <Formula tex={formulaTex.wave}/>
      </div>
      <p>{'\u516c\u5f0f\u6cbf\u7528\u5de5\u7a0b\u5df2\u6709\u7684 KaTeX \u6e32\u67d3\u3002\u516c\u5f0f\u8fc7\u5bbd\u65f6\u53ea\u5728\u8bb2\u89e3\u69fd\u5185\u5c40\u90e8\u6a2a\u5411\u6eda\u52a8\uff0c\u4e0d\u5f71\u54cd\u6574\u9875\u5e03\u5c40\uff0c\u4e5f\u4e0d\u6539\u52a8 KaTeX \u5185\u90e8\u56fe\u5f62\u5c3a\u5bf8\u3002'}</p>
      <ul>
        <li>{'\u7b2c\u4e00\u884c\uff1a\u8bf4\u660e\u8be5\u6b65\u9aa4\u8981\u89c2\u5bdf\u4ec0\u4e48\u3002'}</li>
        <li>{'\u7b2c\u4e8c\u884c\uff1a\u8bf4\u660e\u6539\u53d8\u53c2\u6570\u540e\u5e94\u5f53\u770b\u5230\u4ec0\u4e48\u53d8\u5316\u3002'}</li>
        <li>{'\u7b2c\u4e09\u884c\uff1a\u8bf4\u660e\u8fd9\u4e00\u7ed3\u8bba\u7684\u9002\u7528\u8303\u56f4\u4e0e\u8fb9\u754c\u3002'}</li>
      </ul>
    </div>
  );
}

export default function Preview({topics}:{topics:readonly TopicSummary[]}){
  const topic=topics.find(item=>item.id==='te')??topics[0];
  const [playing,setPlaying]=useState(false);
  const [log,setLog]=useState<readonly string[]>([]);
  const record=(text:string)=>setLog(previous=>[text,...previous].slice(0,5));
  return (
    <>
      <LessonLayout
        title={topic?topic.title+LONG_TITLE_SUFFIX:'\u8bfe\u7a0b\u5e03\u5c40\u9884\u89c8\u5360\u4f4d'+LONG_TITLE_SUFFIX}
        summary={topic?topic.description+PLACEHOLDER_NOTE:PLACEHOLDER_NOTE}
        onBack={()=>record('onBack() \u5df2\u8c03\u7528\uff0c\u56de\u9000\u52a8\u4f5c\u7531\u5bbf\u4e3b\u51b3\u5b9a')}
        figure={<SampleFigure/>}
        controls={<SampleControls/>}
        explanation={<SampleExplanation/>}
        playing={playing}
        onPlayingChange={next=>{setPlaying(next);record(`onPlayingChange(${next}) \u5df2\u8c03\u7528\uff0c\u64ad\u653e\u72b6\u6001\u4ecd\u7531\u5bbf\u4e3b\u6301\u6709`);}}
      />
      <div className="mv-lesson-ui-demo-console">
        <h2>{'\u9884\u89c8\u56de\u8c03\u8bb0\u5f55\uff08\u4ec5\u5f00\u53d1\u9884\u89c8\u5165\u53e3\u53ef\u89c1\uff09'}</h2>
        <ol>
          {log.map((item,index)=><li key={`${index}-${item}`}>{item}</li>)}
        </ol>
      </div>
    </>
  );
}
