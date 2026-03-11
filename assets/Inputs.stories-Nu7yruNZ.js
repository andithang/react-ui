import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{F as l}from"./Box-xdliVbkH.js";import{C as i}from"./Checkbox-Cgi7l2bh.js";import{I as s}from"./Input-ZQvogtlG.js";import{R as a}from"./Radio-DPoJWnUb.js";import{S as d}from"./Select-CfP3ktrP.js";import{S as m}from"./Switch-KJxchlXt.js";import{T as c}from"./Textarea-CfGkcVHY.js";import"./utils-2dOUpm6k.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";const C={title:"Components/Inputs"},o={render:()=>e.jsxs(l,{direction:"column",gap:"lg",style:{minWidth:"20rem"},children:[e.jsx(s,{label:"Email",placeholder:"you@example.com",hint:"We keep your email private."}),e.jsxs(d,{label:"Role",defaultValue:"frontend",children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]}),e.jsx(c,{label:"Description",placeholder:"Short project note"}),e.jsx(i,{label:"Enable notifications",hint:"You can disable this later."}),e.jsxs(l,{gap:"lg",children:[e.jsx(a,{name:"size",value:"sm",label:"Small",defaultChecked:!0}),e.jsx(a,{name:"size",value:"md",label:"Medium"})]}),e.jsx(m,{label:"Use compact mode",defaultChecked:!0})]})};var t,r,n;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="lg" style={{
    minWidth: '20rem'
  }}>
      <Input label="Email" placeholder="you@example.com" hint="We keep your email private." />
      <Select label="Role" defaultValue="frontend">
        <option value="frontend">Frontend Engineer</option>
        <option value="backend">Backend Engineer</option>
        <option value="design">Product Designer</option>
      </Select>
      <Textarea label="Description" placeholder="Short project note" />
      <Checkbox label="Enable notifications" hint="You can disable this later." />
      <Flex gap="lg">
        <Radio name="size" value="sm" label="Small" defaultChecked />
        <Radio name="size" value="md" label="Medium" />
      </Flex>
      <Switch label="Use compact mode" defaultChecked />
    </Flex>
}`,...(n=(r=o.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const E=["Controls"];export{o as Controls,E as __namedExportsOrder,C as default};
