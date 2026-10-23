# SFL GURO rules for future edits

1. Never add code comments.
2. Never use a plain solid line border (`border: Npx solid ...`, `border-style: solid` with a colour only, or `outline` used as a frame) on any container, card, box, input, button, badge or cell.
3. Every framed element must reuse the app container border style:
   `border-style: solid; border-width: var(--px-card-corner-width); border-color: var(--sfl-outer-border, #181425); border-image: var(--px-border-image) 20% stretch; border-radius: 0; image-rendering: pixelated;`
   Use `var(--px-panel-corner-width)` instead of the card width for large panels.
4. The `.guro-frame` utility class applies this style and should be added to new elements instead of writing new border rules.
5. Dividers and decorative lines without a frame may use background gradients or `border: 0`, never a plain coloured solid border.
