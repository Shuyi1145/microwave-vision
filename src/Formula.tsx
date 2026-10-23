import {memo,useMemo} from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const formulaTex = {
 normalization: String.raw`z=\frac{Z_L}{Z_0}=r+jx`,
 reflection: String.raw`\Gamma_L=\frac{z-1}{z+1}`,
 vswr: String.raw`\mathrm{VSWR}=\dfrac{1+|\Gamma|}{1-|\Gamma|}`,
 circle: String.raw`\left(u-\frac{r}{1+r}\right)^2+v^2=\frac{1}{(1+r)^2}`,
 movement: String.raw`\Gamma(l)=\Gamma_L e^{-j4\pi\frac{l}{\lambda}}`,
 wave: String.raw`V(s,t)=\operatorname{Re}\!\left\{\left[e^{j\beta s}+\Gamma_L e^{-j\beta s}\right]e^{j\omega t}\right\}`
};

// Formulas are authored locally; never treat user input as trusted markup.
export const Formula=memo(function Formula({tex}:{tex:string}){
 const markup=useMemo(()=>katex.renderToString(tex,{throwOnError:true,trust:false,output:'htmlAndMathml'}),[tex]);
 return <span className="math-formula" dangerouslySetInnerHTML={{__html:markup}}/>;
});
