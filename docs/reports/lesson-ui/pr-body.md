# W2 课程纯布局（lesson-ui）

## 目标
课程页的纯布局皮肤：整理图形槽、参数槽、讲解槽；桌面并排、手机纵排且参数可内联收起（原生 details/summary）；不接管物理、评分、路由与移动端复杂状态。

## 基线与依赖说明
- 基线：collaboration-v2（4fc8b7af8bdde74c6755c47c146c72b5c39f25a7）。
- main 尚未合入 v2 规则，因此本 PR 会携带公共基线提交 4fc8b7a（docs 规则更新），该公共提交不是本任务成果，请保持本 PR 未合并，待集成方先处理公共基线 PR 或合入 codex/integration 后再审。
- 本任务自身改动仅 4 个源码文件与 docs/reports/lesson-ui 报告。

## 改动
- src/features/lesson-ui/index.tsx：LessonLayout 默认导出，严格使用 LessonLayoutProps；仅持有参数面板展开一个局部显示状态；playing 受控，点击仅调用 onPlayingChange；返回仅调用 onBack。
- src/features/lesson-ui/lesson-ui.css：全部样式以 .mv-lesson-ui 限定；900px 以上双列，以下单列；图形槽 svg/img/canvas 直接子元素 max-width:100% 不裁切；讲解槽局部横向滚动；focus-visible 焦点环；prefers-reduced-motion 兜底。
- src/features/lesson-ui/Preview.tsx + preview.css：独立预览（占位内容，明确标注非真实物理实验），含超长标题/标签用例与回调记录区。

## 接口
contracts v1.0：LessonLayoutProps。无接口变更建议。

## 独立预览
npm run dev -- --port 5182，访问 /collab-preview.html?module=lesson-ui。

## 验证（真实命令与结果）
- npm test：21 passed
- npm run build：通过（tsc --noEmit + vite build）
- git diff --check：通过
- node scripts/check-boundaries.mjs lesson-ui：PASS（12 个改动路径均在白名单）
- 浏览器实测：Chrome/155.0.8059.86 headless + CDP；390/698/1024 三宽度；参数折叠、播放回调、返回回调、键盘 Enter 均已实测
- 截图与指标：docs/reports/lesson-ui/w2-*.png、metrics.json

## 已知限制
- 未接入主站：接线（Lessons.tsx 等公共入口）由 Codex 负责。
- 实体手机与真机 WebView 未验证；断网未实测。
- 本机无 gh CLI 时，PR 需由用户经浏览器创建。

## 不自动合并
按 GITHUB.md，本 PR 仅供审阅，不自动合 main。
