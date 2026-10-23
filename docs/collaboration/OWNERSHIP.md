# 职责与独立交付边界 v2（替代旧分工）
不是按模型强弱笼统分配，而是按错误后果和验证成本分配。复杂状态、物理、记录和系统边界归Codex；重复排版和证据采集归WorkBuddy。

Codex：codex/integration。拥有src/features/practice、src/main.tsx、ProjectHome.tsx、Lessons.tsx、VisualLessons.tsx、MobileApp.ts、物理模型、公共合同/预览/依赖/样式、scripts、android、CI及根文档。优先处理核心正确性与完赛风险，不无理由重写正确模型。只读WorkBuddy专属目录，集成时优先通过适配接线；确需改其内部实现，应在验收后明确接管并记录。

W1 门户展示：workbuddy/portal-ui；独立克隆microwave-wb-portal；端口5181。只改src/features/portal/**和docs/reports/portal/**。只做既定三种view的展示与导航回调，不拥有路由、存储、物理状态。
W2 课程纯布局：workbuddy/lesson-ui；独立克隆microwave-wb-lesson；端口5182。只改src/features/lesson-ui/**和docs/reports/lesson-ui/**。槽布局、间距、字号、响应式；手机参数先采用可访问的内联折叠，不实现模态抽屉、焦点陷阱、系统返回或生命周期。
W3 文案清点：workbuddy/editorial；独立克隆microwave-wb-editorial。不启动开发服务也能做。只改docs/editorial/**和docs/reports/editorial/**。清点界面标签、术语、重复说明和错字，提出带原文件位置的建议，不改应用文案数据、公式、题库和参考课件。
W4 回归证据：workbuddy/qa；独立克隆microwave-wb-qa；端口5184。只改docs/reports/qa/**。在当前基线上运行既有检查、操作截图、录复现路径；不修应用、不改测试期望、不加依赖。没有浏览器/手机时列未验证，不伪造截图。

原workbuddy/practice任务已撤回，src/features/practice归Codex；已有旧分支不要删除或覆盖，保留提交并报告，由Codex评估复用。当前检查远端只有main和codex/integration，未发现已推送WorkBuddy任务分支；不能据此断言其他机器没有本地工作。
所有WorkBuddy任务只依赖已提交基线，不依赖其他任务成果。未完成不阻止Codex使用原界面交付。专属目录不得交叉import；公共合同只读。变更建议写各自报告，不同时编辑根AGENTS和package-lock。
