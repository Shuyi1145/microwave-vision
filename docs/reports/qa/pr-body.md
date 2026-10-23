# W4 回归证据：基线 collaboration-v2 全链路验证

## 目标

按 v2 分工执行 W4：在固定基线 collaboration-v2（`4fc8b7af8bdde74c6755c47c146c72b5c39f25a7`）上采集可复核的回归证据，供 Codex 定位问题。不修改应用代码、测试期望、依赖与共享文件。

## 改动目录

仅 `docs/reports/qa/**`：

- matrix.md：22 项验收矩阵（通过/失败/未验证 + 证据索引）
- bugs.md：2 条记录（B1 favicon 404，P2；B2 课程页 h1 焦点描边，P2 观察项）+ 明确未发现缺陷项
- handoff.md：交接报告（基线、文件清单、逐项状态、环境、命令输出、风险与回退）
- screenshots/：390/698/1024 三档共 48 张真实运行截图
- raw-logs/：npm test / npm run build 原始输出

## 基线依赖说明（重要）

main 尚未包含 v2 规则，本分支从固定标签 collaboration-v2（4fc8b7a）创建，因此 PR 相对 main 会携带集成方提交的公共文档改动（4fc8b7a "docs: prioritize Codex core goals and narrow WorkBuddy tasks"）。该公共提交不是本任务工作，请保持本 PR 未合并，先由集成方处理公共提交后再审阅；本任务自身改动只有 docs/reports/qa/**。

## 验证命令与实际结果

- `npm test`：21/21 通过（physics 8 + coursePhysics 8 + fieldMaps 5），2.24s
- `npm run build`：tsc --noEmit + vite build 通过，15.58s（仅既有 chunk 体积警告）
- `node scripts/check-boundaries.mjs qa`：PASS
- `git diff --check`：无输出
- 浏览器：Chrome/155.0.8059.86 headless（CDP 真实点击/指针/键盘），dev server 127.0.0.1:5184

## 核心路径实测结论

封面 -> 工作台 -> 课程目录 -> 课程页点击链路、实验室三步与非法参数拦截、圆图拖动（R/X 100/50 -> 61.609/72.006，与解析一致）、TE10/TM11 截止频率显示（7.495/16.759 GHz，与手算一致）、诊断练习 5 题 -> 报告 -> 保存、记录回顾与清除、减少动态效果、图例放大 Esc/按钮关闭、键盘焦点：全部通过。三档宽度无横向溢出，控制台仅一次 favicon 404。

## 已知限制

实体手机/模拟器/安卓原生行为、断网离线、真机触屏：无设备，标注未验证（见 matrix.md A20-A22）。本任务不含运行时代码，无需接入主站。

## 验收状态

W4 范围内可验证项已完成；A20-A22 明确未验证，不声称全部环境验收通过。
