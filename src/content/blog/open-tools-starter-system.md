---
title: "open-tools-starter：一个本地优先开源工具的「脚手架」"
slug: "open-tools-starter-system"
date: "2026-05-05"
updated: "2026-05-05"
summary: "当我做了第三个本地优先工具后，发现它们都有相似的结构和流程。open-tools-starter 就是把这种「重复」抽成模板，让新项目一天上线。"
tags: ["Template", "Starter", "Local First", "Astro", "Best Practices"]
category: "Build Notes"
status: "published"
articleStyle: "terminal"
readerDensity: "compact"
toc: true
relatedProject: "open-tools-starter"
---

## 重复的痛

当我做了 FxxKPDF、image-limit-helper、prompt-market 这三个工具后，我发现它们：

```
┌─────────────────────────────────────────┐
│  共同的结构                              │
├─────────────────────────────────────────┤
│  • 同一个 Astro 项目结构                 │
│  • 同一个部署到 GitHub Pages 的流程      │
│  • 同一套 preflight 检查脚本             │
│  • 同一个 README 模板                    │
│  • 同一个 LICENSE 选择                  │
│  • 同一个 .gitignore                    │
│  • 同一个 CNAME / favicon / icon 处理   │
└─────────────────────────────────────────┘
```

每次开新项目，都要：

1. 复制旧项目
2. 删除旧代码
3. 改名字
4. 改配置
5. 改 README
6. 提交，推送

**这不是创新，这是流水线。**

---

## 设计目标

open-tools-starter 要解决一件事：

> **让一个新的本地优先工具，能在 1 小时内从零到上线。**

不是写代码的时间，是处理「杂事」的时间。

### 核心特性

| 特性 | 作用 |
|------|------|
| 标准化目录结构 | 不用再想「文件放哪」 |
| 自动化 preflight | 上线前自动检查 10 项合规 |
| 统一的 README 模板 | 复制粘贴改个名就能用 |
| 零配置部署 | GitHub Actions 自动触发 |
| A-Level 标准 | 满足我自己定义的「可用」底线 |

---

## 目录结构

```
open-tools-starter/
├── .github/workflows/pages.yml   # 自动部署
├── public/
│   ├── favicon.svg               # 统一图标
│   └── manifest.json             # PWA 配置
├── src/
│   ├── pages/
│   │   └── index.astro           # 入口页面
│   ├── components/               # 组件目录
│   └── styles/
│       └── global.css           # 统一样式
├── docs/
│   └── TOOL_SPEC.md              # 工具规格文档
├── scripts/
│   └── preflight.mjs             # 上线检查脚本
├── .gitignore
├── astro.config.mjs
├── package.json
└── README.md
```

这个结构经过了 3 个项目的验证，改动空间很小。

---

## preflight 检查

每次上线前，我会跑这个检查：

```bash
npm run preflight
```

检查项包括：

- ✅ package.json 版本号已填
- ✅ README 包含在线地址
- ✅ README 包含部署说明
- ✅ 没有任何硬编码的测试数据
- ✅ 没有遗漏的 console.log
- ✅ CNAME 文件存在（或已配置自定义域名）
- ✅ 没有敏感信息泄露
- ✅ 构建产物能正常生成
- ✅ 404 页面存在
- ✅ favicon 已配置

> 这不是过度工程，这是**质量底线**。

---

## README 模板

starter 带了一个 README 模板，包含：

```markdown
# Tool Name

> 一句话描述这个工具是做什么的

## Demo

🔗 [在线地址](https://xxx.github.io/xxx/)

## Features

- ✨ 功能 1
- 🔧 功能 2
- 🚀 功能 3

## Stack

- Astro
- Vanilla JS
- GitHub Pages
- Local First, No Backend

## License

MIT
```

每次新建项目，复制进来，改个名字，5 分钟 README 搞定。

---

## 部署流程

```mermaid
graph LR
    A[本地开发] --> B[git push]
    B --> C[GitHub Actions]
    C --> D[Build]
    D --> E[Deploy to Pages]
    E --> F[上线 ✓]
```

不需要手动配置 CI/CD，push 到 main 分支自动触发。

---

## 谁适合用

### ✅ 适合

- 想要快速做一个静态工具的人
- 维护多个小工具的开发者
- 追求「可复制」的项目结构的人

### ❌ 不适合

- 需要复杂后端的工具
- 需要用户登录的系统
- 不想用 GitHub Pages 的人

---

## 未来的想法

目前 starter 是我自己用的，比较「私人订制」。以后可能会：

1. **更通用的模板**：不只是我自己用，任何人都能用
2. **更多框架支持**：目前只有 Astro，可能加 Vite + React
3. **项目评分卡**：自动给项目打分，判断是否达到「A-Level」
4. **一键发布脚本**：不只是 preflight，还有 `npm run release`

> 目标是：**让「做一个新工具」变成一件不需要思考的事**。

---

## 总结

open-tools-starter 的本质是：

> **不要重复已经做过的事。**

当你发现自己在重复做同样的事情时，要么接受它，要么把它自动化。

我选择了后者 👉 [open-tools-starter](https://github.com/w0nderful666/open-tools-starter)