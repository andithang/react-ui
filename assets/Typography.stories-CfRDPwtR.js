import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{F as d}from"./Box-xdliVbkH.js";import{T as t}from"./Typography-BWSK9Kan.js";import"./utils-2dOUpm6k.js";const h={title:"Components/Typography",component:t,args:{as:"p",variant:"body",tone:"default",children:"Body text tokenized using CSS variables."},argTypes:{as:{control:"select",options:["p","span","div","h1","h2","h3","label","code"]},variant:{control:"select",options:["display","title","subtitle","body","caption","code"]},tone:{control:"select",options:["default","muted","primary","danger","success"]}}},r={},a={render:()=>e.jsxs(d,{direction:"column",gap:"sm",style:{minWidth:"28rem"},children:[e.jsx(t,{variant:"display",children:"Display Text"}),e.jsx(t,{variant:"title",children:"Title Text"}),e.jsx(t,{variant:"subtitle",children:"Subtitle Text"}),e.jsx(t,{children:"Body text tokenized using CSS variables."}),e.jsx(t,{variant:"caption",tone:"muted",children:"Caption text"}),e.jsx(t,{variant:"code",children:"npm run storybook"})]})};var o,i,s;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(s=(i=r.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,p,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="sm" style={{
    minWidth: '28rem'
  }}>\r
      <Typography variant="display">Display Text</Typography>\r
      <Typography variant="title">Title Text</Typography>\r
      <Typography variant="subtitle">Subtitle Text</Typography>\r
      <Typography>Body text tokenized using CSS variables.</Typography>\r
      <Typography variant="caption" tone="muted">\r
        Caption text\r
      </Typography>\r
      <Typography variant="code">npm run storybook</Typography>\r
    </Flex>
}`,...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const g=["Playground","Scale"];export{r as Playground,a as Scale,g as __namedExportsOrder,h as default};
