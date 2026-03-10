import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as t}from"./Select-D7dS4dJh.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const x={title:"Components/Select",component:t,args:{label:"Role",hint:"Choose one role.",error:"",defaultValue:"frontend"}},r={render:o=>e.jsxs(t,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},n={args:{error:"Please select a role."},render:o=>e.jsxs(t,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})};var a,s,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: args => <Select {...args}>\r
      <option value="frontend">Frontend Engineer</option>\r
      <option value="backend">Backend Engineer</option>\r
      <option value="design">Product Designer</option>\r
    </Select>
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var c,d,l;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    error: 'Please select a role.'
  },
  render: args => <Select {...args}>\r
      <option value="frontend">Frontend Engineer</option>\r
      <option value="backend">Backend Engineer</option>\r
      <option value="design">Product Designer</option>\r
    </Select>
}`,...(l=(d=n.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const E=["Basic","ErrorState"];export{r as Basic,n as ErrorState,E as __namedExportsOrder,x as default};
