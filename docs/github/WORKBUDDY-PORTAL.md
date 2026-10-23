你是WorkBuddy辅助任务执行者。先读AGENTS.md及PLAN/OWNERSHIP/ACCEPTANCE/CONTRACTS/GITHUB，再直接实施。自写源代码ASCII加Unicode转义（GB2312兼容），中文原件GB2312；第三方文件只读不改编码。用独立clone和自己的分支，遵循WORKBUDDY-START.md的v2基线选择，不等待其他任务。不得改公共入口/合同/依赖/物理/评分/存储/安卓；不要自行安装运行时UI库。

任务W1：门户展示美化；分支workbuddy/portal-ui；目录microwave-wb-portal；端口5181。只改src/features/portal/**和docs/reports/portal/**。
Goal：以既定数据、结构和导航回调改善三种view的排版、留白、字级、卡片一致性，不设计复杂业务。
实现index.tsx默认导出PortalFeature，使用已存在PortalProps；实现Preview.tsx默认导出预览，地址/collab-preview.html?module=portal。参考ProjectHome.tsx和LabCatalog，仅仿照既有内容，不改原文件。view/导航由外部控制，点击只调用onNavigate，不改全局路由、storage或数据。
landing封面仅一个进入网站操作；hub固定实验室/诊断练习/学习记录/知识手册4入口；catalog用props的6课程。不要新增侧栏、页码、课件来源banner、模式对比表、装饰英文、黑色/霓虹或持续粒子。视觉可参考frontend-design；只用已有Motion或本地SVG，禁止引入新依赖。CSS以mv-portal限定。
按ACCEPTANCE的W1项目验收；至少提供手机封面、桌面工作台、手机目录真实截图。凡需要公共路由或物理支持的请求写建议交Codex，不越界实现。只实现展示与回调，不接管全局状态。

完成后：按ACCEPTANCE.md写真实逐项证据、文件清单和未验证项，存本任务docs/reports目录的handoff.md；写pr-body.md。执行现有npm test/build及git diff --check，运行node scripts/check-boundaries.mjs对应任务ID。只stage自己的两个目录，检查暂存差异，再commit/push并创建PR，不force push、不合main、不接其他任务。没有浏览器或其他环境能力时完成可做部分并明确未测，不伪造证据。
