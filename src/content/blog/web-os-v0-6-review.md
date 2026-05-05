---
title: "把个人主页做成一个轻量 Web OS：w0nderful Lab OS v0.6 复盘"
slug: "web-os-v0-6-review"
date: "2026-05-05"
updated: "2026-05-05"
summary: "从一个普通个人主页，到具备项目展示、Markdown 博客、文章风格系统、OS 动效和发布流程的轻量 Web OS，这篇文章复盘 w0nderful Lab OS v0.6 阶段的设计取舍。"
tags: ["Web OS", "Astro", "GitHub Pages", "Local First", "Project Review"]
category: "Project Review"
status: "published"
articleStyle: "magazine"
readerDensity: "comfortable"
toc: true
---

## 为什么我想把个人主页做成 Web OS

一开始我只是想做一个稍微好看一点的个人主页，能展示项目、放几篇文章、记录一下自己折腾过的东西。

但普通个人主页很容易变成这样：

- 首页放一段自我介绍；
- 项目页放几个卡片；
- 博客页放一些文章标题；
- 底部放 GitHub 链接；
- 整体看起来能用，但没有记忆点。

我不太想做一个“模板味”很重的网站，所以后来方向慢慢变成了：**把个人主页做成一个像桌面系统一样的个人实验室。**

它不是要真的替代操作系统，也不是做复杂窗口管理器，而是借用 OS 的一些体验语言：

- Dock；
- System Bar；
- App Window；
- Command Palette；
- Settings；
- Motion；
- Reader Style；
- Local First；
- No Backend。

最终目标是让用户打开页面时，感觉这不是一个普通 landing page，而像进入了一个属于开发者自己的轻量系统。

> 一个好的个人站，不一定要功能非常多，但它应该让人一眼记住：这是你的东西。

## v0.6 阶段之前，它已经有了什么

在 v0.6 之前，w0nderful Lab OS 已经有了比较完整的 OS 外壳：

| 模块 | 作用 |
|---|---|
| Dock | 作为主要导航入口，像桌面系统的应用栏 |
| System Bar | 显示当前页面、版本、主题等系统信息 |
| Projects.app | 展示开源项目和项目详情 |
| Blog.app | 展示文章列表和文章详情 |
| Timeline.app | 记录项目版本和更新日志 |
| Settings.app | 管理主题、背景、动效和阅读设置 |
| Command Palette | 通过快捷键快速打开页面和功能 |

这些功能让它看起来已经比较像一个 Web OS。

但是，只是“像”还不够。真正的问题是：**它能不能长期使用？**

如果不能稳定发布文章，不能持续记录项目，不能在 GitHub Pages 上低成本维护，那它就只是一个漂亮 Demo。

所以 v0.6 的重点不是继续堆视觉，而是让它成为一个真正可用的个人内容发布站。

## v0.6 的核心变化：从展示页变成内容系统

v0.6 阶段最重要的变化，是把 Blog 从“展示几个写死的文章卡片”，升级成更接近静态博客的内容系统。

现在文章可以通过 Markdown 管理：

```text
src/content/blog/
├── web-os-v0-6-review.md
├── local-first-tools.md
└── github-pages-deploy-log.md
```

每篇文章通过 frontmatter 描述标题、摘要、标签、发布时间、文章风格和阅读设置：

```yaml
---
title: "把个人主页做成一个轻量 Web OS"
slug: "web-os-v0-6-review"
date: "2026-05-05"
summary: "一次 Web OS 风格个人站的设计复盘。"
tags: ["Web OS", "Astro", "GitHub Pages"]
status: "published"
articleStyle: "magazine"
readerDensity: "comfortable"
toc: true
---
```

这样一来，后续发文章的流程就清楚很多：

1. 复制文章模板；
2. 写 Markdown；
3. 填好 frontmatter；
4. commit；
5. push；
6. GitHub Pages 自动部署。

这不是在线后台，但它很稳定，也很适合 GitHub Pages 这种静态站。

## Article Style：让每篇文章有自己的阅读气质

我比较喜欢 v0.6 的一个设计是：文章不只是统一排版，还可以选择自己的展示风格。

目前支持的风格包括：

| articleStyle | 适合内容 |
|---|---|
| `system` | 技术说明、系统文档、项目更新 |
| `paper` | 长文、随笔、经验复盘 |
| `terminal` | 部署日志、命令记录、排错过程 |
| `magazine` | 展示型文章、项目发布、封面感内容 |
| `notebook` | 学习笔记、灵感记录 |
| `minimal` | 极简技术博客、短文、快速记录 |

这篇文章使用的是：

```yaml
articleStyle: "magazine"
```

因为它更像一个阶段性的项目展示和复盘。

我希望后续不同类型的文章可以有不同气质。比如部署记录就应该像终端日志，项目复盘可以更像杂志，学习笔记可以像 notebook。

这比单纯换主题更有意思，因为它让内容本身也参与了网站的 OS 风格。

## 为什么坚持 Local First / No Backend

w0nderful Lab OS 继续坚持：

- 不需要后端；
- 不需要数据库；
- 不需要登录；
- 不上传用户数据；
- 优先使用 localStorage；
- 可以部署到 GitHub Pages。

这个选择很重要。

