---
title: "一次 AI Agent + GitHub Pages 的部署记录：从构建到 preflight"
slug: "github-pages-ai-agent-deploy-log"
date: "2026-05-05"
updated: "2026-05-05"
summary: "这是一篇偏部署日志风格的文章，记录使用 AI Agent 维护 w0nderful Lab OS 时，如何通过 build、check、self-test、preflight 和 GitHub Pages 完成稳定发布。"
tags: ["Deployment", "GitHub Pages", "AI Agent", "Astro", "Preflight"]
category: "Deploy Log"
status: "published"
articleStyle: "terminal"
readerDensity: "wide"
toc: true
---

## 背景

这篇文章记录一次比较完整的发布流程。

项目是：

```text
w0nderful-lab-os
```

定位是：

```text
OS-themed personal blog, article publishing system, and open-source lab hub.
```

部署目标是 GitHub Pages。

维护方式主要依赖 AI Agent 协助修改代码，但最后必须通过本地门禁和 GitHub Pages 部署验证。

这篇文章不追求写得像教程，而是更像一次真实的终端部署日志和复盘。

## 发布前先确认目标

这次发布之前，我先明确了几个原则：

- 不要每轮都全仓库扫描；
- 不要重复检查已经稳定的功能；
- 不要为了小改动重构整个项目；
- 不要引入后端、数据库、登录系统；
- 不要提交 `dist`；
- 不要提交 `node_modules`；
- 每次版本升级必须同步文档和测试断言；
- 任何改动都必须通过完整门禁。

> AI Agent 很适合做重复性修改，但前提是任务边界足够清楚。  
> 如果提示词太散，它会消耗大量 token 去重新理解项目。

## 当前稳定基线

发布前，项目已经具备以下能力：

| 能力 | 状态 |
|---|---|
| Astro 静态站 | 已完成 |
| GitHub Pages 部署 | 已完成 |
| Blog Markdown | 已完成 |
| Article Style System | 已完成 |
| Reader Style | 已完成 |
| Master–Detail Focus | 已完成 |
| OS Motion Language | 已完成 |
| Settings Motion | 已完成 |
| README 发布流程 | 已完成 |
| self-test / preflight | 已完成 |

这意味着后续的小版本优化，不应该再从零开始理解整个项目。

正确方式是：**每轮只围绕一个明确目标进行修改。**

## 固定检查文件

后续每次小版本，我都会要求 Agent 先检查这些核心文件：

```text
src/data/site.ts
package.json
src/data/projects.ts
src/data/timeline.ts
README.md
RELEASE_NOTES.md
scripts/self-test.mjs
scripts/preflight.mjs
```

这些文件控制了项目最容易不一致的地方：

- 站点版本；
- package 版本；
- 项目卡片版本；
- Timeline 发布记录；
- README 说明；
- Release Notes；
- 自测断言；
- 预检规则。

只要这些文件不同步，项目就会出现“页面看起来能用，但细节不专业”的问题。

## 一次标准发布流程

下面是比较理想的发布流程。

### 1. 确认当前状态

```bash
git status
git branch --show-current
git log --oneline -5
```

目标是确认：

- 当前分支是否正确；
- 工作树是否干净；
- 最近提交是否符合预期；
- 有没有未提交文件。

如果工作树不干净，不应该直接开改。

### 2. 安装依赖

如果是新的环境，需要先安装依赖：

```bash
npm install
```

如果依赖已经存在，不需要每次都重新安装。

### 3. 本地构建

```bash
npm run build
```

这个步骤主要检查 Astro 构建是否成功。

如果构建失败，通常优先看：

- 内容集合 schema；
- Markdown frontmatter；
- import 路径；
- base path；
- 组件语法。

### 4. 类型和框架检查

```bash
npm run check
```

这个步骤主要检查 Astro / TypeScript 层面的问题。

偶尔可能会有 hint，但只要没有 error，一般可以继续。

### 5. 项目自测

```bash
npm run self-test
```

`self-test` 更像项目自身的规则检查。

例如：

- 版本号是否正确；
- 必要文件是否存在；
- README 是否包含关键说明；
- 文章模板是否存在；
- 核心组件是否存在。

### 6. 发布前预检

```bash
npm run preflight
```

`preflight` 更像发布前的质量门禁。

例如：

- frontmatter 是否完整；
- slug 是否重复；
- articleStyle 是否合法；
- 是否存在错误账号名；
- 是否存在 `href="#"`；
- 是否误提交 `dist` 或 `node_modules`。

## 为什么需要 self-test 和 preflight

一开始我也觉得小项目没必要写这么多检查。

但随着功能越来越多，问题会变得很隐蔽。

比如：

```text
首页版本号是 v0.1.0
Projects 版本号是 v0.4.0
package.json 是 0.6.0
README 写的是 v0.5.0
Release Notes 又写了 v0.6.1
```

这种问题不会导致构建失败，但会让项目看起来非常不专业。

所以我现在更倾向于把这些一致性规则写进脚本。

机器检查比人眼反复检查更可靠。

## 一次典型输出

一个比较理想的发布报告应该像这样：

