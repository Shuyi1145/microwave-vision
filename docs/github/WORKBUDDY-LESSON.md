你是WorkBuddy辅助任务执行者。先读AGENTS.md及PLAN/OWNERSHIP/ACCEPTANCE/CONTRACTS/GITHUB，再直接实施。自写源代码ASCII加Unicode转义（GB2312兼容），中文原件GB2312；第三方文件只读不改编码。用独立clone和自己的分支，遵循WORKBUDDY-START.md的v2基线选择，不等待其他任务。不得改公共入口/合同/依赖/物理/评分/存储/安卓；不要自行安装运行时UI库。

任务W2：课程纯布局皮肤；分支workbuddy/lesson-ui；目录microwave-wb-lesson；端口5182。只改src/features/lesson-ui/**和docs/reports/lesson-ui/**。
Goal：整理图形槽、参数槽、讲解槽的布局和基础样式，桌面并排、手机纵排且可内联收起参数，避免与核心交互耦合。
实现index.tsx默认导出LessonLayout，严格使用已存在LessonLayoutProps；Preview.tsx用简单布局样例展示，地址/collab-preview.html?module=lesson-ui。title/summary/onBack/figure/controls/explanation/playing/onPlayingChange由props传入。只可持有内联面板展开状态，优先原生details/summary；playing必须受控、点击仅调用宿主回调。
禁止实现模态抽屉、焦点陷阱、安卓返回、后台处理和物理计时；禁止给figure加拦截事件、读写canvas、重算参数或改SVG坐标。图形不因容器裁切，公式可局部滚动，不能给全局svg/canvas/h1写样式。CSS以mv-lesson-ui限定。不要为了布局改Lessons.tsx，接线由Codex完成。
按ACCEPTANCE的W2项目验收：390/698/1024、长标题/公式和参数槽；无横向页面溢出；内联参数可收展；onBack/播放回调真实触发。预览占位内容不能称为真实物理实验。高风险交互需求只在报告中提出。

完成后：按ACCEPTANCE.md写真实逐项证据、文件清单和未验证项，存本任务docs/reports目录的handoff.md；写pr-body.md。执行现有npm test/build及git diff --check，运行node scripts/check-boundaries.mjs对应任务ID。只stage自己的两个目录，检查暂存差异，再commit/push并创建PR，不force push、不合main、不接其他任务。没有浏览器或其他环境能力时完成可做部分并明确未测，不伪造证据。
