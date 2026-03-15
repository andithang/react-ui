# @andithang/react-ui

A reusable React UI component library built with TypeScript, SCSS, CSS variables, and Storybook.

## Documentation

- Live docs: `https://react-ui.andithang.org`

## Tech Stack

- React
- TypeScript
- Vite (library mode + declaration generation)
- SCSS + CSS variables (token-first styling)
- Storybook

## What This Package Provides

- Theme-aware components with light/dark mode via `ThemeProvider`
- Primitive layout components (`Box`, `Flex`, `Grid`)
- Form and feedback components
- Storybook docs and examples for all components
- Package-ready build output (`es`, `cjs`, types, styles)

## Installation

```bash
npm install @andithang/react-ui
```

Peer dependencies:

- `react` `^18.0.0 || ^19.0.0`
- `react-dom` `^18.0.0 || ^19.0.0`

## Quick Start

```tsx
import { ThemeProvider, ThemeSwitch, Button, Input } from '@andithang/react-ui';
import '@andithang/react-ui/styles.css';

export function App() {
  return (
    <ThemeProvider>
      <ThemeSwitch />
      <Button variant="primary">Save</Button>
      <Input label="Name" placeholder="Enter your name" />
    </ThemeProvider>
  );
}
```

## Components

- Primitives: `Box`, `Flex`, `Grid`, `Typography`
- Form Controls: `Input`, `InputNumber`, `Textarea`, `Select`, `TreeSelect`, `Checkbox`, `Radio`, `Switch`, `DatePicker`, `TimePicker`
- Actions & Navigation: `Button`, `Dropdown`, `Tabs`, `Breadcrumb`, `Steps`, `Tag`, `CheckableTag`, `CheckableTagGroup`
- Feedback & Overlay: `Alert`, `Modal`, `Tooltip`, `Toast`, `Result`, `Skeleton`, `Spinner`
- Display & Utility: `Icon`, `Avatar`, `Form`, `ThemeSwitch`

## Docs & Icon Data

- Storybook includes component docs, usage examples, and style states for all components.
- `Icon` exports catalog helpers:
  - `ICON_NAMES`
  - `ICON_NAMES_BY_SOURCE`
  - `SOURCE_ICON_NAMES`
  - `LEGACY_ICON_NAMES`

## Theme & Styles

- Include package styles once:

```tsx
import '@andithang/react-ui/styles.css';
```

- Theme mode is handled by `ThemeProvider` and `useThemeContext`.
- Component styles are SCSS-authored and token-driven via CSS variables.
- Light and dark themes are supported through `data-theme`.

## Development

```bash
npm install
npm run dev
```

Useful scripts:

- `npm run lint`
- `npm run lint:fix`
- `npm run typecheck`
- `npm run build`
- `npm run storybook`
- `npm run build-storybook`

## Storybook Deployment

Build/deploy commands:

- `npm run deploy:storybook` for project path base (`/react-ui/`)
- `npm run deploy:storybook:cname` for custom domain base (`/`)

Notes:

- Deployment is executed from your current branch (usually `main`).
- Static files are published to the `gh-pages` branch automatically.
- Deploy step creates `.nojekyll` and includes `CNAME` (custom domain flow) to avoid missing underscore-prefixed assets.
- Production docs domain: `https://react-ui.andithang.org`

## Publishing

```bash
npm login
npm publish
```

`prepublishOnly` runs:

```bash
npm run typecheck && npm run build
```
