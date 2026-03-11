import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{F as d}from"./Box-xdliVbkH.js";import{T as t}from"./Typography-BWSK9Kan.js";import"./utils-2dOUpm6k.js";const h={title:"Components/Typography",component:t,args:{as:"p",variant:"body",tone:"default",children:"Body text tokenized using CSS variables."},argTypes:{as:{control:"select",options:["p","span","div","h1","h2","h3","label","code"]},variant:{control:"select",options:["display","title","subtitle","body","caption","code"]},tone:{control:"select",options:["default","muted","primary","danger","success"]}}},a={},r={render:()=>e.jsxs(d,{direction:"column",gap:"sm",style:{minWidth:"28rem"},children:[e.jsx(t,{variant:"display",children:"Display Text"}),e.jsx(t,{variant:"title",children:"Title Text"}),e.jsx(t,{variant:"subtitle",children:"Subtitle Text"}),e.jsx(t,{children:"Body text tokenized using CSS variables."}),e.jsx(t,{variant:"caption",tone:"muted",children:"Caption text"}),e.jsx(t,{variant:"code",children:"npm run storybook"})]})};var o,i,s;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(s=(i=a.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,p,l;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="sm" style={{
    minWidth: '28rem'
  }}>
      <Typography variant="display">Display Text</Typography>
      <Typography variant="title">Title Text</Typography>
      <Typography variant="subtitle">Subtitle Text</Typography>
      <Typography>Body text tokenized using CSS variables.</Typography>
      <Typography variant="caption" tone="muted">
        Caption text
      </Typography>
      <Typography variant="code">npm run storybook</Typography>
    </Flex>
}`,...(l=(p=r.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const g=["Playground","Scale"];export{a as Playground,r as Scale,g as __namedExportsOrder,h as default};
