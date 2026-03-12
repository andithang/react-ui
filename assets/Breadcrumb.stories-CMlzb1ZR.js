import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as d}from"./utils-2dOUpm6k.js";function o({items:s=[],separator:m="/",className:p}){return e.jsx("nav",{className:d("ui-breadcrumb",p),"aria-label":"Breadcrumb",children:e.jsx("ol",{className:"ui-breadcrumb__list",children:s.map((r,n)=>{const t=n===s.length-1;return e.jsxs("li",{className:"ui-breadcrumb__item","aria-current":t?"page":void 0,children:[r.href&&!t?e.jsx("a",{href:r.href,onClick:r.onClick,className:"ui-breadcrumb__link",children:r.title}):e.jsx("span",{className:"ui-breadcrumb__text",children:r.title}),t?null:e.jsx("span",{className:"ui-breadcrumb__separator",children:m})]},n)})})})}o.__docgenInfo={description:"",methods:[],displayName:"Breadcrumb",props:{items:{required:!1,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:"",defaultValue:{value:"[]",computed:!1}},separator:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"'/'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const b={title:"Components/Breadcrumb",component:o},a={args:{items:[{title:"Home",href:"#"},{title:"Application Center",href:"#"},{title:"Application List",href:"#"},{title:"An Application"}]}};var i,c,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    items: [{
      title: 'Home',
      href: '#'
    }, {
      title: 'Application Center',
      href: '#'
    }, {
      title: 'Application List',
      href: '#'
    }, {
      title: 'An Application'
    }]
  }
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const h=["Basic"];export{a as Basic,h as __namedExportsOrder,b as default};
