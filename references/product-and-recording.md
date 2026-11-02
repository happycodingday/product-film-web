# Products, audio, and screen recording

## Real software demonstrations

Copy the actual build into `product/`, verify the entry point, routing base, and asset paths, and load it over same-origin HTTP. Prefer an existing API or postMessage interface. Otherwise write an explicit DOM adapter: pagination, ranges, speaker notes, and related controls must trigger real events so graphics, values, and formulas update together. Compare current and target state before acting; do not click every frame.

Show the complete navigation in establishing shots. Keep any user-requested PPT sidebar and notes visible in close-ups too. Do not silently substitute a cropped version just to enlarge the content. If the product cannot run, use clearly identified static material rather than claiming interaction.

For an Agent demonstration, a possible sequence is opening the app → focusing input → typing → moving to send → clicking → revealing the result → clicking it → continuously opening the browser or presentation. Use real icons and user-specified project, conversation, and model names. Waiting may be compressed, but distinguish a demonstration from live generation.

## Audio

Use user-supplied or appropriately licensed audio. Verify the specific track's current terms and record its title, author, source, attribution requirements, and verification date in `assets/music-source.md`. Do not extend one site's license to every asset or distribute a third-party track as standalone reusable skill material.

Synchronize playback, pause, seeking, and speed with the master clock. Correct noticeable drift rather than seeking or resetting an unchanged rate every frame. Browsers may require a user gesture for audible playback; provide a play/mute control.

If FFmpeg is already available, it can trim, fade, and normalize audio. This is a 60-second example; recalculate the fade for another duration:

```text
ffmpeg -i source.mp3 -t 60 -af "afade=t=in:st=0:d=0.7,afade=t=out:st=57:d=3,loudnorm=I=-16:TP=-1.5:LRA=9" -ar 44100 -ac 2 output.wav
```

## Recording

Use a fixed 16:9 stage, scale the entire composition proportionally, and keep player controls outside it. H hides controls; F enters fullscreen. R replays, Space pauses, and arrow keys change chapters. Common native stages are 1600×900 or 1920×1080.

Clean mode only hides controls; it does not start recording. Users start their screen recorder separately and include system audio when needed. Do not install recording software or enable a microphone without authorization. HTML output is not an exported MP4.

Inspect important scenes and the final hold in normal and clean/fullscreen modes, including relevant links, branding, typing, send actions, product interactions, and notes. Do not change a user's browser dimensions solely for a screenshot. Deliver startup instructions, paths, preview, an inspected screenshot, and actual limitations.
