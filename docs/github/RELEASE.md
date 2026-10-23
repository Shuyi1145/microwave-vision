# 核心交付 v1.0.1（2026-10-23）

任务：CORE-V1；分支codex/integration；起点4fc8b7a；公共合同v1.1。未修改WorkBuddy专属门户/课程布局/文案/QA目录。远端检查仅main与codex/integration，未发现可供集成的WorkBuddy成果分支。

## 安装与运行

安装包：app/microwave-vision-1.0.1-debug.apk（约8.2MB）。应用标识com.microwavevision.learning，versionCode=2，versionName=1.0.1。调试签名用于参赛安装演示，不代表商店发布。
使用adb install -r <APK路径>覆盖安装；手机也可打开APK按系统提示安装。清除应用数据或卸载会删除本地记录；升级安装应保留记录。安装不需要账号，运行不依赖开发服务器。
网页版：npm.cmd ci，npm.cmd test，npm.cmd run build，npm.cmd run preview；以终端输出的本地地址访问。构建后的课程图片、KaTeX字体、脚本均在dist。本机已有依赖时可直接预览；首次安装依赖需要网络。
安卓复现：准备JDK/SDK与Gradle后运行./build-android.ps1 -ToolRoot <工具目录>；不把local.properties、工具路径、缓存或签名私钥提交Git。

## 修改

1. 原五题与反馈抽至src/features/practice；首次答案锁定，过期事件不能推进，一轮稳定结果id，保存重试按id去重。
2. 保存写入成功后才显示已保存；失败可见并用同一结果重试。保存失败时结果仅在当前页面，离开前必须重试。
3. 保留mw-records-v1的date/score/topic，追加可选id/answers。历史空条目不再使全部记录丢失；损坏集合阻止覆盖并提示读取失败。最多保留50轮。
4. 图片预览关闭后焦点返回原按钮。安卓保留应用标识与旧证书，版本递增。
5. 物理实现未为重构而改写；增加五题解析参考测试：2+j1、0.4+j0.2、20%、VSWR=2.61803398875、向源lambda/8后0.2-j0.4。

## 验收证据

|项目|状态|证据|
|---|---|---|
|全部单元测试|通过|npm.cmd test：5文件27项；包括原21项、状态机2项、存储3项及五题解析1项|
|关键物理边界|通过|physics.test.ts：匹配、短路、开路、纯电抗、半波复现、波叠加；coursePhysics.test.ts：TE00/TM非法、截止、倏逝、导体壁；fieldMaps.test.ts：完整周期参考与零场|
|生产构建|通过|npm.cmd run build；build-android.ps1内部再次执行生产构建|
|网页核心回归|通过|web.json；三种宽度各12路由均无整页横向溢出/KaTeX错误；触屏答题、保存失败重试、刷新记录、预览及焦点，runtimeErrors=[]|
|安卓构建|通过|:app:assembleDebug；90任务；最终构建BUILD SUCCESSFUL|
|签名连续性|通过|apksigner verify：v2=true；证书SHA256为15ceae66f1301c96796fc15c694f26eefef1c0012bd3662e23bd400439f2e1e2，与旧包一致|
|Android11模拟器|通过|android-11.json及android-11-records.png；覆盖安装、断网课程/图片、原生返回、触控、首次80分、单份保存、后台暂停、进程重启记录|
|Android15模拟器|通过|android-15.json及android-15-records.png；同上；飞行模式开启且Wi-Fi关闭|
|实体手机|未验证|小米13（Android16/API36）已连接ADB；首次安装被系统以INSTALL_FAILED_USER_RESTRICTED拒绝，待用户允许USB安装后复验|
|远端CI|通过（首修复提交）|344278b的Web quality，run 39943205685，conclusion=success；最终提交需另核对|
|Git差异格式|通过|git diff --check；最终提交前再次检查|

浏览器复现：node scripts/verify-web.cjs <playwright模块路径> <生产预览URL>，使用本机Edge。安卓复现：node scripts/verify-android.cjs <adb路径> <测试设备序号> <本地转发端口>；脚本会短暂切换飞行模式/Wi-Fi并在结束时恢复，生成报告与截图。应使用测试设备，运行会新增一条80分练习记录。

## 限制与回退

未验证全机型兼容性、实体手机性能、商店发布；不宣称真实仪器测量、AI诊断、教学提升率或获奖保证。未引入OTA、账号或云同步。记录属于当前应用/浏览器本地，暂无跨设备迁移。
生产构建存在Motion的use client忽略提示和主包超过500kB提示，不影响构建通过；性能验收不能以此替代实体机实测。
后台初次检查过早采样失败；修正为确认document.hidden且等待切换稳定，再比较物理波形，随后通过。WebView进程重启后需重连调试端口，脚本加入等待。
回退：源码可从4fc8b7a复现旧版；不要为回退清除用户记录。已安装versionCode=2时，旧版降级可能被系统阻止，优先将回退源码作为更高版本重新构建。证书私钥应由用户本地备份，不能进入仓库。
PR：https://github.com/Shuyi1145/microwave-vision/pull/1 ，保留审阅，不自动合入main。

最终APK SHA256：F235CBB9B2EB6BCB13AF20F864E6FFA9CF130FB7B2C4CCA9D94A90F823A0F87E。网页版备份：app/microwave-vision-1.0.1-web.zip（解压后使用本地HTTP静态服务器访问，不以file协议直接打开）。
