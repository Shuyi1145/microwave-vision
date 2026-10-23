# 术语与写法统一表（W3 文案清点）

用途：给后续接入新模块（W1 门户、W2 课程面板）与 Codex 统一界面文案时提供一份可对照的术语基准。
原则：保留 TEM、TE、TM、VSWR、物理变量与科学单位；不添加装饰英文、页码、来源横幅或夸大宣传。
本表只整理"已经在界面出现过的写法"，不新增术语，也不改动公式与题目。

## 一、如何阅读本表

- 建议写法：本次清点后建议统一采用的界面写法。
- 当前写法与位置：在基线 4fc8b7a 上实际出现的写法，含文件与行号。
- 风险：若不统一会带来什么问题。
- 需要 Codex 确认：涉及物理含义或接口字段，不由 W3 直接决定。

## 二、模块与页面名称

| 术语 | 建议写法 | 当前写法与位置 | 风险 | 需确认 |
| --- | --- | --- | --- | --- |
| 品牌名 | 微波视界 | 微波视界（ProjectHome.tsx L33、L39；Lessons.tsx L25；main.tsx L55） | 无 | 否 |
| 工作台 | 学习工作台 | 学习工作台（ProjectHome.tsx L39）；工作台（main.tsx L47 返回链接、页头层级） | 同一层级两个名字 | 否 |
| 实验室目录 | 实验室目录 | 课程实验室（Lessons.tsx L25 页头）；实验室（ProjectHome.tsx L5 入口） | 入口与页头不一致 | 否 |
| 课程页 | 课程实验室 / {课程名} | Lessons.tsx L29 | 无 | 否 |
| 圆图实验页 | 实验室（页签） | main.tsx L36、L47、L48 | 页签叫"实验室"，入口也叫"实验室"，但指向不同页面 | 是（见 S-27） |
| 诊断练习 | 诊断练习 | ProjectHome.tsx L6；main.tsx L48 | 无 | 否 |
| 学习记录 | 学习记录 | ProjectHome.tsx L7；main.tsx L48 页签；main.tsx L54 面板写作"练习记录" | 面板与入口不一致 | 否 |
| 知识手册 | 知识手册 | ProjectHome.tsx L8；main.tsx L54 | 无 | 否 |

## 三、物理量术语

| 术语 | 建议写法 | 当前写法与位置 | 风险 | 需确认 |
| --- | --- | --- | --- | --- |
| 驻波比 | 驻波比 VSWR | 驻波比 VSWR（main.tsx L53）；VSWR（Lessons.tsx L49 统计项"匹配后 VSWR"）；readme 中另用 ASCII 写法 VSWR | 基本一致，建议保留"驻波比 VSWR"首次出现加中文 | 否 |
| 反射系数 | 反射系数 Γ | 反射系数 ΓL（main.tsx L53）；负载 ΓL、沿线 Γ(l)（main.tsx L51 图例） | 建议下标统一写为普通字符 ΓL、Γ(l) | 否 |
| 反射幅度 | 反射幅度 \|Γ\| | 反射幅度 \|Γ\|（main.tsx L53）；匹配前 \|Γ\|、匹配后 \|Γ\|（Lessons.tsx L49） | 无 | 否 |
| 反射功率占比 | 反射功率占比 | 反射功率占比（main.tsx L53 指标区）；功率反射比（main.tsx L54 手册条目二） | 同一量两个名字 | 否 |
| 归一化阻抗 | 归一化负载 zL / 当前位置 z(l) | main.tsx L52 读数；归一化阻抗（main.tsx L58 第一题题干） | 无 | 否 |
| 特性阻抗 | 特性阻抗 Z0 | 特性阻抗 Z0（main.tsx L52）；特性阻抗（Lessons.tsx L37 统计项）；主线特性阻抗 Z0（Lessons.tsx L49 滑块） | 无 | 否 |
| 相速与群速 | 相速 vp / c、群速 vg / c | 相速度 / 群速度（Lessons.tsx L37）；相速 vp / c、群速 vg / c（Lessons.tsx L46） | 两种长度的标签 | 否 |
| 截止频率 | 截止频率 fc | 截止频率 fc（Lessons.tsx L46）；TEM 截止频率（Lessons.tsx L37，取值 0） | TEM 项写法与单位特殊 | 是（见 S-26） |
| 导波波长 | 导波波长 λg | Lessons.tsx L46 统计项；热力图坐标说明"横轴 z/λg"（VisualLessons.tsx L19） | 无 | 否 |
| 相移常数与衰减常数 | 相移常数 β / 衰减常数 α | Lessons.tsx L46 统计项（按传播状态切换） | 无 | 否 |
| 相对介电常数 | 相对介电常数 εr | Lessons.tsx L46 滑块标签；公式中用 \varepsilon_r | 界面下标 r 无法用下标排版，统一写 εr | 否 |
| 波导尺寸 | 波导宽边 a、波导窄边 b | Lessons.tsx L46 滑块；图例说明"a、b 是半径，不是直径"（VisualLessons.tsx L33） | 同轴与波导都用 a、b，需在各自页面明确含义 | 是 |
| 纵向场分量 | 纵向电场 Ez、纵向磁场 Hz | Lessons.tsx L27 表头；Ez=Hz=0（Lessons.tsx L37、courseContent.ts L5） | 无 | 否 |
| 模式索引 | TE10、TM11（首次出现处注明 m、n 含义） | 正文拼接 TE10、TM11（Lessons.tsx L46）；图例标题 TE10、TM01 带下标（VisualLessons.tsx L31、L32）；讲解正文 TM01 无下标（VisualLessons.tsx L47） | 同一模式三种排版 | 否 |
| 模式分类 | TEM、TE、TM | 全站统一大写 | 无 | 否 |
| 模式状态 | 可传播 / 处于截止点 / 低于截止：倏逝区 | Lessons.tsx L46 状态条；热力图提示"截止点或倏逝区"（VisualLessons.tsx L19） | 无 | 否 |
| 倏逝区 | 倏逝区 | Lessons.tsx L46、VisualLessons.tsx L19 | 不要写作"消失区""衰减区" | 是 |
| 场视图 | 电场 E / 磁场 H | Lessons.tsx L46 切换按钮；E 场视图 / H 场视图（Lessons.tsx L46） | 无 | 否 |
| 热力图场量 | 瞬时总场强度（归一化） / 纵向分量的正负 | VisualLessons.tsx L19 下拉选项 | 无 | 否 |
| 匹配术语 | 变换段特性阻抗 Zt、匹配段输入阻抗、负载 RL | Lessons.tsx L49 | 无 | 否 |
| 感性 / 容性 | 感性（+jX）、容性（-jX） | main.tsx L29 圆图上下标注；main.tsx L52 预设按钮 | 无 | 否 |

