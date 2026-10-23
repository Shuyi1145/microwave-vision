# 并行接口约定 v1.0
这些类型已实际创建于 src/collaboration/contracts.ts，不是现有远端API。不存在服务端接口，不得自行臆造URL。

门户：src/features/portal/index.tsx 默认导出 PortalFeature，props为PortalProps。view取landing/hub/catalog；topics由外部传入；所有导航调用onNavigate，不在组件中操作全局location。封面只允许一个进入网站操作；workbench四模块；catalog六课程，保留既定路由。

课程UI：src/features/lesson-ui/index.tsx 默认导出 LessonLayout，props为LessonLayoutProps。图形、参数、正文都通过ReactNode槽传入；playing和onPlayingChange由宿主管理。模块只管理面板展开等局部显示状态，不引入物理计时器，不重算场量，不复制课程算法。不根据图形DOM反推参数。

练习：src/features/practice/index.tsx 默认导出 PracticeFeature，props为PracticeProps。一次首次答题结果生成PracticeCompletion并调用一次onComplete；允许回顾与重试，但不得重复计分或重复保存。同一完成结果id稳定。具体错因、问题数据由模块内部维护；不直接写localStorage，不更改已有mw-records-v1结构。集成负责人将result.score/topic接到原save函数，必要时另行设计迁移。

所有任务均实现 Preview.tsx 默认导出预览组件，可接收 {topics}。它独立构造本模块需要的回调和样例状态，不能import其他features目录。预览页面属于开发工具，测试文字/按钮只出现在该入口，不能泄漏到产品界面。入口通过import.meta.glob发现Preview，main和安卓打包入口不变。

公共视觉变量在 src/collaboration/tokens.css；样式需以mv-portal、mv-lesson-ui、mv-practice各自根类限定。使用var(--mv-accent,#168d83)等fallback，不依赖其他模块CSS加载顺序。不能写不加前缀的body、button、svg、canvas、h1等全局规则，不能改KaTeX内部SVG尺寸。

允许只读：src/physics.ts、coursePhysics.ts、fieldMaps.ts、Formula.tsx、courseContent.ts、collaboration目录。禁止跨feature互相import。允许React、现有Motion、KaTeX；新增依赖由集成方统一处理package.json与lock。先用现有依赖或本地SVG，不因等图标库阻塞。

接口变更：在自己docs/reports/模块/提出变更与兼容建议，按v1完成当前可行部分，不改公共contracts.ts。集成方统一出v1.1后，各分支通过合并main获取；公共变更不能成为其他任务无故停工的理由。
