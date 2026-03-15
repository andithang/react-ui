import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{a as l,I as m}from"./Icon-T4Zacf1f.js";import"./utils-2dOUpm6k.js";const u={title:"Components/Icon",component:m,args:{name:"search",size:"1em"},argTypes:{name:{control:"select",options:l},size:{control:{type:"text"}}}},r={},a={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))",gap:"12px"},children:l.map(s=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px",border:"1px solid var(--ui-border)",borderRadius:"8px"},children:[e.jsx(m,{name:s,size:20}),e.jsx("code",{children:s})]},s))})};var n,o,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(o=r.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var p,t,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    gap: '12px'
  }}>
      {ICON_NAMES.map(name => <div key={name} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px',
      border: '1px solid var(--ui-border)',
      borderRadius: '8px'
    }}>
          <Icon name={name} size={20} />
          <code>{name}</code>
        </div>)}
    </div>
}`,...(d=(t=a.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};const y=["Basic","Gallery"];export{r as Basic,a as Gallery,y as __namedExportsOrder,u as default};
