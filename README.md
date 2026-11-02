# Product Film Web

**English** | [简体中文](README.zh-CN.md)

Create a keynote-quality product promo with no editing experience: this skill builds a web studio where you can play animated scenes and record them as a video.

<video src="https://github.com/user-attachments/assets/c0856b06-a438-4490-9b31-4c6911426fb5" width="560" controls preload="metadata"></video>

[Watch the demo video](https://github.com/user-attachments/assets/c0856b06-a438-4490-9b31-4c6911426fb5)

## What it does

Describe a product and provide any useful materials. The AI designs the story, scenes, animation, and pacing, then delivers a local HTML film studio with playback and recording controls.

- Keynote-style visuals: a dark stage, large gradient headlines, depth, and metallic display frames.
- Original storytelling for each subject, including hardware, software, services, courses, brands, or ideas.
- Autoplay, play/pause, seeking, chapter navigation, playback speed, clean mode, and fullscreen.
- Interactive scenes and real product interfaces when appropriate; optional music with synchronized playback.
- A dependency-free starter that runs locally with Node.js, without npm installation.

The built-in visual shell provides a consistent presentation style. The AI designs an original story and animation for each subject. The skill instructions are in English, while the finished film can use the language you request.

## Use the skill

Clone the repository, then install `product-film-web-skill/` into your agent's configured skills directory or import it using your agent's local-skill support:

```sh
git clone https://github.com/happycodingday/product-film-web.git
```

The self-contained skill lives in `product-film-web-skill/` and is invoked as `$product-film-web`. If your agent identifies skills by directory name, name the installed directory `product-film-web`. For example:

```text
Use $product-film-web to create a roughly 60-second launch film for my AI glasses.
Use a polished keynote style and invent an original story and animations for this product.
Include autoplay, pause, chapter navigation, and clean screen-recording mode.
Use Chinese captions. Here are the product details and assets: ...
```

A product description is enough to start. Images, brand assets, a website, a running software project, an audience, or a target duration can make the result more specific. Clearly request a fictional concept if you want the AI to invent the product itself.

## Create a starting project manually

Requires Python 3.9+ for the initializer and Node.js for the local server. Creating a film through an agent also requires an agent that supports skills.

```sh
python product-film-web-skill/scripts/init_film.py my-product-film --brand "My Product"
cd my-product-film
node serve.cjs 4178
```

Open `http://localhost:4178/`. The starter is a runnable visual shell, not a finished film. Rewrite `config.js`, scene views, and animation modules around the product; its example chapters are optional. Do not open the HTML directly from the filesystem.

## Playback and recording

| Control | Action |
| --- | --- |
| Space | Play / pause |
| R | Replay from the beginning |
| Left / right arrow | Change chapter |
| H | Hide / show player controls |
| F | Enter / exit fullscreen |
| Progress bar | Seek to any point |

Use your preferred screen recorder to capture the browser. Enable system audio if you add music. **Clean mode hides controls; it does not start recording.** The output is an HTML project, not an automatically exported MP4.

## Repository layout

```text
product-film-web/
├── product-film-web-skill/    # Self-contained skill package
│   ├── SKILL.md               # English skill instructions
│   ├── agents/openai.yaml     # Skill UI metadata
│   ├── scripts/init_film.py   # Project initializer
│   ├── references/           # Motion, visual, demo, and recording guidance
│   └── assets/film-starter/   # Starter UI and player
├── README.md                  # English guide and demo video
├── README.zh-CN.md             # Chinese guide and demo video
└── LICENSE
```

The video above demonstrates the output. Example projects and video files are not bundled in the repository.

## License

Code is licensed under [MIT](LICENSE). Supply appropriately licensed images, video, and music for your films. No third-party soundtrack is bundled with the starter.
