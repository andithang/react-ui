import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as z}from"./index-oxIuDU2I.js";import{I as a}from"./InputNumber-Bg5hJmM4.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const A={title:"Components/InputNumber",component:a,args:{label:"Quantity",min:0,max:100,step:1,controls:!0,placeholder:"Enter value"}},s={args:{defaultValue:12,hint:"Uses Ant Design InputNumber props with theme-aware styling."}},t={render:function(I){const[j,N]=z.useState(2);return r.jsx(a,{...I,value:j??void 0,onChange:N})}},l={render:e=>r.jsxs("div",{style:{display:"grid",gap:"0.75rem",maxWidth:"18rem"},children:[r.jsx(a,{...e,size:"small",label:"Small",defaultValue:3}),r.jsx(a,{...e,size:"middle",label:"Middle",defaultValue:6}),r.jsx(a,{...e,size:"large",label:"Large",defaultValue:9})]}),args:{controls:!0}},n={render:e=>r.jsxs("div",{style:{display:"grid",gap:"0.75rem",maxWidth:"18rem"},children:[r.jsx(a,{...e,label:"Warning",status:"warning",defaultValue:4,hint:"Double-check this value."}),r.jsx(a,{...e,label:"Error",error:"Quantity is required."})]})},u={args:{label:"Price",defaultValue:1200,min:0,step:100,formatter:e=>e?`$ ${e}`:"",parser:e=>(e==null?void 0:e.replace(/\$\s?|(,*)/g,""))??""}};var o,i,d;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    defaultValue: 12,
    hint: 'Uses Ant Design InputNumber props with theme-aware styling.'
  }
}`,...(d=(i=s.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,p,c;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = useState<number | string | null>(2);
    return <InputNumber {...args} value={value ?? undefined} onChange={setValue} />;
  }
}`,...(c=(p=t.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var g,b,f;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gap: '0.75rem',
    maxWidth: '18rem'
  }}>
      <InputNumber {...args} size="small" label="Small" defaultValue={3} />
      <InputNumber {...args} size="middle" label="Middle" defaultValue={6} />
      <InputNumber {...args} size="large" label="Large" defaultValue={9} />
    </div>,
  args: {
    controls: true
  }
}`,...(f=(b=l.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var h,x,v;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gap: '0.75rem',
    maxWidth: '18rem'
  }}>
      <InputNumber {...args} label="Warning" status="warning" defaultValue={4} hint="Double-check this value." />
      <InputNumber {...args} label="Error" error="Quantity is required." />
    </div>
}`,...(v=(x=n.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var V,y,S;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Price',
    defaultValue: 1200,
    min: 0,
    step: 100,
    formatter: value => value ? \`$ \${value}\` : '',
    parser: value => value?.replace(/\\$\\s?|(,*)/g, '') ?? ''
  }
}`,...(S=(y=u.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};const D=["Basic","Controlled","Sizes","Status","FormatterAndParser"];export{s as Basic,t as Controlled,u as FormatterAndParser,l as Sizes,n as Status,D as __namedExportsOrder,A as default};
