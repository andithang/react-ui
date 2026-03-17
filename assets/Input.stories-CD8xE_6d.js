import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as $}from"./Icon-DE5ZeXya.js";import{I as a}from"./Input-lvNa50N7.js";import"./utils-2dOUpm6k.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";const T={title:"Components/Input",component:a,args:{label:"Email",hint:"We keep your email private.",placeholder:"you@example.com"}},s={},l={args:{error:"Email is required."}},o={args:{label:"Search",defaultValue:"storybook",allowClear:!0}},t={args:{label:"Amount",prefix:"$",suffix:"USD",placeholder:"0.00"}},n={args:{label:"Website",addonBefore:"https://",addonAfter:".com",placeholder:"my-site"}},d={args:{label:"Username",maxLength:24,showCount:!0,defaultValue:"andithang"}},i={args:{label:"Display Name",status:"warning",hint:"Use 3 to 24 characters.",defaultValue:"ab"}},c={render:r=>e.jsxs("div",{style:{display:"grid",gap:"0.75rem",maxWidth:"28rem"},children:[e.jsx(a,{...r,variant:"outlined",placeholder:"Outlined"}),e.jsx(a,{...r,variant:"filled",placeholder:"Filled"}),e.jsx(a,{...r,variant:"underlined",placeholder:"Underlined"}),e.jsx(a,{...r,variant:"borderless",placeholder:"Borderless"})]}),args:{label:"Variant"}},p={render:r=>e.jsxs("div",{style:{display:"grid",gap:"0.75rem",maxWidth:"28rem"},children:[e.jsx(a,{...r,size:"small",placeholder:"Small"}),e.jsx(a,{...r,size:"middle",placeholder:"Middle"}),e.jsx(a,{...r,size:"large",placeholder:"Large"})]}),args:{label:"Size"}},m={args:{label:"Filter",defaultValue:"active",allowClear:{clearIcon:e.jsx($,{name:"close",size:12})}}};var u,g,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,x,S;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    error: 'Email is required.'
  }
}`,...(S=(x=l.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var b,v,I;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    defaultValue: 'storybook',
    allowClear: true
  }
}`,...(I=(v=o.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var y,C,j;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Amount',
    prefix: '$',
    suffix: 'USD',
    placeholder: '0.00'
  }
}`,...(j=(C=t.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var w,z,V;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Website',
    addonBefore: 'https://',
    addonAfter: '.com',
    placeholder: 'my-site'
  }
}`,...(V=(z=n.parameters)==null?void 0:z.docs)==null?void 0:V.source}}};var A,W,U;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    maxLength: 24,
    showCount: true,
    defaultValue: 'andithang'
  }
}`,...(U=(W=d.parameters)==null?void 0:W.docs)==null?void 0:U.source}}};var E,B,D;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Display Name',
    status: 'warning',
    hint: 'Use 3 to 24 characters.',
    defaultValue: 'ab'
  }
}`,...(D=(B=i.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var F,L,k;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gap: '0.75rem',
    maxWidth: '28rem'
  }}>
      <Input {...args} variant="outlined" placeholder="Outlined" />
      <Input {...args} variant="filled" placeholder="Filled" />
      <Input {...args} variant="underlined" placeholder="Underlined" />
      <Input {...args} variant="borderless" placeholder="Borderless" />
    </div>,
  args: {
    label: 'Variant'
  }
}`,...(k=(L=c.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var O,q,M;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gap: '0.75rem',
    maxWidth: '28rem'
  }}>
      <Input {...args} size="small" placeholder="Small" />
      <Input {...args} size="middle" placeholder="Middle" />
      <Input {...args} size="large" placeholder="Large" />
    </div>,
  args: {
    label: 'Size'
  }
}`,...(M=(q=p.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var N,P,_;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Filter',
    defaultValue: 'active',
    allowClear: {
      clearIcon: <Icon name="close" size={12} />
    }
  }
}`,...(_=(P=m.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};const X=["Basic","ErrorState","AllowClear","PrefixAndSuffix","Addons","ShowCount","WarningStatus","Variants","Sizes","CustomClearIcon"];export{n as Addons,o as AllowClear,s as Basic,m as CustomClearIcon,l as ErrorState,t as PrefixAndSuffix,d as ShowCount,p as Sizes,c as Variants,i as WarningStatus,X as __namedExportsOrder,T as default};
