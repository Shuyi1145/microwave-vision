# 微波视界

基于错误诊断与知识可视化的史密斯圆图交互式学习系统，已扩展传输线、TEM/TE/TM与阻抗匹配课程实验。面向智慧教育与科普展示的React+TypeScript+Vite前端工程，无后端与账号，不声称AI推理、仪器测量或真实教学成效。

## 安装与运行

要求Node.js 22.12+，本机22.17.0，npm。

    cd D:\GPTProject\数媒
    npm.cmd install
    npm.cmd run dev

打开终端显示的本地地址，当前通常为 http://127.0.0.1:5173/ 。首次安装需联网，运行所用库、字体和课件图均本地保存。默认只绑定本机。

    npm.cmd test
    npm.cmd run build
    npm.cmd run preview

构建目录dist须经静态服务器访问，不能直接双击HTML。复制源码时包含public/course-figures，建议同时保留package-lock.json。文档使用GB2312；手写源码使用ASCII及Unicode转义，兼容GB2312和编译器。锁文件和构建输出保持工具默认编码。

## 页面与功能

| 地址 | 内容 |
| --- | --- |
| / 或 #/ | 浅色封面，只有一个进入网站按钮 |
| #/hub | 实验室、诊断练习、学习记录、知识手册 |
| #/labs | 六主题课程选择，不显示课件页码与教学对比表 |
| #/microwave | 可拖动史密斯圆图与三步实验 |
| #/labs/line | 分布LC、行波/驻波、电压时空图 |
| #/labs/tem | 同轴TEM径向电场/环向磁场 |
| #/labs/te | 矩形TE场、截止、色散与热力图 |
| #/labs/tm | 矩形TM场、模式约束与热力图 |
| #/labs/matching | 四分之一波长实负载匹配与失谐 |
| #/microwave/quiz | 五步规则诊断，首次作答计分 |
| #/microwave/records | 最近50次已完成诊断练习的本地记录 |
| #/microwave/handbook | 标准数学排版的公式手册 |

路由支持刷新和浏览器前进后退。离开课程再进入可能重置尚未提交的练习；已完成记录在localStorage。清除浏览器数据后记录不可恢复。课程中的简短概念自测提供即时反馈，暂不计入五步诊断评分。

## 课程内容与可视化

- 圆图：归一化、复反射系数、VSWR与反射功率比，正确的电阻/电抗圆，匹配、感性、容性、开短路与纯电抗预设。拖动局部防选文，页面其他文字仍可复制。
- 三步引导：设置负载、观察映射、沿线探索，支持前后切换、定位与高亮，非法输入阻止推进。
- 传输线：调节L'、C'、频率、长度和负载，观察入射/反射/合成及包络。时空图默认显示瞬时电压绝对值，另有红正蓝负选项。
- TEM：调整同轴尺寸与介质，观察径向E、环向H及阻抗和速度。
- TE：TE10/20/01/11；TM：TM11/21/12。默认截面20mm×10mm用于教学，可调整。传播、截止点、倏逝区分开显示。
- 热力图：横/纵截面、E/H、总场强度/纵向分量切换，与参数和相位联动。默认按当前截面完整周期峰值固定参考，可切换统一参考幅值；不逐帧拉伸，不把零场染成峰值。
- 课件图例：6张局部原图，保留场量与色标，支持放大、键盘关闭；明确静态参考，不随网页参数重新计算。来源详见course_sources.md，不把电流图当电压图。
- 五专题各三段讲解。模式比较位于课程详情折叠区。匹配段采用接头、铜导带与贴片负载的结构示意，未输出加工尺寸。

## 架构

| 文件 | 职责 |
| --- | --- |
| src/physics.ts | 复阻抗、圆图、沿线旋转与波叠加 |
| src/coursePhysics.ts | 无损LC、同轴、波导与匹配模型 |
| src/fieldMaps.ts | 场标量与相位无关参考峰值、颜色映射 |
| src/Formula.tsx | 本地KaTeX公式 |
| src/ProjectHome.tsx | 封面、工作台与哈希路由 |
| src/main.tsx | 原圆图实验、诊断、记录和手册 |
| src/Lessons.tsx | 实验室目录与专题实验 |
| src/VisualLessons.tsx | 热力图、图例预览、讲解与结构图 |
| public/course-figures | 核对来源的静态课件图片 |
| agents.md | 当前开发约束和用户个性化偏好 |

## 公式与模型

归一化z=ZL/Z0；Gamma=(z-1)/(z+1)；VSWR=(1+|Gamma|)/(1-|Gamma|)；反射功率比为|Gamma|^2。Gamma=1用独立开路极限处理；全反射VSWR为无穷大。

圆图等电阻圆心(r/(1+r),0)、半径1/(1+r)；等电抗圆心(1,1/x)、半径|1/x|，只画单位圆内部分。沿线Gamma(l)=GammaL*exp(-j4*pi*l/lambda)，l从负载向信号源为正，四分之一波长反演，半波长重复。

