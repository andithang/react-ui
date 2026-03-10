import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as u}from"./Button-DQYin6Ox.js";import{c as d}from"./utils-2dOUpm6k.js";import{I as a}from"./Input-ZQvogtlG.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";function m({children:o,className:t,gap:i="md",...p}){return e.jsx("form",{className:d("ui-form",`ui-form--${i}`,t),...p,children:o})}m.__docgenInfo={description:"",methods:[],displayName:"Form",props:{gap:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}}},composes:["FormHTMLAttributes"]};const h={title:"Components/Form",component:m,args:{gap:"md"},argTypes:{gap:{control:"inline-radio",options:["sm","md","lg"]}}},r={render:o=>e.jsxs(m,{...o,style:{width:"min(24rem, 90vw)"},onSubmit:t=>t.preventDefault(),children:[e.jsx(a,{label:"Email",placeholder:"you@example.com"}),e.jsx(a,{label:"Name",placeholder:"Alex Doe"}),e.jsx(u,{type:"submit",children:"Submit"})]})};var s,l,n;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => <Form {...args} style={{
    width: 'min(24rem, 90vw)'
  }} onSubmit={event => event.preventDefault()}>\r
      <Input label="Email" placeholder="you@example.com" />\r
      <Input label="Name" placeholder="Alex Doe" />\r
      <Button type="submit">Submit</Button>\r
    </Form>
}`,...(n=(l=r.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const y=["Basic"];export{r as Basic,y as __namedExportsOrder,h as default};
