/// <reference types="vite/client" />
import {StrictMode,Suspense,lazy,type ComponentType} from 'react';
import {createRoot} from 'react-dom/client';
import {AnimationProvider} from '../Animations';
import {topics} from './fixtures';
import './tokens.css';
const modules=import.meta.glob<{default:ComponentType<{topics:typeof topics}>}>('../features/*/Preview.tsx');
const name=new URLSearchParams(location.search).get('module')??'portal';
const loader=modules[`../features/${name}/Preview.tsx`];
const Preview=loader?lazy(loader):null;
createRoot(document.getElementById('collab-root')!).render(<StrictMode><AnimationProvider><div className="mv-preview"><nav aria-label="&#24320;&#21457;&#39044;&#35272;&#20999;&#25442;">{['portal','lesson-ui','practice'].map(id=><a key={id} href={`?module=${id}`}>{id}</a>)}</nav>{Preview?<Suspense fallback={<p>{'\u9884\u89c8\u52a0\u8f7d\u4e2d\u2026\u2026'}</p>}><Preview topics={topics}/></Suspense>:<section><h1>&#20219;&#21153;&#39044;&#35272;&#20837;&#21475;&#24050;&#23601;&#32490;</h1><p>&#35813;&#27169;&#22359;&#23578;&#26410;&#23454;&#29616;&#65292;&#19981;&#24433;&#21709;&#29616;&#26377;&#32593;&#31449;&#21644;&#20854;&#20182;&#20219;&#21153;&#12290;</p><code>{`src/features/${name}/Preview.tsx`}</code></section>}</div></AnimationProvider></StrictMode>);