如果一个个人站为了写文章就引入登录系统、数据库、云存储、鉴权、后台管理，那么它确实会更像 CMS，但维护成本也会立刻上升。

我更希望它像一个开源工具：

```text
Clone
↓
Edit Markdown
↓
Push
↓
Deploy
```

足够简单，才能长期维护。

## 这一阶段最难的不是功能，而是一致性

项目做久了以后，最容易出问题的不是某个按钮坏了，而是数据开始不一致。

比如：

- 首页显示 v0.1.0；
- 子页面显示 v0.6.0；
- Projects 里项目版本停在 v0.4.0；
- Blog 显示 4 篇文章；
- About 显示 5 篇文章；
- Timeline 没有最新版本记录。

这些问题看似小，但会让整个站点显得不成熟。

所以 v0.6.1 做了一轮内容一致性修复，把版本号、项目版本、Timeline、README、Release Notes、self-test、preflight 都同步起来。

我后来意识到，一个项目想显得专业，不只是 UI 好看，还要做到：

- 版本号一致；
- 文档一致；
- 测试一致；
- 发布记录一致；
- 页面数据一致。

这些才是一个开源项目真正的“维护感”。

## OS Motion：让切换不像普通网页

v0.6.2 做了 OS Motion Polish。

之前页面切换、Dock 点击已经有了一些系统感，但 Projects / Blog / Timeline 的右侧详情内容切换还比较硬。

这会带来一种割裂感：

- 外壳像 OS；
- 内容切换像普通网页；
- 系统味道不连续。

所以 v0.6.2 增加了 Detail Panel 的内容切换动画，并在 Settings 中提供了动效设置：

| 设置 | 说明 |
|---|---|
| OS Effects | 控制系统动效总开关 |
| Motion Intensity | Minimal / Balanced / Expressive |
| Detail Transition | Off / Fade / Slide / OS Panel |

这一步的意义不是“让动画更炫”，而是让整个站点的交互语言更统一。

真正的目标是：

> 用户点击任何东西，都像是在同一个系统里完成状态切换，而不是在不同网页模块之间跳转。

## Publishing Workflow：让以后发文章更稳

v0.6.3 做的是 Publishing Workflow Polish。

这个版本新增了文章模板：

```text
docs/ARTICLE_TEMPLATE.md
```

并且增强了 preflight 检查：

- 检查 frontmatter；
- 检查 slug 是否重复；
- 检查 articleStyle 是否合法；
- 检查 draft / published 规则；
- 检查 README 和 Release Notes 版本一致。

这其实是一个很关键的版本。

因为从这里开始，w0nderful Lab OS 不只是能展示文章，而是开始具备“长期写文章”的基础规范。

## 当前我最满意的地方

我最满意的是，它已经形成了自己的气质。

它不是普通博客，也不是传统作品集，而是一个介于二者之间的东西：

- 可以展示项目；
- 可以写文章；
- 可以记录时间线；
- 可以切换阅读风格；
- 可以像系统一样设置视觉和动效；
- 可以通过 GitHub Pages 免费部署；
- 可以保持 Local First。

这种定位比较适合我现在做开源小工具、AI Agent 项目和个人实验记录。

## 当前还不满意的地方

当然，它现在还不完美。

我觉得后续还可以继续优化：

- 真实文章多了以后，标签筛选还要继续打磨；
- 长文阅读时，TOC 可以更聪明；
- SEO、RSS、sitemap 还需要进一步补；
- 以后可以做本地 Article Composer；
- 还可以加入全局搜索；
- 项目页可以继续强化版本和路线图展示；
- Timeline 可以更像系统日志。

但这些都不急。

当前最重要的是：**先用它真实发几篇文章，然后让真实内容倒逼下一轮优化。**

## 如果重新做一次，我会坚持哪些选择

如果重新做一次，我还是会坚持这些原则：

1. **不做后端**
   - GitHub Pages 足够承载这个阶段的目标。

2. **不做登录**
   - 登录系统会让个人站复杂很多。

3. **优先 Markdown**
   - Markdown 是最稳的长期写作格式。

4. **保留 OS 体验**
   - 这是项目的记忆点。

5. **保留测试和 preflight**
   - 小项目也需要发布前检查。

6. **不要过早做编辑器**
   - 先把内容系统跑顺，再做 Article Composer。

## 下一步计划

接下来我更想做的是：

- 写几篇真实文章；
- 继续验证 Blog 阅读体验；
- 补 SEO / RSS / sitemap；
- 做一个本地 Markdown Article Composer；
- 让这个站点真的成为我的个人开源实验室。

如果有一天它能变成这样：

```text
写项目
↓
发文章
↓
记录版本
↓
展示成果
↓
沉淀经验
```

那它就不只是一个网页项目，而是一个长期使用的个人创作系统。

## 总结

w0nderful Lab OS v0.6 阶段最大的变化，不是多了某个具体功能，而是它开始从“好看的网页”转向“可维护的个人内容系统”。

它现在还不是一个完整 CMS，也不应该急着成为 CMS。

现阶段最重要的是：

- 稳定；
- 可写；
- 可读；
- 可部署；
- 可维护；
- 有辨识度。

这就是我目前对它的定位。
