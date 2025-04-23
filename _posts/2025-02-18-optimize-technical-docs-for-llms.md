---
title: 'Optimizing Technical Docs for LLMs'
date: 2025-02-18
permalink: /posts/tech-docs-for-llms
tags:
  - cool posts
  - category1
  - category2
---

Learn from the best practices of companies like OpenAI, CircleCI, and Prisma on optimizing technical documentation for Large Language Models.

Writing AI-friendly and human-readable documentation
======

A recent discussion in the #ai channel touched on how to write documentation that could easily be parsed by large language models (LLMs) but still be nice for humans to read. One participant pointed to a recent somewhat infamous decision to close a proposed change to the Microsoft docs because tables might not work well for an AI chat bot. But no one wanted documentation that was only for machines.

Multiple people commented that focusing on writing well for humans is the most effective way to make it usable for everyone, and everything. People focused on standard documentation practices, such as using structured writing and simple, clear language. Others noted that focusing on making your documentation accessible can also help, as good alternative text for images and clear labels can help tools that don’t interact with the content in the same way as some humans.

Another strategy was to focus on semantics. This could involve exposing semantic types, rather than keeping them hidden in XML tags. It can also mean making sure you chunk your documentation based on meaning when using techniques such as retrieval-augmented generation. Some thought focusing on traditionally structured documents would be enough to solve this.

If you work with a specific tool for chat, talk with the vendor about what works for that tool or check out their docs (such as the [recommendations from kapa.ai](https://www.kapa.ai/blog/optimizing-technical-documentation-for-llms)). If you want to make your content generally available, consider an llms.txt file. In most cases, if you do the minimum and focus on making your documentation useful to humans, the content will be able to shine in any interface.

See more Write the Docs resources about [AI and LLMs](https://www.writethedocs.org/topics/#ai-and-llms).


