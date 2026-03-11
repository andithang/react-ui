import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as s}from"./Select-C2UszGQD.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const j={title:"Components/Select",component:s,args:{label:"Role",hint:"Choose one role.",error:"",defaultValue:"frontend"}},r={render:o=>e.jsxs(s,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},n={args:{label:"Skills",hint:"Choose one or more skills.",multiple:!0,defaultValue:["react","typescript"]},render:o=>e.jsxs(s,{...o,children:[e.jsx("option",{value:"react",children:"React"}),e.jsx("option",{value:"typescript",children:"TypeScript"}),e.jsx("option",{value:"storybook",children:"Storybook"}),e.jsx("option",{value:"a11y",children:"Accessibility"})]})},t={args:{error:"Please select a role."},render:o=>e.jsxs(s,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})};var a,i,l;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,p,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Skills',
    hint: 'Choose one or more skills.',
    multiple: true,
    defaultValue: ['react', 'typescript']
  },
  render: args => <Select {...args}>
      <option value="react">React</option>
      <option value="typescript">TypeScript</option>
      <option value="storybook">Storybook</option>
      <option value="a11y">Accessibility</option>
    </Select>
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,g,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    error: 'Please select a role.'
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(m=(g=t.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const y=["Basic","Multiple","ErrorState"];export{r as Basic,t as ErrorState,n as Multiple,y as __namedExportsOrder,j as default};
