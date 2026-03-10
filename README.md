# React UI Library

React component library powered by SCSS and global CSS variables, with Storybook documentation and GitHub Pages deployment support.

## Features

- Theme switch (`ThemeProvider` + `ThemeSwitch`) with persisted light/dark mode
- SCSS styling and tokenized design system via CSS variables
- Components:
  - Button
  - Icon
  - Input
  - Form
  - Spinner
  - Typography
  - Flex/Grid Box
  - Checkbox
  - Select
  - Radio
  - Switch
  - Textarea
  - Modal
  - Tooltip
  - Tabs
- Storybook docs page (`stories/Introduction.mdx`) and component stories
- GitHub Pages publish command for Storybook

## Getting started

```bash
npm install
npm run dev
```

## Install as a package

```bash
npm install @new-vts-kit/react-ui
```

## Usage

```tsx
import { ThemeProvider, Button, Input } from '@new-vts-kit/react-ui';
import '@new-vts-kit/react-ui/styles.css';

export function App() {
  return (
    <ThemeProvider>
      <Button>Save</Button>
      <Input label="Name" placeholder="Type here" />
    </ThemeProvider>
  );
}
```

## Build library

```bash
npm run build
```

## Storybook

```bash
npm run storybook
npm run build-storybook
```

## Deploy Storybook to GitHub Pages

```bash
npm run deploy:storybook
```

This publishes `storybook-static` to the `gh-pages` branch.

## Publish package

Package name: `@new-vts-kit/react-ui` (public scoped package).

You can publish after authenticating to npm:

```bash
npm login
npm publish
```

`prepublishOnly` runs typecheck and build automatically before publish.
