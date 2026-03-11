import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{F as n,B as s}from"./Box-xdliVbkH.js";import"./utils-2dOUpm6k.js";const l={title:"Components/Flex",component:n,args:{direction:"row",align:"center",justify:"start",gap:"md",wrap:!1},argTypes:{direction:{control:"inline-radio",options:["row","column"]},align:{control:"select",options:["start","center","end","stretch"]},justify:{control:"select",options:["start","center","end","between","around","evenly"]},gap:{control:"select",options:["none","xs","sm","md","lg","xl","2xl"]},wrap:{control:"boolean"}}},r={render:d=>e.jsxs(n,{...d,style:{width:"min(30rem, 90vw)"},children:[e.jsx(s,{surface:!0,padding:"md",radius:"sm",children:"Item 1"}),e.jsx(s,{surface:!0,padding:"md",radius:"sm",children:"Item 2"}),e.jsx(s,{surface:!0,padding:"md",radius:"sm",children:"Item 3"})]})};var t,o,a;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => <Flex {...args} style={{
    width: 'min(30rem, 90vw)'
  }}>
      <Box surface padding="md" radius="sm">
        Item 1
      </Box>
      <Box surface padding="md" radius="sm">
        Item 2
      </Box>
      <Box surface padding="md" radius="sm">
        Item 3
      </Box>
    </Flex>
}`,...(a=(o=r.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const p=["Playground"];export{r as Playground,p as __namedExportsOrder,l as default};