无损线Z0=sqrt(L'/C')，vp=1/sqrt(L'C')，lambda=vp/f。L'、C'输入按nH/m、pF/m转SI；参数限制不产生超出物理模型的速度。

同轴Z0=eta0/(2*pi*sqrt(er))*ln(b/a)，vp=vg=c/sqrt(er)，Ez=Hz=0，Er/Hphi随1/r变化。同轴高频也可支持高阶模，此处只显示TEM解。

矩形kc=sqrt((m*pi/a)^2+(n*pi/b)^2)，fc=c*kc/(2*pi*sqrt(er))。传播区beta=sqrt(k^2-kc^2)，lambda_g=2*pi/beta；vp=v/sqrt(1-(fc/f)^2)，vg=v*sqrt(1-(fc/f)^2)。TE的Ez=0，TM的Hz=0；矩形TM的m、n均非零。低于截止采用指数衰减，不能用虚数beta解释行波速度。

匹配段Zt=sqrt(Z0*RL)，设计频率时长度为该段波长的四分之一，Zin=Zt^2/RL。仅适用正实负载与理想无损无色散模型；失谐后按实际电长度计算。

所有动画时间是演示相位，不是实测频率。横截面坐标归一化，不代表真实宽高比；E/H分别归一化，不能跨量纲直接比较颜色。相速大于c不代表信息超速。

## 验证

运行npm.cmd test、npm.cmd run build。当前21项解析测试，覆盖匹配/开短路、复阻抗往返、方向和周期、LC与同轴解析值、截止/倏逝、非法模式、导体壁边界、匹配失谐、热力图周期峰值与零场。

浏览器检查：入口与返回、刷新、三步引导、非法输入、拖动不误选文、练习计分和记录、动画暂停/相位切换、热力图数值/色标、图片放大，以及390/698/1024px布局。自动测试不等同于已验证真实教学成效。

## 个性化修改与协作

用户明确要求：以后每次提出个性化需求，都同步更新agents.md的现行条目；影响使用说明时同时更新本文件；完成后明确告知已更新agents.md。以最新需求替换旧要求，不堆积矛盾历史。

现行偏好：浅色中文界面、封面单入口、先选课程再展开、无装饰英文和界面页码、标准分式、可操作步骤、精细结构图、课件原图与实时结果区分、热力图固定且合理的色标、适度动效及减少动态效果支持。完整约束以agents.md为准。

## 三分钟展示建议

1. 封面进入工作台、选实验室主题。
2. 对比TEM与TE/TM的纵向分量，在TE10实验跨越截止。
3. 以热力图和课件原图讲解场量与色标。
4. 用圆图拖动与沿线移动解释阻抗映射，再完成一次错因诊断。
5. 展示本地记录，说明理想模型边界。参赛规则与提交规格以当届官方材料为准。

物理参考：https://eceweb1.rutgers.edu/~orfanidi/ewa/ch11.pdf 。课程出处与图片溯源见course_sources.md。


界面美化更新
已接入本地 Motion 14.6.0（MIT）：页面短暂淡入、课程卡片依次出现与悬停反馈、章节进入视野提示、讲解步骤切换、图片预览过渡。系统启用减少动态效果时关闭这些位移与过渡。界面动效不得改变物理相位、色标和采样值；卡片保持原生链接，支持键盘焦点。动画组件集中于 src/Animations.tsx，样式为 src/animations.css。
参考：https://motion.dev/docs/react-animation 、https://motion.dev/docs/react-accessibility 、https://github.com/motiondivision/motion 。依赖许可见 THIRD_PARTY_NOTICES.txt。本次使用开源组件，未安装全局 skill。

本次实测：npm run build 成功；npm test 的 3 个测试文件、21 项用例全部通过。Chrome 浏览器已验证入口和课程链接、讲解步骤、键盘焦点、减少动态效果、390 像素宽度及无运行时异常；热力图色标、零场、课件预览与 390/698/1024 像素布局回归通过。构建存在依赖 use client 指令被忽略及单包体积提示，不影响本次构建成功；后续可按课程拆分加载以减少首次下载量。


## 安卓首版目标（2026-10-23）
用户授权以能够演示和完赛为目标制作第一版安卓APK。复用现有前端，使用Capacitor打包本地dist资源；不依赖开发服务器，不增加账号与云端服务。保留网页版作为演示备份。优先验证课程、圆图触屏、热力图、练习、本地记录、返回键和离线资源。使用浅色主题；进入后台暂停物理动画。构建成功、安装验证和真机验证必须分别记录，未完成的验证不能写成已通过。首版采用调试签名用于安装演示，不声称已上架。


