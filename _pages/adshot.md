---
layout: page
permalink: /adshot/
title: "AdShot"
description: "Benchmarking Multimodal Large Language Models for Video Advertisement Clipping"
nav: false
---

<!-- Project page for the NeurIPS 2026 poster. The URL to give NeurIPS is:
     https://wenxie18.github.io/adshot/
     TODO: fill in the paper PDF / arXiv link and the public code repo below. -->

<div style="font-size:0.82rem;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;color:#b8232f;margin-bottom:0.6rem;">
NeurIPS 2026 &nbsp;·&nbsp; Evaluations &amp; Datasets Track &nbsp;·&nbsp; Poster
</div>

**Wen Xie**<sup>1</sup>, Om Rastogi<sup>1</sup>, Sai Siddhartha Vivek Dhir Rangoju<sup>1</sup>, Gijs Overgoor<sup>2</sup>, Yakov Bart<sup>1</sup>, Sarah Ostadabbas<sup>1</sup>

<sup>1</sup>Northeastern University &nbsp;&nbsp; <sup>2</sup>Southern Methodist University

<div style="margin:1.4rem 0;display:flex;gap:0.6rem;flex-wrap:wrap;">
  <a href="https://huggingface.co/datasets/omrastogi/adshot_benchmark" target="_blank"
     style="padding:0.45rem 0.95rem;border:1px solid #d9dee7;border-radius:999px;font-size:0.9rem;font-weight:600;text-decoration:none;">🤗 Benchmark</a>
  <!-- <a href="PAPER_URL" target="_blank" style="padding:0.45rem 0.95rem;border:1px solid #d9dee7;border-radius:999px;font-size:0.9rem;font-weight:600;text-decoration:none;">📄 Paper</a> -->
  <!-- <a href="CODE_URL" target="_blank" style="padding:0.45rem 0.95rem;border:1px solid #d9dee7;border-radius:999px;font-size:0.9rem;font-weight:600;text-decoration:none;">💻 Code</a> -->
</div>

---

## The problem

Advertisers release the same campaign at several durations — most often 30 and 15 seconds. Producing the shorter cut means deciding, shot by shot, what survives: slow, repetitive editorial work repeated across the thousands of ads a brand makes.

Ads are an unusually hard case for video models. A 30-second spot packs **10–20 shots of only 1–3 seconds each**, and every shot plays a strategic role — informing, persuading, or prompting action. Good clipping is not "keep the highlights": it has to preserve a balanced message under a hard time budget.

## The benchmark

**AdShot** contains **823 professionally edited ad pairs** — a 30-second source ad and the 15-second cutdown released by the same brand — spanning **194 brands across 17 industries**.

Because both versions are publicly released finished products, pairing them recovers the editor's real decisions at no annotation cost. The ground truth is not a proxy or a crowd label: it is the edit a brand approved, paid for, and put on air.

Pairs are built by detecting shot boundaries with AutoShot, embedding each shot with Swin3D, and matching 30s to 15s shots by clustering. Two annotators independently reviewed 50 pairs and agreed on all 401 shot judgments; automated matching agreed with human judgment **98.2%** of the time. Every shot also carries 18 binary content labels grouped into *action*, *information*, *emotion*, and *imagery*.

<div style="margin:1.5rem 0;">
  <img src="/assets/img/2026NeurIPS_example.png" alt="Model selection versus the professional editor's cut" style="width:100%;border:1px solid #d9dee7;border-radius:4px;">
  <div style="font-size:0.85rem;color:#4a5568;margin-top:0.5rem;">
    <b>Blue</b> = shot selected by Qwen3-VL 32B. <b>Yellow</b> = shot kept by the professional editor. Both markers = a correct match; blue only = over-selection; yellow only = a miss.
  </div>
</div>

## What we found

We evaluated **15 MLLMs** (13 video-only, 2 audio-visual, 7B–72B) zero-shot on shot-selection accuracy, duration adherence, and content preservation.

**1. Architecture matters more than scale.** A 32B model beats a 72B one, and 7–8B audio-visual models nearly match the best video-only model at a third of the parameters. Nine of the fifteen models beat a random baseline (F1 0.503) and six fall below it — including the largest model evaluated. The ability to extract editorial signal is model-dependent, not a property of MLLMs in general.

**2. Duration control is the weak point.** Mean absolute duration error is **5.39 seconds** against a ±1 second tolerance, mostly overshoot. High F1 is usually bought by over-selecting: the top-scoring model runs about 12 seconds long.

**3. Every model edits with the same slant.** All 15 over-select *information*- and *emotion*-focused shots and under-select *action* and *imagery*, relative to the professional edit. Scale does not fix it — a 72B model shows the same bias as an 8B one. A strong accuracy score can coexist with a systematically mis-composed ad.

<div style="margin:1.5rem 0;">
  <img src="/assets/img/2026NeurIPS_contentbias.png" alt="Content feature divergence across models" style="width:100%;border:1px solid #d9dee7;border-radius:4px;">
  <div style="font-size:0.85rem;color:#4a5568;margin-top:0.5rem;">
    Divergence from professional edits per content dimension, across all evaluated models.
  </div>
</div>

Audio helps too: removing the audio channel from the same audio-visual model drops F1 by up to 0.083, driven by recall, and the gain holds in 14 of 17 industries.

## What it means

MLLMs can already shorten an editor's shortlist, but not run unsupervised — they overshoot the clock and quietly rebalance the message. They are useful as assistants with a human in the loop, and AdShot's paired edits are built to fine-tune them into something better.

## Dataset

The benchmark is available on [Hugging Face](https://huggingface.co/datasets/omrastogi/adshot_benchmark) under CC BY-NC 4.0. It includes shot boundaries, the ground-truth shot matching between each 30s/15s pair, 18 content-feature labels per shot, and derived per-shot keyframes and audio for the source ads. No source video is redistributed; the full ads can be retrieved from YouTube via its Data API.

## Citation

```bibtex
@inproceedings{xie2026adshot,
  title     = {AdShot: Benchmarking Multimodal Large Language Models
               for Video Advertisement Clipping},
  author    = {Xie, Wen and Rastogi, Om and Rangoju, Sai Siddhartha Vivek Dhir
               and Overgoor, Gijs and Bart, Yakov and Ostadabbas, Sarah},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS),
               Evaluations and Datasets Track},
  year      = {2026}
}
```
