---
title: "一次 GitHub Pages 部署记录"
slug: "github-pages-deployment-log"
date: "2026-05-03"
summary: "从本地构建到 GitHub Pages 部署的完整流程记录，包括踩坑和解决方案。"
tags: ["GitHub Pages", "Deployment", "CI/CD", "Astro"]
category: "Build Logs"
status: "published"
articleStyle: "terminal"
readerDensity: "compact"
toc: true
relatedProject: "w0nderful-lab-os"
---

## 构建流程

本地构建很简单，四条命令：

```bash
npm run build
npm run check
npm run self-test
npm run preflight
```

`build` 生成静态文件到 `dist/` 目录。`check` 做 TypeScript 类型检查。`self-test` 检查必要文件和页面内容。`preflight` 做完整的发布前验证。

## GitHub Actions 配置

部署使用 GitHub Actions，配置在 `.github/workflows/pages.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches:
      - main
      - dev
      - pt
  workflow_dispatch:
```

关键步骤：

1. Checkout 代码
2. 安装 Node.js 20
3. `npm ci` 安装依赖
4. 运行 build / check / self-test / preflight
5. 上传 `dist/` 作为 artifact
6. 部署到 GitHub Pages

## 踩坑记录

### 问题 1：404 错误

部署后页面显示 404。原因是 GitHub Pages 设置为 legacy 模式，直接从分支提供静态文件，但分支里只有源码没有构建产物。

**解决方案**：切换到 workflow 模式，让 GitHub Actions 构建后部署。

### 问题 2：并发部署冲突

dev 和 pt 分支同时推送时，两个 workflow 并发运行，deploy 步骤冲突。

**解决方案**：在 workflow 中设置 `concurrency.group: pages` 和 `cancel-in-progress: false`。

### 问题 3：base path 问题

Astro 配置的 base path 是 `/w0nderful-lab-os`，但某些链接没有加上前缀。

**解决方案**：使用 `withBase()` helper 函数统一处理路径。

## 验证部署

部署成功后，访问 https://w0nderful666.github.io/w0nderful-lab-os/ 验证。

检查清单：

- [x] 首页加载正常
- [x] Dock 导航可用
- [x] Command Palette 可打开
- [x] 主题切换正常
- [x] 移动端适配正常

## 自动化

现在每次推送到 pt 分支，GitHub Actions 会自动：

1. 构建
2. 测试
3. 部署

整个过程大约 2-3 分钟。
