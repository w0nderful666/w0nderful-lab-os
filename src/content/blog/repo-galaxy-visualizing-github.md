---
title: "repo-galaxy-studio：把我的 GitHub 仓库变成一幅星系图"
slug: "repo-galaxy-visualizing-github"
date: "2026-05-05"
updated: "2026-05-05"
summary: "GitHub 仓库太多，想不清楚项目之间的关系怎么办？我做了一个可视化工具，用星系图的方式展示所有仓库。"
tags: ["GitHub", "Visualization", "D3.js", "Portfolio", "Creative"]
category: "Project Review"
status: "published"
articleStyle: "magazine"
readerDensity: "comfortable"
toc: true
relatedProject: "repo-galaxy-studio"
---

## 仓库太多，眼花缭乱

截止到今天，我有 **10 个** 公开的 GitHub 仓库：

- w0nderful-lab-os 🏠
- FxxkPDF 📄
- image-limit-helper 🖼️
- open-tools-starter 📦
- prompt-market 🧠
- profile-glow-studio ✨
- repo-galaxy-studio 🌌
- readme-badge-studio 🏷️
- orbit-bg-kit 🎨
- code-toolkit-lite 🛠️

> 每一个都是亲儿子，每一个都有它的故事。

但问题来了：**怎么向别人展示它们？**

以前是列一个表格：

| 项目 | 描述 | 状态 |
|------|------|------|
| w0nderful-lab-os | 个人实验室 OS | Active |
| FxxKPDF | PDF 工具 | Active |
| ... | ... | ... |

**不够酷。**

---

## 想法来源

一次偶然的机会，我看到了别人的 GitHub 主页用了「Contribution Graph」——那一个个绿色的小格子。

> 等等，既然能用格子可视化贡献，为什么不能用点可视化项目？

我想到了一个画面：**星系**。

每个仓库是一颗星，它们之间有引力、有远近、有明暗。如果把它们画成一张星系图：

- 🌟 大明星 = 重要的项目（featured）
- 🌑 小星星 = 辅助工具
- 🔗 连线 = 项目之间的关联（比如都用同一个技术栈）
- 🎨 不同颜色 = 不同的分类（PDF、Image、AI、Design...）

这不就是一个天然的「作品集展示」吗？

---

## 技术选型

要做可视化，绕不过 D3.js。

> D3.js：数据可视化领域的「瑞士军刀」，几乎所有酷炫的 Web 可视化都是用它做的。

但 D3.js 的学习曲线...懂的都懂。😓

我的策略是：

1. 先做一个**静态版本**：手动输入仓库数据，生成一张固定的图
2. 再考虑**动态版本**：自动从 GitHub API 拉数据

v0.1 先做静态版，验证可行性。

---

## 实现细节

### 布局算法

星系图的核心是「力导向布局」（Force-Directed Layout）：

```javascript
const simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-100))  // 节点互相排斥
  .force('center', d3.forceCenter(width / 2, height / 2))  // 向中心聚集
  .force('collision', d3.forceCollide().radius(30))  // 防止重叠
  .on('tick', ticked);
```

原理很简单：

- 每个节点都有「引力」和「斥力」
- 互相靠近，但不要太近
- 最终达到一个平衡状态

### 交互设计

- 🔍 **hover**：鼠标悬停显示项目详情
- 🖱️ **drag**：拖拽调整位置
- 🔎 **zoom**：缩放查看细节
- 🏷️ **filter**：按分类筛选

---

## 第一版的效果

做出来之后，视觉效果是这样的：

```
        🌟 w0nderful-lab-os
           |
   FxxkPDF ✦───────── orbit-bg-kit
     |           |
     ✦ image-limit-helper
                    |
         prompt-market ✦ readme-badge-studio
              |
        open-tools-starter
```

> 嗯，虽然没有真的星系那么壮观，但已经有那个意思了。🌌

---

## 解决的问题

repo-galaxy-studio 解决了一个实际问题：

**怎么让陌生人在 10 秒内理解你的项目组合？**

以前要读一段文字介绍，现在不用。**直接看图**：

- 颜色区分了类别
- 大小强调了重点
- 位置说明了关系

> 一张图，胜过千行字。📊

---

## 限制与妥协

v0.1 有一些我知道的限制：

| 问题 | 现状 | 未来 |
|------|------|------|
| 数据手动维护 | 每次改项目要手动更新 JSON | 自动从 GitHub API 拉取 |
| 只支持 10 个仓库 | 够用 | 考虑分页 |
| 性能一般 | 100 个节点会卡 | 优化 D3 渲染 |
| 移动端难用 | 暂时不兼容 | 响应式改造 |

> 完美是迭代出来的，不是设计出来的。

---

## 应用场景

除了个人作品集，repo-galaxy-studio 还可以用来：

1. **团队项目展示**：把一个组织的所有仓库可视化
2. **技术栈分析**：通过项目关系看技术选型
3. **学习路径**：可视化某个领域的知识图谱
4. **面试作品展示**：面试时给面试官看，比简历直观

---

## 小结

repo-galaxy-studio 是一个「实验性」的项目。它不解决什么痛点，但它提供了一个**新的视角**。

> 有时候，解决问题的方式不是更努力，而是换一个角度看问题。

如果你也有不少仓库，想用一个特别的方式展示，欢迎试试 👉 [repo-galaxy-studio](https://w0nderful666.github.io/repo-galaxy-studio/)

也欢迎来 GitHub 贡献代码，让它变得更酷 🚀