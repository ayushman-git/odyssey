# Accessibility checklist (WCAG 2.1 Level AA target)

Use this for new components and PRs that touch UI. Pair with an axe scan on affected routes and a quick keyboard pass (Tab / Shift+Tab, Enter / Space, Escape where relevant).

## Structure and semantics

- One logical `<main>` per page with a stable `id` when using the site skip link (`#main-content`).
- Use landmark elements intentionally: `header`, `nav`, `main`, `footer`, `aside`; give each `nav` a distinct `aria-label` if there is more than one.
- Heading levels reflect outline order (no skipped levels; decorative text is not a heading).

## Keyboard and focus

- All interactive controls are focusable and operable with the keyboard; no `tabindex` traps except intentional dialogs (then provide Escape and focus return).
- Focus order follows visual order; custom widgets expose correct roles and labels.
- Do not remove `:focus-visible` styling; the project defines shared focus rings in `globals.css`.

## Forms

- Every input has a visible or programmatically associated `<label>` (`htmlFor` / `id` or wrapping `label`).
- Use appropriate `type`, `name`, and `autocomplete` where applicable.
- Submit success and error messages use a live region (`role="status"` and/or `aria-live="polite"`) when they appear dynamically.

## Images and icons

- Meaningful images have descriptive `alt` text; decorative images use `alt=""` or `aria-hidden` on the graphic.
- Inline SVGs that repeat adjacent text are marked `aria-hidden="true"`.

## Color and motion

- Information is not conveyed by color alone; text/labels or patterns back up color coding.
- Respect `prefers-reduced-motion` for non-essential animation (existing patterns in the codebase apply).

## References

- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [axe DevTools](https://www.deque.com/axe/devtools/) for automated checks on representative pages
