---
title: "w0nderful Lab OS 的设计初衷"
slug: "web-os-project-review"
date: "2026-05-05"
summary: "记录 w0nderful Lab OS 从普通个人主页演进到 Web OS 风格作品集的过程。"
tags: ["Web OS", "Astro", "GitHub Pages", "Design"]
category: "Project Review"
status: "published"
articleStyle: "system"
readerDensity: "comfortable"
toc: true
relatedProject: "w0nderful-lab-os"
---

## 为什么要做一个 OS 风格的个人主页

大部分个人主页都是普通的 landing page：一个 hero section、几个项目卡片、一段简介。这种页面能用，但没有记忆点。

我想做一个不一样的东西——一个打开就像桌面系统的个人项目展示站。不是模拟真正的操作系统，而是借用 OS 的交互语言来组织内容。

## 从 Dock 到 Command Palette

最早的版本只有一个简单的 Dock 导航和几个静态页面。后来逐步加入了：

- System Bar 显示当前状态
- Command Palette 作为全局启动器
- Terminal.app 作为命令行入口
- Master-Detail 布局管理项目和文章
- Theme Palette 和 Background Presets

每一步都不是为了炫技，而是为了让导航更自然。

## 技术选型：Astro + GitHub Pages

选择 Astro 是因为它天生适合静态站。不需要 React、不需要 SSR、不需要数据库。文章用 Markdown 写，构建后直接部署到 GitHub Pages。

```
npm run build
npm run check
npm run self-test
npm run preflight
```

四条命令，从构建到部署，全程本地可验证。

## Local First 的意义

这个项目不上传任何用户数据。所有设置保存在 localStorage，所有文章是静态文件。

> 本地优先不是落后，是一种对用户隐私的尊重。

## 下一步

v0.6.0 引入了 Markdown 文章系统和 Article Style System。下一步计划：

- 更多高质量文章
- 文章搜索增强
- 可能的在线预览功能
- 更多 Theme Palette 选项
