import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as b}from"./index-oxIuDU2I.js";import{B as d}from"./Button-Ds6xf3X3.js";import{A as r}from"./index-CLLNg0KU.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";import"./Icon-DE5ZeXya.js";const P={title:"Components/Alert",component:r},n={render:()=>e.jsxs("div",{style:{display:"grid",gap:"0.75rem"},children:[e.jsx(r,{type:"success",title:"Success alert"}),e.jsx(r,{type:"info",title:"Info alert"}),e.jsx(r,{type:"warning",title:"Warning alert"}),e.jsx(r,{type:"error",title:"Error alert"})]})},o={render:()=>e.jsx(r,{type:"info",showIcon:!0,title:"Processing deployment",description:"A new release is being prepared and will be available shortly.",action:e.jsx(d,{size:"small",variant:"outlined",children:"View logs"})})},a={render:function(){const[t,s]=b.useState(!0);return t?e.jsx(r,{type:"warning",title:"Session will expire soon",description:"Save your work to avoid data loss.",closable:{closeIcon:!0,onClose:()=>s(!1),"aria-label":"Dismiss alert"}}):e.jsx(d,{onClick:()=>s(!0),children:"Show alert"})}},i={render:()=>e.jsx(r,{banner:!0,title:"Banner mode defaults to warning style and visible icon.",description:"Set type and showIcon explicitly to customize it."})};function R({shouldCrash:c}){if(c)throw new Error("Simulated render crash");return e.jsx("div",{children:"Component rendered safely."})}const l={render:function(){const[t,s]=b.useState(!1);return e.jsxs("div",{style:{display:"grid",gap:"0.75rem"},children:[e.jsx(d,{onClick:()=>s(E=>!E),children:t?"Render healthy component":"Trigger crash"}),e.jsx(r.ErrorBoundary,{title:"Render failed in child component.",children:e.jsx(R,{shouldCrash:t})})]})}};var p,u,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: '0.75rem'
  }}>
      <Alert type="success" title="Success alert" />
      <Alert type="info" title="Info alert" />
      <Alert type="warning" title="Warning alert" />
      <Alert type="error" title="Error alert" />
    </div>
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var h,y,g;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Alert type="info" showIcon title="Processing deployment" description="A new release is being prepared and will be available shortly." action={<Button size="small" variant="outlined">
          View logs
        </Button>} />
}`,...(g=(y=o.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var f,w,x;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    const [open, setOpen] = useState(true);
    return open ? <Alert type="warning" title="Session will expire soon" description="Save your work to avoid data loss." closable={{
      closeIcon: true,
      onClose: () => setOpen(false),
      'aria-label': 'Dismiss alert'
    }} /> : <Button onClick={() => setOpen(true)}>Show alert</Button>;
  }
}`,...(x=(w=a.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var S,B,A;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Alert banner title="Banner mode defaults to warning style and visible icon." description="Set type and showIcon explicitly to customize it." />
}`,...(A=(B=i.parameters)==null?void 0:B.docs)==null?void 0:A.source}}};var j,v,C;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: function Render() {
    const [crash, setCrash] = useState(false);
    return <div style={{
      display: 'grid',
      gap: '0.75rem'
    }}>
        <Button onClick={() => setCrash(current => !current)}>
          {crash ? 'Render healthy component' : 'Trigger crash'}
        </Button>
        <Alert.ErrorBoundary title="Render failed in child component.">
          <Crash shouldCrash={crash} />
        </Alert.ErrorBoundary>
      </div>;
  }
}`,...(C=(v=l.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};const T=["BasicVariants","WithDescriptionAndAction","Closable","Banner","ErrorBoundary"];export{i as Banner,n as BasicVariants,a as Closable,l as ErrorBoundary,o as WithDescriptionAndAction,T as __namedExportsOrder,P as default};
