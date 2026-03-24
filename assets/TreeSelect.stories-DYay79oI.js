import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-oxIuDU2I.js";import{S as w,T as r,a as j,b as D}from"./TreeSelect-CO0I4m2B.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Icon-DE5ZeXya.js";import"./utils-2dOUpm6k.js";const H=[{title:"Design",value:"design",children:[{title:"Tokens",value:"design-tokens"},{title:"Typography",value:"design-type"}]},{title:"Frontend",value:"frontend",children:[{title:"Components",value:"frontend-components"},{title:"Storybook",value:"frontend-storybook"}]},{title:"Backend",value:"backend",disabled:!0,children:[{title:"API",value:"backend-api"}]}],E={title:"Components/TreeSelect",component:r,args:{style:{width:340},treeData:H,allowClear:!0,placeholder:"Please select"}},o={render:function(e){const[t,n]=s.useState();return a.jsx(r,{...e,value:t,onChange:l=>{n(l)}})}},c={args:{multiple:!0,treeCheckable:!0,showSearch:!0},render:function(e){const[t,n]=s.useState(["design-tokens"]);return a.jsx(r,{...e,value:t,onChange:l=>{n(l)}})}},d={args:{multiple:!0,labelInValue:!0,treeCheckable:!0,showCheckedStrategy:w},render:function(e){const[t,n]=s.useState([{value:"frontend-components",label:"Components"}]);return a.jsx(r,{...e,value:t,onChange:l=>{n(l)}})}},i={render:function(e){const[t,n]=s.useState(["design","design-tokens","design-type"]);return a.jsxs("div",{style:{display:"grid",gap:16,maxWidth:360},children:[a.jsx(r,{...e,treeCheckable:!0,multiple:!0,showCheckedStrategy:j,value:t,onChange:n}),a.jsx(r,{...e,treeCheckable:!0,multiple:!0,showCheckedStrategy:w,value:t,onChange:n}),a.jsx(r,{...e,treeCheckable:!0,multiple:!0,showCheckedStrategy:D,value:t,onChange:n})]})}},p={args:{treeDataSimpleMode:!0,treeData:[{id:1,pId:0,value:"1",title:"Parent 1"},{id:2,pId:1,value:"1-1",title:"Child 1-1"},{id:3,pId:1,value:"1-2",title:"Child 1-2"},{id:4,pId:0,value:"2",title:"Parent 2"}]},render:function(e){const[t,n]=s.useState();return a.jsx(r,{...e,value:t,onChange:n})}};var g,h,m;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>();
    return <TreeSelect {...args} value={value} onChange={next => {
      setValue(next);
    }} />;
  }
}`,...(m=(h=o.parameters)==null?void 0:h.docs)==null?void 0:m.source}}};var S,C,v;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    multiple: true,
    treeCheckable: true,
    showSearch: true
  },
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>(['design-tokens']);
    return <TreeSelect {...args} value={value} onChange={next => {
      setValue(next);
    }} />;
  }
}`,...(v=(C=c.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var k,V,b;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    multiple: true,
    labelInValue: true,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT
  },
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>([{
      value: 'frontend-components',
      label: 'Components'
    } as TreeSelectLabeledValue]);
    return <TreeSelect {...args} value={value} onChange={next => {
      setValue(next);
    }} />;
  }
}`,...(b=(V=d.parameters)==null?void 0:V.docs)==null?void 0:b.source}}};var T,x,y;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>(['design', 'design-tokens', 'design-type']);
    return <div style={{
      display: 'grid',
      gap: 16,
      maxWidth: 360
    }}>
        <TreeSelect {...args} treeCheckable multiple showCheckedStrategy={SHOW_CHILD} value={value} onChange={setValue} />
        <TreeSelect {...args} treeCheckable multiple showCheckedStrategy={SHOW_PARENT} value={value} onChange={setValue} />
        <TreeSelect {...args} treeCheckable multiple showCheckedStrategy={SHOW_ALL} value={value} onChange={setValue} />
      </div>;
  }
}`,...(y=(x=i.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var f,I,R;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    treeDataSimpleMode: true,
    treeData: [{
      id: 1,
      pId: 0,
      value: '1',
      title: 'Parent 1'
    }, {
      id: 2,
      pId: 1,
      value: '1-1',
      title: 'Child 1-1'
    }, {
      id: 3,
      pId: 1,
      value: '1-2',
      title: 'Child 1-2'
    }, {
      id: 4,
      pId: 0,
      value: '2',
      title: 'Parent 2'
    }] as TreeSelectOption[]
  },
  render: function Render(args) {
    const [value, setValue] = useState<TreeSelectValue>();
    return <TreeSelect {...args} value={value} onChange={setValue} />;
  }
}`,...(R=(I=p.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};const M=["Basic","MultipleCheckable","LabelInValue","CheckedStrategies","SimpleModeData"];export{o as Basic,i as CheckedStrategies,d as LabelInValue,c as MultipleCheckable,p as SimpleModeData,M as __namedExportsOrder,E as default};
