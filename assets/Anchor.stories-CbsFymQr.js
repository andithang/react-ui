import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as g}from"./index-oxIuDU2I.js";import{c as q}from"./utils-2dOUpm6k.js";import"./_commonjsHelpers-CqkleIqs.js";function A(s=[]){return s.flatMap(o=>[o,...A(o.children??[])])}function w({items:s=[],bounds:o=5,offsetTop:l=0,targetOffset:f,affix:T=!0,direction:I="vertical",replace:P,getContainer:c,getCurrentAnchor:d,onChange:p,onClick:h,className:_,...b}){const k=g.useMemo(()=>A(s),[s]),[y,N]=g.useState("");g.useEffect(()=>{const n=(c==null?void 0:c())??window,e=()=>n instanceof Window?n.scrollY:n.scrollTop,i=()=>{const u=e()+(f??l);let r=null;for(const x of k){const R=x.href.replace(/^#/,""),E=document.getElementById(R);if(!E)continue;const V=E.getBoundingClientRect().top+window.scrollY,j=Math.abs(V-u);(!r||j<r.distance+o)&&(r={href:x.href,distance:j})}const v=(d==null?void 0:d((r==null?void 0:r.href)??""))??(r==null?void 0:r.href)??"";v!==y&&(N(v),p==null||p(v))};i();const a=n instanceof Window?window:n;return a.addEventListener("scroll",i),()=>a.removeEventListener("scroll",i)},[y,o,c,d,k,l,p,f]);const B=n=>{const e=n.replace(/^#/,""),i=document.getElementById(e);if(!i)return;const a=i.getBoundingClientRect().top+window.scrollY-(f??l);window.scrollTo({top:a,behavior:"smooth"})},L=n=>t.jsx("ul",{className:"ui-anchor__list",children:n.map(e=>{var a;const i=y===e.href;return t.jsxs("li",{className:"ui-anchor__item",children:[t.jsx("a",{href:e.href,target:e.target,className:q("ui-anchor__link",i&&"is-active",e.className),style:e.style,onClick:u=>{u.preventDefault(),h==null||h(u,e),P?window.history.replaceState(null,"",e.href):window.history.pushState(null,"",e.href),B(e.href)},children:e.title}),(a=e.children)!=null&&a.length?L(e.children):null]},e.key??e.href)})});return t.jsx("nav",{className:q("ui-anchor",`ui-anchor--${I}`,T&&"ui-anchor--affix",_),style:T?{top:l}:void 0,...b,children:L(s)})}w.__docgenInfo={description:"",methods:[],displayName:"Anchor",props:{items:{required:!1,tsType:{name:"Array",elements:[{name:"AnchorLinkItemProps"}],raw:"AnchorLinkItemProps[]"},description:"",defaultValue:{value:"[]",computed:!1}},bounds:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},offsetTop:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},targetOffset:{required:!1,tsType:{name:"number"},description:""},affix:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},showInkInFixed:{required:!1,tsType:{name:"boolean"},description:""},getContainer:{required:!1,tsType:{name:"signature",type:"function",raw:"() => HTMLElement | Window",signature:{arguments:[],return:{name:"union",raw:"HTMLElement | Window",elements:[{name:"HTMLElement"},{name:"Window"}]}}},description:""},getCurrentAnchor:{required:!1,tsType:{name:"signature",type:"function",raw:"(activeLink: string) => string",signature:{arguments:[{type:{name:"string"},name:"activeLink"}],return:{name:"string"}}},description:""},direction:{required:!1,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:"",defaultValue:{value:"'vertical'",computed:!1}},replace:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(currentActiveLink: string) => void",signature:{arguments:[{type:{name:"string"},name:"currentActiveLink"}],return:{name:"void"}}},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.MouseEvent<HTMLElement>, link: AnchorLinkItemProps) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLElement>",elements:[{name:"HTMLElement"}]},name:"e"},{type:{name:"AnchorLinkItemProps"},name:"link"}],return:{name:"void"}}},description:""}},composes:["Omit"]};const F={title:"Components/Anchor",component:w},m={render:s=>t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"14rem 1fr",gap:"1rem"},children:[t.jsx(w,{...s}),t.jsxs("div",{style:{display:"grid",gap:"6rem"},children:[t.jsx("section",{id:"part-1",style:{minHeight:"40vh"},children:"Section 1 content"}),t.jsx("section",{id:"part-2",style:{minHeight:"40vh"},children:"Section 2 content"}),t.jsx("section",{id:"part-3",style:{minHeight:"40vh"},children:"Section 3 content"})]})]}),args:{offsetTop:16,items:[{key:"1",href:"#part-1",title:"Part 1"},{key:"2",href:"#part-2",title:"Part 2"},{key:"3",href:"#part-3",title:"Part 3"}]}};var H,M,S;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gridTemplateColumns: '14rem 1fr',
    gap: '1rem'
  }}>
      <Anchor {...args} />
      <div style={{
      display: 'grid',
      gap: '6rem'
    }}>
        <section id="part-1" style={{
        minHeight: '40vh'
      }}>Section 1 content</section>
        <section id="part-2" style={{
        minHeight: '40vh'
      }}>Section 2 content</section>
        <section id="part-3" style={{
        minHeight: '40vh'
      }}>Section 3 content</section>
      </div>
    </div>,
  args: {
    offsetTop: 16,
    items: [{
      key: '1',
      href: '#part-1',
      title: 'Part 1'
    }, {
      key: '2',
      href: '#part-2',
      title: 'Part 2'
    }, {
      key: '3',
      href: '#part-3',
      title: 'Part 3'
    }]
  }
}`,...(S=(M=m.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};const O=["Basic"];export{m as Basic,O as __namedExportsOrder,F as default};
