# 文章模板 / Article Template

将此文件复制到 `src/content/blog/` 目录下，修改 frontmatter 和正文即可发布新文章。

## 使用方法

1. 复制此模板到 `src/content/blog/your-article-slug.md`
2. 修改 frontmatter 字段（两个 `---` 之间的内容）
3. 编写正文（支持标准 Markdown）
4. 运行 `npm run build` 验证构建
5. 运行 `npm run self-test` 和 `npm run preflight` 验证门禁
6. 推送到 GitHub 触发部署

## 模板内容

```markdown
---
title: "你的文章标题"
slug: "your-article-slug"
date: "2026-05-05"
summary: "一句话描述文章内容，会显示在列表和详情头部。"
tags: ["Tag1", "Tag2", "Tag3"]
category: "Project Notes"
status: "published"
articleStyle: "system"
readerDensity: "comfortable"
toc: true
---

## 第一个小标题

这里是正文内容。可以使用 **粗体**、*斜体*、`行内代码` 等标准 Markdown 语法。

- 列表项 1
- 列表项 2
- 列表项 3

## 第二个小标题

> 这是一段引用文字，适合用来强调重要观点或引用他人的话。

这里是段落内容，可以写技术说明、项目复盘、学习笔记等。

## 代码示例

```bash
npm run build
npm run check
npm run self-test
npm run preflight
```

## 表格示例

| 字段 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| title | 是 | - | 文章标题 |
| slug | 否 | 文件名 | URL 路径 |
| date | 是 | - | 发布日期 |
| status | 否 | published | published 或 draft |

## 第三个小标题

更多正文内容。每篇文章建议至少有 3 个小标题（h2）。

- 使用列表来组织要点
- 使用代码块展示代码
- 使用引用强调观点
- 使用表格整理数据
```

## Frontmatter 字段说明

| 字段 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| title | 是 | - | 文章标题 |
| slug | 否 | 文件名 | URL 路径标识，如 `my-article` |
| date | 是 | - | 发布日期，格式 `YYYY-MM-DD` |
| updated | 否 | - | 最后更新日期 |
| summary | 是 | - | 文章摘要，显示在列表和详情头部 |
| tags | 否 | `[]` | 标签数组，用于筛选和搜索 |
| category | 否 | `General` | 文章分类 |
| status | 否 | `published` | `published` 发布 / `draft` 草稿 |
| articleStyle | 否 | `system` | 文章展示风格 |
| readerDensity | 否 | `comfortable` | 阅读密度 |
| toc | 否 | `false` | 是否显示目录 |
| cover | 否 | - | 封面图路径（预留） |
| relatedProject | 否 | - | 关联项目 slug |

## articleStyle 可选值

- **system** - OS 文档风格，适合技术说明和项目复盘
- **paper** - 纸张阅读风格，段落缩进，适合长文随笔
- **terminal** - 终端日志风格，代码块突出，适合部署记录
- **magazine** - 杂志风格，标题醒目，适合展示型文章
- **notebook** - 笔记风格，虚线边框，适合学习笔记
- **minimal** - 极简风格，干净克制，适合技术博客

## draft 规则

- `status: "draft"` 的文章在生产环境不显示
- 本地开发时可以显示草稿以便预览
- 缺少 `status` 字段时默认视为 `published`
