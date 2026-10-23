# W2 课程纯布局交付报告（handoff）

## 1. 基本信息
- 任务ID：W2 课程纯布局（lesson-ui）
- Goal：整理图形槽、参数槽、讲解槽的布局和基础样式；桌面并排、手机纵排且参数可内联收起；避免与核心交互耦合。
- 基线SHA：4fc8b7af8bdde74c6755c47c146c72b5c39f25a7（标签 collaboration-v2；origin/main=29643c17 尚未包含 v2 规则，按 WORKBUDDY-START 从标签建分支）
- 任务分支：workbuddy/lesson-ui
- 接口合同版本：1.0（src/collaboration/contracts.ts，LessonLayoutProps，只读未改）
- 独立预览：http://127.0.0.1:5182/collab-preview.html?module=lesson-ui

## 2. 修改文件清单（全部为新增，均在白名单内）
- src/features/lesson-ui/index.tsx（LessonLayout 默认导出）
- src/features/lesson-ui/lesson-ui.css（mv-lesson-ui 限定样式）
- src/features/lesson-ui/Preview.tsx（默认导出，收 {topics}）
- src/features/lesson-ui/preview.css（仅开发预览使用）
- docs/reports/lesson-ui/handoff.md、pr-body.md、metrics.json
- docs/reports/lesson-ui/w2-390-default.png、w2-390-params-expanded.png、w2-390-keyboard-play.png、w2-698-default.png、w2-1024-default.png、w2-1024-playing.png、w2-1024-back-callback.png

越界情况：无。node scripts/check-boundaries.mjs lesson-ui 通过（自动基线与显式 SHA 均 PASS，12 个改动路径均在白名单）。
公共改动：无。未改 contracts.ts、Lessons.tsx、main.tsx、ProjectHome.tsx、依赖与锁文件、物理与评分、localStorage、安卓、根 AGENTS 及其他任务目录。
接入状态：未接入主站。本模块仅提供 LessonLayout 组件与开发预览；接线（Lessons.tsx 等公共入口）由 Codex 负责。

## 3. 验收逐项证据
状态定义沿用 ACCEPTANCE.md：通过、失败、未验证、不适用。
测试环境：Windows 11；Chrome/155.0.8059.86（headless=new，经 CDP 真实点击与键盘事件）；vite dev 端口 5182；视口 390x844、698x900、1024x800，deviceScaleFactor=1。

| 验收项 | 状态 | 证据 |
| --- | --- | --- |
| 真实内容槽可显示 | 通过 | figure/controls/explanation 三槽以真实 ReactNode 渲染，见 w2-1024-default.png |
| 桌面/手机布局 | 通过 | 1024px 双列（grid-template-columns=615.328px 307.656px）；698 与 390 单列。metrics.json |
| 内联参数展开/关闭 | 通过 | 原生 details/summary；390/698 默认收起，点击 summary 展开，panelOpen 由 false 变 true，见 w2-390-params-expanded.png |
| playing 只调宿主回调 | 通过 | 模块不持有播放状态；点击仅 onPlayingChange(!playing)；预览日志记录 onPlayingChange(true)，见 w2-1024-playing.png |
| onBack 回调真实触发 | 通过 | 点击返回按钮日志记录 onBack()，见 w2-1024-back-callback.png |
| 不复制物理/状态 | 通过 | 模块内部仅 panelOpen 一个局部显示状态；无物理计时器、无参数重算、无画布读写 |
| 公式局部滚动、不碰 KaTeX SVG | 通过 | 讲解槽 overflow-x:auto 与 .katex-display 局部滚动；explanationScroll=true；未写 KaTeX 内部 SVG 尺寸 |
| 键盘可操作 | 通过 | 焦点移至播放按钮按 Enter，aria-pressed 由 false 变 true，见 w2-390-keyboard-play.png |
| 390/698/1024 无横向页面溢出 | 通过 | 各宽度 documentElement.scrollWidth 均等于 clientWidth（390/683/1009），metrics.json |
| 长标题/超长参数标签 | 通过 | 预览故意使用超长中文标题与参数标签，均正常换行无溢出 |
| 图形不被容器裁切 | 通过 | svg 原始宽 640 按容器缩放为 577/605/320，height:auto 保持比例，未裁切 |
| 中文浅色 | 通过 | 浅色背景 #f4f7fa、白色卡片、主题色 #168d83，全部中文文案 |

## 4. 命令与真实结果
- npm test：3 个测试文件 21 项全部通过（physics 8、coursePhysics 8、fieldMaps 5）
- npm run build：tsc --noEmit 通过，vite build 成功（约 14 秒）
- git diff --check：无输出（通过）
- node scripts/check-boundaries.mjs lesson-ui：PASS lesson-ui: 12 changed paths stay inside task ownership.
- 环境说明：C 盘剩余空间不足导致 npm ci 首次失败（ENOSPC），改用 E 盘缓存目录安装成功；依赖安装未改 package.json 与 package-lock.json。

## 5. 未验证项与限制
- 实体手机与真机 WebView：未验证（本环境无设备）。
- 断网/离线：未做实测；预览只用本地依赖与本地 KaTeX 字体，不请求远程资源，理论上可离线，但如实标注未验证。
- 减少动态效果偏好：CSS 已加 prefers-reduced-motion 兜底（关闭过场动画），未在系统开启该偏好的真实环境实测。
- 模态抽屉、焦点陷阱、系统返回、后台生命周期：按 W2 边界不实现，属 Codex。建议：若手机端后续需要抽屉式参数面板，由 Codex 在接线时统一处理。

## 6. 风险与回退
- 风险：宿主传入的 figure 若是超宽表格等无固定比例的块级内容，仅靠槽位规则无法保证不溢出，需要宿主内容自身配合；本模块已对 svg/img/canvas 直接子元素做 max-width:100% 处理。
- 回退：删除 workbuddy/lesson-ui 分支即可，不影响 main 与其他任务目录。

## 7. 提交与 PR
- 提交SHA：提交后补充
- PR 链接：推送后补充（若本机无 gh 且浏览器需登录，则给出 Compare 地址）
