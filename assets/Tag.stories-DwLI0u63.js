import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as r}from"./Tag-BPNjiZeb.js";import{r as g}from"./index-oxIuDU2I.js";import"./utils-2dOUpm6k.js";import"./_commonjsHelpers-CqkleIqs.js";const q={title:"Components/Tag",component:r,args:{children:"React"}},o={},t={args:{closable:!0,onClose:()=>{console.log("close tag")}}},c={render:function(){return e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[e.jsx(r,{variant:"filled",children:"Filled"}),e.jsx(r,{variant:"outlined",children:"Outlined"}),e.jsx(r,{variant:"solid",children:"Solid"}),e.jsx(r,{bordered:!1,children:"Borderless (Deprecated API)"})]})}},l={render:function(){return e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[e.jsx(r,{color:"magenta",children:"Magenta"}),e.jsx(r,{color:"success",children:"Success"}),e.jsx(r,{color:"#2db7f5",children:"Custom Hex"}),e.jsx(r,{icon:e.jsx("span",{"aria-hidden":"true",children:"#"}),children:"With Icon"}),e.jsx(r,{closable:!0,closeIcon:e.jsx("span",{"aria-hidden":"true",children:"x"}),children:"Custom Close"})]})}},d={render:function(){return e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[e.jsx(r,{href:"https://ant.design",target:"_blank",rel:"noreferrer",children:"Link Tag"}),e.jsx(r,{href:"https://ant.design",disabled:!0,children:"Disabled Link Tag"}),e.jsx(r,{closable:!0,disabled:!0,children:"Disabled Closable"})]})}},i={render:function(){const[a,n]=g.useState(!1);return e.jsx(r.CheckableTag,{checked:a,onChange:n,children:a?"Checked":"Unchecked"})}},u={render:function(){const[a,n]=g.useState("React");return e.jsx(r.CheckableTagGroup,{options:["React","TypeScript","Storybook"],value:a,onChange:n})}},p={render:function(){const[a,n]=g.useState(["React"]);return e.jsx(r.CheckableTagGroup,{multiple:!0,options:["React","TypeScript","Storybook"],value:a,onChange:h=>{Array.isArray(h)&&n(h)}})}};var m,T,b;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(b=(T=o.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var f,x,C;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    closable: true,
    onClose: () => {
      // eslint-disable-next-line no-console
      console.log('close tag');
    }
  }
}`,...(C=(x=t.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var k,S,y;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }}>
        <Tag variant="filled">Filled</Tag>
        <Tag variant="outlined">Outlined</Tag>
        <Tag variant="solid">Solid</Tag>
        <Tag bordered={false}>Borderless (Deprecated API)</Tag>
      </div>;
  }
}`,...(y=(S=c.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var v,j,R;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }}>
        <Tag color="magenta">Magenta</Tag>
        <Tag color="success">Success</Tag>
        <Tag color="#2db7f5">Custom Hex</Tag>
        <Tag icon={<span aria-hidden="true">#</span>}>With Icon</Tag>
        <Tag closable closeIcon={<span aria-hidden="true">x</span>}>
          Custom Close
        </Tag>
      </div>;
  }
}`,...(R=(j=l.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};var A,V,D;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }}>
        <Tag href="https://ant.design" target="_blank" rel="noreferrer">
          Link Tag
        </Tag>
        <Tag href="https://ant.design" disabled>
          Disabled Link Tag
        </Tag>
        <Tag closable disabled>
          Disabled Closable
        </Tag>
      </div>;
  }
}`,...(D=(V=d.parameters)==null?void 0:V.docs)==null?void 0:D.source}}};var G,I,W;i.parameters={...i.parameters,docs:{...(G=i.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return <Tag.CheckableTag checked={checked} onChange={setChecked}>
        {checked ? 'Checked' : 'Unchecked'}
      </Tag.CheckableTag>;
  }
}`,...(W=(I=i.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var w,L,B;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState<string | null>('React');
    return <Tag.CheckableTagGroup options={['React', 'TypeScript', 'Storybook']} value={value} onChange={setValue} />;
  }
}`,...(B=(L=u.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var M,_,E;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState<Array<string>>(['React']);
    return <Tag.CheckableTagGroup multiple options={['React', 'TypeScript', 'Storybook']} value={value} onChange={nextValue => {
      if (Array.isArray(nextValue)) {
        setValue(nextValue as string[]);
      }
    }} />;
  }
}`,...(E=(_=p.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};const z=["Basic","Closable","Variants","ColorsAndIcons","LinkAndDisabled","Checkable","CheckableGroupSingle","CheckableGroupMultiple"];export{o as Basic,i as Checkable,p as CheckableGroupMultiple,u as CheckableGroupSingle,t as Closable,l as ColorsAndIcons,d as LinkAndDisabled,c as Variants,z as __namedExportsOrder,q as default};
