import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{B as e}from"./Badge-BTel99eL.js";import{A as l}from"./Avatar-S0CdFmG1.js";import"./utils-2dOUpm6k.js";const j={title:"Components/Badge",component:e,args:{count:5}},s={render:x=>r.jsx(e,{...x,children:r.jsx(l,{children:"U"})})},t={render:()=>r.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[r.jsx(e,{dot:!0,children:r.jsx(l,{children:"A"})}),r.jsx(e,{status:"processing",text:"Processing"}),r.jsx(e,{status:"error",text:"Error"}),r.jsx(e,{color:"#722ed1",text:"Custom"})]})},a={render:()=>r.jsx(e.Ribbon,{text:"New",color:"#e03",children:r.jsx("div",{style:{width:240,height:120,border:"1px solid var(--ui-border)",borderRadius:"var(--ui-radius-sm)"}})})};var o,d,i;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => <Badge {...args}>
      <Avatar>U</Avatar>
    </Badge>
}`,...(i=(d=s.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var n,c,m;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <Badge dot>
        <Avatar>A</Avatar>
      </Badge>
      <Badge status="processing" text="Processing" />
      <Badge status="error" text="Error" />
      <Badge color="#722ed1" text="Custom" />
    </div>
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,u,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Badge.Ribbon text="New" color="#e03">
      <div style={{
      width: 240,
      height: 120,
      border: '1px solid var(--ui-border)',
      borderRadius: 'var(--ui-radius-sm)'
    }} />
    </Badge.Ribbon>
}`,...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const A=["Basic","DotAndStatus","Ribbon"];export{s as Basic,t as DotAndStatus,a as Ribbon,A as __namedExportsOrder,j as default};
