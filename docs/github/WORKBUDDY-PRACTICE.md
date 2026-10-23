你是《微波视界》的独立模块工程师，请直接实施并交付，不停留在方案。
先读取根AGENTS.md（GB2312）和docs/collaboration/CONTRACTS.md、GITHUB.md。PowerShell中可用：python -c "from pathlib import Path;print(Path('AGENTS.md').read_bytes().decode('gb2312'))"。若终端输出乱码，可写UTF-8临时副本供工具阅读，但不得把源文件误解码覆盖。新源代码使用ASCII加Unicode转义/JSX字符引用，属于GB2312兼容子集；自写中文文档GB2312。第三方Skill原始文件保持原编码只读。
先确认你位于独立克隆和正确任务分支、工作区无他人修改。不要在Codex主工作区D:\GPTProject\数媒直接开工。用户已授权该任务实现、测试、提交并推送自己的任务分支；不授权force push、公开私有仓库、自动合并main、上传密钥或改其他任务文件。认证失败保留本地提交并说明，不索要明文令牌。
使用docs/skills/frontend-design/SKILL.md指导设计、docs/skills/web-design-guidelines/SKILL.md审查交互。项目既定浅色中文、物理准确和无远端资源优先于Skill通用建议。不等待其他模块，不请求尚不存在的后端API。新增依赖、公共合同和入口改动写入交付报告，由Codex集成；不得自行改package.json/lock/共享文件。
至少先给简短设计说明，再实现，再用浏览器截图审查；没有浏览器能力时写明未验证，但仍完成不依赖它的代码和测试。截图要真实，不使用合成界面替代运行结果。

你的任务W3：诊断练习与结果回顾。分支workbuddy/practice，独立目录D:\GPTProject\microwave-wb-practice；端口5183。可改src/features/practice/**、docs/reports/practice/**。
Goal：明确展示五类错因、首次答题分数和完成回顾，形成可追踪的学习过程，且结果可通过稳定回调交给现有记录模块。
实现默认导出PracticeFeature，props为PracticeProps。不直接读写localStorage、不改mw-records-v1、不依赖W1/W2。题库和评分纯函数放你自己模块，UI和逻辑分开；Preview中的onComplete将结果显示给开发者，不保存到产品记录。URL /collab-preview.html?module=practice。
题目先沿用src/main.tsx已存在的5题内容和正确答案，禁止擅自换物理约定：ZL=100+j50欧姆、Z0=50欧姆，归一化2+j1；Gamma=0.4+j0.2；反射功率20%；VSWR约2.618；向信号源lambda/8对应顺时针90度。五错因用contracts定义的ErrorCategory。答案乱序时correct索引必须保持一致。可只读复用physics.ts验证，不复制一套算法改变约定。不要引入AI或实测措辞。
评分规则：五题每题20分，仅首次选择计分；展示反馈后允许阅读解释，修订尝试不得改变本轮首次得分。完成一轮只调用一次onComplete，包含唯一且稳定id、ISO时间、0..100分、主题、完整首次答题结果。点击完成按钮防止重复提交。回调抛错显示明确失败并允许以同一结果id重试，不重新计分。新一轮显式清空状态并生成新id。若用户离开不保存未完成记录，除非集成方后续明确新增需求。
必要逻辑测试：全对100、全错0、部分正确、首次答后重试不改分、无效答案不记分/不崩溃、同一轮结果id稳定、新轮不同、重复完成调用防护；根据实现选择合适层级，不为了测试改全局依赖。回调一次语义和失败重试在报告说明。不能把五题局部练习声称覆盖全部TE/TM课程。
界面：浅色中文、步骤清楚、选择反馈区别正确/错误且不只依赖颜色、完成后逐题回顾、下一步按钮明显；390px可用；标准公式用只读Formula.tsx；没有远端字体/脚本。报告含一次100分、一次错误反馈及结果回顾截图。node scripts/check-boundaries.mjs practice通过。

交付必须包含：你的目录中index.tsx与Preview.tsx；docs/reports/对应模块/handoff.md（Goal、验收逐条结果、截图说明、文件列表、公共改动建议、未验证项）；pr-body.md。执行npm.cmd test、npm.cmd run build、git diff --check、边界检查。只stage自己两个目录，检查后commit，再git push -u origin 自己分支。按GITHUB.md创建PR或给出创建链接、真实SHA。完成后停止，不去接手其他模块，不自动合并main。不要说“已完成全部联合”，只报告自己模块。若遇问题，先解决本模块能解决的内容，确实需要外部信息时只问具体缺项。
