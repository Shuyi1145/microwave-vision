# W3 文案清点：界面用语与课程内容清单

## 目标

对现有界面的中文用语、术语与重复说明做一次可逐条应用的清点，产出清单与建议，减少不一致标签和重复解释。本 PR 不包含任何产品源码改动，建议尚未应用，需审查后由 Codex 或集成方决定如何落地。

## 基线依赖（重要）

- 本分支从标签 collaboration-v2（SHA 4fc8b7af8bdde74c6755c47c146c72b5c39f25a7）创建，因为 main（29643c1）尚未包含 v2 规则文件。
- 本 PR 只包含 W3 自己的文档，未携带任何集成方改动：任务文件（WORKBUDDY-EDITORIAL.md、OWNERSHIP.md、ACCEPTANCE.md）仅从 origin/codex/integration 读取用于指导本次工作，没有提交进本分支。
- 请保持未合并状态，先由集成方处理 v2 规则的公共提交；不要为消除差异而 rebase 或 force push。

## 改动目录

| 文件 | 说明 |
| --- | --- |
| docs/editorial/inventory.md | 界面文案清点清单：封面、工作台、实验室目录、6 课程、诊断、记录、手册、页脚，含文件行号与原文 |
| docs/editorial/suggestions.md | 30 条建议，按一致性、重复、表达、排版、待核对、白名单外分组 |
| docs/editorial/terms.md | 术语与写法统一表 |
| docs/reports/editorial/handoff.md | 验收与证据 |
| docs/reports/editorial/pr-body.md | 本文件 |
| docs/reports/editorial/README.md | 目录索引 |

不改动：src 下源码、公式、题库、courseContent 文案数据、public/course-figures、依赖、安卓工程、根 AGENTS.md 与其他任务目录。

## 接口版本

并行接口约定 v1.1。W3 没有运行时接口，仅文档交付；src/collaboration/contracts.ts 只读未改。

## 独立预览地址

不适用。本任务不启动开发服务，也不产生可预览模块。

## 测试与检查结果（真实执行）

| 命令 | 结果 |
| --- | --- |
| npm ci | added 146 packages |
| npm test | Test Files 3 passed (3)；Tests 21 passed (21) |
| npm run build | 构建成功（4.89s）；仅有分包体积提示 |
| git diff --check | 无输出 |
| node scripts/check-boundaries.mjs editorial | PASS editorial，改动路径均在任务所有权内 |

环境：Windows + bash，git 2.55.0，Node 22.17.0，独立克隆目录 repo-w3。

## 390 / 698 / 1024 截图

不适用。本任务未改动界面，未生成截图，也不伪造截图。

## 建议概览

- 一致性 10 条：工作台/返回链接/记录页命名、相速类标签、反射功率占比与功率反射比、课件图例称呼、模式下标排版、页脚副标语、播放暂停写法、图例方向描述。
- 重复 4 条：内页页头与徽标重复、热力图色标说明重复、归一化与不跨量纲说明三层重复、图例读图提醒分散。
- 表达与疑似错字 10 条：非法输入提示用词、暂停按钮使用罗马数字二、模式约束半角逗号、TE 目标句读法、空状态与结果提示未覆盖存储失败、手册条目标题与公式不匹配、坐标轴空格、右上箭头三种含义、页码字段后缀、目录卡片角标形式。
- 排版 1 条：数值与单位空格不统一。
- 待 Codex 核对 3 条：TEM 截止频率显示为 0、史密斯圆图主题入口归属、手册"模型边界"条目组织。均未自行更正。
- 白名单外建议 2 条：index.html 标题含装饰英文、开发预览页加载提示为英文。仅提出，未改动。

## 已知限制

1. 建议未应用，行号对应基线 4fc8b7a，源码改动后需重新核对。
2. 未运行浏览器、模拟器与实体手机验证，本任务不适用。
3. 文档按 GB2312 保存，个别符号（上下标数字、装饰箭头等）无 GB2312 码位，引用时以等价写法或文字说明代替，已在 inventory.md 开头声明。
4. W1 门户、W2 课程面板与 Codex 练习模块在本基线上尚无界面文案，未纳入清点。