### 安卓演示版构建和安装
安卓工程：android/；应用标识：com.microwavevision.learning；应用名：微波视界。平台模板最低API为24（Android 7），建议使用较新Android及系统WebView；最低版本兼容性尚未验证。APK使用开发调试签名，仅用于参赛演示和测试，不作为已上架版本。

本机工具单独放在 E:\GPTDOCX\android-tools：JDK21、Android SDK36、Build Tools36.0.0、Gradle8.14.3。未替换原有系统Java。Gradle镜像下载后已与官方SHA256核对。所有大型缓存放E盘；本机C盘空间不足，需要用户另行管理。

安装依赖后执行 npm run android:sync，再执行 powershell -ExecutionPolicy Bypass -File .\build-android.ps1。若网络需要代理，需自行为当前构建进程配置Java代理；工程不硬编码个人代理。其他电脑可安装Android Studio/JDK21/SDK36后在android目录使用gradlew assembleDebug。local.properties为机器路径，不应照搬。

构建产物位于 android/app/build/outputs/apk/debug/app-debug.apk。将APK传到安卓手机，允许对应文件管理器安装此应用，再打开“微波视界”。安装后无需启动电脑开发服务器；图例、字体和公式资源随包提供。学习记录只在该应用本地保存，卸载或清除数据会丢失；网页版原有记录不会自动迁移。

演示顺序：封面进入网站→学习工作台→实验室选课→拖动圆图或调整波导参数→诊断练习→查看学习记录。安卓返回键逐级返回目录与工作台，封面返回键最小化应用；图片预览优先关闭。保持网页版及演示视频作为备份。


安卓首版交付验证（2026-10-23）：最终使用 :app:assembleDebug 构建成功，调试签名校验通过。Android15模拟器已通过核心学习流程、圆图触控、原生返回、练习评分及本地记录、预览、断网访问；Android11模拟器已通过触控、返回、旧WebView预览兼容和离线课程访问。实体手机性能与其他版本兼容性未验证，不得写成真机全面通过。首次根任务下载失败已通过应用专用构建任务解决；复现脚本build-android.ps1已使用该任务。具体安装说明与APK随交付包提供。


## GitHub与并行开发 v2
# 职责与独立交付边界 v2（替代旧分工）
不是按模型强弱笼统分配，而是按错误后果和验证成本分配。复杂状态、物理、记录和系统边界归Codex；重复排版和证据采集归WorkBuddy。

Codex：codex/integration。拥有src/features/practice、src/main.tsx、ProjectHome.tsx、Lessons.tsx、VisualLessons.tsx、MobileApp.ts、物理模型、公共合同/预览/依赖/样式、scripts、android、CI及根文档。优先处理核心正确性与完赛风险，不无理由重写正确模型。只读WorkBuddy专属目录，集成时优先通过适配接线；确需改其内部实现，应在验收后明确接管并记录。

W1 门户展示：workbuddy/portal-ui；独立克隆microwave-wb-portal；端口5181。只改src/features/portal/**和docs/reports/portal/**。只做既定三种view的展示与导航回调，不拥有路由、存储、物理状态。
W2 课程纯布局：workbuddy/lesson-ui；独立克隆microwave-wb-lesson；端口5182。只改src/features/lesson-ui/**和docs/reports/lesson-ui/**。槽布局、间距、字号、响应式；手机参数先采用可访问的内联折叠，不实现模态抽屉、焦点陷阱、系统返回或生命周期。
W3 文案清点：workbuddy/editorial；独立克隆microwave-wb-editorial。不启动开发服务也能做。只改docs/editorial/**和docs/reports/editorial/**。清点界面标签、术语、重复说明和错字，提出带原文件位置的建议，不改应用文案数据、公式、题库和参考课件。
W4 回归证据：workbuddy/qa；独立克隆microwave-wb-qa；端口5184。只改docs/reports/qa/**。在当前基线上运行既有检查、操作截图、录复现路径；不修应用、不改测试期望、不加依赖。没有浏览器/手机时列未验证，不伪造截图。

原workbuddy/practice任务已撤回，src/features/practice归Codex；已有旧分支不要删除或覆盖，保留提交并报告，由Codex评估复用。当前检查远端只有main和codex/integration，未发现已推送WorkBuddy任务分支；不能据此断言其他机器没有本地工作。
所有WorkBuddy任务只依赖已提交基线，不依赖其他任务成果。未完成不阻止Codex使用原界面交付。专属目录不得交叉import；公共合同只读。变更建议写各自报告，不同时编辑根AGENTS和package-lock。

标准Codex Goal见docs/collaboration/CODEX-GOAL.md，统一验收见ACCEPTANCE.md。WorkBuddy启动词及四份辅助任务书在同目录；旧练习任务已撤回。独立预览仍用/collab-preview.html?module=portal或lesson-ui。原PracticeProps合同保留给Codex，不作本轮破坏性修改。
本次是任务和规则更新，未实现新模块或生成新APK。测试与源码基线以实际运行记录为准。
