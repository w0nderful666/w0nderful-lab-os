---
title: "AI Skill 使用手册：我该怎么让 AI 按规则修改代码"
slug: "ai-agent-skills-manual"
date: "2026-05-06"
updated: "2026-05-06"
summary: "这份文档总结如何用 w0nderful-agent-skills 让 AI 更稳定地创建项目、接手项目、修 bug、加功能、发版，核心是提示词策略、边界控制和测试门禁。"
tags: ["AI Agent", "Workflow", "Frontend", "Lessons"]
category: "AI Workflow"
status: "published"
articleStyle: "notebook"
readerDensity: "comfortable"
toc: true
relatedProject: "w0nderful-agent-skills"
---

# AI Skill 使用手册：我该怎么让 AI 按规则修改代码

这份文档只解决一个问题：

> 我想用 `w0nderful-agent-skills` 这套规则，让 AI 更稳定地创建项目、接手项目、修 bug、加功能、发版。

你不用每次都想复杂流程，只要按下面步骤来。

---

## 0. 先记住一句话

```
新项目：先读全局规则，再生成项目规则，再写功能。
旧项目：先生成项目手册，再开始修 bug。
修 bug：先读项目规则，再读相关代码，再小步修改。
发版：先检查版本和部署，再 push。
```

---

## 1. 这套规则到底分几类

你只需要记住 3 类文件。

### 1.1 全局规则

位置：

```
w0nderful-agent-skills/
```

作用：

```
告诉 AI：我所有项目都喜欢什么风格、怎么修 bug、怎么发版、哪些事不能做。
```

常见文件：

```
START_HERE_FOR_AI.md
skills/
prompts/
templates/
checklists/
```

什么时候用：

```
新项目开始时
旧项目第一次接入时
复杂 bug 修复时
发版前检查时
服务器 / OpenCode 环境操作时
```

---

### 1.2 项目专属规则

位置在每个具体项目里：

```
AGENTS.md
docs/
scripts/self-test.mjs
scripts/preflight.mjs
```

作用：

```
告诉 AI：这个项目具体怎么运行、怎么写、怎么改、哪些地方不能动。
```

以后每次修改这个项目，优先让 AI 读：

```
AGENTS.md
docs/PROJECT_MAP.md
docs/BUGFIX_GUIDE.md
docs/STYLE_FINGERPRINT.md
docs/CHANGE_PROTOCOL.md
```

---

### 1.3 本次任务提示词

就是你这一次让 AI 做的事情，例如：

```
修复按钮无效
修复 GitHub Pages 部署
新增导入 JSON
优化移动端
发版检查
```

作用：

```
告诉 AI：这次具体要改什么。
```

---

## 2. 新项目怎么用

适合场景：

```
我准备从 0 做一个新工具 / 新网页 / 新 GitHub 项目。
```

### 第一步：把这段发给 AI

```md
请先阅读我的全局规则：

- w0nderful-agent-skills/START_HERE_FOR_AI.md
- skills/w0nderful-project-style/SKILL.md
- skills/frontend-local-tool/SKILL.md
- skills/slow-quality-agent/SKILL.md
- prompts/new-project-bootstrap.md

现在我要创建一个新项目。

项目名称：这里写项目名  
项目定位：这里写这个项目是干什么的  

要求：

1. 先创建项目专属规则，不要直接只写功能代码。
2. 必须创建：
   - AGENTS.md
   - docs/PROJECT_CONTRACT.md
   - docs/PROJECT_MAP.md 或 docs/ARCHITECTURE.md
   - docs/UI_STYLE_GUIDE.md
   - docs/CODE_CONVENTIONS.md
   - docs/STYLE_FINGERPRINT.md
   - docs/BUGFIX_GUIDE.md 或 docs/CHANGE_PROTOCOL.md
   - docs/AGENT_HANDOFF.md
   - docs/DECISION_LOG.md
   - scripts/self-test.mjs
   - scripts/preflight.mjs
   - README.md
   - RELEASE_NOTES.md

3. 项目规则必须针对当前项目定制，不要写空泛模板。
4. 项目优先：
   - 纯前端
   - Local First
   - No Backend
   - GitHub Pages Ready
   - localStorage 保存
   - README 完整
   - RELEASE_NOTES 完整
   - self-test / preflight 完整

5. 实现功能后运行：
   - npm run build
   - npm run check
   - npm run self-test
   - npm run preflight

6. 不要自动 push。
```

---

### 第二步：等 AI 做完后，看最终报告

你重点看这几项：

```
是否创建 AGENTS.md
是否创建 docs/
是否创建 self-test / preflight
build 是否通过
check 是否通过
self-test 是否通过
preflight 是否通过
是否没有自动 push
```

