import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{B as a}from"./Button-DQYin6Ox.js";import{I as h}from"./Icon-iYqXWm5b.js";import"./utils-2dOUpm6k.js";const g={title:"Components/Button",component:a,args:{children:"Primary Action",variant:"primary"}},e={},t={render:()=>r.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[r.jsx(a,{variant:"primary",children:"Primary"}),r.jsx(a,{variant:"secondary",children:"Secondary"}),r.jsx(a,{variant:"ghost",children:"Ghost"}),r.jsx(a,{variant:"danger",children:"Danger"})]})},n={render:()=>r.jsx(a,{leftIcon:r.jsx(h,{name:"check"}),children:"Save"})};var o,s,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var i,d,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  }}>\r
      <Button variant="primary">Primary</Button>\r
      <Button variant="secondary">Secondary</Button>\r
      <Button variant="ghost">Ghost</Button>\r
      <Button variant="danger">Danger</Button>\r
    </div>
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,u,l;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <Button leftIcon={<Icon name="check" />}>Save</Button>
}`,...(l=(u=n.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const f=["Basic","Variants","WithIcon"];export{e as Basic,t as Variants,n as WithIcon,f as __namedExportsOrder,g as default};
