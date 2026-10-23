# 并行开发计划 v2：核心由Codex负责
用户最新要求：Codex执行最重要的部分，WorkBuddy承担较简单、重复且可独立验收的辅助任务。此计划取代旧W3练习开发和旧W2复杂抽屉要求。

总Goal：完成可安装、离线可演示、物理/评分准确、核心学习闭环完整的参赛版本。详细可执行提示词见CODEX-GOAL.md；验收见ACCEPTANCE.md；文件边界见OWNERSHIP.md。
Codex先核对基线及P0，再修核心，保持可运行版本；WorkBuddy并行做W1门户展示、W2纯布局、W3文案清点、W4回归证据。复杂的诊断评分/记录、物理模型、图形触控、模态焦点/返回、安卓/签名/CI均由Codex负责。
辅助任务没交付时，Codex继续使用现有界面，不等待也不重复抢写其目录。已验收组件通过固定props接线，文案建议审查后再应用，QA缺陷由Codex分级修复。每任务单独PR，不要求集体完成再提交。
WorkBuddy开工先读WORKBUDDY-START.md，再选对应任务；只有一个会话默认W1，多个会话分别独立克隆目录。不要在同一目录来回切分支并行。
当前已完成核心评分/保存及手机生命周期修复，W1/W2/W3/W4成果已审查集成，29项单元测试通过。最终1.0.4的APK、网页与各设备验收以docs/delivery/RELEASE.md及同目录报告为准，不能以21项历史测试代替。当前APK无OTA，OTA后置。
GitHub工作流见GITHUB.md；先推codex/integration和各自任务分支。main通过PR审阅，不自动合入。发布到应用商店或公开仓库不在本轮授权范围。

固定协作基线标签：collaboration-v2。main尚未含v2时，各WorkBuddy任务可从该标签创建独立分支，避免依赖持续变化的集成分支。先git fetch origin --tags并核对标签存在；没有标签不要编造SHA。越界检查在v2尚未合main时自动比较该标签，合main后改比较origin/main；也可显式传入实际基线SHA作为第三参数。不需等待其他功能PR完成。