---

### 第三步：如果结果正常，再让它提交

确��没问题后再发：

```md
可以提交并推送到 main。

推送前请先说明：

1. commit message
2. 会推送到哪个分支
3. 是否会触发 GitHub Pages 部署
4. 当前测试是否全部通过
```

---

## 3. 旧项目第一次接入怎么用

适合场景：

```
我已经有一个项目了，现在想让 AI 以后能稳定接手。
```

不要一上来就让 AI 修 bug。
先让它生成项目手册。

### 直接把这段发给 AI

```md
请进入 Slow Quality Mode。

当前是一个已有项目。现在不要急着修 bug，先做一次轻量项目接手扫描，生成后续修 bug 用的项目手册。

请先读取我的全局规则：

- w0nderful-agent-skills/START_HERE_FOR_AI.md
- skills/slow-quality-agent/SKILL.md
- prompts/project-contract-refresh.md

然后读取当前项目关键文件：

- package.json
- README.md
- RELEASE_NOTES.md
- vite.config.ts / vite.config.js / vite.config.mjs，如果存在
- src 入口文件
- src/App 相关文件
- 主要 components
- 主要 styles
- scripts/self-test.mjs，如果存在
- scripts/preflight.mjs，如果存在
- .github/workflows/，如果存在

不要全仓大扫描。
不要重构项目。
不要新增功能。
不要替换技术栈。

请创建或更新：

- AGENTS.md
- docs/PROJECT_MAP.md
- docs/BUGFIX_GUIDE.md
- docs/STYLE_FINGERPRINT.md
- docs/DECISION_LOG.md

要求：

1. 文档必须根据当前项目真实代码写。
2. 不要写空泛内容。
3. 写清楚项目入口、主要组件、数据保存方式、样式结构、部署配置。
4. 写清楚以后 AI 修 bug 时应该先读哪些文件。
5. 写清楚哪些地方不能乱改。
6. 完成后运行：
   - npm run build
   - npm run check
   - npm run self-test
   - npm run preflight

如果某个命令不存在，请报告，不要写假脚本糊弄。

最终报告只写：

1. 读取了哪些文件
2. 创建或更新了哪些文档
3. 当前项目结构摘要
4. 后续修 bug 应该先读哪些文件
5. 测试结果
6. 已知风险

不要自动 push。
```

---

## 4. 普通修 bug 怎么用

适合场景：

```
页面有 bug
按钮没反应
保存失败
样式错位
刷新后数据丢失
功能异常
```

### 修 bug 固定流程

```
先读项目规则
再读相关代码
先分析根因
再给修改方案
最后小步修改
```

### 直接把这段发给 AI

```md
请进入 Slow Quality Mode 修复 bug。

请先读取当前项目：

- AGENTS.md
- docs/PROJECT_MAP.md
- docs/BUGFIX_GUIDE.md
- docs/STYLE_FINGERPRINT.md
- docs/CHANGE_PROTOCOL.md，如果存在

然后只读取和这个 bug 相关的源码文件，不要全仓大扫描。

## Bug 描述

这里写 bug 是什么。

## 当前表现

这里写现在发生了什么。

## 预期表现

这里写应该是什么效果。

## 复现步骤

1. 第一步
2. 第二步
3. 第三步

## 要求

1. 先分析根因，不要直接改。
2. 先说明准备修改哪些文件。
3. 使用最小改动修复。
4. 不允许大规模重构。
5. 不允许引入新框架。
6. 不允许引入项目中没出现过的新实现方式。
7. 不允许破坏现有 UI 风格。
8. 不允许删除已有功能。
9. 不允许修改测试来掩盖问题。
10. 修复后运行：
    - npm run build
    - npm run check
    - npm run self-test
    - npm run preflight

最终报告只写：

1. 根因
2. 修改文件
3. 修改内容
4. 为什么符合现有项目风格
5. 测试结果
6. 已知风险

不要自动 push。
```

---

## 5. 新增功能怎么用

适合场景：

```
我要给已有项目加一个新功能。
```

### 直接把这段发给 AI

```md
请进入 Slow Quality Mode 新增功能。

请先读取：

- AGENTS.md
- docs/PROJECT_MAP.md
- docs/STYLE_FINGERPRINT.md
- docs/UI_STYLE_GUIDE.md，如果存在
- docs/CODE_CONVENTIONS.md，如果存在
- docs/CHANGE_PROTOCOL.md，如果存在

## 新功能描述

这里写我要新增的功能。

## 要求

1. 新功能必须融入现有架构。
2. 优先复用已有组件。
3. 优先复用已有样式。
4. 不允许新增一套不同风格的 UI。
5. 不允许新增空壳按钮。
6. 不允许大规模重构。
7. 不允许引入大型依赖。
8. 必要时更新 README.md。
9. 必要时更新 RELEASE_NOTES.md。
10. 必要时更新 self-test / preflight。
11. 完成后运行：
    - npm run build
    - npm run check
    - npm run self-test
    - npm run preflight

最终报告只写：

1. 新增了什么功能
2. 修改了哪些文件
3. 为什么符合现有项目风格
4. 是否更新测试
5. 测试结果
6. 已知风险

不要自动 push。
```

