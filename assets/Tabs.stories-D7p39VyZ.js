import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./index-oxIuDU2I.js";import{c as x}from"./utils-2dOUpm6k.js";import"./_commonjsHelpers-CqkleIqs.js";function m({items:t,defaultTabId:s,activeTabId:l,onTabChange:u,className:$,id:E,...R}){var I;const U=d.useId().replace(/:/g,""),T=d.useRef([]),p=E??`ui-tabs-${U}`,g=e=>`${p}-tab-${e.replace(/[^a-zA-Z0-9_-]/g,"-")}`,v=e=>`${p}-panel-${e.replace(/[^a-zA-Z0-9_-]/g,"-")}`,[y,D]=d.useState(()=>{var e;return s??((e=t[0])==null?void 0:e.id)}),N=t.some(e=>e.id===y)?y:s??((I=t[0])==null?void 0:I.id),h=l??N,a=d.useMemo(()=>t.find(e=>e.id===h)??t[0],[t,h]);if(!t.length)return null;const f=e=>{l===void 0&&D(e),u==null||u(e)},O=(e,r)=>{var w;let n=null;if(e.key==="ArrowRight"&&(n=(r+1)%t.length),e.key==="ArrowLeft"&&(n=(r-1+t.length)%t.length),e.key==="Home"&&(n=0),e.key==="End"&&(n=t.length-1),n===null)return;e.preventDefault();const o=t[n];f(o.id),(w=T.current[n])==null||w.focus()};return i.jsxs("div",{className:x("ui-tabs",$),id:p,...R,children:[i.jsx("div",{className:"ui-tabs__list",role:"tablist",children:t.map((e,r)=>{const n=e.id===(a==null?void 0:a.id);return i.jsx("button",{ref:o=>{T.current[r]=o},role:"tab",id:g(e.id),"aria-controls":v(e.id),"aria-selected":n,tabIndex:n?0:-1,className:x("ui-tabs__tab",n&&"is-active"),onClick:()=>f(e.id),onKeyDown:o=>O(o,r),type:"button",children:e.label},e.id)})}),i.jsx("div",{className:"ui-tabs__panel",role:"tabpanel",id:a?v(a.id):void 0,"aria-labelledby":a?g(a.id):void 0,tabIndex:0,children:a==null?void 0:a.content})]})}m.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"TabItem"}],raw:"TabItem[]"},description:""},defaultTabId:{required:!1,tsType:{name:"string"},description:""},activeTabId:{required:!1,tsType:{name:"string"},description:""},onTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(tabId: string) => void",signature:{arguments:[{type:{name:"string"},name:"tabId"}],return:{name:"void"}}},description:""}},composes:["HTMLAttributes"]};const K={title:"Components/Tabs",component:m},c={args:{items:[{id:"one",label:"Overview",content:"This is the overview tab content."},{id:"two",label:"Usage",content:"This tab shows usage guidance."},{id:"three",label:"Tokens",content:"Everything is powered by CSS variables."}]}},b={args:{items:[]},render:function(){const[s,l]=d.useState("one");return i.jsx(m,{activeTabId:s,onTabChange:l,items:[{id:"one",label:"Overview",content:`Controlled tab: ${s}`},{id:"two",label:"Usage",content:"This tab is controlled by story state."},{id:"three",label:"Tokens",content:"Primary-driven state styling is applied."}]})}};var _,k,A;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'one',
      label: 'Overview',
      content: 'This is the overview tab content.'
    }, {
      id: 'two',
      label: 'Usage',
      content: 'This tab shows usage guidance.'
    }, {
      id: 'three',
      label: 'Tokens',
      content: 'Everything is powered by CSS variables.'
    }]
  }
}`,...(A=(k=c.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var S,j,C;b.parameters={...b.parameters,docs:{...(S=b.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    items: []
  },
  render: function Render() {
    const [activeTabId, setActiveTabId] = useState('one');
    return <Tabs activeTabId={activeTabId} onTabChange={setActiveTabId} items={[{
      id: 'one',
      label: 'Overview',
      content: \`Controlled tab: \${activeTabId}\`
    }, {
      id: 'two',
      label: 'Usage',
      content: 'This tab is controlled by story state.'
    }, {
      id: 'three',
      label: 'Tokens',
      content: 'Primary-driven state styling is applied.'
    }]} />;
  }
}`,...(C=(j=b.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};const L=["BasicTabs","ControlledTabs"];export{c as BasicTabs,b as ControlledTabs,L as __namedExportsOrder,K as default};
