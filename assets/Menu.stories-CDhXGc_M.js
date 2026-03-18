import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as _}from"./index-oxIuDU2I.js";import{c as u}from"./utils-2dOUpm6k.js";import"./_commonjsHelpers-CqkleIqs.js";function X(s){return!!(s&&typeof s=="object"&&"type"in s&&s.type==="divider")}function Y(s){return!!(s&&typeof s=="object"&&"type"in s&&s.type==="group")}function Z(s){return!!(s&&typeof s=="object"&&"children"in s&&Array.isArray(s.children))}function z({items:s=[],mode:T="vertical",theme:E="light",selectable:y=!0,multiple:H=!1,selectedKeys:N,defaultSelectedKeys:$,openKeys:x,defaultOpenKeys:B,inlineCollapsed:j,disabled:f,triggerSubMenuAction:M="click",expandIcon:G,onClick:g,onSelect:b,onDeselect:v,onOpenChange:h,className:P,...D}){const[R,F]=_.useState($??[]),[J,L]=_.useState(B??[]),t=N??R,l=x??J,w=_.useMemo(()=>new Set(t),[t]),q=n=>{x||L(n),h==null||h(n)},Q=(n,r)=>{N||F(n),y&&(n.includes(r.key)?b==null||b(r):v==null||v(r))},U=n=>{const r=l.includes(n)?l.filter(e=>e!==n):[...l,n];q(r)},W=(n,r,e)=>{var i;if(f||n.disabled)return;const o=y?H?w.has(n.key)?t.filter(c=>c!==n.key):[...t,n.key]:[n.key]:t,d={key:n.key,keyPath:r,item:n,domEvent:e};y&&Q(o,d),(i=n.onClick)==null||i.call(n),g==null||g(d)},k=(n,r=[])=>n.map((e,o)=>{if(!e)return null;if(X(e))return a.jsx("li",{className:u("ui-menu__divider",e.dashed&&"ui-menu__divider--dashed")},e.key??`divider-${o}`);if(Y(e))return a.jsxs("li",{className:"ui-menu__group",children:[e.label?a.jsx("div",{className:"ui-menu__group-title",children:e.label}):null,a.jsx("ul",{className:"ui-menu__group-list",children:k(e.children??[],r)})]},e.key??`group-${o}`);if(Z(e)){const i=[e.key,...r],c=l.includes(e.key);return a.jsxs("li",{className:u("ui-menu__submenu",c&&"is-open"),children:[a.jsxs("button",{type:"button",className:u("ui-menu__item","ui-menu__submenu-trigger",e.className),style:e.style,onClick:()=>{M==="click"&&U(e.key)},onMouseEnter:()=>{M==="hover"&&!l.includes(e.key)&&q([...l,e.key])},title:e.title,disabled:f||e.disabled,children:[a.jsxs("span",{className:"ui-menu__item-content",children:[e.icon?a.jsx("span",{className:"ui-menu__icon",children:e.icon}):null,a.jsx("span",{children:e.label})]}),a.jsx("span",{className:"ui-menu__expand",children:G??"▾"})]}),(c||T==="inline")&&!j?a.jsx("ul",{className:"ui-menu__submenu-list",children:k(e.children,i)}):null]},e.key)}const d=w.has(e.key);return a.jsx("li",{className:"ui-menu__item-wrap",children:a.jsxs("button",{type:"button",className:u("ui-menu__item",d&&"is-selected",e.danger&&"is-danger",e.className),style:e.style,onClick:i=>W(e,[e.key,...r],i),title:e.title,disabled:f||e.disabled,children:[e.icon?a.jsx("span",{className:"ui-menu__icon",children:e.icon}):null,a.jsx("span",{className:"ui-menu__label",children:e.label})]})},e.key)});return a.jsx("nav",{className:u("ui-menu",`ui-menu--${T}`,`ui-menu--${E}`,j&&"ui-menu--collapsed",P),"aria-label":"Menu",...D,children:a.jsx("ul",{className:"ui-menu__list",children:k(s)})})}z.__docgenInfo={description:"",methods:[],displayName:"Menu",props:{items:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType | null",elements:[{name:"MenuItemType"},{name:"SubMenuType"},{name:"MenuItemGroupType"},{name:"MenuDividerType"},{name:"null"}]}],raw:"ItemType[]"},description:"",defaultValue:{value:"[]",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:"'vertical' | 'horizontal' | 'inline'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"},{name:"literal",value:"'inline'"}]},description:"",defaultValue:{value:"'vertical'",computed:!1}},theme:{required:!1,tsType:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}]},description:"",defaultValue:{value:"'light'",computed:!1}},selectable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},multiple:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectedKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},defaultSelectedKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},openKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},defaultOpenKeys:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},inlineCollapsed:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},triggerSubMenuAction:{required:!1,tsType:{name:"union",raw:"'hover' | 'click'",elements:[{name:"literal",value:"'hover'"},{name:"literal",value:"'click'"}]},description:"",defaultValue:{value:"'click'",computed:!1}},expandIcon:{required:!1,tsType:{name:"ReactNode"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(info: MenuInfo) => void",signature:{arguments:[{type:{name:"MenuInfo"},name:"info"}],return:{name:"void"}}},description:""},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(info: MenuInfo) => void",signature:{arguments:[{type:{name:"MenuInfo"},name:"info"}],return:{name:"void"}}},description:""},onDeselect:{required:!1,tsType:{name:"signature",type:"function",raw:"(info: MenuInfo) => void",signature:{arguments:[{type:{name:"MenuInfo"},name:"info"}],return:{name:"void"}}},description:""},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(openKeys: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"openKeys"}],return:{name:"void"}}},description:""}},composes:["Omit"]};const se={title:"Components/Menu",component:z},p={args:{items:[{key:"mail",label:"Navigation One"},{key:"app",label:"Navigation Two"},{key:"sub1",label:"Navigation Three",children:[{key:"sub1-1",label:"Option 1"},{key:"sub1-2",label:"Option 2"}]},{type:"divider"},{key:"danger",label:"Delete",danger:!0}],defaultSelectedKeys:["mail"],defaultOpenKeys:["sub1"]}},m={args:{mode:"horizontal",items:[{key:"home",label:"Home"},{key:"products",label:"Products"},{key:"pricing",label:"Pricing"}],defaultSelectedKeys:["products"]}};var I,K,S;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    items: [{
      key: 'mail',
      label: 'Navigation One'
    }, {
      key: 'app',
      label: 'Navigation Two'
    }, {
      key: 'sub1',
      label: 'Navigation Three',
      children: [{
        key: 'sub1-1',
        label: 'Option 1'
      }, {
        key: 'sub1-2',
        label: 'Option 2'
      }]
    }, {
      type: 'divider'
    }, {
      key: 'danger',
      label: 'Delete',
      danger: true
    }],
    defaultSelectedKeys: ['mail'],
    defaultOpenKeys: ['sub1']
  }
}`,...(S=(K=p.parameters)==null?void 0:K.docs)==null?void 0:S.source}}};var O,A,V;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    mode: 'horizontal',
    items: [{
      key: 'home',
      label: 'Home'
    }, {
      key: 'products',
      label: 'Products'
    }, {
      key: 'pricing',
      label: 'Pricing'
    }],
    defaultSelectedKeys: ['products']
  }
}`,...(V=(A=m.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};const re=["Vertical","Horizontal"];export{m as Horizontal,p as Vertical,re as __namedExportsOrder,se as default};
