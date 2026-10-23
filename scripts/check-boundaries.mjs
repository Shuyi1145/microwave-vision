import {execFileSync} from 'node:child_process';
import {readdirSync,readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const module=process.argv[2];
if(!['portal','lesson-ui','practice'].includes(module))throw Error('Usage: node scripts/check-boundaries.mjs portal|lesson-ui|practice [base-ref]');
const base=process.argv[3]??process.env.BASE_REF??'origin/main';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const mergeBase=git('merge-base',base,'HEAD');
const files=new Set([...git('diff','--name-only',mergeBase).split('\n'),...git('ls-files','--others','--exclude-standard').split('\n')].filter(Boolean));
const allowed=[`src/features/${module}/`,`docs/reports/${module}/`];
const violations=[...files].filter(file=>!allowed.some(prefix=>file.startsWith(prefix)));
const root=process.cwd(),taskRoot=path.resolve(root,`src/features/${module}`);
const shared=['physics','coursePhysics','fieldMaps','Formula','courseContent'];
const within=(file,dir)=>file===dir||file.startsWith(dir+path.sep);
function scan(dir){if(!existsSync(dir))return;for(const entry of readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){scan(file);continue;}if(!/\.[cm]?[jt]sx?$/.test(file))continue;const ast=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);function visit(node){let spec;if((ts.isImportDeclaration(node)||ts.isExportDeclaration(node))&&node.moduleSpecifier&&ts.isStringLiteral(node.moduleSpecifier))spec=node.moduleSpecifier.text;if(ts.isCallExpression(node)&&node.expression.kind===ts.SyntaxKind.ImportKeyword&&node.arguments[0]&&ts.isStringLiteral(node.arguments[0]))spec=node.arguments[0].text;if(spec){if(spec.startsWith('.')){const target=path.resolve(path.dirname(file),spec);const ok=within(target,taskRoot)||within(target,path.resolve(root,'src/collaboration'))||shared.some(name=>target===path.resolve(root,'src',name)||target===path.resolve(root,'src',name+'.ts')||target===path.resolve(root,'src',name+'.tsx'));if(!ok)violations.push(`${path.relative(root,file)} imports outside contract: ${spec}`);}else if(!/^(react($|\/)|react-dom($|\/)|motion($|\/)|katex($|\/)|vitest$)/.test(spec))violations.push(`${path.relative(root,file)} imports unapproved dependency: ${spec}`);}ts.forEachChild(node,visit);}visit(ast);}}
scan(taskRoot);
if(violations.length){console.error('Files outside task ownership:\n'+violations.join('\n'));process.exit(1);}console.log(`PASS ${module}: ${files.size} changed paths stay inside task ownership.`);
