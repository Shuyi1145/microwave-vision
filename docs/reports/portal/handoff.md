# W1 门户展示 - 交付报告 (handoff)

## 1. 基本信息
- 任务ID：W1 门户展示
- Goal：以既定数据、结构和导航回调改善 landing / hub / catalog 三种 view 的排版、留白、字级与卡片一致性，只做展示与回调，不接管路由、存储、物理或业务状态。
- 基线SHA：`4fc8b7af8bdde74c6755c47c146c72b5c39f25a7`（固定协作基线标签 `collaboration-v2`；本次核对时等于 `origin/codex/integration`）
- 任务分支：`workbuddy/portal-ui`
- 合同版本：v1.0（`src/collaboration/contracts.ts`，只读，未改动）
- 预览端口：5181

## 2. 修改文件清单（全部在白名单内）
- `src/features/portal/index.tsx`（新增：默认导出 `PortalFeature`，实现三种 view）
- `src/features/portal/Preview.tsx`（新增：默认导出预览，支持 `?view=landing|hub|catalog`）
- `src/features/portal/portal.css`（新增：`.mv-portal` 作用域样式）
- `docs/reports/portal/handoff.md`、`docs/reports/portal/pr-body.md`（本报告与 PR 正文）
- `docs/reports/portal/screenshots/*.png`（13 张真实截图证据）

- 是否越界：否。`node scripts/check-boundaries.mjs portal` → `PASS portal: 16 changed paths stay inside task ownership.`
- 是否需要公共改动：否。
- 未接入主站：本模块尚未接入主站路由/入口。接入 `main.tsx` / `ProjectHome.tsx` / `Lessons.tsx` 由 Codex 集成负责。当前请通过独立预览 `/collab-preview.html?module=portal` 查看。

## 3. 验收项（逐项）
| 验收项 | 状态 | 证据 |
| --- | --- | --- |
| 三种 view 独立预览 | 通过 | 预览页签 landing/hub/catalog 可切换；亦可用 `?view=` 直达。截图 `w1-*-landing/hub/catalog.png` |
| 封面仅一个"进入网站"操作 | 通过 | landing 仅一个 `进入网站` 按钮（`onNavigate('#/hub')`）；头部/页脚无其他操作。`w1-390-landing.png`、`w1-1280-landing.png` |
| 工作台固定 4 模块 | 通过 | 实验室/诊断练习/学习记录/知识手册 4 张卡片。`w1-1280-hub.png`、`w1-1024-hub.png` |
| 目录 6 课程 | 通过 | 使用 `props.topics` 渲染 6 个主题卡片（含 tag/title/description/goal）。`w1-1024-catalog.png` |
| 路由回调符合 contract | 通过 | 所有导航只调用 `onNavigate(route)`，组件内不操作 `location`。预览条实时显示最近回调路由（"导航回调"） |
| 390/698/1024 无溢出 | 通过 | CDP 实测 `scrollWidth==innerWidth`：三视图在 390/698/1024 均成立（见命令记录）。截图 `w1-390-*`、`w1-698-*`、`w1-1024-*` |
| 中文浅色 | 通过 | 浅色背景 `#f4f7fa`、主文本 `#263b50`、主色 `#168d83`；无黑色/霓虹/装饰英文（保留 TEM/TE/TM、Γ、λ/4 等物理记号） |
| 可见焦点 | 通过 | 卡片为原生 `<button>`（可 Tab 聚焦），`:focus-within` 卡片高亮环 + `:focus-visible` 轮廓。`w1-focus-card.png`（"诊断练习"卡片聚焦环） |
| 不依赖 hover | 通过 | 标题/描述/目标/操作全部常态可见，hover 只做边框/指示条增强 |
| 减少动态效果可用 | 通过 | `useReducedMotion` 关闭位移动画；模拟 `prefers-reduced-motion: reduce` 时内容立即完整显示。`w1-390-catalog-reduced.png` |
| npm test | 通过 | `Test Files 3 passed (3)`，`Tests 21 passed (21)` |
| npm run build | 通过 | `tsc --noEmit` 无错误；`vite build` 成功（仅有既有的 chunk 体积提示） |
| git diff --check | 通过 | 无输出（无空白错误） |
| check-boundaries portal | 通过 | `PASS portal: 16 changed paths stay inside task ownership.` |

## 4. 实际测试环境
- 浏览器：本机 Microsoft Edge（Chromium），无头模式 + CDP 设备指标仿真（deviceScaleFactor=1）。
- 视口：390、698、1024、1280 CSS 像素，均核对 `document.documentElement.scrollWidth === window.innerWidth`（无横向滚动条）。
- 仅桌面浏览器验证；未在安卓模拟器/实体手机上验证本模块（门户为纯展示，移动端复杂状态归 Codex）。
- 预览为开发服务器渲染（`npm run dev -- --port 5181`），非生产构建产物截图。

## 5. 风险、未做范围、回退
- 未做范围：模块未接入主站（由 Codex 集成）；未改路由、存储、物理、题库、KaTeX、安卓。
- 卡片入场动效采用挂载入场（`animate`）而非滚动触发（`whileInView`），以保证无头截图与加载即完整；进入视野提示可由集成方按需替换。
- 预览 `?view=` 直达参数为开发预览便利，不属于产品接口。
- 回退：删除 `src/features/portal/` 与 `docs/reports/portal/` 即可完全回退，不影响主站与其他任务。

## 6. 提交与 PR
- 任务分支：`workbuddy/portal-ui`（已推送远端）
- 主要提交SHA：`645154ca4de110d3fd4de8a05f571dd5d82c1cba`（feat(portal): refine light Chinese learning portal (W1)）
- PR链接：https://github.com/Shuyi1145/microwave-vision/pull/4 （base=main，保持未合并，待集成方先处理公共基线）
- 基线说明：本分支基于 `collaboration-v2`（v2 未合入 main），PR 会携带集成方公共提交，已在 pr-body.md 标明依赖基线，公共提交非本人工作。

## 附：截图清单（`docs/reports/portal/screenshots/`）
- `w1-390-landing.png` 手机封面（需求）
- `w1-1280-hub.png` 桌面工作台（需求）
- `w1-390-catalog.png` 手机目录（需求）
- `w1-390-catalog-reduced.png` 减少动态效果
- `w1-focus-card.png` 卡片键盘焦点环
- `w1-390-hub.png`、`w1-698-hub.png`、`w1-698-catalog.png`、`w1-1024-landing.png`、`w1-1024-hub.png`、`w1-1024-catalog.png`、`w1-1280-landing.png`、`w1-1280-catalog.png`（390/698/1024 及桌面补充）
