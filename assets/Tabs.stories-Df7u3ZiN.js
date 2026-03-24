import{j as b}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./index-oxIuDU2I.js";import{T as d}from"./Tabs-0X14c-PC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const w={title:"Components/Tabs",component:d},e={args:{items:[{id:"one",label:"Overview",content:"This is the overview tab content."},{id:"two",label:"Usage",content:"This tab shows usage guidance."},{id:"three",label:"Tokens",content:"Everything is powered by CSS variables."}]}},t={args:{items:[]},render:function(){const[n,l]=m.useState("one");return b.jsx(d,{activeTabId:n,onTabChange:l,items:[{id:"one",label:"Overview",content:`Controlled tab: ${n}`},{id:"two",label:"Usage",content:"This tab is controlled by story state."},{id:"three",label:"Tokens",content:"Primary-driven state styling is applied."}]})}};var a,s,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var r,i,c;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(c=(i=t.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const y=["BasicTabs","ControlledTabs"];export{e as BasicTabs,t as ControlledTabs,y as __namedExportsOrder,w as default};
