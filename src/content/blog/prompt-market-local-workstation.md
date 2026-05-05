---
title: "prompt-market：一个没有服务器的 AI 提示词工作站"
slug: "prompt-market-local-workstation"
date: "2026-05-05"
updated: "2026-05-05"
summary: "不用登录、不用付费、不用担心数据被出售，怎么做一个 AI 提示词管理工具？这篇聊聊 prompt-market 的设计思路和实现细节。"
tags: ["AI", "Prompting", "Local First", "Creative Workflow", "No Backend"]
category: "Project Review"
status: "published"
articleStyle: "paper"
readerDensity: "comfortable"
toc: true
relatedProject: "prompt-market"
---

## 混乱的提示词

用 AI 生成图片一段时间后，我发现了一个问题：

> 好的提示词散了满地，没有组织。

- 存在微信聊天记录里 🛰️
- 存在笔记软件的某个角落 📝
- 存在某个 txt 文件里 📄
- 存在脑子里，但忘了怎么写的 🧠

每次想用「上次那个很灵的赛博朋克风格」时，根本找不到。

---

## 解决思路

我需要的是一个**本地优先的提示词管理工具**，它要满足：

1. **能收藏**：看到好的提示词，复制进来
2. **能整理**：分类、标签、加备注
3. **能对比**：同一主题的多个变体，放在一起看
4. **能导出**：一键复制，或者打包下载
5. **不联网也能用**：数据全在本地

> 核心原则：**我的提示词，只有我能看**。

---

## 功能设计

### 1. 提示词卡片

每个提示词就是一个卡片：

```yaml
标题: "赛博朋克城市"
标签: ["城市", "夜景", "赛博"]
内容: |
  cyberpunk city, neon lights, rain, reflection,
  8k, detailed, unreal engine 5, cinematic lighting
备注: "加了 'unreal engine 5' 之后细节提升明显"
```

### 2. 变体对比

一个主题可以有多个版本：

| 版本 | 提示词 | 适用场景 |
|------|--------|----------|
| 精简版 | `city, night, neon` | 快速出图 |
| 细节版 | `city, night, neon, 8k, detailed...` | 高质量输出 |
| 风格版 | `city, night, neon, anime style` | 特定风格 |

点击 tab 切换，一目了然。

### 3. 导出功能

选中几个卡片，一键导出：

- **复制**：Markdown 格式复制到剪贴板
- **打包**：下载一个 `.txt` 文件
- **分享**：生成一个本地可打开的链接（URL 参数）

> 导出不需要登录，不需要付费，直接给。

---

## 技术实现

### 数据存储

用 `localStorage` 存所有数据：

```javascript
const prompts = JSON.parse(localStorage.getItem('prompts') || '[]');

// 保存
localStorage.setItem('prompts', JSON.stringify(prompts));
```

优点：

- 浏览器自带，不需要额外库
- 断网也能读写
- 换个浏览器就丢了（也算一种「隐私保护」😅）

### 导入导出

用纯前端实现文件读写：

```javascript
// 导出
const blob = new Blob([markdownContent], { type: 'text/markdown' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'prompts.txt';
a.click();
```

没有服务器，文件直接从浏览器生成。

---

## 界面设计

prompt-market 的 UI 追求一个「工作站」的感觉：

- 左侧：分类目录
- 中间：提示词卡片列表
- 右侧：编辑器和预览

> 三栏布局，像一个缩小版的 Photoshop 🎨

配色用了深色模式，因为晚上用的多 👻

---

## 隐私与边界

做这个工具的过程中，我反复想一个问题：

**prompt-market 需要联网吗？**

答案：**不需要。**

- 提示词的生成发生在 AI 服务商那里，不在我这里
- 我只是帮你**管理**提示词，不是**执行**AI
- 数据全程保存在你的浏览器本地存储里

> 这是一个「工具」，不是「服务」。

---

## 未来计划

v0.1 只是基础功能， roadmap 上还有：

- 🔍 **全文搜索**：快速找到想要的内容
- 📦 **提示词包**：预设分类，如「人像」「风景」「UI 设计」
- 🌐 **URL 分享**：通过 URL 参数分享一组提示词（不存服务器）
- 📱 **移动端**：手机也能管理

---

## 小结

prompt-market 不是什么高大上的 AI 产品。它只是一个：

> **帮你把散乱的提示词整理起来的工具。**

但正因为它足够简单，所以：

- 不用钱 💰
- 不用注册 📧
- 不用看广告 🚫
- 不用担心数据被卖 📵

如果你也是 AI 绘画/写作的重度用户，欢迎试试 👉 [prompt-market](https://w0nderful666.github.io/prompt-market/)

欢迎来 GitHub 提 Issue，也欢迎贡献代码 🙌