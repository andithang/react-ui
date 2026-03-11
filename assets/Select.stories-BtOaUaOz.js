import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as o}from"./Select-CfP3ktrP.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const R={title:"Components/Select",component:o,args:{label:"Role",hint:"Choose one role.",error:"",defaultValue:"frontend"}},t={render:r=>e.jsxs(o,{...r,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},n={args:{prefixTitle:"Role:"},render:r=>e.jsxs(o,{...r,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},i={args:{label:"Skills",hint:"Choose one or more skills.",multiple:!0,defaultValue:["react","typescript"]},render:r=>e.jsxs(o,{...r,children:[e.jsx("option",{value:"react",children:"React"}),e.jsx("option",{value:"typescript",children:"TypeScript"}),e.jsx("option",{value:"storybook",children:"Storybook"}),e.jsx("option",{value:"a11y",children:"Accessibility"})]})},l={args:{label:"Skills",multiple:!0,enableSelectAll:!0,selectAllValue:-1,defaultValue:["react"]},render:r=>e.jsxs(o,{...r,children:[e.jsx("option",{value:"react",children:"React"}),e.jsx("option",{value:"typescript",children:"TypeScript"}),e.jsx("option",{value:"storybook",children:"Storybook"}),e.jsx("option",{value:"a11y",children:"Accessibility"})]})},a={args:{error:"Please select a role."},render:r=>e.jsxs(o,{...r,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})};var s,c,p;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var d,u,g;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    prefixTitle: 'Role:'
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var m,S,v;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(v=(S=i.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var h,x,k;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Skills',
    multiple: true,
    enableSelectAll: true,
    selectAllValue: -1,
    defaultValue: ['react']
  },
  render: args => <Select {...args}>
      <option value="react">React</option>
      <option value="typescript">TypeScript</option>
      <option value="storybook">Storybook</option>
      <option value="a11y">Accessibility</option>
    </Select>
}`,...(k=(x=l.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var y,b,j;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    error: 'Please select a role.'
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(j=(b=a.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};const T=["Basic","WithPrefixTitle","Multiple","MultipleWithSelectAll","ErrorState"];export{t as Basic,a as ErrorState,i as Multiple,l as MultipleWithSelectAll,n as WithPrefixTitle,T as __namedExportsOrder,R as default};
