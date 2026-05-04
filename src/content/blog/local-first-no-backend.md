---
title: "为什么我更喜欢 Local First 工具"
slug: "local-first-no-backend"
date: "2026-05-04"
summary: "从隐私、成本、可靠性三个角度，聊聊为什么本地优先的工具更适合个人项目。"
tags: ["Local First", "Privacy", "GitHub Pages", "Tools"]
category: "Ideas"
status: "published"
articleStyle: "paper"
readerDensity: "comfortable"
toc: true
---

## 数据应该在哪里

每次用一个在线工具，我都会想：我的数据存在哪里？

如果是一个笔记应用，我的笔记存在它的服务器上。如果是一个项目管理工具，我的任务存在它的数据库里。如果这家公司倒了，我的数据就没了。

Local First 的核心思想是：数据应该存在用户自己的设备上。

## 免费的代价

GitHub Pages 是免费的。Netlify 有免费额度。Vercel 也有。但"免费"从来不是真正的免费——你用你的数据和注意力在付费。

> 当一个产品免费时，你就是产品。

Local First 工具不同。它不需要服务器，不需要数据库，不需要你注册账号。你的数据在你的浏览器里，你的文章在你的 Git 仓库里。

## 可靠性

在线工具有一个致命弱点：它依赖网络。

Local First 工具在离线状态下也能工作。你的设置在 localStorage 里，你的文章在本地文件系统里。网络断了，你还能继续写。

## 实践

w0nderful Lab OS 就是一个 Local First 实践：

- 所有设置保存在 localStorage
- 所有文章是静态 Markdown 文件
- 不上传任何用户数据
- 不需要后端服务器
- 不需要数据库

这种模式不适合所有项目，但适合个人博客和作品集。

## 工具推荐

几个我常用的 Local First 工具：

- **Obsidian**：本地 Markdown 笔记
- **Logseq**：本地大纲笔记
- **Astro**：静态站生成器
- **GitHub Pages**：免费静态托管

它们的共同点是：你的数据在你手里。
