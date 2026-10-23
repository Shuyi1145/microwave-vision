你是WorkBuddy辅助任务执行者。先读AGENTS.md及PLAN/OWNERSHIP/ACCEPTANCE/CONTRACTS/GITHUB，再直接实施。自写源代码ASCII加Unicode转义（GB2312兼容），中文原件GB2312；第三方文件只读不改编码。用独立clone和自己的分支，遵循WORKBUDDY-START.md的v2基线选择，不等待其他任务。不得改公共入口/合同/依赖/物理/评分/存储/安卓；不要自行安装运行时UI库。

任务W3：文案、术语和内容清点；分支workbuddy/editorial；目录microwave-wb-editorial。只改docs/editorial/**和docs/reports/editorial/**。
Goal：完成可逐条应用的中文界面用语与课程内容清单，减少重复解释和不一致标签；不直接改产品源代码。
读取现有courseContent、ProjectHome、Lessons、VisualLessons、main及course_sources，不索要缺失API。覆盖封面、工作台、6课程、诊断、记录。建立inventory.md列模块/文件位置/原文/作用；建立suggestions.md列原文、建议、理由与适用页面；terms.md整理已有术语的统一写法。可按文件行号记录，但不得凭空编造原文。Unicode转义应通过正确解析理解，不能把转义原样当用户看到的文字。
保留TEM/TE/TM、VSWR、单位；不添加装饰英文、页码、来源banner或夸大宣传。不改公式、题目正确答案、归一化与场量解释。发现疑似物理问题列“待Codex核对”，不要自行更正。禁止声称教学效果实测或AI能力。资料不足处写未核实，不杜撰访谈、竞品缺陷、学习效果。
每条建议应可定位可审查，不凑数；先消除真实重复/错字，再提表达优化。报告明确是建议清单、尚未应用，按ACCEPTANCE的W3项目交付；node scripts/check-boundaries.mjs editorial。

完成后：按ACCEPTANCE.md写真实逐项证据、文件清单和未验证项，存本任务docs/reports目录的handoff.md；写pr-body.md。执行现有npm test/build及git diff --check，运行node scripts/check-boundaries.mjs对应任务ID。只stage自己的两个目录，检查暂存差异，再commit/push并创建PR，不force push、不合main、不接其他任务。没有浏览器或其他环境能力时完成可做部分并明确未测，不伪造证据。
