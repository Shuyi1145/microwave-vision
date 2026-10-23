你是《微波视界》的独立模块工程师，请直接实施并交付，不停留在方案。
先读取根AGENTS.md（GB2312）和docs/collaboration/CONTRACTS.md、GITHUB.md。PowerShell中可用：python -c "from pathlib import Path;print(Path('AGENTS.md').read_bytes().decode('gb2312'))"。若终端输出乱码，可写UTF-8临时副本供工具阅读，但不得把源文件误解码覆盖。新源代码使用ASCII加Unicode转义/JSX字符引用，属于GB2312兼容子集；自写中文文档GB2312。第三方Skill原始文件保持原编码只读。
先确认你位于独立克隆和正确任务分支、工作区无他人修改。不要在Codex主工作区D:\GPTProject\数媒直接开工。用户已授权该任务实现、测试、提交并推送自己的任务分支；不授权force push、公开私有仓库、自动合并main、上传密钥或改其他任务文件。认证失败保留本地提交并说明，不索要明文令牌。
使用docs/skills/frontend-design/SKILL.md指导设计、docs/skills/web-design-guidelines/SKILL.md审查交互。项目既定浅色中文、物理准确和无远端资源优先于Skill通用建议。不等待其他模块，不请求尚不存在的后端API。新增依赖、公共合同和入口改动写入交付报告，由Codex集成；不得自行改package.json/lock/共享文件。
至少先给简短设计说明，再实现，再用浏览器截图审查；没有浏览器能力时写明未验证，但仍完成不依赖它的代码和测试。截图要真实，不使用合成界面替代运行结果。

你的任务W1：门户与选课视觉。分支workbuddy/portal-ui，独立目录D:\GPTProject\microwave-wb-portal；端口5181。可改src/features/portal/**、docs/reports/portal/**，其他文件只读。
Goal：将当前入口提升为清晰、有微波科学辨识度的浅色中文学习门户，保留既有信息架构。
实际入口参考src/ProjectHome.tsx、Lessons.tsx中的LabCatalog；不要修改或复制其路由Hook。组件使用PortalProps，view分别显示封面/工作台/目录，topics从props取。实现默认导出PortalFeature。Preview默认导出组件，提供开发专用view切换和回调结果，启动URL /collab-preview.html?module=portal。
设计要求：封面只有“进入网站”操作，品牌不再添加第二导航按钮；工作台固定实验室、诊断练习、学习记录、知识手册四入口；实验室有6课程。不要在目录放PDF来源、页码、模式对照或教学正文。不出现装饰英文，不用黑背景、大片霓虹、鼠标跟随粒子或持续转动。用少量圆图/波形科学构图形成记忆点，不把编号当课程顺序。统一文字层级，正文可读，触控目标至少44px，手机不能靠hover发现操作。可用现有Motion和本地SVG，禁止远端字体/图片和直接引入整套新UI依赖。
验收清单：
1. 预览三种view，导航回调的路由逐个准确；onNavigate不触发时组件不自行修改location。
2. 390/698/1024宽度均无横向溢出，长中文标题不遮挡图标/按钮，封面进入操作在合理位置可见。
3. 键盘Tab焦点可见、Enter激活，减少动态效果时没有装饰位移；没有自动播放干扰阅读。
4. 使用mv-portal根类限定CSS；没有改任何物理图形或其他模块。
5. 截图至少封面手机、工作台桌面、目录手机三张，存docs/reports/portal/；明确预览和产品入口尚待集成。
6. node scripts/check-boundaries.mjs portal 通过。测试新增以导航回调/入口完整性为主，不写仅复刻实现的脆弱测试。

交付必须包含：你的目录中index.tsx与Preview.tsx；docs/reports/对应模块/handoff.md（Goal、验收逐条结果、截图说明、文件列表、公共改动建议、未验证项）；pr-body.md。执行npm.cmd test、npm.cmd run build、git diff --check、边界检查。只stage自己两个目录，检查后commit，再git push -u origin 自己分支。按GITHUB.md创建PR或给出创建链接、真实SHA。完成后停止，不去接手其他模块，不自动合并main。不要说“已完成全部联合”，只报告自己模块。若遇问题，先解决本模块能解决的内容，确实需要外部信息时只问具体缺项。
