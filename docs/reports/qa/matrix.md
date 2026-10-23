# W4 回归矩阵（基线 collaboration-v2）

- 基线 SHA：`4fc8b7af8bdde74c6755c47c146c72b5c39f25a7`（标签 collaboration-v2，main 尚未含 v2）
- 分支：workbuddy/qa（本任务只新增 docs/reports/qa/**，不改应用与测试代码）
- 采集时间：2026-10-23 晚
- 环境：Windows（win32）、Node v22.22.2、npm ci（146 包）、Vite 7.3.7 dev server http://127.0.0.1:5184/、Chrome/155.0.8059.86 headless=new（CDP 真实点击/指针/键盘事件，独立全新浏览器 profile）
- 视口：390x844（mobile 模拟）、698x900、1024x800，deviceScaleFactor=1
- 本地记录仅在本次测试 profile 内生成，不涉及任何真实用户数据

状态口径：通过 / 失败 / 未验证 / 不适用。

| # | 验收项 | 状态 | 证据 |
|---|--------|------|------|
| A1 | npm test（既有 21 项） | 通过 | vitest 5.0.5，3 个测试文件 21 项全部通过，2.24s；raw-logs/npm-test.txt |
| A2 | npm run build | 通过 | tsc --noEmit + vite build 成功，15.58s；raw-logs/npm-build.txt。既有警告：index chunk 659.78 kB 超过 500 kB 提示线（基线固有，非本次改动） |
| A3 | 封面 -> 工作台（点击"进入网站"） | 通过 | hash 实测 #/ -> #/hub；截图 01/02 |
| A4 | 工作台 -> 课程目录（点击"进入实验室"卡片） | 通过 | hash 实测 #/hub -> #/labs；截图 02/03 |
| A5 | 目录 -> 课程页（点击传输线卡片） | 通过 | hash 实测 #/labs -> #/labs/line；截图 03/04 |
| A6 | 实验室三步可点选、上一步/下一步、定位操作区 | 通过 | 点击第 3 步后指引标题变为"沿传输线移动，观察相位变化"；键盘 Tab 焦点序：步骤按钮 -> 定位操作区 -> 下一步 -> 重置；截图 05/06 |
| A7 | 非法参数阻止推进 | 通过 | R 输入 -40：出现错误提示"请输入有限数值，R≥0、Z0>0，绝对值≤10^6…"，"下一步"disabled=true；截图 07-lab-invalid-banner.png |
| A8 | 圆图拖动调参 | 通过 | 真实指针事件拖动圆图中心至右上：R/X 由 100/50 变为 61.609/72.006；与终点 Γ≈0.367+j0.408 的解析反演 z=(1+Γ)/(1-Γ) 一致 |
| A9 | TE/TM 课程页与传播/截止状态 | 通过 | TE 默认 TE10 f=10.00 GHz > fc=7.495 GHz、TM 默认 TM11 f=20.00 GHz > fc=16.759 GHz，均显示"当前模式可传播"；fc 与 c/2·sqrt((m/a)^2+(n/b)^2) 手算一致（a=20mm,b=10mm）；截图 15/16 |
| A10 | 诊断练习全流程与首次作答计分 | 通过 | 连答 5 题 -> 本轮学习报告 20/100（5 题中第 1 题作答正确，与题库 correct 索引一致），错因反馈逐条显示，结果写入 mw-records-v1；截图 08/09 |
| A11 | 学习记录回顾 | 通过 | 记录页显示已完成次数、平均分与逐条记录（完成时间/主题/得分）；截图 10 |
| A12 | 清除记录（confirm 确认） | 通过 | 预置 1 条记录并整页刷新后点击"清除记录"，接受确认后 localStorage 1 -> 0，页面回到空态提示；命令输出见 handoff.md |
| A13 | 知识手册公式渲染 | 通过 | KaTeX 分式与上下标正常（归一化、反射系数、圆图几何、沿线移动）；截图 11 |
| A14 | 390/698/1024 无横向溢出 | 通过 | 全部 47 个采集状态 documentElement.scrollWidth == clientWidth；逐页测量数据见 handoff.md 附录 |
| A15 | 公式块不破坏布局、KaTeX SVG 不受影响 | 通过 | .equation 实测 overflowX=visible 且无内容溢出（scrollWidth==clientWidth）；各宽度截图未见公式越界 |
| A16 | 减少动态效果偏好 | 通过 | 模拟 prefers-reduced-motion=reduce：课程页动画初始即暂停（按钮显示"播放动画"），无异常 |
| A17 | 课件图例放大预览与关闭 | 通过 | 点击缩略图打开 dialog.figure-overlay（showModal），Esc 关闭、关闭按钮关闭均实测成功；截图 13 |
| A18 | 键盘可操作 | 通过 | 封面 Tab 仅落在"进入网站"（与"封面仅一个操作"设计一致）；实验室焦点顺序合理；路由切换后 h1 程序化聚焦生效（描边见 B2） |
| A19 | 控制台无运行异常 | 基本通过 | 全程无 JS 异常；仅初始加载出现一次 favicon.ico 404（见 bugs.md B1） |
| A20 | 实体手机 / 模拟器 / 安卓返回键 / WebView 预览 | 未验证 | 本会话无设备；安卓与打包属 Codex 范围 |
| A21 | 断网 / 离线资源 | 未验证 | 本次仅 dev server 在线验证；离线打包验证属 Codex 范围 |
| A22 | 真机触屏拖动手势 | 未验证 | 已用 CDP 鼠标指针事件验证拖动链路（A8），触屏专属行为未覆盖 |

## 备注

1. 状态 07 的视口截图（07-lab-invalid.png）因同 URL 导航不触发整页刷新而停留在第 3 步视图，属采集脚本限制，不是产品问题；错误横幅证据以整页裁切截图 07-lab-invalid-banner.png 与 DOM 断言（error=true、nextDisabled=true）为准。
2. 记录页 09->10 的衔接依赖同一会话内的 React 状态与 localStorage，两条路径（练完即看、工作台重进）均已实测正常。
