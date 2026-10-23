你是《微波视界》的独立模块工程师，请直接实施并交付，不停留在方案。
先读取根AGENTS.md（GB2312）和docs/collaboration/CONTRACTS.md、GITHUB.md。PowerShell中可用：python -c "from pathlib import Path;print(Path('AGENTS.md').read_bytes().decode('gb2312'))"。若终端输出乱码，可写UTF-8临时副本供工具阅读，但不得把源文件误解码覆盖。新源代码使用ASCII加Unicode转义/JSX字符引用，属于GB2312兼容子集；自写中文文档GB2312。第三方Skill原始文件保持原编码只读。
先确认你位于独立克隆和正确任务分支、工作区无他人修改。不要在Codex主工作区D:\GPTProject\数媒直接开工。用户已授权该任务实现、测试、提交并推送自己的任务分支；不授权force push、公开私有仓库、自动合并main、上传密钥或改其他任务文件。认证失败保留本地提交并说明，不索要明文令牌。
使用docs/skills/frontend-design/SKILL.md指导设计、docs/skills/web-design-guidelines/SKILL.md审查交互。项目既定浅色中文、物理准确和无远端资源优先于Skill通用建议。不等待其他模块，不请求尚不存在的后端API。新增依赖、公共合同和入口改动写入交付报告，由Codex集成；不得自行改package.json/lock/共享文件。
至少先给简短设计说明，再实现，再用浏览器截图审查；没有浏览器能力时写明未验证，但仍完成不依赖它的代码和测试。截图要真实，不使用合成界面替代运行结果。

你的任务W2：课程展示容器和参数操作面板。分支workbuddy/lesson-ui，独立目录D:\GPTProject\microwave-wb-lesson；端口5182。可改src/features/lesson-ui/**、docs/reports/lesson-ui/**。
Goal：让手机上的图形观察和参数调节接近同一操作区域，减少长页来回滚动；桌面保持图形和控制并排的清晰布局。
实现默认导出LessonLayout，采用LessonLayoutProps。title/summary/onBack/figure/controls/explanation/playing/onPlayingChange的接口已固定。图形、参数和讲解都是宿主传入槽；你只设计布局、局部面板展开和操作反馈。不能重算波形、对SVG加新坐标变换、改变canvas绘制尺寸协议、拦截图形指针事件、重写播放计时器。参数值由controls槽里的宿主组件管理。播放按钮仅调用onPlayingChange(!playing)，不创建第二个playing状态。
Preview构造可交互的样例controls和简单占位figure，明确这是布局样例；无需等真实课程接入，也不能宣称样例为物理仿真。展示控制值变化回调和playing状态。URL /collab-preview.html?module=lesson-ui。
交互要求：窄屏有明显“调整参数”入口，面板可展开/关闭，图形不被永久遮挡；宽屏图形/参数并排。优先可访问的内联折叠面板或原生dialog；若使用模态抽屉，必须处理焦点进入/返回、Escape、背景不可操作与旧WebView兼容。不要添加使旧版Android83直接崩溃的新浏览器API。为图形保留完整可操作空间，容器不加touch-action:none到整页，只保留图形自身规则。说明区域可展开，但不得隐藏必要单位与物理边界。
验收：390/698/1024截图，桌面并排手机收展；播放回调受控；onBack可用；长公式可局部滚动不撑宽页面；KaTeX SVG不被全局样式缩放；键盘焦点可见且无锁死；减少动态效果可用；CSS限定mv-lesson-ui；无外部请求、无新共享依赖；node scripts/check-boundaries.mjs lesson-ui通过。报告给集成方最小接线示例：把现有真实图形/参数/说明传入组件的方式，不直接改Lessons.tsx。

交付必须包含：你的目录中index.tsx与Preview.tsx；docs/reports/对应模块/handoff.md（Goal、验收逐条结果、截图说明、文件列表、公共改动建议、未验证项）；pr-body.md。执行npm.cmd test、npm.cmd run build、git diff --check、边界检查。只stage自己两个目录，检查后commit，再git push -u origin 自己分支。按GITHUB.md创建PR或给出创建链接、真实SHA。完成后停止，不去接手其他模块，不自动合并main。不要说“已完成全部联合”，只报告自己模块。若遇问题，先解决本模块能解决的内容，确实需要外部信息时只问具体缺项。
