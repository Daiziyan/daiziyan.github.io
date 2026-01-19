---
title: "Prompt,Agent,MCP & Functional Calling 都是什么？"
date: 2026-01-01
lang: zh
permalink: /posts/agent-intro
tags:
  - introduction
  - ai
  - agent
---

AI 的进步让人焦虑，不自觉地担心会被 AI 取代。作为普通人，我们都太渺小，活在时代的缝隙里，有时候只能眼睁睁的看着时代的洪流奔腾而去。然而这次，与此被裹挟着前行，不如主动选择迎接这场科技的巨变，就从了解什么是 AI Agent 开始。

随着生成式 AI（Generative AI）和智能代理（AI Agent）技术的快速发展，我们经常会遇到几个关键概念：**Prompt（提示）**、**Agent（智能代理）**、**MCP（模型上下文协议）** 和 **Function Calling（函数调用）**。这些概念是现代 AI 系统的核心组成部分，理解它们有助于更好地理解 AI 是如何工作的。本文将用通俗易懂的方式，为 AI 初学者介绍这些概念的含义、区别和联系。

核心观点： System Prompt，User Prompt，AI Agent, AI 模型，Agent tools, Functional calling, MCP, 它们不是彼此取代的关系，而是像齿轮一样一起构成了 AI 自动化协作的完整体系。

## 什么是 AI 模型（AI Model）

在深入其他概念之前，我们先理解 **AI 模型**是什么。

**AI 模型**（特别是大语言模型 LLM，如 GPT、Claude 等）是 AI 系统的"大脑"。它是在大量数据上训练出来的，能够理解自然语言、生成文本、回答问题。但模型本身只是一个"知识库"和"语言生成器"，它需要接收指令（Prompt）才能工作。

### AI 模型的特点

- **知识丰富**：在训练数据中学习了大量知识，但知识有截止日期
- **语言理解**：能够理解自然语言，理解上下文
- **文本生成**：能够生成连贯、有逻辑的文本
- **被动响应**：模型本身不会主动行动，需要接收输入才能产生输出

## 什么是 Prompt（提示）

**Prompt** 是你给 AI 模型的输入指令，用来告诉模型你希望它做什么。简单来说，就是"你告诉 AI 要做什么"，模型根据这个"提示"来生成回答或执行任务。

在实际应用中，Prompt 通常分为两种类型：

### System Prompt（系统提示）

**System Prompt** 是开发者或系统预先设置的指令，用来定义 AI 的角色、行为准则和工作方式。它就像给 AI 设定"人设"和"工作规范"。

**System Prompt 的例子**：

```text
"你是一个专业的技术文档写作助手。你的任务是帮助用户编写清晰、准确的技术文档。
请始终使用专业但易懂的语言，提供具体的例子，并确保信息的准确性。"
```

**System Prompt 的作用**：

- 定义 AI 的角色和身份（如"你是专业的翻译助手"）
- 设定行为准则（如"始终用中文回答"、"保持客观中立"）
- 说明工作方式（如"先理解需求，再提供方案"）
- 通常对用户不可见，由系统管理

### User Prompt（用户提示）

**User Prompt** 是用户每次对话时输入的指令或问题。它是用户与 AI 交互的直接方式。

**User Prompt 的例子**：

- "帮我翻译这段英文"
- "今天北京天气怎么样？"
- "写一篇关于 AI 的文章"

**User Prompt 的特点**：

- 每次对话都可能不同
- 用户可以直接控制
- 结合 System Prompt，共同指导 AI 的行为

### Prompt 的组合使用

在实际应用中，System Prompt 和 User Prompt 会组合使用：

```text
System Prompt: "你是一个专业的编程助手，用简洁的代码和清晰的注释帮助用户。"
User Prompt: "帮我写一个 Python 函数来计算斐波那契数列"
```

AI 模型会同时考虑这两个 Prompt，生成符合角色定位的回答。

### 写好 Prompt 的技巧

1. **明确任务**：清楚说明你希望 AI 做什么
2. **提供上下文**：给出必要的背景信息
3. **指定格式**：说明你期望的输出格式、风格、受众等（如"用简单中文说明"、"写成三个要点"）
4. **分步骤**：对于复杂任务，可以分步骤提示或提供示例

