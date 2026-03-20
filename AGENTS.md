# AGENTS.md

## Project
This repository is a React UI component library written in TypeScript and bundled with Vite.

## Goal
Build reusable, accessible, theme-aware UI components that can be published as `@andithang/react-ui`.

## Tech stack
- React
- TypeScript
- Vite (library mode + declaration generation)
- Storybook
- CSS variables
- SCSS-authored component styles

## Design pattern
- Token-first design: all visual values come from shared CSS variables.
- Primitive-first composition: small building blocks (`Box`, `Flex`, `Grid`, `Typography`, inputs) compose larger UI.
- Native-element wrappers: components extend native HTML attributes where possible.
- Theme-driven behavior: light/dark mode controlled by `ThemeProvider` and `data-theme`.
- Light theme should have a primary color set to #e03.
- All hover, active, focus,... states of every component must based on the primary color, based on the current theme.
- Dark mode button styling should follow Ant Design button behavior, while keeping the brand primary color at `#e03`.
- Dark mode control components (`Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Switch`) must keep neutral/light border contrast on hover/active/focus; control borders should not be primary-tinted.
- The default clear icon, chevron down icon for control components (`Input`, `Select`, `TreeSelect`, `Autocomplete`, `Textarea`, `DatePicker`, `TimePicker`, `Tree`) should use the same Icon components across the whole project.

## Component rules
- Every public component/type must be exported from `src/index.ts`.
- Use function components.
- Support `className` for style extension.
- Extend native DOM attributes for DOM-backed primitives.
- Support controlled and uncontrolled patterns where applicable.
- Prefer `children`/composition over special-case props.
- Reuse `cn` utility for class merging.
- Except `src/components/DatePicker/DatePicker.tsx`, never import and use `antd` components as internal sources.
- Prefer in-repo component code and shared primitives/utilities over third-party component composition.
- Do not introduce runtime styling libraries.
- Do not use styled-components or emotion.
- Always write a mdx file for each component.
- Check for changes of components API and rewrite its mdx file if needed.

## Styling rules
- Use shared CSS classes with `ui-` prefix.
- Keep component styles in `src/components/<Component>/<Component>.scss`.
- Keep shared theme tokens in `src/styles/index.scss` and spacing tokens in `src/styles/tokens.ts`.
- Use CSS variables for color, spacing, radius, transitions, and typography.
- Avoid hardcoded colors in component SCSS when a semantic token exists.
- Keep styling framework-agnostic and package-consumable.

## Accessibility
- Buttons must use native `<button>`.
- Inputs/selects/textarea controls must support visible labels.
- Dialog behavior must support Escape key and proper dialog semantics.
- Interactive components must keep keyboard accessibility.
- Prefer native semantics first; add ARIA only when native semantics are insufficient.

## Testing and verification
- Add/maintain Storybook stories for component variants and states.
- When changing behavior or styles, run:
  - `npm run typecheck`
  - `npm run build`
  - `npm run build-storybook` (or `npm run storybook` for interactive checks)
  - `npm run lint`
- If/when unit tests are added, prefer Vitest-compatible component behavior tests.
- When new components are added, update `stories/Roadmap.mdx` and `stories/Introduction.mdx`.

## File structure
- `src/components/Button/Button.tsx`
- `src/components/Button/Button.scss`
- `stories/Button.stories.tsx`
- `src/index.ts` export entry

## Output expectations
When building a new component, create:
1. Component implementation file (`.tsx`)
2. SCSS style file
3. Storybook story file
4. Public export entry in `src/index.ts`
5. Component spec markdown in its component directory
6. Verification via typecheck, build, and Storybook build
7. Update `stories/Roadmap.mdx` and `stories/Introduction.mdx`
