import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as u}from"./Button-Ds6xf3X3.js";import{c as d}from"./utils-2dOUpm6k.js";import{I as a}from"./Input-CNhK9MeM.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Icon-DE5ZeXya.js";function o({children:m,className:t,gap:n="md",...p}){return e.jsx("form",{className:d("ui-form",`ui-form--${n}`,t),...p,children:m})}o.__docgenInfo={description:"",methods:[],displayName:"Form",props:{gap:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}}},composes:["FormHTMLAttributes"]};const v={title:"Components/Form",component:o,args:{gap:"md"},argTypes:{gap:{control:"inline-radio",options:["sm","md","lg"]}}},r={render:m=>e.jsxs(o,{...m,style:{width:"min(24rem, 90vw)"},onSubmit:t=>t.preventDefault(),children:[e.jsx(a,{label:"Email",placeholder:"you@example.com"}),e.jsx(a,{label:"Name",placeholder:"Alex Doe"}),e.jsx(u,{type:"primary",htmlType:"submit",children:"Submit"})]})};var l,s,i;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <Form {...args} style={{
    width: 'min(24rem, 90vw)'
  }} onSubmit={event => event.preventDefault()}>
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Name" placeholder="Alex Doe" />
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const j=["Basic"];export{r as Basic,j as __namedExportsOrder,v as default};
