# Statue Photo Cascade Implementation Plan

> Execute in this isolated worktree, using the approved flowing cascade design.

**Goal:** Make the trip photos fly in, shrink, and assemble into the supplied statue.

**Architecture:** Pure geometry and mask helpers feed the existing Canvas birthday
animation. A cached photo atlas and the unchanged PNG provide the final shape.

**Tech Stack:** Native JavaScript, Canvas 2D, Node built-in tests, static GitHub Pages.

## 1. Define and test the geometry

- Add `tests/birthday-motion.test.cjs` for closed outlines, background gaps,
  transparent margins, complete photo participation, and entrance/shrink/settle.
- Run `node --test tests/birthday-motion.test.cjs`; verify failure before adding
  `birthday-motion.js`.
- Implement the pure helpers; rerun the tests.

## 2. Render the cascade

- Copy the unchanged source PNG to `assets/statue-outline.png`.
- Load `birthday-motion.js` before the existing inline script in `index.html`.
- Replace the old polygon and slideshow with the masked atlas and curved arrivals.
- Wait for assets; cancel stale starts; preserve replay/close and reduced motion.
- Check JavaScript syntax and confirm non-birthday application logic is unchanged.

## 3. Preview and publish

- Preview on desktop and at phone size. Inspect arrivals, the exact statue shape,
  the birthday message, replay/close and early close while loading.
- Fix concrete rendering problems and run the relevant checks again.
- Publish the verified files; wait for deployment and verify all new asset hashes.
- Save a screenshot of the live photo assembly and report the result.
