import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./index-oxIuDU2I.js";import{B as d}from"./Button-Ds6xf3X3.js";import{T as a}from"./Toast-C3wdNbDV.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const y={title:"Components/Toast",component:a,args:{type:"success",message:"Saved successfully",description:"Your changes have been published."}},e={render:function(p){const[i,t]=c.useState(!1);return s.jsxs("div",{style:{display:"grid",gap:"0.75rem"},children:[s.jsx(d,{onClick:()=>t(!0),children:"Show toast"}),s.jsx(a,{...p,open:i,onClose:()=>t(!1)})]})}};var o,n,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return <div style={{
      display: 'grid',
      gap: '0.75rem'
    }}>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast {...args} open={open} onClose={() => setOpen(false)} />
      </div>;
  }
}`,...(r=(n=e.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const B=["Basic"];export{e as Basic,B as __namedExportsOrder,y as default};
