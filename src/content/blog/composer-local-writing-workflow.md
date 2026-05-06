---
title: "Article Composer：一个无后端的本地写作工作流"
slug: "composer-local-writing-workflow"
date: "2026-05-06"
updated: "2026-05-06"
summary: "介绍 Article Composer 的设计思路：在网页里写 Markdown、填写 frontmatter、实时预览、保存本地草稿、复制 Markdown、下载 .md、手动提交 GitHub。为什么暂时不做自动 push。"
tags: ["Article Composer", "Markdown", "Local First", "Writing"]
category: "Build Notes"
status: "published"
articleStyle: "minimal"
readerDensity: "comfortable"
toc: true
relatedProject: "w0nderful-lab-os"
---

## 写作工作流的痛点

我在 w0nderful-lab-os 上写 Blog，通常的流程是：

1. 在本地新建一个 `.md` 文件
2. 用 VS Code 打开
3. 写 frontmatter
4. 写正文
5. `git add` + `git commit` + `git push`
6. 等 GitHub Pages 部署

这个流程没问题，但我需要一个中间步骤：**在网页里预览和调试 Markdown**。

VS Code 的预览插件和 GitHub Pages 的渲染不完全一致。有时候在 VS Code 里看着没问题，部署后就崩了。所以我需要一个**网页端的编辑器**——Article Composer。

---

## Composer 的定位

Article Composer 不是 CMS，不是博客后台，不是 WordPress。它只有一个目的：

> 在浏览器里写 Markdown，生成可以直接提交到 GitHub 的文件。

没有登录、没有数据库、没有后台管理。所有数据都在浏览器本地。

### 功能列表

| 功能 | 状态 | 说明 |
|----------|------|------|
| Markdown 编辑器 | 完整 | 纯文本区，手动写 Markdown |
| frontmatter 表单 | 完整 | title、slug、date、tags 等 |
| 实时预览 | 完整 | 模拟 GitHub Pages 渲染 |
| 复制 Markdown | 完整 | 复制到剪贴板 |
| 下载 .md | 完整 | 下载文件到本地 |
| 保存草稿 | 完整 | localStorage |
| 导入本地 .md | 完整 | 打开本地文件 |

---

## 技术实现

### 1. 编辑器

就是一个 `<textarea>`，没有富文本编辑器的花哨功能：

```html
<textarea
  id="composer-body"
  placeholder="在这里写 Markdown..."
></textarea>
```

用户必须手动写 Markdown 语法。这是有意的约束——不想做一个「所见即所得」编辑器，因为：

1. Markdown 和 HTML 的映射不是一对一的
2. 「所见即所得」容易让人忘记 Markdown 语法
3. 简单编辑器更容易保持一致性

### 2. 实时预览

预览就是渲染 Markdown + frontmatter。我用的是 Astro 的 ArticleShell 组件：

```astro
<ArticleShell articleStyle={style} readerDensity={density}>
  {children}
</ArticleShell>
```

这个预览不是 100% 准确（字体、间距略有差异），但足够检查：

- 标题层级是否正确
- 列表是否嵌套
- 表格是否溢出
- 代码块是否换行

### 3. 草稿存储

草稿存在 `localStorage` 里，key 是 `w0nderful-lab-os.{slug}.draft`：

```js
const saveDraft = (slug, content) => {
  localStorage.setItem(`w0nderful-lab-os.${slug}.draft`, content);
};

const loadDraft = (slug) => {
  return localStorage.getItem(`w0nderful-lab-os.${slug}.draft`);
};
```

为什么是 localStorage 而不是服务器？

1. **无后端**：不需要数据库
2. **隐私**：草稿存在自己浏览器里
3. **简单**：不需要同步逻辑

草稿不会自动保存，用户需要手动点「保存草稿」。

### 4. 导出

导出有两种方式：

**方式 A：复制到剪贴板**

```js
const copyMarkdown = async () => {
  const markdown = generateMarkdown();
  await navigator.clipboard.writeText(markdown);
};
```

**方式 B：下载文件**

```js
const downloadMarkdown = () => {
  const markdown = generateMarkdown();
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}.md`;
  a.click();
};
```

---

## 为什么不做自动提交

这是最常见的问题：「能不能加一个 GitHub Token，点按钮就自动 push？」

我的答案是**暂时不做**，原因有四个：

### 1. 安全性

GitHub Token 需要写入仓库。如果 Token 泄露，任何人都可以删除你的代码。

- 本地开发：Token 存在本地，不会传到服务器
- 网页端：如果 Token 存在浏览器里，每次 API 请求都会暴露

### 2. 复杂性

自动提交不是「点一个按钮」那么简单：

- 选择分支
- 处理冲突
- 失败重试
- 提交信息规范
- CI/CD 状态反馈

这只是「保存」。如果要「发布」，还要改 `status: published`、更新 `date`。

### 3. 工作流

我的工作流不需要「点按钮就发布」：

1. 本地或网页端写草稿
2. 复制 / 下载 `.md` 文件
3. 在 IDE 里打开
4. 检查、调整、改满意
5. `git add` + `commit` + `push`

这个流程慢，但**可控**。我知道每一步发生了什么。

### 4. 理念

w0nderful-lab-os 的核心理念是 **Local First**：

- 数据存在本地（Markdown 文件）
- 代码存在本地（Git 仓库）
- 发布只是「同步」

如果加了自动提交，这个项目的「无后端」属性就变味了。

---

## 未来的可能性

不做自动提交，不代表以后不做。但优先级的逻辑是：

1. ✅ Markdown 编辑器 + 预览
2. ✅ 草稿存储
3. ✅ 导出为 .md
4. ⏳ GitHub Token（安全存储方案）
5. ⏳ 自动提交（可选功能）

第 4 和 5 是「可以做」，不是「必须做」。我更倾向于保持简单，除非有人明确需要这个功能。

---

## 使用示例

### 场景一：在咖啡店写文章

我坐在咖啡店，用 iPad 的浏览器打开 Article Composer。写完一段后，点「保存草稿」。回家用电脑打开 IDE，从 localStorage 导入草稿，继续修改。

### 场景二：在手机上看预览

朋友发来消息，说之前的文章某个表格乱了。我打开 Composer，导入那个 .md 文件，切换到「Mobile」预览模式检查。

### 场景三：导出发给朋友

我写完一篇文章，想让朋友帮忙校对。点「复制 Markdown」，贴到微信或邮件里。朋友用 VS Code 打开，帮我改。

---

## 总结

Article Composer 的定位不是一个「完整的博客后台」，而是一个「写作工具」。它的价值在于：

1. **预览**：在浏览器里看到渲染效果
2. **草稿**：本地保存，不用担心丢失
3. **导出**：生成标准 Markdown 文件
4. **无后端**：数据都在自己手里

> 最简单的工具往往是最可靠的。