```text
版本：v0.6.3

修改文件：
- docs/ARTICLE_TEMPLATE.md
- README.md
- scripts/self-test.mjs
- scripts/preflight.mjs
- src/pages/blog/index.astro
- src/data/site.ts
- package.json
- src/data/projects.ts
- src/data/timeline.ts
- RELEASE_NOTES.md

验证：
- build PASS
- check PASS
- self-test PASS 58/58
- preflight PASS 131/131

部署：
- GitHub Pages success
```

我不希望 Agent 每次贴几百行日志。

最有价值的信息是：

- 改了什么；
- 为什么改；
- 测试是否通过；
- 还有什么问题。

## 发布过程中最容易踩的坑

### 版本号忘记同步

这是最常见的问题。

需要同步：

```text
src/data/site.ts
package.json
src/data/projects.ts
src/data/timeline.ts
README.md
RELEASE_NOTES.md
scripts/self-test.mjs
scripts/preflight.mjs
```

其中任何一个漏了，都会出现信息不一致。

### 文章 frontmatter 写错

Markdown 文章最容易漏字段：

```yaml
title:
date:
summary:
tags:
status:
articleStyle:
```

尤其是 `articleStyle`，如果写成不存在的值，页面可能构建失败，或者样式回退。

合法值应该类似：

```text
system
paper
terminal
magazine
notebook
minimal
```

### slug 重复

如果两篇文章使用同一个 slug，深链和 Copy Link 都可能出现混乱。

所以 preflight 必须检查 slug 唯一性。

### 草稿误发布

`status: "draft"` 的文章不应该出现在生产列表里。

这一点要通过 Blog 数据读取逻辑和 preflight 双重保证。

### 过度改动

AI Agent 有时候会“顺手优化”无关文件。

这很危险。

小版本应该坚持：

```text
One target per release.
```

一次只解决一个问题。

## 我的省 token 规则

为了避免 AI Agent 每次消耗太多上下文，我现在会在提示词里加上省 token 规则。

核心是：

```text
不要全仓库大扫描。
只读取固定基线文件和本轮目标相关文件。
不要重复解释已经稳定的架构。
不要贴完整日志。
不要贴大段源码。
不要自动 push。
```

这样做不仅省 token，也能降低误改风险。

## 一个适合本项目的发布清单

下面是我目前比较认可的发布前 checklist：

- [ ] 当前分支正确；
- [ ] 工作树状态确认；
- [ ] 版本号同步；
- [ ] README 更新；
- [ ] RELEASE_NOTES 更新；
- [ ] Timeline 增加当前版本记录；
- [ ] Projects 中当前项目版本同步；
- [ ] self-test 断言同步；
- [ ] preflight 断言同步；
- [ ] `npm run build` 通过；
- [ ] `npm run check` 通过；
- [ ] `npm run self-test` 通过；
- [ ] `npm run preflight` 通过；
- [ ] GitHub Pages 部署成功；
- [ ] 线上页面简单冒烟验证。

这张表看起来有点长，但真正执行起来并不复杂。

## 为什么仍然选择 GitHub Pages

GitHub Pages 的优势很明显：

| 优点 | 说明 |
|---|---|
| 免费 | 对个人项目足够 |
| 静态部署 | 稳定、简单 |
| 和 GitHub 仓库天然绑定 | push 后自动发布 |
| 适合开源项目 | README、Release、Pages 一体 |
| 不需要服务器 | 维护压力低 |

缺点也有：

- 没有原生后台；
- 不能直接在线写文章；
- 动态能力有限；
- 搜索、评论、登录都要额外设计。

但对当前阶段来说，这些缺点反而是约束。

它能迫使项目保持简单。

## 后续可能的自动化方向

以后可以做一个本地 Article Composer。

它不需要登录，也不需要后端，只做这些：

1. 填标题；
2. 填摘要；
3. 选择标签；
4. 选择 `articleStyle`；
5. 写 Markdown 正文；
6. 实时预览；
7. 一键复制完整 `.md`；
8. 一键下载 `.md` 文件。

然后仍然手动放进：

```text
src/content/blog/
```

再 commit / push。

这比做在线后台更安全，也更符合 Local First。

## 这次部署给我的经验

这次部署最大的经验是：

> AI Agent 能力很强，但项目规则必须写清楚。

如果规则不清楚，它会花很多 token 去探索、猜测、重复检查。

如果规则清楚，它就能很快完成目标，而且不容易误改。

所以对这个项目来说，真正重要的不只是代码，还有这些工程约束：

- 版本同步规则；
- 发布流程；
- preflight 检查；
- 文章模板；
- README 说明；
- Release Notes；
- Timeline 记录。

这些东西共同构成了项目的“维护系统”。

## 总结

w0nderful Lab OS 现在的部署流程已经比较清晰：

```text
写内容
↓
检查字段
↓
构建
↓
自测
↓
预检
↓
提交
↓
部署
↓
线上验证
```

这套流程不复杂，但足够稳定。

如果后续继续坚持小版本、单目标、强检查的方式，这个项目就能慢慢从一个漂亮网页变成一个真正长期可维护的个人开源实验室。
