# W1门户集成审查（Codex，2026-10-23）

对象：workbuddy/portal-ui，645154c、ce6a69e、047cb0d；PR #4。18个路径全部位于src/features/portal与docs/reports/portal白名单。源码只展示landing/hub/catalog，接收topics和onNavigate，不持有路由、物理、评分或存储。已保留其原提交历史合入codex/integration。

结论：基础布局可用；独立预览证据不能代替主站、生产APK及原生设备验收。Codex经审查接管必要的内部修复，未改W1原始报告或其远端分支。

## 界面审查记录

依据web-design-guidelines技能及其本次获取的规则：https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md 。当前文件行号对应本次集成实现；以下均已处理。

src/features/portal/index.tsx:57 - 封面导航恢复原生链接，常规点击仍通过onNavigate。
src/features/portal/index.tsx:72 - 返回链接保留href、修饰键和中键默认行为，统一“返回学习工作台”。
src/features/portal/index.tsx:90 - 工作台卡片用原生链接，保留整卡可点击与键盘焦点。
src/features/portal/index.tsx:99 - 课程卡片同样恢复链接语义，不直接操作location。
src/features/portal/portal.css - 入口/返回触控高度至少44px；局部可见焦点、页头高度、段落间距修正，避免旧全局规则影响。

封面仍只有一个进入网站操作；不额外增加与单入口要求冲突的可交互导航。原三项技术标语没有恢复，页脚仅保留简短品牌文字。没有增加账号、云端请求或物理动画。

## 主站接线

ProjectHome与LearningHub传入对应view；Lessons.LabCatalog传入catalog及现有六主题。宿主维护原哈希路由、标题和路由焦点。旧重复门户渲染移除，learningEntries仍用于宿主路由识别。没有跨feature依赖。

## 验证

- web.json：390/698/1024三种宽度，单入口键盘Tab/Enter、四个工作台入口、六课程、史密斯路径、原生中键新标签页均通过；全站36组布局无溢出/KaTeX错误。另包含W2、评分、保存重试、预览及焦点检查，共63项均通过。
- portal-*.png为主站生产资源实测截图，不沿用W1开发预览截图冒充当前结果。
- 最终安卓包1.0.4/versionCode5；设备报告中增加飞行模式下封面→工作台→课程目录→TE课程的真实导航链路。
- 包装证据artifact-manifest.json逐项比对70个生产资源与APK打包内容一致，证书保持原调试签名。

W2/W3/W4同样保留原报告，以各集成审查和RELEASE.md作为当前状态；四个辅助PR均不自动合main。
