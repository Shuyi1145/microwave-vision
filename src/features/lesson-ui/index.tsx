import {useState} from 'react';
import type {LessonLayoutProps} from '../../collaboration/contracts';
import './lesson-ui.css';

// Panel visibility is the only state this module owns. Animation playback,
// parameters and figure content all stay with the host.
const WIDE_PANEL_QUERY='(min-width: 900px)';

function defaultPanelOpen():boolean{
  if(typeof window==='undefined'||typeof window.matchMedia!=='function')return true;
  return window.matchMedia(WIDE_PANEL_QUERY).matches;
}

export default function LessonLayout({
  title,
  summary,
  onBack,
  figure,
  controls,
  explanation,
  playing,
  onPlayingChange
}:LessonLayoutProps){
  const [panelOpen,setPanelOpen]=useState<boolean>(defaultPanelOpen);
  return (
    <div className="mv-lesson-ui">
      <div className="mv-lesson-ui__inner">
        <div className="mv-lesson-ui__bar">
          <button type="button" className="mv-lesson-ui__back" onClick={onBack}>{'\u8fd4\u56de\u8bfe\u7a0b\u76ee\u5f55'}</button>
          <span className="mv-lesson-ui__state" data-playing={playing}>{playing?'\u6f14\u793a\u8fdb\u884c\u4e2d':'\u6f14\u793a\u5df2\u6682\u505c'}</span>
          <button
            type="button"
            className="mv-lesson-ui__play"
            aria-pressed={playing}
            onClick={()=>onPlayingChange(!playing)}
          >{playing?'\u6682\u505c\u6f14\u793a':'\u64ad\u653e\u6f14\u793a'}</button>
        </div>
        <header className="mv-lesson-ui__heading">
          <h1 className="mv-lesson-ui__title">{title}</h1>
          <p className="mv-lesson-ui__summary">{summary}</p>
        </header>
        <div className="mv-lesson-ui__grid">
          <div className="mv-lesson-ui__figure">{figure}</div>
          <details
            className="mv-lesson-ui__panel"
            open={panelOpen}
            onToggle={event=>setPanelOpen(event.currentTarget.open)}
          >
            <summary className="mv-lesson-ui__panel-title">{'\u53c2\u6570'}</summary>
            <div className="mv-lesson-ui__panel-body">{controls}</div>
          </details>
        </div>
        <section className="mv-lesson-ui__explanation" aria-label={'\u5206\u6b65\u8bb2\u89e3'}>{explanation}</section>
      </div>
    </div>
  );
}