## 什么是 Agent（智能代理）

**Agent** 是一种能自主行动的智能系统。它不仅仅是被动地回答你的提示，而是可以自己做决策、规划多步流程、与外部环境互动，并完成目标任务。

### Agent 的核心特征

- **目标导向**：Agent 有明确的目标和任务，能够主动采取行动，而不仅仅是被动响应
- **环境感知**：能够感知和理解环境（如历史对话、外部数据、工具状态等）
- **工具使用**：能够调用外部工具、函数、API 来获取信息或执行操作
- **状态记忆**：能够记住过去的信息，在多步任务中保持状态连续性

### Agent 的例子

- **AutoGPT**：能够自主规划并执行复杂任务的 AI 代理
- **集成浏览器的 Agent**：能够浏览网页、搜索信息、执行操作的智能助手
- **后台处理 Agent**：能够在后台自动处理事务的智能系统

## 什么是 Agent Tools（Agent 工具）

**Agent Tools**（Agent 工具）是 Agent 可以使用的各种外部工具和服务的集合。这些工具扩展了 Agent 的能力，让它能够完成超出语言生成范围的任务。

### Agent Tools 的类型

- **API 服务**：天气 API、地图 API、翻译 API 等
- **数据库**：MySQL、PostgreSQL、MongoDB 等
- **文件系统**：读取、写入、处理文件
- **计算工具**：计算器、数据分析工具
- **网络工具**：浏览器、搜索引擎
- **其他服务**：邮件服务、日历服务、支付服务等

### Agent Tools 的作用

Agent Tools 让 Agent 能够：

- 获取实时信息（弥补模型知识的时效性限制）
- 执行具体操作（文件操作、系统控制等）
- 连接外部系统（数据库、API、服务等）

## 什么是 Function Calling（函数调用）

**Function Calling**（函数调用，也称为工具调用）是一种机制，让 AI 模型或 Agent 在生成回复的过程中，能够"决定"调用外部函数或工具（Agent Tools）来完成特定操作。

### Function Calling 的工作原理

1. **工具定义**：开发者预先定义可用的工具（Agent Tools），包括工具名称、功能描述、参数结构等
2. **模型决策**：模型根据用户请求（User Prompt），判断是否需要调用某个工具
3. **结构化请求**：模型输出一个结构化的调用请求（通常是 JSON 格式）
4. **执行工具**：系统执行对应的工具（Agent Tool），获取结果
5. **继续处理**：将工具执行结果返回给模型，模型基于结果继续生成回复

### Function Calling 与 Agent Tools 的关系

- **Agent Tools** 是"工具库"（有哪些工具可用）
- **Function Calling** 是"使用工具的方式"（如何调用这些工具）

就像：

- Agent Tools = 工具箱里的各种工具（锤子、螺丝刀、扳手）
- Function Calling = 使用工具的动作（拿起锤子、敲打）

### Function Calling 的作用

- **访问实时数据**：可以获取天气、股票、数据库等实时信息，弥补模型训练数据的时间限制
- **执行具体操作**：可以执行计算、文件操作、系统控制等超出语言生成能力的任务
- **结构化输出**：让输出更结构化，便于程序化处理

### 实际例子

- 查询天气时，通过 Function Calling 调用天气 API（Agent Tool）
- 分析 Excel 表格时，通过 Function Calling 调用数据处理函数（Agent Tool）
- 检索数据库信息时，通过 Function Calling 调用数据库查询函数（Agent Tool）

## 什么是 MCP（Model Context Protocol，模型上下文协议）

**MCP** 是由 Anthropic 在 2024 年 11 月推出的一个开放标准协议，目的是统一 AI 模型（特别是大语言模型 LLM）与外部工具、数据源、系统之间交互的方式。

### MCP 的核心功能

- **标准化通信**：定义客户端（client）和服务端（server）之间的标准通信协议
- **工具管理**：支持工具（actions）、资源（resources）、Prompt 模板等模块化组件
- **解决碎片化问题**：通过统一协议，让不同的 Agent 和工具能够互通，避免每个工具都需要单独集成的麻烦

### MCP 解决的问题

