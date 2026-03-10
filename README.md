# @new-vts-kit/react-ui

A reusable React UI component library built with TypeScript, SCSS, CSS variables, and Storybook.

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
npm install @new-vts-kit/react-ui
```

Peer dependencies:

- `react` `^18.0.0 || ^19.0.0`
- `react-dom` `^18.0.0 || ^19.0.0`

## Quick Start

```tsx
import { ThemeProvider, ThemeSwitch, Button, Input } from '@new-vts-kit/react-ui';
import '@new-vts-kit/react-ui/styles.css';

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

## Exports

Components:

- `Button`
- `Icon`
- `Input`
- `Form`
- `Spinner`
- `Typography`
- `Box`
- `Flex`
- `Grid`
- `Checkbox`
- `Select`
- `Radio`
- `Switch`
- `Textarea`
- `Modal`
- `Tooltip`
- `Tabs`
- `ThemeSwitch`

Theme:

- `ThemeProvider`
- `useThemeContext`

Styles:

- `@new-vts-kit/react-ui/styles.css`

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

## Storybook Deployment (GitHub Pages)

Build/deploy commands:

- `npm run deploy:storybook` for project path base (`/react-ui/`)
- `npm run deploy:storybook:cname` for custom domain base (`/`)

Notes:

- Deployment is executed from your current branch (usually `main`).
- Static files are published to the `gh-pages` branch automatically.
- Deploy step creates `.nojekyll` and includes `CNAME` (custom domain flow) to avoid missing underscore-prefixed assets.

## Publishing

```bash
npm login
npm publish
```

`prepublishOnly` runs:

```bash
npm run typecheck && npm run build
```
