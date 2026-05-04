---
title: "把个人主页做成一个轻量操作系统"
slug: "lightweight-web-os"
date: "2026-05-02"
summary: "展示型文章，介绍如何用 Astro + CSS 打造一个 OS 风格的个人作品集。"
tags: ["Web OS", "Astro", "CSS", "Showcase"]
category: "Project Notes"
status: "published"
articleStyle: "magazine"
readerDensity: "wide"
toc: true
relatedProject: "w0nderful-lab-os"
---

## 概念

w0nderful Lab OS 不是一个真正的操作系统。它是一个借用 OS 交互语言的个人项目展示站。

打开它，你会看到：

- 顶部的 System Bar，像 macOS 的菜单栏
- 左侧的 Dock，像应用启动器
- 中间的 App Window，像桌面工作区
- Ctrl/Cmd+K 打开的 Command Palette，像 Spotlight

这不是模拟，是隐喻。

## 设计语言

### 深色主题

默认使用深色主题，像终端一样安静。支持 5 种 Palette：Aurora、Graphite、Ubuntu、Mint、Neon Terminal。

### 玻璃质感

所有面板使用 backdrop-filter 毛玻璃效果，但不会过度。Performance 模式下自动关闭。

### 微交互

- 卡片 hover 时轻微上浮
- Dock 图标 hover 时轻微放大
- 页面切换时平滑过渡
- 详情面板滑入动画

所有动画都尊重 `prefers-reduced-motion`。

## 技术栈

- **Astro**：静态站生成器
- **TypeScript**：类型安全
- **CSS Variables**：主题系统
- **Vanilla JavaScript**：无框架依赖
- **GitHub Pages**：免费托管

没有 React、没有 Vue、没有数据库、没有后端。

## 核心功能

### Command Palette

按 Ctrl/Cmd+K 打开命令面板，可以：

- 搜索项目和文章
- 切换主题
- 打开设置
- 执行快捷操作

### Terminal.app

一个真实的终端模拟器，支持：

- 导航命令（home、projects、blog）
- 设置命令（theme、mode、palette）
- 搜索命令（search pdf）
- 项目打开命令（open lab）

### Master-Detail

项目和文章使用 Master-Detail 布局：

- 左侧列表选择
- 右侧详情阅读
- 支持 Focus 模式放大详情
- 支持 Expand 模式并排查看

## 性能

四条命令验证整个项目：

```bash
npm run build    # 构建
npm run check    # 类型检查
npm run self-test  # 文件检查
npm run preflight  # 发布前验证
```

构建时间约 3 秒，生成 8 个静态页面。

## 未来计划

- 更多文章内容
- 文章风格系统
- 在线预览功能
- 更多交互细节
