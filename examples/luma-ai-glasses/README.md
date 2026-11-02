# LUMA AI glasses · concept launch film

**English** | [简体中文](README.zh-CN.md)

A complete **61-second** fictional AI-glasses launch film made with Product Film Web. The film keeps the PaperSkill player and visual language while introducing an original product story. On-screen copy is Chinese; product and street imagery are AI-generated.

## Run

From this directory, with Node.js installed:

```sh
node serve.cjs 4186
```

Open `http://localhost:4186/`. Choose another port if occupied. No npm install is required. Use `?autoplay=1` to play automatically or `?clean=1&autoplay=1` for a clean recording view.

## Scenes

| Time | Scene | Motion |
| --- | --- | --- |
| 0–8s | Look up. Understand the world. | Product reveal, gentle rotation and push-in |
| 8–16s | Glasses with a new intuition | Sensing, conversation, and response highlights |
| 16–26s | See it. Understand it. | First-person scanning and a contextual answer |
| 26–36s | A conversation without barriers | Bilingual speech bubbles and a moving waveform |
| 36–45s | Directions in your view | Flowing AR route and turn cue |
| 45–54s | Keep the moment. Keep living. | Memory cards, then a typed recall question |
| 54–61s | Put the screen down. Open up the world. | Centered product and brand ending |

Space plays/pauses, R replays, H hides controls, F enters fullscreen, and arrow keys navigate chapters. The progress bar supports arbitrary seeking. Pause to select sensing modes in scene two, switch conversations in scene four, or switch destinations in scene five. Clicking a chapter shows a representative frame.

Animations share one clock, including seeking backward and changing playback speed. Clean mode does not start recording; use a separate screen recorder. No BGM or exported video is included.

## Assets and concept status

The product, brand, functions, and AR views are fictional concepts, not a shipping product or hardware benchmark. The film labels itself as a concept demonstration. No sales figures, prices, or invented official website are supplied.

Images are stored locally in `assets/`; the built-in image generation prompts are recorded in [ASSET-PROMPTS.md](ASSET-PROMPTS.md). The demo makes no external font, image, or CDN requests. Code follows the repository's [MIT license](../../LICENSE).
