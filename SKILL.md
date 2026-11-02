---
name: product-film-web
description: Create keynote-style HTML product promo films without video-editing experience. Design an original story, scenes, and animations for a product or any subject, with autoplay, pause, seeking, interactive demos, and screen-recording controls. Reuse the PaperSkill film UI by default; use for animated product showcases and introductions, rather than ordinary static slide decks or edits of existing video footage.
---

# Product Film Web

Deliver a locally runnable HTML animation project that users can play, explore, and screen-record. Subjects can include physical products, software, services, courses, technologies, brands, events, or ideas. Use the PaperSkill film's visual language by default: a graphite-black stage, large blue-to-lavender gradient headlines, layered cards, metallic presentation frames, a two-row player with a chapter strip, and a centered brand ending. Follow another style when requested. Build continuous visual storytelling rather than a sequence of static slides.

## Reuse the UI; invent the film

PaperSkill is a reference for the visual shell: stage, typography, palette, materials, frames, and playback controls. Independently design the story, scenes, visual metaphors, actions, transitions, and pacing around the current subject, audience, and communication goal. Be creative with presentation while grounding product facts and claims in evidence.

The example's chapters, shot order, algorithm diagram, pottery metaphor, planning cards, and copy are not mandatory content. Add, remove, reorder, or rewrite scenes and animation modules; do more than swap names, images, and headlines. Make routine creative decisions without asking for approval. Ask only when missing facts or essential assets block meaningful progress. Use the user's requested language for the finished film; English skill instructions do not require English captions.

Match the medium to the subject. Software can use a real interface; physical products can use photography, video, models, and demonstrations; services can show experiences; concepts can show intuitions and examples. Do not force Agent input, algorithm diagrams, PPT sidebars, generation steps, or AI-error disclaimers onto unrelated subjects.

## Gather facts and assets

- Inspect user materials, workspace instructions, images, video, models, branding, and existing films. For software, also inspect its entry point and run/build commands. Other subjects do not require a code repository. When revising a film, retain and edit its existing timeline.
- Infer the audience, main value, approximate duration, and recording needs from context. Ask only about consequential gaps; continue independent work.
- Ground claims in supplied materials, reliable sources, or observed behavior. Distinguish real software, reconstructed interfaces, compressed waiting, and illustrative scenes. Do not invent capabilities, measurements, or guarantees unless the user explicitly requests a fictional concept; label such work accordingly.
- Verify brand names, callable skill names, and repository URLs separately. Use supplied or official logos rather than approximate substitutes.

## Design and implement

1. Draft a compact shot list: purpose, headline, action, asset, hold time, and transition. Choose a structure for this subject; an attention → introduction → value/mechanism → experience → next-step arc is an option, not a fixed sequence.
2. Optionally run `python scripts/init_film.py <new-folder> --brand <name>` for a dependency-free visual shell. Rewrite `config.js`, views, and animation modules around the shot list. The five starter chapters and renderer branches are replaceable demonstrations, not a required structure or finished user product.
3. Drive scenes, typing, pointers, captions, product events, and audio from one master clock. Reconstruct any frame when seeking backward or forward. Independent CSS animation must not continue after pause. See [motion-runtime.md](references/motion-runtime.md).
4. When an algorithm explanation benefits from it, use an overview → highlighted node → visual explanation → return-to-overview rhythm. For scene libraries, page planning, dual templates, or validation loops, consult [algorithm-shots.md](references/algorithm-shots.md). Never pass off a finished screenshot as a planning document.
5. Establish the subject's overall form before close-ups. Prefer same-origin iframes for real software, preserving its important navigation. For physical products and events, favor relevant photos, videos, or models. Keep illustrative and actual content distinguishable. Read [product-and-recording.md](references/product-and-recording.md) for software demonstrations, audio, and recording.

The default shell is described in [paperskill-ui.md](references/paperskill-ui.md). Load `paperskill-theme.css` by default, while creating new narrative and animation content. Reference shot recipes apply only when they fit the subject. The [LUMA example](examples/luma-ai-glasses/README.md) demonstrates an original fictional hardware story within the same UI.

## Visual decisions

- Establish hierarchy with large headlines and dominant imagery. Keep supporting copy necessary and readable. Miniature diagrams should explain behavior rather than add decorative icons.
- Use gradient materials, layering, restrained perspective, light, and shadow for depth. Avoid continuous spinning and expensive blur. Leave space between cards; keep the current subject large and park earlier elements separately when useful.
- For planning or generation scenes, show objectives, explanation choices, layout, and interaction. Show how inputs form outputs; templates and labels must not cover the result.
- Default to short fades. Move shared elements only when continuity and meaning justify it; do not automatically add light curtains, ring metaphors, or corner thumbnails.
- Give important scenes time to be read, including the final one. Treat duration as approximate, report the actual length, and adjust any soundtrack accordingly.

## Verify and deliver

- Provide play/pause, replay, seeking, chapters, speed, optional sound/volume, clean mode, and fullscreen. Hide the native pointer and disable iframe input during playback; allow interaction when paused. Film text must remain unselectable in both states.
- Music is optional. Check the specific track's current license and document its source and conditions. Do not generalize a prior project's license to another track or redistribute third-party music as a reusable skill asset. The starter includes no third-party soundtrack.
- Actually serve the project over HTTP. Check its opening, ending, transitions, core actions, pause, arbitrary seeking, replay, and speed changes. Check input/send, result launch, product interactions, or notes only when present. Look for clipped text, occlusion, ghosting, broken scan lines, and flickering carets.
- If playback stutters, measure frame intervals and script costs before reducing hidden-scene updates, redundant DOM changes, geometry reads, or unnecessary iframes. Preserve important content. Do not add hashes, frozen contracts, baselines, or release gates for this workflow.
- Deliver the project path, run command, preview, inspected screenshot, and actual limitations. Clean mode only hides controls. HTML is not an exported video; do not install recording software without authorization.

Run the starter with `node serve.cjs`; it defaults to `http://127.0.0.1:4178/`. Use `node serve.cjs 4180` if needed. No npm installation is required. Serve the files instead of opening the HTML directly.
