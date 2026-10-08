---
title: QR Code Best Practices: Size, Contrast and Error Correction
description: Make QR codes that scan the first time. Learn the minimum size, color contrast rules and when to use higher error correction.
date: 2026-09-28
tags: qr codes, design
tools: qr-code-generator
---
A QR code that fails to scan is worse than no QR code. Most failures come from a handful of avoidable mistakes.

## Keep the contrast high

Scanners look for dark modules on a light background. Black on white is safest. If you use brand colors, keep the foreground much darker than the background, and avoid inverting the pair.

## Leave the quiet zone

The empty border around the code is part of the code. Crop it and many phones will refuse to scan. A border of four modules is the standard.

## Size it for the distance

A rough rule: the code should be about one tenth of the scanning distance. A code on a flyer read from 30 cm needs to be around 3 cm wide, and a poster scanned from 3 metres needs roughly 30 cm.

## Choose error correction deliberately

- **L** recovers about 7 percent damage and produces the smallest, simplest code.
- **M** (15 percent) fits most uses.
- **Q** and **H** (25 and 30 percent) suit printed codes that may get scuffed or carry a logo.

Higher levels make the code denser, so use them only when needed.

## Shorter content scans faster

A short URL creates a simpler pattern than a long one. If your link is long, use a short redirect. You can test your design with the [QR Code Generator](/qr-code-generator) and always scan the printed result with at least two phones before publishing.
