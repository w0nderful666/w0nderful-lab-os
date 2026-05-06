---
title: "Master–Detail 交互为什么决定了 Web OS 的质感"
slug: "master-detail-os-interaction-review"
date: "2026-05-06"
updated: "2026-05-06"
summary: "Blog、Projects、Timeline 这些 Master–Detail 结构为什么重要。左侧列表、右侧详情、single-scroll reading、floating controls 等细节如何影响「像不像一个系统」的体验。"
tags: ["Master Detail", "OS Motion", "UX", "Frontend"]
category: "Design Notes"
status: "published"
articleStyle: "system"
readerDensity: "comfortable"
toc: true
relatedProject: "w0nderful-lab-os"
---

## 什么是 Master–Detail

大多数「工具类」Web 应用都是 Master–Detail 结构：

- **Master（主面板）**：左侧的列表、目录、导航
- **Detail（详情面板）**：右侧的具体内容

Blog 的文章列表 + 阅读器、Projects 的项目卡片 + 详情、Timeline 的日志流 + 每条记录——这些都是 Master–Detail。

> 一个 Web 应用能不能「像系统」，不在于用了什么主题或动画，而在于 Master–Detail 交互做对了没有。

---

## 核心体验：像打开一个应用

我最早做 w0nderful-lab-os 的时候，Blog 是一个单独的阅读页面，点开一篇文章就跳到新 URL。后来改成了 Master–Detail 同屏：

1. 左边是文章列表
2. 右边是阅读器
3. 页面不跳转，内容动态替换

这个改动看起来简单，但体验完全不一样了——像在操作系统里开两个窗口，而不是在网页之间切换。

### 单页跳转 vs 同屏切换

| 体验 | 单页跳转 | 同屏切换 |
|------|----------|----------|
| 切换速度 | 慢（需要加载新页面） | 快（内容动态替换） |
| 滚动位置 | 重置 | 保持 |
| 状态保留 | 无 | 有 |
| 像应用 | 否 | 是 |

但同屏也有代价：滚动条冲突、布局高度计算、内容切换动画。这些问题解决不好，反而比多页面更差。

---

## 细节一：滚动条谁做主

最棘手的问题：**左侧列表和右侧详情，哪个控制滚动条？**

### 方案 A：各自滚动

左侧列表滚动自己的，右侧详情滚动自己的。这是常见的做法，代码简单，但问题是：

- 右侧内容很长时，页面底部会有大片空白
- 左侧列表滚到底了，右侧可能才开始

### 方案 B：single-scroll reading

右侧详情占满整个可视区域，左侧列表变成「选项卡」。这是我现在用的方案。

```css
.reader-panel {
  max-height: calc(100vh - system-bar-offset);
  overflow-y: auto;
}
```

这带来了新问题：**未打开详情时，隐藏的详情区域也在占高度**。解决方案是给 idle 状态加 `contain: layout size`：

```css
[data-layout="idle"] .detail-panel {
  height: 0;
  contain: layout size;
}
```

---

## 细节二：floating controls

右侧阅读器需要一个「工具栏」：返回列表、展开列表、Focus 模式、Reader Style 切换。

这个工具栏有几个特殊要求：

1. **不占布局**：固定在右侧，不影响主内容
2. **可折叠**：默认收起来，点击 "+" 展开
3. **不遮挡内容**：展开时不推挤布局

我的实现：

```css
.md-reader-toolbar {
  position: fixed;
  right: 12px;
  top: 35vh;
  transform: translateX(calc(100% + 8px)); /* 默认藏在右侧 */
}

.md-reader-toolbar:not(.is-collapsed) {
  transform: translateX(0); /* 展开 */
}
```

这个交互很微妙——展开时不是「显示」，而是「滑入」。用户感觉这是一个悬浮面板，而不是页面的一部分。

---

## 细节三：状态按钮

Focus 按钮的作用是：���我现在专注看详情，把列表收窄」。这个按钮有几个状态：

| 状态 | 左侧宽度 | 右侧宽度 | 场景 |
|----------|----------|----------|------|
| idle | 100% | 0% | 只看列表 |
| focused | 27% | 73% | 正常阅读 |
| expanded | 50% | 50% | 两边同时看 |

这三个状态不是「有无」，而是**比例**。这让 Master–Detail 成了一个可调节的界面，而不是固定的模板。

---

## 细节四：移动端降级

Desktop 上的 Master–Detail，在手机上没法同屏展示。我的策略：

```css
@media (max-width: 760px) {
  .master-detail[data-layout="focused"] {
    display: block;
  }
  .master-panel,
  .detail-panel {
    width: 100%;
  }
}
```

Mobile 上不再做 split-view，而是「点击列表 → 全屏详情 → 点返回」。这不算退化——Mobile 用户本来就不期待同屏。

---

## 细节五：切换动画

切换Master–Detail 内容时（如从文章A切到文章B），动画很重要：

- **不能闪**：内容突然变，用户会觉得错了
- **不能卡**：动画太慢，感觉像卡顿
- **要有层次**：列表先动，还是详情先动？

我的方案：

1. 首先做**布局变化**：Master 宽度缩放
2. 然后**详情滑入**：从右侧进来
3. 最后**内容替换**：用 fade/settle 过渡

```css
[data-layout="focused"] .detail-panel {
  transition:
    flex-basis var(--os-motion-layout-duration) var(--os-motion-ease),
    transform var(--os-motion-layout-duration) var(--os-motion-ease);
}
```

这个节奏感是「系统感」的核心。

---

## 总结：什么是「像系统」

Master–Detail 做好这几个细节，就「像系统」：

1. **同屏切换**：不跳转，内容动态替换
2. **状态可调**：idle / focused / expanded 可自由切换
3. **single-scroll**：右侧内容独自滚动，列表变成选项卡
4. **悬浮工具栏**：不占布局，可折叠
5. **内容切换动画**：有节奏感，不是突然变
6. **Mobile 降级**：不同屏但体验一致

> 「像系统」不是靠主题或动画，而是靠**交互的可预测性**。

用户知道点列表会切详情、点 Focus 会缩放比例、点返回会回去。这些交互是稳定的，界面才是「像系统」的。