# W4 回归证据 交接报告

## 1. 任务信息

- 任务 ID：W4（回归证据）
- Goal：采集现有基线的可复核结果，供 Codex 定位问题；不修改应用或测试代码
- 基线 SHA：`4fc8b7af8bdde74c6755c47c146c72b5c39f25a7`（固定协作基线标签 collaboration-v2；已核对标签存在；main 尚未含 v2，故未以 origin/main 为基线）
- 任务分支：workbuddy/qa
- 合同版本：CONTRACTS.md v1.0（W4 无运行时接口，仅文档交付）

## 2. 修改文件清单

- 仅新增 docs/reports/qa/**：matrix.md、bugs.md、handoff.md、pr-body.md、raw-logs/（npm-test.txt、npm-build.txt）、screenshots/（390、698、1024 三档共 48 张 PNG）
- 是否越界：无（node scripts/check-boundaries.mjs qa 通过）
- 是否需要公共改动：不需要
- 未接入主站说明：不适用，本任务无运行时代码

## 3. 验收逐项（详见 matrix.md，此处摘要）

- npm test：通过，21/21（physics 8、coursePhysics 8、fieldMaps 5），2.24s
- npm run build：通过，tsc --noEmit + vite build 15.58s；仅既有 chunk 体积警告
- 核心演示路径（封面 -> 工作台 -> 课程目录 -> 圆图调参 -> TE/TM -> 诊断反馈 -> 记录回顾）：通过，全部真实点击/指针/键盘操作
- 390/698/1024：三档 47 个状态均无横向溢出
- 非法参数阻止推进、减少动态效果、图例放大 Esc/按钮关闭、清除记录：均通过
- 缺陷：B1 favicon 404（P2）、B2 课程页 h1 焦点描边（P2 观察项）；详见 bugs.md
- 未验证：实体手机/模拟器/安卓、断网离线、真机触屏

## 4. 实际测试环境

- 浏览器：Chrome/155.0.8059.86（headless=new，CDP 协议真实输入事件，独立全新 profile）
- 尺寸：390x844 / 698x900 / 1024x800，deviceScaleFactor=1
- 系统：Windows（win32）；Node v22.22.2；Vite 7.3.7 dev server，http://127.0.0.1:5184/
- 断网方式：未做（见未验证项）
- 模拟器/实体手机：无设备，未验证
- 本地记录：全部在测试 profile 内生成与清除，不触碰用户真实记录

## 5. 关键命令与真实输出摘要

```
npm test        -> Test Files 3 passed (3), Tests 21 passed (21), Duration 2.24s
npm run build   -> vite build 成功 built in 15.58s（警告：index chunk 659.78 kB > 500 kB，基线固有）
git diff --check -> 无输出（通过）
node scripts/check-boundaries.mjs qa -> PASS qa: 48 changed paths stay inside task ownership.（数量以提交时为准）
```

交互实测输出（CDP 采集脚本打印）：

- 02-hub: hash=#/hub；03-catalog: hash=#/labs；04-lesson-line: hash=#/labs/line
- 06-lab-step3: 指引标题="沿传输线移动，观察相位变化"
- 07-lab-invalid: {"error":true,"nextDisabled":true,"text":"请输入有限数值，R≥0、Z0>0，绝对值≤10^6。结果暂为匹配占位，请修正输入。"}
- 09-quiz-answered: {"heading":"20 / 100 分","saved":1}（三档宽度各完成一轮，记录累计 1/2/3 条）
- SMITH_DRAG: before={"r":"100","x":"50"} after={"r":"61.609","x":"72.006"}（拖动至 Γ≈0.367+j0.408，解析反演一致）
- REDUCED: {"media":true,"barText":"播放动画"}（reduce 下动画初始暂停）
- DIALOG: open=true -> Esc 后 gone=true -> 按钮关闭 gone=true
- CLEAR_RECORDS: before=1（页面显示"1 次"）after=0（回到空态提示）
- FOCUS_LANDING: Tab 仅"进入网站"（封面单一操作，符合设计）
- FOCUS_LAB: 步骤按钮 -> 定位操作区 -> 下一步 -> 重置
- 控制台：仅 landing 一次 favicon.ico 404；无异常

注：本文档为 GB2312 编码，引用界面文字时上下标按平写记录（如 Z0、10^6），界面实际显示为下标 0 与上标 6，以截图为准。

## 6. 风险、未做范围与回退

- 风险：本交付只有文档与截图，不影响任何运行时代码，风险为零
- 未做范围：安卓构建/模拟器/实体机/断网/CI 均在 Codex 范围，本报告不越权下结论
- 回退办法：删除 docs/reports/qa 下本次新增内容即可，不涉及共享文件
- 提交 SHA：dca36c523d5fa8fbdc6178cd4b1842bf833e740b（首个提交）+ 回填说明提交（见分支顶端）
- PR 链接：https://github.com/Shuyi1145/microwave-vision/pull/2（base=main，保持未合并，等待集成方先处理公共提交）

## 附录：逐页测量（scrollWidth == clientWidth 即无横向溢出）

390：landing 844 高、hub 1432、catalog 2319、lesson-line 4191、lab 2328/2385、quiz 844/1412、records 844、handbook 1759；tem/te/tm/matching 均 sw=390=cw
698：hub 978、catalog 1414、lesson-line 4307、lab 2486/2539、quiz 900/1307、handbook 1589；课程页 sw=683=cw（含滚动条）
1024：hub 1048、catalog 1403、lesson-line 3574、lab 1721/1723、quiz 800/1331、handbook 1055；课程页 sw=1009=cw（含滚动条）
