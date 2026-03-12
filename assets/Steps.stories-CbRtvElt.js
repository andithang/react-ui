import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as r}from"./utils-2dOUpm6k.js";function p({items:l,current:n=0,direction:d="horizontal",className:m}){return e.jsx("ol",{className:r("ui-steps",`ui-steps--${d}`,m),children:l.map((s,i)=>{const u=s.status??(i<n?"finish":i===n?"process":"wait");return e.jsxs("li",{className:r("ui-steps__item",`ui-steps__item--${u}`),children:[e.jsx("span",{className:"ui-steps__icon",children:s.icon??i+1}),e.jsxs("div",{className:"ui-steps__content",children:[e.jsx("span",{className:"ui-steps__title",children:s.title}),s.description?e.jsx("span",{className:"ui-steps__description",children:s.description}):null]})]},i)})})}p.__docgenInfo={description:"",methods:[],displayName:"Steps",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"StepItem"}],raw:"StepItem[]"},description:""},current:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'horizontal'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const f={title:"Components/Steps",component:p,args:{current:1,direction:"horizontal"}},t={args:{items:[{title:"Finished",description:"This is a description."},{title:"In Progress",description:"This is a description."},{title:"Waiting",description:"This is a description."}]}};var a,o,c;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    items: [{
      title: 'Finished',
      description: 'This is a description.'
    }, {
      title: 'In Progress',
      description: 'This is a description.'
    }, {
      title: 'Waiting',
      description: 'This is a description.'
    }]
  }
}`,...(c=(o=t.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};const g=["Basic"];export{t as Basic,g as __namedExportsOrder,f as default};