## 四、界面动作与状态词

| 术语 | 建议写法 | 当前写法与位置 | 风险 | 需确认 |
| --- | --- | --- | --- | --- |
| 封面入口 | 进入网站 | ProjectHome.tsx L34 | 保持唯一入口 | 否 |
| 卡片行动 | 展开学习 | Lessons.tsx L25 | 右上箭头另有含义，见 S-22 | 否 |
| 返回链接 | ← 返回封面 / ← 返回学习工作台 / ← 返回实验室目录 | ProjectHome.tsx L39；Lessons.tsx L25、L29；main.tsx L47 | 见 S-01、S-02 | 否 |
| 步骤推进 | 上一步 / 下一步 / 上一段 / 下一段讲解 | main.tsx L50；VisualLessons.tsx L48 | 无 | 否 |
| 动画控制 | 暂停 / 播放 | main.tsx L54 带罗马数字二与三角符号；Lessons.tsx L18 写"暂停动画 / 播放动画" | 见 S-09、S-16 | 否 |
| 定位操作 | 定位操作区 | main.tsx L50 | 无 | 否 |
| 图例交互 | 点击放大 / 关闭预览 | VisualLessons.tsx L38 | 无 | 否 |
| 自测反馈 | 理解正确 / 再想一步（课程内）；理解正确 / 发现一个值得修正的误区（诊断页） | Lessons.tsx L22；main.tsx L66 | 两套反馈词并存，但场景不同，可保留 | 否 |
| 记录操作 | 清除记录 | main.tsx L54 | 无 | 否 |
| 重做 | 开始新一轮 | main.tsx L66 | 无 | 否 |

## 五、单位与符号排版

| 项目 | 建议写法 | 当前写法与位置 | 风险 | 需确认 |
| --- | --- | --- | --- | --- |
| 单位空格 | 数值与单位之间一个空格 | 有空格：滑块读数、统计值（Lessons.tsx L19、L37、L46）；无空格：自测题干与选项"50Ω""70.71Ω"（Lessons.tsx L49）、"z=0.15m"（Lessons.tsx L46） | 见 S-25、S-21 | 否 |
| 百分号 | 紧贴数值 | 反射功率占比取值（main.tsx L53） | 无 | 否 |
| 单位集合 | Ω、GHz、mm、rad/m、Np/m、A/m、V/m、c | 全站 | 保留物理单位，不翻译 | 否 |
| 上标与下标 | 界面用普通字符，公式用 LaTeX 下标 | 10^6（main.tsx L52 上标六）、f/f0（Lessons.tsx L49 下标零）、λt0/4（VisualLessons.tsx L52） | 上标六与下标零在部分字体中缺失时会出现方框 | 否 |
| 正负号 | 减号用 ASCII 连字符或全角减号，全文一致 | "-1"（Lessons.tsx L34 自测解释使用 U+2212）、"(1 - \|Γ\|)"（main.tsx L53） | GB2312 中不统一，建议明确一种 | 否 |
| 分隔点 | 全角间隔点 | "·"出现在页脚、指标说明等多处 | 建议统一一个字符 | 否 |
| 引号 | 中文弯引号 | "不恒为 0"（Lessons.tsx L27）、"高于截止"（VisualLessons.tsx L19）、「负载与传输线」（main.tsx L50 使用直角引号） | 直角引号与弯引号混用 | 否 |

## 六、不纳入统一的项

1. 公式中的 LaTeX 记号（如 \varepsilon_r、Z_{\mathrm{in}}）：由 KaTeX 渲染，不按界面文本处理。
2. 代码标识符与 localStorage 键名（mw-records-v1）：不是界面文案。
3. 源文件名与 course_sources.md 中的页码、裁切坐标：工程溯源，不进入界面。
4. 五道诊断题的题干与选项文字：属于题库内容，不在本次建议范围。
