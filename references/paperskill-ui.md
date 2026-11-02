# Reuse the PaperSkill UI; create a new subject's story

The starter loads `paperskill-theme.css` by default. Reuse its appearance and playback interaction, while independently designing the content, scenes, and animation around the subject. These compositions are options, not a required shot list:

- A 1600×900 graphite-black stage, scaled proportionally as a whole.
- A subject label at the upper left, large white headlines with blue/lavender gradient emphasis, and little incidental small text.
- An optional opening with an input/origin card on the left and a large display frame on the right, restrained perspective, and a slow push-in. Other subject-specific compositions are welcome.
- Process cards with fine borders, materials, shadows, and brief clear highlights. Name steps for the subject rather than reusing the paper algorithm.
- Rounded metallic frames that show complete assets. Software may use a real iframe; physical products may use photography, video, or models.
- Replay, play, previous/next, time, and seeking at the lower left; speed, music, volume, clean mode, and fullscreen on the right. A full-width numbered chapter strip sits below, with a pale blue top rule on the active chapter.
- An optional centered brand ending with a large headline, smaller subject image, and official link. If `logoUrl` is empty, show the subject name rather than inventing an official mark.

In `config.js`, `brand` can be a topic rather than a commercial brand. Customize `sourceLabel`, `outcomeLabel`, `heroImage`, `resultImage`, `features`, `steps`, and scene copy. `usageMode` defaults to `showcase` for highlights and experiences; choose `agent` and configure `prompt` only when software or Agent operation is relevant.

A coffee machine could follow appearance → brewing → everyday use; a course could follow problem → learning path → classroom activity; a community initiative could follow motivation → participation → impact; an idea could follow intuition → mechanism → examples. They share a UI, not a story.

Preserve playback and recording controls, unselectable text, a stable simulated pointer, and the single-clock design. The starter is a runnable visual starting point. Rewrite shots and visuals for the subject instead of only replacing brand text.
