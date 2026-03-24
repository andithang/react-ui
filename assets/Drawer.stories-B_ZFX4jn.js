import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-oxIuDU2I.js";import{B as m}from"./Button-Ds6xf3X3.js";import{D as a}from"./Drawer-D5x7HHaa.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";import"./Icon-DE5ZeXya.js";const g={title:"Components/Drawer",component:a},r={render:p=>{const[c,t]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(m,{onClick:()=>t(!0),children:"Open drawer"}),e.jsx(a,{...p,open:c,onClose:()=>t(!1),children:"Drawer content area"})]})},args:{title:"Basic Drawer"}};var n,o,s;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: args => {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          Drawer content area
        </Drawer>
      </>;
  },
  args: {
    title: 'Basic Drawer'
  }
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const j=["Basic"];export{r as Basic,j as __namedExportsOrder,g as default};
