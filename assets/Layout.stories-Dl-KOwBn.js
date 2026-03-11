import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{F as m,B as s,G as n}from"./Box-xdliVbkH.js";import{T as o}from"./Typography-BWSK9Kan.js";import"./utils-2dOUpm6k.js";const g={title:"Components/Layout"},e={render:()=>r.jsxs(m,{direction:"column",gap:"lg",style:{width:"min(46rem, 90vw)"},children:[r.jsxs(s,{surface:!0,padding:"lg",radius:"md",children:[r.jsx(o,{variant:"subtitle",children:"Surface Box"}),r.jsx(o,{tone:"muted",children:"Uses global color, spacing and radius variables."})]}),r.jsx(n,{columns:3,gap:"md",children:Array.from({length:6}).map((l,a)=>r.jsxs(s,{surface:!0,padding:"md",radius:"sm",children:["Item ",a+1]},a))})]})};var d,i,t;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="lg" style={{
    width: 'min(46rem, 90vw)'
  }}>
      <Box surface padding="lg" radius="md">
        <Typography variant="subtitle">Surface Box</Typography>
        <Typography tone="muted">Uses global color, spacing and radius variables.</Typography>
      </Box>
      <Grid columns={3} gap="md">
        {Array.from({
        length: 6
      }).map((_, idx) => <Box key={idx} surface padding="md" radius="sm">
            Item {idx + 1}
          </Box>)}
      </Grid>
    </Flex>
}`,...(t=(i=e.parameters)==null?void 0:i.docs)==null?void 0:t.source}}};const y=["BoxFlexGrid"];export{e as BoxFlexGrid,y as __namedExportsOrder,g as default};