---

## 6. 修 GitHub Pages 部署怎么用

适合场景：

```
GitHub Pages 404
页面白屏
资源 404
Actions 部署失败
线上地址打不开
```

### 直接把这段发给 AI

```md
请进入 Slow Quality Mode，修复 GitHub Pages 部署问题。

请先读取：

- AGENTS.md，如果存在
- README.md
- package.json
- vite.config.ts / vite.config.js / vite.config.mjs，如果存在
- .github/workflows/ 下所有 workflow
- scripts/self-test.mjs，如果存在
- scripts/preflight.mjs，如果存在
- RELEASE_NOTES.md

## 项目信息

GitHub 用户名：w0nderful666  
仓库名：这里写仓库名  
预期线上地址：https://w0nderful666.github.io/这里写仓库名/

## 重点检查

1. 如果是 Vite 项目，检查 vite base 是否正确：

   base 应该是：

   /这里写仓库名/

2. 检查是否有 GitHub Pages workflow。

3. workflow 应该满足：
   - push 到 main 自动部署
   - 支持 workflow_dispatch
   - 使用 Node.js 20
   - 安装依赖
   - 运行 build
   - 上传 dist 或实际构建产物
   - 使用 GitHub Pages artifact 部署
   - permissions 包含：
     - contents: read
     - pages: write
     - id-token: write

4. 最终报告提醒我手动确认：

   GitHub 仓库 Settings → Pages → Source = GitHub Actions

## 禁止事项

- 不要重构项目
- 不要改业务功能
- 不要新增后端
- 不要提交 dist
- 不要自动 push

## 修复后运行

- npm run build
- npm run check
- npm run self-test
- npm run preflight

最终报告只写：

1. 部署失败根因
2. 修改了哪些文件
3. vite base 是否修复
4. workflow 是否修复
5. 是否需要我手动设置 Pages Source
6. 测试结果
7. 预期线上地址
8. 建议 commit message

不要自动 push。
```

---

## 7. 发版前怎么用

适合场景：

```
准备发布 v0.x.x
准备 push 到 main
准备让 GitHub Pages 部署
准备创建 Release
```

### 直接把这段发给 AI

```md
请进入 Release Check Mode。

请先读取：

- AGENTS.md
- package.json
- README.md
- RELEASE_NOTES.md
- vite.config.ts / vite.config.js / vite.config.mjs，如果存在
- .github/workflows/ 下所有 workflow
- scripts/self-test.mjs
- scripts/preflight.mjs
- docs/PROJECT_MAP.md，如果存在
- docs/DECISION_LOG.md，如果存在

## 目标版本

这里写版本号，例如 v0.1.0。

## 请检查

1. package.json version 是否正确。
2. README 是否同步。
3. RELEASE_NOTES 是否有当前版本记录。
4. 页面显示版本是否同步，如果项目有显示版本。
5. GitHub Pages 地址是否正确。
6. Vite base 是否正确。
7. workflow 是否正确。
8. Local First / No Backend / 隐私说明是否完整。
9. 是否误提交 dist。
10. 是否有未提交的重要文件。
11. build / check / self-test / preflight 是否通过。

不要只用 HEAD~1 判断基线。

## 运行

- npm run build
- npm run check
- npm run self-test
- npm run preflight

最终报告只写：

1. 当前版本
2. 修改了哪些文件
3. 检查结果
4. 测试结果
5. 是否可以发布
6. 是否需要我手动确认 GitHub Pages 设置
7. 建议 commit message
8. 是否建议 push

不要自动 push。
不要自动 release。
```

---

## 8. 让第二个 AI 审查怎么用

适合场景：

```
一个 AI 改完了，我想让另一个 AI 看看有没有乱改。
```

### 直接把这段发给第二个 AI

