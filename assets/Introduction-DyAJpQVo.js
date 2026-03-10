import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-_tug67E6.js";import{M as o}from"./index-CZxvtzAt.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DQDxezUq.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./index-DgH-xKnr.js";import"./index-DrFu-skq.js";function r(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Introduction"}),`
`,e.jsx(n.h1,{id:"react-ui-library",children:"React UI Library"}),`
`,e.jsxs(n.p,{children:["A React component library built around SCSS and global CSS variables. Every component consumes shared design tokens from ",e.jsx(n.a,{href:"../src/styles/index.scss",children:e.jsx(n.code,{children:"src/styles/index.scss"})}),"."]}),`
`,e.jsx(n.h2,{id:"included-components",children:"Included components"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Button"}),`
`,e.jsx(n.li,{children:"Icon"}),`
`,e.jsx(n.li,{children:"Input"}),`
`,e.jsx(n.li,{children:"Form"}),`
`,e.jsx(n.li,{children:"Spinner"}),`
`,e.jsx(n.li,{children:"Typography"}),`
`,e.jsx(n.li,{children:"Flex and Grid box utilities"}),`
`,e.jsx(n.li,{children:"Checkbox"}),`
`,e.jsx(n.li,{children:"Select"}),`
`,e.jsx(n.li,{children:"Radio"}),`
`,e.jsx(n.li,{children:"Switch"}),`
`,e.jsx(n.li,{children:"Textarea"}),`
`,e.jsx(n.li,{children:"Modal"}),`
`,e.jsx(n.li,{children:"Tooltip"}),`
`,e.jsx(n.li,{children:"Tabs"}),`
`,e.jsx(n.li,{children:"Theme switch"}),`
`]}),`
`,e.jsx(n.h2,{id:"theming-strategy",children:"Theming strategy"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"ThemeProvider"})," to manage the active mode."]}),`
`,e.jsx(n.li,{children:"Light and dark tokens live in root-level CSS variables."}),`
`,e.jsxs(n.li,{children:["Components reference semantic variables (",e.jsx(n.code,{children:"--ui-primary"}),", ",e.jsx(n.code,{children:"--ui-surface"}),", ",e.jsx(n.code,{children:"--ui-text"}),") instead of hard-coded values."]}),`
`]}),`
`,e.jsx(n.h2,{id:"deploy-storybook-to-github-pages",children:"Deploy Storybook to GitHub Pages"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run deploy:storybook
`})}),`
`,e.jsxs(n.p,{children:["The deploy script builds Storybook with a repo-aware base path (",e.jsx(n.code,{children:"/$npm_package_name/"}),") and publishes ",e.jsx(n.code,{children:"storybook-static"})," to the ",e.jsx(n.code,{children:"gh-pages"})," branch."]})]})}function u(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{u as default};
