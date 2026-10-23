# GitHub 协作与提交操作
仓库：https://github.com/Shuyi1145/microwave-vision （私有）
克隆地址：https://github.com/Shuyi1145/microwave-vision.git
默认分支：main。每个 WorkBuddy 会话使用独立克隆目录，禁止两模型在同一工作目录切换分支。

## 初次开工（PowerShell）
先执行 git --version、git config --get user.name、git config --get user.email。不要编造作者身份，也不要把访问令牌发到聊天或写入仓库。
以门户任务为例：
```powershell
git clone https://github.com/Shuyi1145/microwave-vision.git D:\GPTProject\microwave-wb-portal
Set-Location D:\GPTProject\microwave-wb-portal
git fetch origin
git switch -c workbuddy/portal-ui origin/main
npm.cmd ci
npm.cmd run dev -- --port 5181
```
已经有同名本地分支时先查 git status 和 git branch -vv，再切换现有分支，不使用 -B 强制重置。远端已有任务分支时用 git switch --track origin/workbuddy/portal-ui；不要从过期目录重新覆盖远端。
另两任务分别使用目录 microwave-wb-lesson、microwave-wb-practice，分支 workbuddy/lesson-ui、workbuddy/practice，端口5182、5183。
启动后访问 /collab-preview.html?module=portal、lesson-ui 或 practice。独立预览已存在，不需要等待主页面接入。

## 验证后按所有权提交
```powershell
npm.cmd test
npm.cmd run build
node scripts/check-boundaries.mjs portal
git diff --check
git status --short
git add src/features/portal docs/reports/portal
git diff --cached --stat
git commit -m "feat(portal): refine light Chinese learning portal"
git push -u origin workbuddy/portal-ui
```
提交前核对 staged 文件不得包含其他任务内容、原始课件全集、APK、node_modules、dist、签名密钥、.env、local.properties、个人代理配置或令牌。不要使用 git add . 代替检查。不要 force push，不要 reset --hard，不要自动合并 main。

## 创建 PR
push成功后在GitHub仓库打开 Compare & pull request，base=main，compare=自己的任务分支。正文应包含目标、改动目录、接口版本、独立预览地址、测试命令和实际结果、390/698/1024截图、已知限制。PR草稿/待集成状态允许，但必须明确是否完成验收。
如果已安装并登录 gh，可使用 gh pr create --base main --head workbuddy/portal-ui --title "门户界面改进" --body-file docs/reports/portal/pr-body.md 。该文件必须先写好，保留实际换行；不要在命令里拼复杂正文。没有gh时用浏览器创建PR即可，不需要安装CLI才能开发。

## 认证失败
若提示未登录、403或无权限，停止推送，不要反复尝试陌生账号。先完成当前本地提交；请用户通过Git Credential Manager、GitHub Desktop或gh auth login登录拥有权限的账号。模型不得要求用户把令牌贴进聊天。私有仓库另一账号需要仓库拥有者添加协作者；同一账号无需新增成员。

## 跟随 main 更新与冲突
先提交或妥善保存自己工作。执行 git fetch origin，git merge origin/main 。有冲突则查明双方职责；只解决自己目录，公共接口冲突报告集成负责人。不要用整文件 ours/theirs 覆盖他人修改。解决后重新运行检查，再普通push。

## 最终联合（Codex集成负责人）
1. 查看每个PR的基线提交、差异、验收报告与CI实际状态，不把push成功当CI成功。
2. 每次只在codex/integration分支合入一个已验收任务，运行测试/构建和对应预览；不得把分支 merge 回 main 来测试。
3. 接入公共入口时由集成方修改main.tsx、ProjectHome.tsx、Lessons.tsx，不要求WorkBuddy反过来改共享文件。
4. 依次完成门户接入、课程面板接入、练习结果适配。顺序只影响最终集成，不影响各任务开工。
5. 再做全站路由、物理边界、离线资源、触屏、返回键与安卓模拟器回归，版本号递增；保留原应用ID与同一签名证书。
6. 人工确认演示版后合入main；用标签标识版本。源码进Git，APK/录屏经确认用GitHub Release或单独交付，密钥不入Git。
