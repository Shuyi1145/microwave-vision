# W3 文案清点交接报告

## 一、任务信息

| 项目 | 内容 |
| --- | --- |
| 任务ID | W3 文案清点 |
| Goal | 完成可逐条应用的中文界面用语与课程内容清单，减少重复解释和不一致标签；不直接改产品源代码 |
| 所依据基线SHA | 4fc8b7af8bdde74c6755c47c146c72b5c39f25a7（标签 collaboration-v2） |
| main 现状 | 29643c1，尚未包含 v2 规则文件；本次任务文件由 origin/codex/integration 读取获得 |
| 任务分支 | workbuddy/editorial |
| 合同版本 | 并行接口约定 v1.1（src/collaboration/contracts.ts，只读未改） |
| 白名单目录 | docs/editorial/、docs/reports/editorial/ |

## 二、文件清单与越界情况

| 文件 | 状态 | 说明 |
| --- | --- | --- |
| docs/editorial/inventory.md | 新增 | 界面文案清点清单，含模块、文件行号、原文、作用 |
| docs/editorial/suggestions.md | 新增 | 30 条建议，含位置、原文、建议、理由、适用页面 |
| docs/editorial/terms.md | 新增 | 术语与写法统一表 |
| docs/reports/editorial/handoff.md | 新增 | 本文件 |
| docs/reports/editorial/pr-body.md | 新增 | PR 正文 |
| docs/reports/editorial/README.md | 修改 | 原为占位说明，改为指向上述文档的索引 |

是否越界：否。全部文件位于 W3 的两个白名单目录内，越界检查已通过。
是否需要公共改动：否。建议 S-29（index.html 标题）与 S-30（src/collaboration/preview.tsx 加载提示）涉及白名单外文件，仅在报告中提出，未改动。
未接入主站的说明：本任务为文档交付，不产生运行时模块，因此不存在"模块未接入主站"的情形。清点对象是现有产品源码（src/ProjectHome.tsx、src/Lessons.tsx、src/VisualLessons.tsx、src/main.tsx、src/courseContent.ts），这些代码已在主站运行。W1 门户与 W2 课程面板在本基线上只有 AGENTS.md，无界面文案；Codex 负责的练习模块同样尚未产生界面文案，因此诊断与记录以 src/main.tsx 现有实现为准。

## 三、验收项与状态

| 编号 | 验收项（依据 ACCEPTANCE.md W3） | 状态 | 证据 |
| --- | --- | --- | --- |
| W3-1 | 清点至少覆盖 6 课程、工作台/封面、诊断/记录 | 通过 | inventory.md 第三节（工作台）、第二节（封面）、第四节（实验室目录）、第五节（6 个课程主题）、第七至十节（4 类课程页）、第十一节（热力图/讲解/图例）、第十三节（诊断练习）、第十四节（学习记录）、第十五节（知识手册） |
| W3-2 | 每条建议包含文件位置、原文、建议、理由 | 通过 | suggestions.md 全部 30 条按"位置 / 原文 / 建议 / 理由 / 适用页面"五段书写 |
| W3-3 | 疑似科学问题标"待 Codex 核对"，不擅改结论 | 通过 | suggestions.md 第五节 S-26（TEM 截止频率显示 0）、S-27（史密斯圆图主题入口归属）、S-28（手册条目组织），均标注待核对且未自行更正 |
| W3-4 | 不要求凑条数；先消除真实重复与错字，再提表达优化 | 通过 | suggestions.md 按"一致性（10 条）→ 重复（4 条）→ 表达与疑似错字（10 条）→ 排版（1 条）→ 待核对（3 条）→ 白名单外（2 条）"排序；第七节明确列出不改动的范围 |
| W3-5 | 不改应用文案数据、公式、题库和参考课件 | 通过 | git status --short 仅显示 docs 下文件；未修改 src 下任何源文件、公式、题目与 public/course-figures |
| W3-6 | 报告明确是建议清单、尚未应用 | 通过 | suggestions.md 开头声明"本文件是建议清单，尚未应用到任何产品源码"；inventory.md 第一节"清点状态"同样声明 |

统一门槛（ACCEPTANCE.md 统一要求）：

| 命令 | 状态 | 真实输出摘要 |
| --- | --- | --- |
| npm test | 通过 | Test Files 3 passed (3)；Tests 21 passed (21)；physics.test.ts 8、coursePhysics.test.ts 8、fieldMaps.test.ts 5 |
| npm run build | 通过 | （勾号） built in 4.89s；仅有 "Some chunks are larger than 500 kB" 分包提示（历史已知，不影响构建成功） |
| git diff --check | 通过 | 无输出，无空白错误 |
| node scripts/check-boundaries.mjs editorial | 通过 | PASS editorial: 7 changed paths stay inside task ownership. |

## 四、实际测试环境

| 项目 | 内容 |
| --- | --- |
| 系统 | Windows，Shell 为 bash（Git Bash） |
| git | 2.55.0.windows.3 |
| Node / npm | Node 22.17.0（系统），npm 随附；依赖经 npm ci 安装，added 146 packages |
| 独立克隆目录 | E:/workbuddy-cache/2026-10-23-19-01-34/repo-w3 |
| 开发服务器 | 未启动。W3 为纯文案清点，任务说明允许不启动开发服务 |
| 浏览器验证 | 不适用。本任务未改动任何界面代码 |
| 390 / 698 / 1024 尺寸检查 | 不适用。同上，无 UI 改动 |
| 模拟器 / 实体手机 | 不适用。同上 |
| 截图 | 无。本任务无界面改动，未生成也不伪造截图 |

## 五、清点方法与可信度说明

1. 源码为 ASCII 与 Unicode 转义，另有 HTML 数字实体（如圆图 aria-label 与页头文字）。清点前先解析为实际渲染文字，未把转义串当作用户可见文案。
2. 逐文件检查后确认：src/Animations.tsx 与 src/MobileApp.ts 在本基线上不含中文界面文案，已在 inventory.md 第十七节说明。
3. 公式（formulaTex 与 String.raw 中的 LaTeX）不属于文案范围，未提出改动。
4. 文档按 GB2312 保存。个别符号在 GB2312 中无码位，引用时采用等价写法并在 inventory.md 开头声明：中点用全角间隔点、破折号用 GB2312 横线、上下标数字写为普通数字并加括号说明、装饰性箭头与勾选用文字注明。
5. 所有行号对应基线 4fc8b7a，源码改动后需重新核对。

## 六、风险、未做范围与回退办法

风险：
1. 建议未应用。若后续直接照搬，需逐条复核行号与上下文，尤其是 S-19（涉及按保存结果切换文案，属业务状态）与 S-20（涉及知识手册条目组织）。
2. S-07 的模式下标写法与 S-25 的单位空格，若应用到公式渲染或 KaTeX 相关代码，需避免影响公式输出。
3. 三个"待 Codex 核对"项尚未确认，不应在核对前改动。

未做范围：
1. 未修改任何产品源码、公式、题目、localStorage 存储、安卓工程、依赖与共享文件。
2. 未运行浏览器、模拟器与实体手机验证（本任务不适用）。
3. 未接入主站，也不涉及接入工作（接入由 Codex 负责）。
4. 未清点尚未产生界面文案的新模块（W1 门户、W2 课程面板、Codex 练习模块）。

回退办法：删除 docs/editorial 下三个文件，并把 docs/reports/editorial/README.md 恢复为基线版本即可；源码与依赖不受影响，无需回退构建产物。

提交SHA：见本文件末尾更新（提交后填写）。
PR链接：见本文件末尾更新（创建后填写）。
