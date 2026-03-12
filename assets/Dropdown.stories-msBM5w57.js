import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-oxIuDU2I.js";import{c as i}from"./utils-2dOUpm6k.js";import"./_commonjsHelpers-CqkleIqs.js";function g({trigger:y,items:w,open:l,defaultOpen:v=!1,onOpenChange:r,placement:_="bottomLeft",className:k}){const[x,D]=s.useState(v),d=s.useRef(null),u=l!==void 0,m=u?l:x,a=e=>{u||D(e),r==null||r(e)};return s.useEffect(()=>{const e=t=>{var p;(p=d.current)!=null&&p.contains(t.target)||a(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),n.jsxs("div",{className:i("ui-dropdown",k),ref:d,children:[n.jsx("button",{type:"button",className:"ui-dropdown__trigger",onClick:()=>a(!m),children:y??"Open"}),m?n.jsx("div",{className:i("ui-dropdown__menu",`ui-dropdown__menu--${_}`),role:"menu",children:w.map(e=>n.jsx("button",{type:"button",className:i("ui-dropdown__item",e.danger&&"ui-dropdown__item--danger"),onClick:()=>{var t;e.disabled||((t=e.onClick)==null||t.call(e),a(!1))},disabled:e.disabled,role:"menuitem",children:e.label},e.key))}):null]})}g.__docgenInfo={description:"",methods:[],displayName:"Dropdown",props:{trigger:{required:!1,tsType:{name:"ReactNode"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"DropdownMenuItem"}],raw:"DropdownMenuItem[]"},description:""},open:{required:!1,tsType:{name:"boolean"},description:""},defaultOpen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(nextOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"nextOpen"}],return:{name:"void"}}},description:""},placement:{required:!1,tsType:{name:"union",raw:"'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'",elements:[{name:"literal",value:"'bottomLeft'"},{name:"literal",value:"'bottomRight'"},{name:"literal",value:"'topLeft'"},{name:"literal",value:"'topRight'"}]},description:"",defaultValue:{value:"'bottomLeft'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const T={title:"Components/Dropdown",component:g},o={args:{trigger:"Actions",items:[{key:"1",label:"1st menu item"},{key:"2",label:"2nd menu item"},{key:"3",label:"Delete",danger:!0}]}};var c,f,b;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    trigger: 'Actions',
    items: [{
      key: '1',
      label: '1st menu item'
    }, {
      key: '2',
      label: '2nd menu item'
    }, {
      key: '3',
      label: 'Delete',
      danger: true
    }]
  }
}`,...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const h=["Basic"];export{o as Basic,h as __namedExportsOrder,T as default};
