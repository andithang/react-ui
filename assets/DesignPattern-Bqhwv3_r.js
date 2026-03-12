import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as i}from"./index-_tug67E6.js";import{M as d}from"./index-BO6BFBUY.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DVryhQGx.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function c(n){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Docs/Design Pattern"}),`
`,e.jsx(r.h1,{id:"design-pattern",children:"Design Pattern"}),`
`,e.jsxs(r.p,{children:["This page defines the design system contract for this library: ",e.jsx(r.strong,{children:"tokens"}),", ",e.jsx(r.strong,{children:"semantic color roles"}),", and ",e.jsx(r.strong,{children:"type scales"})," used by components."]}),`
`,e.jsx(r.h2,{id:"1-core-principles",children:"1) Core principles"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Token-first"}),": components consume CSS variables, not raw values."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Semantic naming"}),": tokens describe purpose (",e.jsx(r.code,{children:"--ui-control-border-hover"}),") rather than one-off appearance."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Theme aware"}),": light (",e.jsx(r.code,{children:":root"}),") and dark (",e.jsx(r.code,{children:"[data-theme='dark']"}),") provide matching semantic keys."]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Type-safe usage"}),": TS type unions (sizes, statuses, variants) model allowed API values."]}),`
`]}),`
`,e.jsx(r.h2,{id:"2-token-groups",children:"2) Token groups"}),`
`,e.jsx(r.h3,{id:"21-typography--font",children:"2.1 Typography & font"}),`
`,e.jsxs(r.p,{children:[`| Token | Value | Purpose |
| --- | --- | --- |
| `,e.jsx(r.code,{children:"--ui-font-family"})," | ",e.jsx(r.code,{children:"'Sarabun', 'Manrope', 'Segoe UI', sans-serif"}),` | Default UI text font stack |
| `,e.jsx(r.code,{children:"--ui-font-mono"})," | ",e.jsx(r.code,{children:"'JetBrains Mono', Consolas, monospace"})," | Monospace stack for code-like text |"]}),`
`,e.jsx(r.h3,{id:"22-surface--text-colors-light",children:"2.2 Surface & text colors (light)"}),`
`,e.jsxs(r.p,{children:[`| Token | Value | Purpose |
| --- | --- | --- |
| `,e.jsx(r.code,{children:"--ui-bg"})," | ",e.jsx(r.code,{children:"#ffffff"}),` | App background |
| `,e.jsx(r.code,{children:"--ui-surface"})," | ",e.jsx(r.code,{children:"#ffffff"}),` | Primary surface/background for cards/controls |
| `,e.jsx(r.code,{children:"--ui-surface-raised"})," | ",e.jsx(r.code,{children:"#f5f5f5"}),` | Raised/disabled surface |
| `,e.jsx(r.code,{children:"--ui-border"})," | ",e.jsx(r.code,{children:"#e0e0e0"}),` | Standard low-contrast border |
| `,e.jsx(r.code,{children:"--ui-border-strong"})," | ",e.jsx(r.code,{children:"#8f9294"}),` | Strong border and outlines |
| `,e.jsx(r.code,{children:"--ui-text"})," | ",e.jsx(r.code,{children:"#000000"}),` | Primary text |
| `,e.jsx(r.code,{children:"--ui-text-muted"})," | ",e.jsx(r.code,{children:"#73777a"})," | Secondary/helper text |"]}),`
`,e.jsx(r.h3,{id:"23-brand--semantic-colors-light",children:"2.3 Brand & semantic colors (light)"}),`
`,e.jsxs(r.p,{children:[`| Token | Value | Purpose |
| --- | --- | --- |
| `,e.jsx(r.code,{children:"--ui-primary"})," | ",e.jsx(r.code,{children:"#e03"}),` | Brand primary (required) |
| `,e.jsx(r.code,{children:"--ui-primary-hover"})," | ",e.jsx(r.code,{children:"#f8455b"}),` | Hover state for primary actions |
| `,e.jsx(r.code,{children:"--ui-primary-active"})," | ",e.jsx(r.code,{children:"#cb002b"}),` | Active/pressed state |
| `,e.jsx(r.code,{children:"--ui-primary-soft"})," | ",e.jsx(r.code,{children:"#ffe6eb"}),` | Soft primary-tint backgrounds |
| `,e.jsx(r.code,{children:"--ui-primary-outline"})," | ",e.jsx(r.code,{children:"color-mix(in srgb, var(--ui-primary) 26%, transparent)"}),` | Focus/outline tint |
| `,e.jsx(r.code,{children:"--ui-primary-contrast"})," | ",e.jsx(r.code,{children:"#ffffff"}),` | Text/icon on primary surfaces |
| `,e.jsx(r.code,{children:"--ui-danger"})," | ",e.jsx(r.code,{children:"#d30330"}),` | Error/destructive semantic |
| `,e.jsx(r.code,{children:"--ui-danger-contrast"})," | ",e.jsx(r.code,{children:"#ffffff"}),` | Contrast text on danger background |
| `,e.jsx(r.code,{children:"--ui-success"})," | ",e.jsx(r.code,{children:"#006339"}),` | Success semantic |
| `,e.jsx(r.code,{children:"--ui-warning"})," | ",e.jsx(r.code,{children:"#a74200"})," | Warning semantic |"]}),`
`,e.jsx(r.h3,{id:"24-focus-overlay-elevation",children:"2.4 Focus, overlay, elevation"}),`
`,e.jsxs(r.p,{children:[`| Token | Value | Purpose |
| --- | --- | --- |
| `,e.jsx(r.code,{children:"--ui-focus"})," | ",e.jsx(r.code,{children:"color-mix(in srgb, var(--ui-border-strong) 62%, white)"}),` | Focus border color |
| `,e.jsx(r.code,{children:"--ui-focus-outline"})," | ",e.jsx(r.code,{children:"color-mix(in srgb, var(--ui-focus) 30%, transparent)"}),` | Focus ring shadow |
| `,e.jsx(r.code,{children:"--ui-overlay"})," | ",e.jsx(r.code,{children:"rgba(0, 0, 0, 0.45)"}),` | Modal/backdrop overlay |
| `,e.jsx(r.code,{children:"--ui-shadow"})," | ",e.jsx(r.code,{children:"0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)"})," | Default elevated shadow |"]}),`
`,e.jsx(r.h3,{id:"25-control-tokens",children:"2.5 Control tokens"}),`
`,e.jsxs(r.p,{children:[`| Token | Value | Purpose |
| --- | --- | --- |
| `,e.jsx(r.code,{children:"--ui-control-bg"})," | ",e.jsx(r.code,{children:"var(--ui-surface)"}),` | Base control background |
| `,e.jsx(r.code,{children:"--ui-control-bg-hover"})," | ",e.jsx(r.code,{children:"var(--ui-surface)"}),` | Control hover background |
| `,e.jsx(r.code,{children:"--ui-control-bg-active"})," | ",e.jsx(r.code,{children:"var(--ui-surface)"}),` | Control active background |
| `,e.jsx(r.code,{children:"--ui-control-text"})," | ",e.jsx(r.code,{children:"var(--ui-text)"}),` | Control text color |
| `,e.jsx(r.code,{children:"--ui-control-border"})," | ",e.jsx(r.code,{children:"var(--ui-border-strong)"}),` | Base control border |
| `,e.jsx(r.code,{children:"--ui-control-border-hover"})," | ",e.jsx(r.code,{children:"color-mix(in srgb, var(--ui-border-strong) 82%, var(--ui-text))"}),` | Hover border |
| `,e.jsx(r.code,{children:"--ui-control-border-active"})," | ",e.jsx(r.code,{children:"var(--ui-focus)"}),` | Active/focus border |
| `,e.jsx(r.code,{children:"--ui-control-option-bg"})," | ",e.jsx(r.code,{children:"var(--ui-surface)"}),` | Option row background |
| `,e.jsx(r.code,{children:"--ui-control-option-hover-bg"})," | ",e.jsx(r.code,{children:"color-mix(in srgb, var(--ui-primary) 14%, var(--ui-surface))"}),` | Option row hover |
| `,e.jsx(r.code,{children:"--ui-control-option-selected-bg"})," | ",e.jsx(r.code,{children:"color-mix(in srgb, var(--ui-primary) 22%, var(--ui-surface))"}),` | Option selected |
| `,e.jsx(r.code,{children:"--ui-control-option-text"})," | ",e.jsx(r.code,{children:"var(--ui-text)"}),` | Option text |
| `,e.jsx(r.code,{children:"--ui-control-thumb-bg"})," | ",e.jsx(r.code,{children:"#ffffff"}),` | Switch/range thumb |
| `,e.jsx(r.code,{children:"--ui-control-thumb-shadow"})," | ",e.jsx(r.code,{children:"0 2px 4px rgba(0, 35, 11, 0.2)"})," | Thumb shadow |"]}),`
`,e.jsx(r.h3,{id:"26-button-semantic-tokens",children:"2.6 Button semantic tokens"}),`
`,e.jsxs(r.p,{children:[`| Token | Value | Purpose |
| --- | --- | --- |
| `,e.jsx(r.code,{children:"--ui-button-primary-bg"})," | ",e.jsx(r.code,{children:"var(--ui-primary)"}),` | Primary button background |
| `,e.jsx(r.code,{children:"--ui-button-primary-bg-hover"})," | ",e.jsx(r.code,{children:"var(--ui-primary-hover)"}),` | Primary hover background |
| `,e.jsx(r.code,{children:"--ui-button-primary-bg-active"})," | ",e.jsx(r.code,{children:"var(--ui-primary-active)"}),` | Primary active background |
| `,e.jsx(r.code,{children:"--ui-button-primary-border"})," | ",e.jsx(r.code,{children:"var(--ui-primary)"}),` | Primary border |
| `,e.jsx(r.code,{children:"--ui-button-primary-border-hover"})," | ",e.jsx(r.code,{children:"var(--ui-primary-hover)"}),` | Primary border hover |
| `,e.jsx(r.code,{children:"--ui-button-primary-border-active"})," | ",e.jsx(r.code,{children:"var(--ui-primary-active)"}),` | Primary border active |
| `,e.jsx(r.code,{children:"--ui-button-primary-text"})," | ",e.jsx(r.code,{children:"var(--ui-primary-contrast)"}),` | Primary text color |
| `,e.jsx(r.code,{children:"--ui-button-default-bg"})," | ",e.jsx(r.code,{children:"var(--ui-surface)"}),` | Default button background |
| `,e.jsx(r.code,{children:"--ui-button-default-border"})," | ",e.jsx(r.code,{children:"var(--ui-border-strong)"}),` | Default button border |
| `,e.jsx(r.code,{children:"--ui-button-default-text"})," | ",e.jsx(r.code,{children:"var(--ui-text)"}),` | Default button text |
| `,e.jsx(r.code,{children:"--ui-button-default-hover-bg"})," | ",e.jsx(r.code,{children:"var(--ui-surface)"}),` | Default hover background |
| `,e.jsx(r.code,{children:"--ui-button-default-hover-border"})," | ",e.jsx(r.code,{children:"var(--ui-primary-hover)"}),` | Default hover border |
| `,e.jsx(r.code,{children:"--ui-button-default-hover-text"})," | ",e.jsx(r.code,{children:"var(--ui-primary-hover)"}),` | Default hover text |
| `,e.jsx(r.code,{children:"--ui-button-default-active-bg"})," | ",e.jsx(r.code,{children:"var(--ui-surface)"}),` | Default active background |
| `,e.jsx(r.code,{children:"--ui-button-default-active-border"})," | ",e.jsx(r.code,{children:"var(--ui-primary-active)"}),` | Default active border |
| `,e.jsx(r.code,{children:"--ui-button-default-active-text"})," | ",e.jsx(r.code,{children:"var(--ui-primary-active)"}),` | Default active text |
| `,e.jsx(r.code,{children:"--ui-button-danger-text"})," | ",e.jsx(r.code,{children:"var(--ui-danger-contrast)"})," | Danger text contrast |"]}),`
`,e.jsx(r.h3,{id:"27-radius-spacing-motion-size",children:"2.7 Radius, spacing, motion, size"}),`
`,e.jsxs(r.p,{children:[`| Token | Value | Purpose |
| --- | --- | --- |
| `,e.jsx(r.code,{children:"--ui-radius-xs"})," | ",e.jsx(r.code,{children:"3px"}),` | Small corners |
| `,e.jsx(r.code,{children:"--ui-radius-sm"})," | ",e.jsx(r.code,{children:"6px"}),` | Control corners |
| `,e.jsx(r.code,{children:"--ui-radius-md"})," | ",e.jsx(r.code,{children:"8px"}),` | Medium corners |
| `,e.jsx(r.code,{children:"--ui-radius-lg"})," | ",e.jsx(r.code,{children:"12px"}),` | Large corners |
| `,e.jsx(r.code,{children:"--ui-space-2xs"})," | ",e.jsx(r.code,{children:"0.125rem"}),` | Minimal spacing |
| `,e.jsx(r.code,{children:"--ui-space-xs"})," | ",e.jsx(r.code,{children:"0.25rem"}),` | XS spacing |
| `,e.jsx(r.code,{children:"--ui-space-sm"})," | ",e.jsx(r.code,{children:"0.5rem"}),` | Small spacing |
| `,e.jsx(r.code,{children:"--ui-space-md"})," | ",e.jsx(r.code,{children:"0.75rem"}),` | Medium spacing |
| `,e.jsx(r.code,{children:"--ui-space-lg"})," | ",e.jsx(r.code,{children:"1rem"}),` | Large spacing |
| `,e.jsx(r.code,{children:"--ui-space-xl"})," | ",e.jsx(r.code,{children:"1.5rem"}),` | XL spacing |
| `,e.jsx(r.code,{children:"--ui-space-2xl"})," | ",e.jsx(r.code,{children:"2rem"}),` | 2XL spacing |
| `,e.jsx(r.code,{children:"--ui-transition-fast"})," | ",e.jsx(r.code,{children:"120ms ease"}),` | Fast transitions |
| `,e.jsx(r.code,{children:"--ui-transition-base"})," | ",e.jsx(r.code,{children:"180ms ease"}),` | Standard transitions |
| `,e.jsx(r.code,{children:"--ui-spinner-size"})," | ",e.jsx(r.code,{children:"1.5rem"})," | Default spinner dimension |"]}),`
`,e.jsx(r.h2,{id:"3-dark-theme-overrides",children:"3) Dark theme overrides"}),`
`,e.jsxs(r.p,{children:["All keys above stay the same; only values change under ",e.jsx(r.code,{children:"[data-theme='dark']"}),"."]}),`
`,e.jsx(r.h3,{id:"31-key-dark-values",children:"3.1 Key dark values"}),`
`,e.jsxs(r.p,{children:[`| Token | Dark Value |
| --- | --- |
| `,e.jsx(r.code,{children:"--ui-bg"})," | ",e.jsx(r.code,{children:"#0f141c"}),` |
| `,e.jsx(r.code,{children:"--ui-surface"})," | ",e.jsx(r.code,{children:"#171f29"}),` |
| `,e.jsx(r.code,{children:"--ui-surface-raised"})," | ",e.jsx(r.code,{children:"#212c3a"}),` |
| `,e.jsx(r.code,{children:"--ui-border"})," | ",e.jsx(r.code,{children:"#3e4f63"}),` |
| `,e.jsx(r.code,{children:"--ui-border-strong"})," | ",e.jsx(r.code,{children:"#8ca2bf"}),` |
| `,e.jsx(r.code,{children:"--ui-text"})," | ",e.jsx(r.code,{children:"#f8fbff"}),` |
| `,e.jsx(r.code,{children:"--ui-text-muted"})," | ",e.jsx(r.code,{children:"#c9d6e7"}),` |
| `,e.jsx(r.code,{children:"--ui-primary"})," | ",e.jsx(r.code,{children:"#e03"}),` |
| `,e.jsx(r.code,{children:"--ui-primary-hover"})," | ",e.jsx(r.code,{children:"#ff3f65"}),` |
| `,e.jsx(r.code,{children:"--ui-primary-active"})," | ",e.jsx(r.code,{children:"#c4002c"}),` |
| `,e.jsx(r.code,{children:"--ui-danger"})," | ",e.jsx(r.code,{children:"#ff7082"}),` |
| `,e.jsx(r.code,{children:"--ui-success"})," | ",e.jsx(r.code,{children:"#60d2a0"}),` |
| `,e.jsx(r.code,{children:"--ui-warning"})," | ",e.jsx(r.code,{children:"#ffc76f"}),` |
| `,e.jsx(r.code,{children:"--ui-overlay"})," | ",e.jsx(r.code,{children:"rgba(0, 4, 10, 0.72)"}),` |
| `,e.jsx(r.code,{children:"--ui-shadow"})," | ",e.jsx(r.code,{children:"0 8px 24px rgba(0, 0, 0, 0.55)"})," |"]}),`
`,e.jsx(r.h3,{id:"32-dark-control-behavior-notes",children:"3.2 Dark control behavior notes"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Control borders remain neutral/high-contrast (",e.jsx(r.code,{children:"--ui-control-border*"}),"), not primary-tinted."]}),`
`,e.jsx(r.li,{children:"Option hovers/selects still use primary-tinted semantic background tokens."}),`
`,e.jsxs(r.li,{children:["Primary button remains brand ",e.jsx(r.code,{children:"#e03"})," with ant-style hover/active intensities."]}),`
`]}),`
`,e.jsx(r.h2,{id:"4-type-system-and-scales",children:"4) Type system and scales"}),`
`,e.jsx(r.h3,{id:"41-shared-spacing-type",children:"4.1 Shared spacing type"}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"src/styles/tokens.ts"})," exports:"]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"spaceTokenMap"}),": ",e.jsx(r.code,{children:"{ none, xs, sm, md, lg, xl, 2xl }"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"SpaceScale"})," type: ",e.jsx(r.code,{children:"keyof typeof spaceTokenMap"})]}),`
`]}),`
`,e.jsx(r.h3,{id:"42-common-component-scales-used-in-apis",children:"4.2 Common component scales used in APIs"}),`
`,e.jsxs(r.p,{children:[`| Type family | Values |
| --- | --- |
| `,e.jsx(r.code,{children:"size"})," | ",e.jsx(r.code,{children:"'small' | 'middle' | 'large'"}),` (where supported) |
| `,e.jsx(r.code,{children:"status"})," | ",e.jsx(r.code,{children:"'error' | 'warning'"}),` (where supported) |
| `,e.jsx(r.code,{children:"theme mode"})," | ",e.jsx(r.code,{children:"'light' | 'dark'"})," (via ThemeProvider/context) |"]}),`
`,e.jsx(r.h3,{id:"43-color-role-usage-guidance",children:"4.3 Color role usage guidance"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Text/labels"}),": ",e.jsx(r.code,{children:"--ui-text"}),", ",e.jsx(r.code,{children:"--ui-text-muted"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Surfaces"}),": ",e.jsx(r.code,{children:"--ui-bg"}),", ",e.jsx(r.code,{children:"--ui-surface"}),", ",e.jsx(r.code,{children:"--ui-surface-raised"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Borders/focus"}),": ",e.jsx(r.code,{children:"--ui-control-border*"}),", ",e.jsx(r.code,{children:"--ui-focus*"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Interactive states"}),": ",e.jsx(r.code,{children:"--ui-primary*"}),", ",e.jsx(r.code,{children:"--ui-control-option-hover-bg"}),", ",e.jsx(r.code,{children:"--ui-control-option-selected-bg"})]}),`
`,e.jsxs(r.li,{children:[e.jsx(r.strong,{children:"Semantic feedback"}),": ",e.jsx(r.code,{children:"--ui-danger"}),", ",e.jsx(r.code,{children:"--ui-success"}),", ",e.jsx(r.code,{children:"--ui-warning"})]}),`
`]}),`
`,e.jsx(r.h2,{id:"5-contract-checklist-for-new-components",children:"5) Contract checklist for new components"}),`
`,e.jsxs(r.ol,{children:[`
`,e.jsx(r.li,{children:"Use semantic tokens (no hardcoded one-off colors where token exists)."}),`
`,e.jsx(r.li,{children:"Provide light + dark correctness through existing semantic keys."}),`
`,e.jsxs(r.li,{children:["Prefer ",e.jsx(r.code,{children:"className"})," extension and ",e.jsx(r.code,{children:"ui-"})," prefixed class namespace."]}),`
`,e.jsxs(r.li,{children:["Keep states (",e.jsx(r.code,{children:"hover"}),", ",e.jsx(r.code,{children:"active"}),", ",e.jsx(r.code,{children:"focus-visible"}),", ",e.jsx(r.code,{children:"disabled"}),", ",e.jsx(r.code,{children:"error"}),") token-driven."]}),`
`,e.jsx(r.li,{children:"Add Storybook examples for variant/size/state coverage."}),`
`]})]})}function m(n={}){const{wrapper:r}={...i(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(c,{...n})}):c(n)}export{m as default};
