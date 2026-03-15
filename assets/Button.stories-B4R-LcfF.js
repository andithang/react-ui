import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{B as e}from"./Button-Ds6xf3X3.js";import{I as p}from"./Icon-CFiHCatN.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const M={title:"Components/Button",component:e,args:{children:"Button",type:"default",size:"middle"},argTypes:{type:{control:"select",options:["default","primary","dashed","link","text"]},color:{control:"select",options:[void 0,"default","primary","danger","blue","purple","cyan","green","magenta","pink","red","orange","yellow","volcano","geekblue","lime","gold"]},variant:{control:"select",options:[void 0,"outlined","dashed","solid","filled","text","link"]},size:{control:"select",options:["small","middle","large"]},shape:{control:"select",options:["default","circle","round","square"]},iconPlacement:{control:"inline-radio",options:["start","end"]}}},t={args:{type:"primary"}},a={render:()=>r.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[r.jsx(e,{type:"primary",children:"Primary"}),r.jsx(e,{type:"default",children:"Default"}),r.jsx(e,{type:"dashed",children:"Dashed"}),r.jsx(e,{type:"text",children:"Text"}),r.jsx(e,{type:"link",children:"Link"})]})},o={render:()=>r.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[r.jsx(e,{color:"primary",variant:"outlined",children:"Outlined"}),r.jsx(e,{color:"primary",variant:"solid",children:"Solid"}),r.jsx(e,{color:"primary",variant:"filled",children:"Filled"}),r.jsx(e,{color:"primary",variant:"text",children:"Text"}),r.jsx(e,{color:"primary",variant:"link",children:"Link"}),r.jsx(e,{color:"primary",variant:"dashed",children:"Dashed"})]})},n={render:()=>r.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[r.jsx(e,{color:"primary",variant:"solid",children:"Primary"}),r.jsx(e,{color:"danger",variant:"solid",children:"Danger"}),r.jsx(e,{color:"blue",variant:"solid",children:"Blue"}),r.jsx(e,{color:"purple",variant:"solid",children:"Purple"}),r.jsx(e,{color:"green",variant:"solid",children:"Green"}),r.jsx(e,{color:"gold",variant:"filled",children:"Gold Filled"})]})},i={render:()=>r.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[r.jsx(e,{type:"primary",icon:r.jsx(p,{name:"check"}),children:"Save"}),r.jsx(e,{type:"primary",icon:r.jsx(p,{name:"check"}),iconPlacement:"end",children:"Save"}),r.jsx(e,{type:"primary",loading:!0,children:"Loading"}),r.jsx(e,{type:"default",loading:{delay:600},children:"Delayed Loading"}),r.jsx(e,{shape:"circle",type:"primary",icon:r.jsx(p,{name:"check"}),"aria-label":"Confirm"})]})},l={render:()=>r.jsxs("div",{style:{display:"grid",gap:"1rem",width:"22rem",padding:"1rem",background:"#202733"},children:[r.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[r.jsx(e,{type:"primary",ghost:!0,children:"Primary Ghost"}),r.jsx(e,{color:"danger",variant:"solid",ghost:!0,children:"Danger Ghost"})]}),r.jsx(e,{type:"primary",block:!0,children:"Block Button"})]})},s={render:()=>r.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[r.jsx(e,{href:"https://ant.design",target:"_blank",rel:"noreferrer",children:"Anchor Button"}),r.jsx(e,{href:"https://ant.design",disabled:!0,children:"Disabled Anchor"})]})},d={render:()=>r.jsxs(e.Group,{children:[r.jsx(e,{children:"Left"}),r.jsx(e,{type:"primary",children:"Middle"}),r.jsx(e,{children:"Right"})]})};var c,u,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    type: 'primary'
  }
}`,...(m=(u=t.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var y,h,x;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  }}>
      <Button type="primary">Primary</Button>
      <Button type="default">Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
    </div>
}`,...(x=(h=a.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var B,g,v;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  }}>
      <Button color="primary" variant="outlined">
        Outlined
      </Button>
      <Button color="primary" variant="solid">
        Solid
      </Button>
      <Button color="primary" variant="filled">
        Filled
      </Button>
      <Button color="primary" variant="text">
        Text
      </Button>
      <Button color="primary" variant="link">
        Link
      </Button>
      <Button color="primary" variant="dashed">
        Dashed
      </Button>
    </div>
}`,...(v=(g=o.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var f,j,k;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  }}>
      <Button color="primary" variant="solid">
        Primary
      </Button>
      <Button color="danger" variant="solid">
        Danger
      </Button>
      <Button color="blue" variant="solid">
        Blue
      </Button>
      <Button color="purple" variant="solid">
        Purple
      </Button>
      <Button color="green" variant="solid">
        Green
      </Button>
      <Button color="gold" variant="filled">
        Gold Filled
      </Button>
    </div>
}`,...(k=(j=n.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var b,w,G;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  }}>
      <Button type="primary" icon={<Icon name="check" />}>
        Save
      </Button>
      <Button type="primary" icon={<Icon name="check" />} iconPlacement="end">
        Save
      </Button>
      <Button type="primary" loading>
        Loading
      </Button>
      <Button type="default" loading={{
      delay: 600
    }}>
        Delayed Loading
      </Button>
      <Button shape="circle" type="primary" icon={<Icon name="check" />} aria-label="Confirm" />
    </div>
}`,...(G=(w=i.parameters)==null?void 0:w.docs)==null?void 0:G.source}}};var D,L,S;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: '1rem',
    width: '22rem',
    padding: '1rem',
    background: '#202733'
  }}>
      <div style={{
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap'
    }}>
        <Button type="primary" ghost>
          Primary Ghost
        </Button>
        <Button color="danger" variant="solid" ghost>
          Danger Ghost
        </Button>
      </div>
      <Button type="primary" block>
        Block Button
      </Button>
    </div>
}`,...(S=(L=l.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};var W,P,A;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  }}>
      <Button href="https://ant.design" target="_blank" rel="noreferrer">
        Anchor Button
      </Button>
      <Button href="https://ant.design" disabled>
        Disabled Anchor
      </Button>
    </div>
}`,...(A=(P=s.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var I,T,C;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Button.Group>
      <Button>Left</Button>
      <Button type="primary">Middle</Button>
      <Button>Right</Button>
    </Button.Group>
}`,...(C=(T=d.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};const V=["Basic","Types","Variants","Colors","LoadingAndIcon","GhostAndBlock","AsLink","Group"];export{s as AsLink,t as Basic,n as Colors,l as GhostAndBlock,d as Group,i as LoadingAndIcon,a as Types,o as Variants,V as __namedExportsOrder,M as default};
