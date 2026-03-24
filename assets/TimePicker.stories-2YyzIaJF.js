import{j as h}from"./jsx-runtime-D_zvdyIk.js";import{r as f}from"./index-oxIuDU2I.js";import{T as l}from"./TimePicker-f9o3Ii9y.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Icon-DE5ZeXya.js";import"./utils-2dOUpm6k.js";const j={title:"Components/TimePicker",component:l,args:{label:"Time",allowClear:!0,size:"middle",status:void 0,minuteStep:5,secondStep:5,format:"HH:mm:ss"},argTypes:{size:{control:"select",options:["small","middle","large"]},status:{control:"select",options:[void 0,"error","warning"]},format:{control:"select",options:["HH:mm","HH:mm:ss","h:mm a"]},onChange:{action:"change"},onOpenChange:{action:"openChange"}}},e={render:function(r){const[p,d]=f.useState(new Date);return h.jsx(l,{...r,value:p,onChange:(t,g)=>{var o;d(t),(o=r.onChange)==null||o.call(r,t,g)}})}},n={args:{use12Hours:!0,format:"h:mm a"},render:e.render};var a,s,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = useState<Date | null>(new Date());
    return <TimePicker {...args} value={value} onChange={(next, nextString) => {
      setValue(next);
      args.onChange?.(next, nextString);
    }} />;
  }
}`,...(m=(s=e.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var i,c,u;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    use12Hours: true,
    format: 'h:mm a'
  },
  render: Basic.render
}`,...(u=(c=n.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const k=["Basic","TwelveHours"];export{e as Basic,n as TwelveHours,k as __namedExportsOrder,j as default};
