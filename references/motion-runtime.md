# Timeline and performance

Accumulate scene durations into `starts`; `elapsed` is the sole playback time. Advance it through requestAnimationFrame using real time deltas multiplied by playback speed. Seeking, replay, chapter navigation, and captions must share `render(elapsed)` and the same duration data.

Pause Web Animations API animations after creation and sample them through `currentTime`. Do not chain the film with timers or let independent CSS animations run while paused. Rendering must be reversible. Trigger stateful product actions only when the target state differs, rather than clicking every frame. Prefer product APIs or controlled events to dragging an existing slider incrementally across a large seek.

## Native pointer and selection

Apply this to the film and embedded product documents:

```css
html, body, body * {
  user-select: none;
  -webkit-user-select: none;
  caret-color: transparent;
}
.film-playing, .film-playing * { cursor: none !important; }
.film-playing iframe { pointer-events: none; }
```

Clear selections and blur editable controls once when playback starts, not on every frame. Restore pointer input when paused. A simulated typing caret may appear steadily during input; avoid continuous blinking. Show a click halo only for an actual simulated click.

## Observed failure modes

- **Broken scan lines:** separate 3D transforms make a document intersect its scan line. Put both on the same plane, transform their parent, and move the foreground line locally. Keep evidence cards outside the scan area.
- **Ghosted transitions:** reuse the same shared element, or fully finish the outgoing scene before revealing the next. Do not crossfade duplicate objects at unrelated positions.
- **Hidden output:** separate templates, connections, and the result into explicit layers. Move templates above and place the output in front. `translateZ` can change painting order; use a flat stacking context when appropriate. Put labels outside the frame and preserve the result's aspect ratio with `contain`.
- **Stuttering:** update only visible scenes, cache DOM references after construction, and change text only when necessary. Avoid rebuilding HTML, interleaving layout writes and geometry reads, or continuously repainting large blurred layers. Prefer transforms for scan lines and progress bars.
- **Broad invalidation:** scope animated CSS variables to the current scene. Measure path lengths during initialization. Remove unused iframes and preload necessary ones to prevent white flashes.

## Measurement

Compare frame intervals, average script time, and slow frames in the same browser and conditions. Test actual playback, not only still frames reached by seeking. Temporary project instrumentation can be removed afterward. Tool response times and screenshot latency are not frame-rate measurements. Results describe that environment; also confirm that visuals and interactions remain intact.
