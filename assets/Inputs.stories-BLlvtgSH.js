import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{F as r}from"./Box-xdliVbkH.js";import{C as i}from"./Checkbox-CeySsIbJ.js";import{I as s}from"./Input-ZQvogtlG.js";import{R as l}from"./Radio-DPoJWnUb.js";import{S as d}from"./Select-D7dS4dJh.js";import{S as m}from"./Switch-KJxchlXt.js";import{T as c}from"./Textarea-CfGkcVHY.js";import"./utils-2dOUpm6k.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";const C={title:"Components/Inputs"},o={render:()=>e.jsxs(r,{direction:"column",gap:"lg",style:{minWidth:"20rem"},children:[e.jsx(s,{label:"Email",placeholder:"you@example.com",hint:"We keep your email private."}),e.jsxs(d,{label:"Role",defaultValue:"frontend",children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]}),e.jsx(c,{label:"Description",placeholder:"Short project note"}),e.jsx(i,{label:"Enable notifications",hint:"You can disable this later."}),e.jsxs(r,{gap:"lg",children:[e.jsx(l,{name:"size",value:"sm",label:"Small",defaultChecked:!0}),e.jsx(l,{name:"size",value:"md",label:"Medium"})]}),e.jsx(m,{label:"Use compact mode",defaultChecked:!0})]})};var a,t,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="lg" style={{
    minWidth: '20rem'
  }}>\r
      <Input label="Email" placeholder="you@example.com" hint="We keep your email private." />\r
      <Select label="Role" defaultValue="frontend">\r
        <option value="frontend">Frontend Engineer</option>\r
        <option value="backend">Backend Engineer</option>\r
        <option value="design">Product Designer</option>\r
      </Select>\r
      <Textarea label="Description" placeholder="Short project note" />\r
      <Checkbox label="Enable notifications" hint="You can disable this later." />\r
      <Flex gap="lg">\r
        <Radio name="size" value="sm" label="Small" defaultChecked />\r
        <Radio name="size" value="md" label="Medium" />\r
      </Flex>\r
      <Switch label="Use compact mode" defaultChecked />\r
    </Flex>
}`,...(n=(t=o.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const E=["Controls"];export{o as Controls,E as __namedExportsOrder,C as default};
