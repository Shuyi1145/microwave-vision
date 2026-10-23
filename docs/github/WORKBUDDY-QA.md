你是WorkBuddy辅助任务执行者。先读AGENTS.md及PLAN/OWNERSHIP/ACCEPTANCE/CONTRACTS/GITHUB，再直接实施。自写源代码ASCII加Unicode转义（GB2312兼容），中文原件GB2312；第三方文件只读不改编码。用独立clone和自己的分支，遵循WORKBUDDY-START.md的v2基线选择，不等待其他任务。不得改公共入口/合同/依赖/物理/评分/存储/安卓；不要自行安装运行时UI库。

任务W4：重复回归与证据整理；分支workbuddy/qa；目录microwave-wb-qa；端口5184。只改docs/reports/qa/**。
Goal：采集现有基线的可复核结果，供Codex定位问题；不修改应用或测试代码。
先记录SHA/分支/浏览器版本/测试宽度。npm ci后运行现有npm test和build，保存结果摘要，明确环境错误与产品错误。按“封面→工作台→课程目录→圆图调参→TE/TM→诊断反馈→记录回顾”操作，390/698/1024各采关键页面截图。检查文字溢出、公式局部横滚、下一步、焦点、图片关闭和减少动态效果。不要因想凑报告去改断言或制造错误。
写matrix.md逐项通过/失败/未验证；bugs.md每条记录页面、前置条件、步骤、预期、实际、截图、是否稳定复现；没有缺陷就明确未发现，不编造。截图来自实际运行，不合成。浏览器/实体手机/模拟器分开，没设备则手机原生行为标未验证，不装陌生驱动或修改系统安全配置。现有本地记录只在自己的独立测试环境操作，不清用户真实记录。
如允许使用外部浏览器工具可按已有方式；不往package.json加测试库，不搭建新测试框架，不修源码。没浏览器仍可交命令结果和待测矩阵，但不得标全部验收通过。node scripts/check-boundaries.mjs qa。

完成后：按ACCEPTANCE.md写真实逐项证据、文件清单和未验证项，存本任务docs/reports目录的handoff.md；写pr-body.md。执行现有npm test/build及git diff --check，运行node scripts/check-boundaries.mjs对应任务ID。只stage自己的两个目录，检查暂存差异，再commit/push并创建PR，不force push、不合main、不接其他任务。没有浏览器或其他环境能力时完成可做部分并明确未测，不伪造证据。
