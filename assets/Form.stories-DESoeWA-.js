import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as i}from"./Button-Ds6xf3X3.js";import{F as p}from"./Form-CXB2ta1P.js";import{I as t}from"./Input-CNhK9MeM.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";import"./Icon-DE5ZeXya.js";const g={title:"Components/Form",component:p,args:{gap:"md"},argTypes:{gap:{control:"inline-radio",options:["sm","md","lg"]}}},r={render:s=>e.jsxs(p,{...s,style:{width:"min(24rem, 90vw)"},onSubmit:l=>l.preventDefault(),children:[e.jsx(t,{label:"Email",placeholder:"you@example.com"}),e.jsx(t,{label:"Name",placeholder:"Alex Doe"}),e.jsx(i,{type:"primary",htmlType:"submit",children:"Submit"})]})};var o,m,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => <Form {...args} style={{
    width: 'min(24rem, 90vw)'
  }} onSubmit={event => event.preventDefault()}>
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Name" placeholder="Alex Doe" />
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
}`,...(a=(m=r.parameters)==null?void 0:m.docs)==null?void 0:a.source}}};const f=["Basic"];export{r as Basic,f as __namedExportsOrder,g as default};
