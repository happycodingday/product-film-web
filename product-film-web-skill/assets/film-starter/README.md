# Product Film Web starter

Requires Node.js. Start a local HTTP server:

```sh
node serve.cjs
```

Open http://localhost:4178/. If that port is occupied, run `node serve.cjs 4180`. No npm install is needed; do not open the HTML directly.

The default `launch-theme.css` provides a graphite stage, gradient headlines, layered cards, metallic frames, lower player controls, and numbered chapters. The starter text is illustrative; customize it for the product.

Only the UI is reused. Independently design the story, scenes, visual treatment, and pacing for the subject. The five example chapters in `config.js` and rendering branches in `film.js` may be added to, removed, reordered, or replaced with new animation modules. Do more than change text and images.

Set the subject in `config.js`: `brand` may be a topic, `heroImage` and `resultImage` accept images, `logoUrl` holds the logo, `features` describes relevant highlights, and `steps`/`scenes` are editable. The default `showcase` mode does not force software operation; select `agent` and configure `prompt`/`productUrl` when appropriate. Same-origin software may connect through `window.productAdapter`. Other subjects need no software URL. Replace placeholders and ground promotional claims before delivery.

Space plays/pauses; R replays; H hides controls; F enters fullscreen; arrow keys change chapters. Seeking is available in the progress bar. Clean mode does not start recording: start a separate screen recorder and include system sound if needed. Audible playback may require clicking Play. Pause to interact with an integrated real product.
