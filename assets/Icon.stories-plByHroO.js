import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-oxIuDU2I.js";import{a as r,b as O,I as C}from"./Icon-C_QFKvXo.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const A=100,b=100,Z={title:"Components/Icon",component:C,args:{name:O[0]??"search",size:"1em"},argTypes:{name:{control:"select",options:O},size:{control:{type:"text"}}}},d={};function t(u,x){return function({name:y,size:k}){const[S,Q]=i.useState(""),[_,N]=i.useState(A),n=S.trim().toLowerCase(),s=i.useMemo(()=>n?x.filter(a=>a.toLowerCase().includes(n)):x,[n]),E=s.slice(0,_),q=_<s.length;return i.useEffect(()=>{N(A)},[n]),e.jsxs("div",{style:{display:"grid",gap:"16px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",padding:"10px",border:"1px solid var(--ui-border)",borderRadius:"8px"},children:[e.jsx(C,{name:y,size:k??"1em"}),e.jsx("code",{children:y})]}),e.jsxs("div",{style:{padding:"12px",border:"1px solid var(--ui-border)",borderRadius:"8px"},children:[e.jsxs("h4",{style:{margin:0,marginBottom:"12px"},children:[u," (",E.length,"/",s.length," matches, ",x.length," total)"]}),e.jsx("div",{style:{marginBottom:"12px"},children:e.jsx("input",{type:"search",value:S,placeholder:"Search icon names",onChange:a=>Q(a.target.value),style:{width:"100%",maxWidth:"320px",padding:"8px 10px",borderRadius:"6px",border:"1px solid var(--ui-border)",background:"var(--ui-bg)",color:"var(--ui-text)"}})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))",gap:"10px"},children:E.map(a=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px",border:"1px solid var(--ui-border)",borderRadius:"6px"},children:[e.jsx(C,{name:a,size:20}),e.jsx("code",{children:a})]},a))}),s.length===0?e.jsx("div",{style:{marginTop:"12px"},children:"No icons found."}):null,q?e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"12px"},children:e.jsxs("button",{type:"button",onClick:()=>N(a=>Math.min(a+b,s.length)),style:{padding:"8px 12px",borderRadius:"6px",border:"1px solid var(--ui-border)",background:"var(--ui-bg)",color:"var(--ui-text)",cursor:"pointer"},children:["Load more (",Math.min(b,s.length-_),")"]})}):null]})]})}}function o(u){return{name:{control:"select",options:u}}}const l={args:{name:r.antd[0]},argTypes:o(r.antd),render:t("Ant Design",r.antd)},p={args:{name:r.bootstrap[0]},argTypes:o(r.bootstrap),render:t("Bootstrap",r.bootstrap)},m={args:{name:r.fontAwesome[0]},argTypes:o(r.fontAwesome),render:t("Font Awesome",r.fontAwesome)},c={args:{name:r.material[0]},argTypes:o(r.material),render:t("Material",r.material)},g={args:{name:r.vt[0]},argTypes:o(r.vt),render:t("VT",r.vt)};var h,f,I;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(I=(f=d.parameters)==null?void 0:f.docs)==null?void 0:I.source}}};var v,M,B;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    name: ICON_NAMES_BY_SOURCE.antd[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.antd),
  render: renderFamilyPage('Ant Design', ICON_NAMES_BY_SOURCE.antd)
}`,...(B=(M=l.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var R,T,j;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    name: ICON_NAMES_BY_SOURCE.bootstrap[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.bootstrap),
  render: renderFamilyPage('Bootstrap', ICON_NAMES_BY_SOURCE.bootstrap)
}`,...(j=(T=p.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var U,Y,w;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    name: ICON_NAMES_BY_SOURCE.fontAwesome[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.fontAwesome),
  render: renderFamilyPage('Font Awesome', ICON_NAMES_BY_SOURCE.fontAwesome)
}`,...(w=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:w.source}}};var F,P,L;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    name: ICON_NAMES_BY_SOURCE.material[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.material),
  render: renderFamilyPage('Material', ICON_NAMES_BY_SOURCE.material)
}`,...(L=(P=c.parameters)==null?void 0:P.docs)==null?void 0:L.source}}};var V,z,D;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    name: ICON_NAMES_BY_SOURCE.vt[0]
  },
  argTypes: familyNameControl(ICON_NAMES_BY_SOURCE.vt),
  render: renderFamilyPage('VT', ICON_NAMES_BY_SOURCE.vt)
}`,...(D=(z=g.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};const $=["Basic","AntDesign","Bootstrap","FontAwesome","Material","VT"];export{l as AntDesign,d as Basic,p as Bootstrap,m as FontAwesome,c as Material,g as VT,$ as __namedExportsOrder,Z as default};
