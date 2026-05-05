---
title: "FxxKPDF：一个本地优先的 PDF 工具是怎样诞生的"
slug: "fxxkpdf-local-pdf-toolkit"
date: "2026-05-05"
updated: "2026-05-05"
summary: "不做云服务、不做登录、不做付费功能，怎么做一个有用的 PDF 工具？这篇聊聊 FxxKPDF 从想法到上线的过程，以及本地优先带来的意外好处。"
tags: ["PDF", "Local First", "No Backend", "Browser API", "Privacy"]
category: "Project Review"
status: "published"
articleStyle: "system"
readerDensity: "comfortable"
toc: true
relatedProject: "fxxkpdf"
---

## 问题的开始

我经常遇到这种情况：

- 扫描的 PDF 太大，传不上传限制 🐞
- 好几份 PDF 要合并成一份，给老板发邮件 📎
- 某页 PDF 要拆出来单独发给别人 ✂️
- 身份证正反面要合成一张图 🪪

每次这种时候，我都要：

1. 打开搜索引擎
2. 搜索「PDF 合并 免费」
3. 跳出来一个看起来像正版的网站
4. 弹窗让我关注公众号 / 注册 / 付费
5. 放弃，去问同事有没有好用的工具

**这太荒谬了。**

现代浏览器早就支持了 PDF 操作的所有 API，为什么还要把数据上传到服务器？

---

## 技术选型：浏览器能做什么

我调研了一下，发现浏览器能做的 PDF 操作远比想象的多：

| 功能 | API | 库 |
|------|-----|---|
| 读取 PDF | PDF.js | 解析渲染 |
| 合并 PDF | pdf-lib | 内存操作 |
| 拆分 PDF | pdf-lib | 页面级操作 |
| 图片转 PDF | pdf-lib + Canvas | 转换后写入 |
| 压缩 PDF | 浏览器原生 + 降采样 | 有限 |

> 关键洞察：**浏览器不是只能看 PDF，它还能改 PDF。**

选型结果：

- **pdf.js**：Mozilla 出品，渲染稳如老狗 📖
- **pdf-lib**：纯 JS 实现，不需要后端 ⚡

这两兄弟一联手，PDF 的半壁江山就在浏览器里搞定了。

---

## 架构设计：Local First

FxxKPDF 的设计原则就三条：

> 1. 数据不离开浏览器 🚫
> 2. 不需要登录，不收集任何信息 🔐
> 3. 断网也能用 🛩️

### 工作流程

```
用户选择文件 → 浏览器读取 → 内存操作 → 生成下载 → 结束
                ↓
          无服务器介入
```

这个架构带来一个额外好处：**快**。

没有上传、没有排队、没有服务器处理，直接本地执行。10MB 的 PDF 合并，1 秒搞定。用户甚至不需要等待「处理中」的动画。

---

## 第一个版本的功能

v0.1 主要做了三件事：

### 1. PDF 合并

选择多个 PDF 文件，按顺序合并成一个。拖拽排序，不满意可以重来。

```javascript
const mergedPdf = await PDFDocument.create();
for (const file of files) {
  const pdf = await PDFDocument.load(file.arrayBuffer());
  const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
  pages.forEach((page) => mergedPdf.addPage(page));
}
```

### 2. PDF 拆分

把一个 PDF 拆成单页，或者按范围拆：

- `1-3` → 取前 3 页
- `5,7,9` → 取第 5、7、9 页
- `5-` → 取第 5 页之后的所有

### 3. 图片转 PDF

上传 JPG / PNG / WebP，自动合成一个 PDF。适合：

- 扫描件转 PDF
- 发票归档
- 截图保存

---

## 意外的收获

做 FxxKPDF 之前，我以为「本地优先」只是一个隐私卖点。做了之后，发现还有其他好处：

### 1. 零成本运维

没有服务器，就没有费用。GitHub Pages 一开，静态文件一推，完事。没有流量费、没有带宽限制、没有运维监控。

### 2. 永远不用担心「服务挂了」

以前用在线 PDF 工具，最怕的是：

- 网站改版了 🎨
- 域名过期了 💀
- 付费墙变高了 💰

FxxKPDF 不存在这些问题。只要浏览器在，工具就在。

### 3. 隐私问题不存在

用户数据全程在自己的机器上处理。我作为开发者，根本接触不到任何文件内容。

> 这不是「我保证不看你数据」，而是「我根本看不到」。

---

## 未来的计划

v0.1 只是起步， roadmap 上还有：

- 🔥 **批量操作**：一次处理 50 个文件，而不是 5 个
- 📖 **PDF 预览**：不用等到下载完再确认内容
- 📱 **移动端适配**：手机也能用，虽然体验会降级
- 🖨️ **页面提取**：不只是拆分，还要能删除特定页面

但核心原则不会变：**本地优先，永不登录**。

---

## 小结

FxxKPDF 不是一个「性感」的项目。它没有 AI、没有区块链、没有酷炫的 UI。

但它解决了一个真实的问题，而且是用一种「老派但扎实」的方式：

> 把工具放回用户手里，而不是绑在服务器上。

如果你也需要一个简单、免费、隐私友好的 PDF 工具，欢迎试试 👉 [FxxKPDF](https://w0nderful666.github.io/FxxKPDF/)。

有问题？提 Issue 📌，我尽量回。