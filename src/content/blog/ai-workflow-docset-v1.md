---
title: "AI 工作流文档集 v1：最小可用协作规范"
slug: "ai-workflow-docset-v1"
date: "2026-05-07"
summary: "整理一套最小可用的 AI 协作开发工作流文档入口与默认约束，便于在不同项目中复用。"
tags: ["AI Agent", "Workflow", "Docs", "Prompting"]
category: "AI Workflow"
status: "published"
articleStyle: "notebook"
readerDensity: "comfortable"
toc: true
---

# AI 工作流文档集（v1）

这是一个“AI 协作开发工作流”的最小可用文档集，用来把你的工作方式固定成标准流程：

- **初始化阶段**：恢复/生成项目专属上下文（`AGENT_HANDOFF.md`）
- **项目阶段**：高智能体拆任务 → 低智能体小步执行 → 你验收 → 循环迭代

本仓库不追求做平台/CLI/后端，只做可复用的 Markdown 标准。

---

## 你需要看的入口（按顺序）

1. `说明书.md`：给 AI 的直管指令（第一阶段/第二阶段“该说什么做什么”）
2. `GLOBAL_SKILL.md`：全局 Skill（跨项目通用规则；默认只读）
3. `AGENT_HANDOFF_TEMPLATE.md`：项目专属 Skill 模板（复制为 `AGENT_HANDOFF.md`）
4. `TASK_PROMPT_TEMPLATE.md`：高智能体给执行模型的一轮任务模板
5. `docs/AI_WORKFLOW_GUIDE.md`：更完整的工作流手册

---

## 文件职责（一句话版）

- `GLOBAL_SKILL.md`：通用规则（不要混入具体项目事实/路径/线上地址）
- `AGENT_HANDOFF.md`：项目事实与约束（可更新，但不要写流水账）
- `TASK_PROMPT_TEMPLATE.md`：把“本轮小任务”写成可执行、可验收、可验证的提示词

---

## 最重要的默认约束（每次都要强调）

- 一轮只做一个小任务
- 不要全仓扫描
- 不要顺手重构无关代码
- 不要编造测试/运行结果
- 除非我明确要求，否则不要修改 `GLOBAL_SKILL.md`

