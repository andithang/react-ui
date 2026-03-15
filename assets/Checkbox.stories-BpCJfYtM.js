import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as v}from"./index-oxIuDU2I.js";import{F as f}from"./Box-xdliVbkH.js";import{C as r}from"./Checkbox-DW_Xethd.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const B={title:"Components/Checkbox",component:r,args:{children:"Enable notifications",defaultChecked:!1,disabled:!1}},e={},a={render:function(){const o=["Read","Write","Deploy"],[s,c]=v.useState(["Read"]),i=s.length===o.length,k=s.length>0&&!i;return t.jsxs(f,{direction:"column",gap:"sm",children:[t.jsx(r,{indeterminate:k,checked:i,onChange:l=>{c(l.target.checked?o:[])},children:"Select all permissions"}),t.jsx(r.Group,{options:o,value:s,onChange:l=>{c(l)}})]})}},n={render:()=>t.jsx(r.Group,{defaultValue:["banana"],options:[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Orange (disabled)",value:"orange",disabled:!0}]})};var d,p,u;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(u=(p=e.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,h,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: function Render() {
    const options = ['Read', 'Write', 'Deploy'];
    const [value, setValue] = useState<string[]>(['Read']);
    const allChecked = value.length === options.length;
    const isIndeterminate = value.length > 0 && !allChecked;
    return <Flex direction="column" gap="sm">
        <Checkbox indeterminate={isIndeterminate} checked={allChecked} onChange={event => {
        setValue(event.target.checked ? options : []);
      }}>
          Select all permissions
        </Checkbox>
        <Checkbox.Group options={options} value={value} onChange={nextValue => {
        setValue(nextValue as string[]);
      }} />
      </Flex>;
  }
}`,...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var b,x,C;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Checkbox.Group defaultValue={['banana']} options={[{
    label: 'Apple',
    value: 'apple'
  }, {
    label: 'Banana',
    value: 'banana'
  }, {
    label: 'Orange (disabled)',
    value: 'orange',
    disabled: true
  }]} />
}`,...(C=(x=n.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};const E=["Basic","Indeterminate","GroupOptions"];export{e as Basic,n as GroupOptions,a as Indeterminate,E as __namedExportsOrder,B as default};