在 MCP 出现之前，每个 Agent 与工具之间的集成都需要定制开发，造成：

- **重复工作**：每个工具、每个 Agent 都要单独编写连接代码
- **碎片化**：不同系统之间难以互通
- **维护困难**：集成代码分散，难以统一管理和维护

MCP 提供了一个通用协议，只要遵守 MCP 标准，不同的 Agent 和工具就能轻松互通。

## 它们的区别与联系

为了更好地理解这些概念，我们用生活中的例子来类比整个 AI 系统：

### 生活类比：AI 系统就像一个智能助手团队

想象一个智能助手团队是如何工作的：

- **AI 模型** = 助手的大脑（知识库和思维能力）
- **System Prompt** = 公司的工作手册（定义助手的角色和工作规范）
- **User Prompt** = 你给助手的任务单（具体要做什么）
- **Agent** = 聪明的助手（能自己规划、执行任务）
- **Agent Tools** = 助手可以使用的工具（手机、电脑、计算器等）
- **Function Calling** = 助手使用工具的动作（拿起手机查天气）
- **MCP** = 工具的统一接口标准（所有工具都用标准接口，方便使用）

### 概念对比表

| 概念 | 核心角色 | 层级关系 | 与其他概念的关系 |
| --- | --- | --- | --- |
| **AI 模型** | AI 系统的"大脑"，提供语言理解和生成能力 | 底层基础 | 接收 Prompt 输入，生成文本输出；Agent 的核心组件 |
| **System Prompt** | 定义 AI 的角色和行为准则 | 配置层 | 影响模型的行为方式；Agent 可以有自己的 System Prompt |
| **User Prompt** | 用户的具体指令和问题 | 输入层 | 用户与 AI 交互的直接方式；Agent 接收 User Prompt 开始工作 |
| **Agent** | 智能代理系统，能自主规划执行任务 | 应用层 | 包含 AI 模型；接收 System/User Prompt；使用 Function Calling 调用 Agent Tools；通过 MCP 访问工具 |
| **Agent Tools** | Agent 可用的工具集合 | 资源层 | 通过 Function Calling 被调用；通过 MCP 协议标准化访问 |
| **Function Calling** | 调用工具的机制和方法 | 机制层 | Agent 使用它来调用 Agent Tools；通过 MCP 协议标准化 |
| **MCP** | 工具访问的标准化协议 | 基础设施层 | 规范 Function Calling 和 Agent Tools 的访问方式；可以管理 Prompt 模板 |

### 它们如何协同工作？

这些概念不是独立的，而是像齿轮一样紧密配合：

1. **AI 模型** 是基础，提供核心能力
2. **System Prompt** 和 **User Prompt** 共同指导 AI 模型的行为
3. **Agent** 是一个完整的系统，包含 AI 模型，接收 Prompt，使用 Function Calling
4. **Agent Tools** 是 Agent 可以使用的工具库
5. **Function Calling** 是 Agent 使用工具的方式
6. **MCP** 是底层协议，规范了工具访问的标准

它们共同构成了一个完整的 AI 自动化协作体系。

## 一个完整的工作流示例

让我们通过一个实际例子，看看所有这些概念是如何协同工作的：

**场景**：用户希望 AI 帮助分析财务数据并生成报告

### 第一步：系统配置（System Prompt）

系统预先设置了 System Prompt，定义 Agent 的角色：

```text
System Prompt: "你是一个专业的财务数据分析助手。你的任务是帮助用户分析财务数据，
生成清晰、准确的分析报告。请使用专业术语，但确保报告易于理解。"
```

### 第二步：用户输入（User Prompt）

用户给出具体的任务：

```text
User Prompt: "帮我写一个分析报告，先从财务数据库获取过去三个月的收入数据，
然后分析趋势并生成图表。"
```

### 第三步：AI 模型处理

- **AI 模型**（如 GPT-4、Claude）接收 System Prompt 和 User Prompt
- 模型理解任务：需要分析财务数据并生成报告
- 但模型本身无法直接访问数据库，需要 Agent 的帮助

### 第四步：Agent 规划和执行

**Agent**（包含 AI 模型）开始工作：

