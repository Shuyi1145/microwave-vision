# 给WorkBuddy的启动提示词（整段复制）
你正在接手《微波视界》的独立并行开发任务。仓库为https://github.com/Shuyi1145/microwave-vision，私有。请先确认用户为本次会话分配的任务：W1门户、W2课程面板或W3诊断练习；若没有分配，默认先做W1，不能同时改三个模块。用户已授权实现、验证、提交并推送你的任务分支，不自动合并main。
请先在独立目录克隆仓库，不要在D:\GPTProject\数媒与Codex共用工作区。W1目录microwave-wb-portal，分支workbuddy/portal-ui；W2目录microwave-wb-lesson，分支workbuddy/lesson-ui；W3目录microwave-wb-practice，分支workbuddy/practice。
根AGENTS.md、docs/collaboration文档均为GB2312，先用Python按该编码读取。必须先读AGENTS.md、docs/collaboration/PLAN.md、CONTRACTS.md、GITHUB.md和对应WORKBUDDY-PORTAL.md/WORKBUDDY-LESSON.md/WORKBUDDY-PRACTICE.md，按其中Goal和逐条验收标准直接实施。
安装在本机的两个Skill位于C:\Users\DarkFlame\.workbuddy\skills；跨机器可读仓库docs/skills下同名文件作为参考。它们是设计指导，不覆盖用户约定。不要等待其他模块，不创建后端接口，不改共享入口/公式/锁文件，不跨目录import别人的新模块。公共改动建议写在你自己的报告里。
在独立预览中完成UI与行为验证，提供真实截图、命令和结果，再按GITHUB.md只提交你的目录。推送后创建以main为目标的PR，报告真实URL与提交SHA。若认证失败，保留本地提交并请求用户在系统凭据管理器中登录，禁止索要明文令牌。不得把尚未集成、未测试内容说成已全站完成。