```md
请进入 Agent Review Mode。

本轮只审查，不要修改文件。

请读取：

- AGENTS.md
- docs/PROJECT_MAP.md
- docs/BUGFIX_GUIDE.md
- docs/STYLE_FINGERPRINT.md
- docs/UI_STYLE_GUIDE.md，如果存在
- docs/CODE_CONVENTIONS.md，如果存在
- 本次修改涉及的文件

请检查：

1. 是否违反项目规则。
2. 是否破坏 UI 风格。
3. 是否引入第二套实现方式。
4. 是否修改无关文件。
5. 是否删除已有功能。
6. 是否删除动画或交互细节。
7. 是否修改测试来掩盖问题。
8. 是否存在临时 hack。
9. 是否新增依赖但理由不足。
10. 是否测试不足。

最终结论只能是以下三种之一：

- 可以合并
- 需要小修
- 建议回退

请说明理由。

不要修改文件。
```

---

## 9. 服务器 / OpenCode / 纯 IPv6 环境怎么用

适合场景：

```
在服务器上跑 OpenCode
在纯 IPv6 小主机上启动网页
配置端口访问
排查 Web 服务无法访问
```

### 直接把这段发给 AI

```md
请进入 IPv6 / OpenCode Safe Work Mode。

请先读取：

- skills/ipv6-opencode-server/SKILL.md
- prompts/opencode-ipv6-safe-work.md

要求：

1. 不要随意修改 SSH。
2. 不要随意修改防火墙。
3. 不要随意修改系统网络。
4. 不要直接运行 warp-cli connect。
5. 如果已有 /root/warp-safe-connect.sh，优先使用该脚本。
6. Web 服务要监听 IPv6，例如 :: 或 [::]。
7. 不要只监听 127.0.0.1。
8. 命令尽量少量分步。
9. 出错先看日志，不要盲目重装。
10. 不要自动执行危险命令。

如果需要我执行命令，请一次只给少量命令，并说明每条命令的作用。
```

---

## 10. 每次任务结束后要不要更新项目文档

小 bug 不一定需要。

下面这些情况需要更新：

```
新增大功能
修复关键 bug
改变 UI 风格
改变数据结构
改变部署方式
改变版本规则
踩了一个以后要避免的坑
```

### 直接发给 AI

```md
请更新项目接手文档。

请读取：

- AGENTS.md
- docs/PROJECT_MAP.md
- docs/BUGFIX_GUIDE.md
- docs/STYLE_FINGERPRINT.md
- docs/DECISION_LOG.md

根据本轮真实改动，只做必要补充。

要求：

1. 不要重写全部文档。
2. 不要写空泛内容。
3. 只记录真实新增的结构、规则、坑点和注意事项。
4. 更新 docs/DECISION_LOG.md。
5. 如果影响后续 AI 接手，更新 docs/AGENT_HANDOFF.md 或 docs/BUGFIX_GUIDE.md。

最终报告只写：

1. 更新了哪些文档
2. 记录了哪些新规则
3. 后续 AI 需要注意什么
```

---

## 11. 每次到底该选哪个流程

### 我要做新项目

用：

```
第 2 章：新项目怎么用
```

---

### 我已经有项目，但还没有规则

用：

```
第 3 章：旧项目第一次接入怎么用
```

---

### 我要修 bug

用：

```
第 4 章：普通修 bug 怎么用
```

---

### 我要加功能

用：

```
第 5 章：新增功能怎么用
```

---

### GitHub Pages 打不开

用：

```
第 6 章：修 GitHub Pages 部署怎么用
```

---

### 我要发版

用：

```
第 7 章：发版前怎么用
```

---

### 我担心 AI 改乱了

用：

```
第 8 章：让第二个 AI 审查怎么用
```

---

### 我在服务器 / OpenCode 上操作

用：

```
第 9 章：服务器 / OpenCode / 纯 IPv6 环境怎么用
```

---

## 12. 最短使用口诀

```
新项目：先全局规则，再项目规则，再写功能。

旧项目：先项目手册，再修 bug。

修 bug：先读 AGENTS.md，再读 docs，再读相关代码。

加功能：先看现有风格，再融入进去。

部署坏：先查 base，再查 workflow，再查 Pages Source。

发版前：先查版本文档，再跑测试。

不确定：先让 AI 分析，不要让它直接改。
```

---

## 13. 最重要的禁止事项

无论什么任务，都尽量加上这些话：

```
不要大规模重构。
不要替换技术栈。
不要引入大型依赖。
不要删除已有功能。
不要删除已有测试。
不要为了修 bug 破坏 UI 风格。
不要修改无关文件。
不要自动 push。
不要自动 release。
不要修改 SSH、WARP、防火墙、系统网络配置。
```

---

## 14. 最简单的理解

```
全局 Skill
= 我的通用开发习惯

项目 AGENTS.md / docs/
= 这个项目自己的说明书

任务提示词
= 这次具体让 AI 做���么
```

最终目的：

```
让 AI 改代码更稳，而不是更快。
让项目能长期维护，而不是一次性生成完就乱掉。
```