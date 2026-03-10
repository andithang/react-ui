import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{G as a,B as d}from"./Box-xdliVbkH.js";import"./utils-2dOUpm6k.js";const u={title:"Components/Grid",component:a,args:{columns:3,minColumnWidth:"10rem",gap:"md"},argTypes:{columns:{control:{type:"number",min:1,max:6,step:1}},minColumnWidth:{control:"text"},gap:{control:"select",options:["none","xs","sm","md","lg","xl","2xl"]}}},r={render:n=>o.jsx(a,{...n,style:{width:"min(40rem, 90vw)"},children:Array.from({length:6}).map((i,e)=>o.jsxs(d,{surface:!0,padding:"md",radius:"sm",children:["Card ",e+1]},e))})};var s,m,t;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => <Grid {...args} style={{
    width: 'min(40rem, 90vw)'
  }}>\r
      {Array.from({
      length: 6
    }).map((_, idx) => <Box key={idx} surface padding="md" radius="sm">\r
          Card {idx + 1}\r
        </Box>)}\r
    </Grid>
}`,...(t=(m=r.parameters)==null?void 0:m.docs)==null?void 0:t.source}}};const x=["Playground"];export{r as Playground,x as __namedExportsOrder,u as default};
