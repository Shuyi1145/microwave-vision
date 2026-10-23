# 门户界面改进（W1）

## 目标
以既定数据、结构和导航回调美化门户三种 view（landing 封面 / hub 工作台 / catalog 课程目录）的排版、留白、字级与卡片一致性。只做展示与 `onNavigate` 回调，不接管路由、存储、物理或业务状态。

## 基线依赖（重要）
本 PR 基于固定协作基线标签 `collaboration-v2`（SHA `4fc8b7af8bdde74c6755c47c146c72b5c39f25a7`，当前等于 `origin/codex/integration`）。**v2 规则尚未合入 main，因此本 PR 会携带集成方的公共提交。** 请保持本 PR 未合并，先由集成方处理公共提交 / 合入 v2 后再审阅本任务差异。本 PR 的个人改动仅限下方两个目录，公共提交非本人工作。

## 改动目录（仅白名单内）
- `src/features/portal/index.tsx` - 默认导出 `PortalFeature`（`PortalProps`），实现 landing / hub / catalog。
- `src/features/portal/Preview.tsx` - 默认导出预览组件，支持 `?view=` 直达。
- `src/features/portal/portal.css` - `.mv-portal` 作用域样式。
- `docs/reports/portal/` - handoff.md、pr-body.md、screenshots/。

## 接口版本
合同 v1.0（`src/collaboration/contracts.ts` 只读，未改动）。所有导航只调用 `onNavigate(route)`，组件内不操作 `location`。

## 独立预览
`npm run dev -- --port 5181` 后访问 `/collab-preview.html?module=portal`，可加 `&view=landing|hub|catalog`。

## 测试命令与实际结果
- `npm test` → `Tests 21 passed (21)`（3 个测试文件）
- `npm run build` → `tsc --noEmit` 无错误；`vite build` 成功（仅既有 chunk 体积提示）
- `git diff --check` → 无输出
- `node scripts/check-boundaries.mjs portal` → `PASS portal: 18 changed paths stay inside task ownership.`
- 390/698/1024 溢出检查（Edge 无头 + CDP 设备仿真）：三视图均 `scrollWidth == innerWidth`，无横向滚动。

## 截图（docs/reports/portal/screenshots/）
- 手机封面 `w1-390-landing.png`；桌面工作台 `w1-1280-hub.png`；手机目录 `w1-390-catalog.png`
- 平板/桌面：`w1-698-*`、`w1-1024-*`、`w1-1280-*`
- 减少动态效果 `w1-390-catalog-reduced.png`；键盘焦点环 `w1-focus-card.png`

## 已知限制
- 模块未接入主站（接入由 Codex 负责）。
- 仅桌面浏览器验证，未在安卓/真机验证本模块。
- 卡片入场动效用挂载入场（`animate`）保证加载即完整；进入视野提示可由集成方按需替换。
- 未验收项：无（本任务范围内均已验证；主站接入不在本任务范围）。