1. **理解任务**：Agent 分析 User Prompt，理解需要完成：数据检索 → 数据分析 → 报告生成
2. **制定计划**：Agent 规划执行步骤：先获取数据，再分析，最后生成报告
3. **识别需要的工具**：Agent 识别需要使用的 **Agent Tools**：
   - 数据库查询工具（`financial_db`）
   - 数据分析工具（`analytics`）
   - 图表生成工具（`chart_generator`）

### 第五步：Function Calling 调用工具

Agent 使用 **Function Calling** 机制调用 **Agent Tools**：

1. **调用数据库工具**：
   - Function Calling 请求：`get_financial_data(start_date, end_date)`
   - 执行 Agent Tool：`financial_db` 工具查询数据库
   - 返回结果：过去三个月的收入数据

2. **调用分析工具**：
   - Function Calling 请求：`analyze_trend(data)`
   - 执行 Agent Tool：`analytics` 工具分析数据趋势
   - 返回结果：趋势分析结果

3. **调用图表工具**：
   - Function Calling 请求：`generate_chart(data)`
   - 执行 Agent Tool：`chart_generator` 工具生成图表
   - 返回结果：可视化图表

### 第六步：通过 MCP 协议标准化访问

所有这些工具调用都通过 **MCP** 协议进行：

- Agent 作为 MCP 客户端
- Agent Tools（`financial_db`、`analytics`、`chart_generator`）通过 MCP 服务器提供
- 所有工具调用都遵循 MCP 标准协议，无需为每个工具单独开发连接代码

### 第七步：生成最终结果

- Agent 将获取的数据、分析结果和图表整合
- **AI 模型**基于 System Prompt 和 User Prompt 的要求，以自然语言生成报告
- Agent 将完整的报告返回给用户

---

**这个例子说明了什么？**

- **AI 模型**：提供语言理解和生成能力
- **System Prompt**：定义 Agent 的角色和工作方式
- **User Prompt**：用户的具体任务需求
- **Agent**：协调整个流程，规划并执行任务
- **Agent Tools**：提供具体功能的工具（数据库、分析、图表）
- **Function Calling**：Agent 调用工具的方式
- **MCP**：标准化工具访问的协议

它们缺一不可，共同完成了这个复杂的任务。

## 为什么这些概念都很重要

理解这些概念，就像理解一个智能工厂的各个组成部分：

- **AI 模型**：是工厂的"大脑"，提供核心的智能能力
- **System Prompt**：是工厂的"规章制度"，定义工作标准和流程
- **User Prompt**：是"生产订单"，告诉工厂要生产什么
- **Agent**：是"智能生产线"，能自动规划、协调、执行任务
- **Agent Tools**：是"生产工具"，提供各种具体功能
- **Function Calling**：是"使用工具的方式"，让生产线能够操作工具
- **MCP**：是"工具接口标准"，让所有工具都能标准化接入

## 总结

### 核心概念快速回顾

1. **AI 模型**：AI 系统的"大脑"，提供语言理解和生成能力
2. **System Prompt**：定义 AI 角色和行为准则的系统级配置
3. **User Prompt**：用户的具体指令和问题
4. **Agent**：智能代理系统，能自主规划、执行多步任务
5. **Agent Tools**：Agent 可以使用的工具集合
6. **Function Calling**：调用工具的机制和方法
7. **MCP**：工具访问的标准化协议

### 它们的关系

这些概念不是彼此取代的关系，而是像齿轮一样，一起构成了 AI 自动化协作的完整体系：

- **AI 模型** 是基础能力层
- **System Prompt** 和 **User Prompt** 是指令层
- **Agent** 是应用层，整合所有能力
- **Agent Tools** 是资源层
- **Function Calling** 是机制层
- **MCP** 是基础设施层

理解它们，你就能更好地理解现代 AI 系统是如何工作的，也能更好地使用和开发 AI 应用。随着 AI 技术的不断发展，这些概念也在持续演进和完善，为构建更强大、更智能的 AI 应用提供基础。

---

**参考资源**：

- [YouTube 视频：Prompt, Agent, MCP & Function Calling 介绍](https://www.youtube.com/watch?v=1UQ8uz4kuIc&t=13s)
- Model Context Protocol 官方文档
- Anthropic 关于 MCP 的发布说明
