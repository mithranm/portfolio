---
title: "S2SAlchemy: Offline Speech-to-Speech Translation"
summary: "A deep dive into speech-to-speech (S2S) translation, culminating in S2SAlchemy, a modular pipeline I developed to run entirely offline on consumer hardware like an iPad."
image: "/images/s2salchemy.png"
imageAlt: "Demonstration of S2SAlchemy translating an English quote to Mandarin"
order: 4
projectUrl: "https://docs.google.com/document/d/1uJeKufqz0bwICVl9XAIDhgQJ146TrlVQRaWQlDkX528/edit?usp=sharing"
tags: ["AI", "Machine Translation", "S2S", "TTS", "ASR", "iOS", "Offline First"]
---

This project explores the challenges and breakthroughs in modern translation technology, arguing for the superiority of a modular pipeline approach for preserving a speaker's intent and prosody.

### The Problem: Beyond Literal Translation

While models like Google's Transformer have revolutionized text translation, speech carries much more information than words alone—tone, pitch, rhythm, and pauses convey crucial emotion and intent. Direct end-to-end Speech-to-Speech (S2S) models often struggle to transfer this rich paralinguistic information, risking a loss of the original speaker's nuanced meaning.

### The Solution: A Modular Pipeline

I argue that a pipelined architecture (Speech-to-Text -> Text Translation -> Text-to-Speech) offers a more robust solution. By separating these concerns, we can analyze the source audio's acoustic features and use that metadata to guide the final speech synthesis, preserving both the literal meaning and the emotional intent.

### S2SAlchemy: The Implementation

To prove this concept, I developed **S2SAlchemy**, a complete S2S translation system designed to run **entirely offline** on consumer hardware.

*   **Architecture:** It uses a lightweight ASR model, Apple's on-device Translation API, and my custom, efficient Text-to-Speech engine, **KokoroTTS**.
*   **Performance:** The entire pipeline runs in near real-time on devices as old as a 2021 iPad Pro, consuming less than 2GB of RAM.
*   **Demonstration:** It successfully performs bidirectional translation between American English and Simplified Mandarin. This capability is demonstrated in the video below, where a quote from *Frankenstein* is translated into coherent Mandarin.

**[Watch the YouTube Demo](https://youtu.be/VneIrdBHmYw)**

This project shows that by combining thoughtful architecture with efficient, custom-built components, we can bring high-quality, context-aware translation to resource-constrained environments, making it accessible to a much broader population.

**[Read the Full Paper](https://docs.google.com/document/d/1uJeKufqz0bwICVl9XAIDhgQJ146TrlVQRaWQlDkX528/edit?usp=sharing)**