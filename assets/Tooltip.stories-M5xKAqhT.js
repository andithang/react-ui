import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{B as l}from"./Button-Ds6xf3X3.js";import{T as n}from"./Tooltip-Caz5TE7Z.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const g={title:"Components/Tooltip",component:n,args:{content:"Deploy latest preview",position:"top",children:null},argTypes:{position:{control:"inline-radio",options:["top","right","bottom","left"]}}},e={args:{children:null},render:({children:a,...s})=>t.jsx("div",{style:{height:"300px",display:"flex",alignItems:"center"},children:t.jsx(n,{...s,children:t.jsx(l,{variant:"outlined",children:"Hover me"})})})};var o,r,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    children: null
  },
  render: ({
    children: _children,
    ...args
  }) => <div style={{
    height: '300px',
    display: 'flex',
    alignItems: 'center'
  }}>
      <Tooltip {...args}>
        <Button variant="outlined">Hover me</Button>
      </Tooltip>
    </div>
}`,...(i=(r=e.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const x=["Basic"];export{e as Basic,x as __namedExportsOrder,g as default};
