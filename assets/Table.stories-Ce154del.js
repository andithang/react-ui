import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{T as v}from"./Table-KotzjQIY.js";import{B as f}from"./Button-Ds6xf3X3.js";import{T as i}from"./Tag-BjdK_R01.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Checkbox-DW_Xethd.js";import"./utils-2dOUpm6k.js";import"./Pagination-th4E_jcZ.js";import"./Input-CNhK9MeM.js";import"./Icon-DE5ZeXya.js";import"./Select-xVUqj71N.js";const E=[{key:"1",name:"Jane Cooper",email:"jane@company.com",role:"Admin",status:"Active",age:34,action:"edit"},{key:"2",name:"Arlene McCoy",email:"arlene@company.com",role:"Editor",status:"Active",age:29,action:"edit"},{key:"3",name:"Ronald Richards",email:"ronald@company.com",role:"Viewer",status:"Inactive",age:42,action:"edit"},{key:"4",name:"Cameron Williamson",email:"cameron@company.com",role:"Viewer",status:"Active",age:25,action:"edit"},{key:"5",name:"Savannah Nguyen",email:"savannah@company.com",role:"Editor",status:"Inactive",age:31,action:"edit"},{key:"6",name:"Wade Warren",email:"wade@company.com",role:"Admin",status:"Active",age:38,action:"edit"}],h=[{title:"Name",dataIndex:"name",key:"name",sorter:(e,a)=>e.name.localeCompare(a.name),ellipsis:!0},{title:"Email",dataIndex:"email",key:"email",ellipsis:!0},{title:"Role",dataIndex:"role",key:"role",filters:[{text:"Admin",value:"Admin"},{text:"Editor",value:"Editor"},{text:"Viewer",value:"Viewer"}],onFilter:(e,a)=>a.role===e,render:e=>s.jsx(i,{color:"blue",children:String(e)})},{title:"Status",dataIndex:"status",key:"status",render:e=>s.jsx(i,{color:e==="Active"?"green":"red",children:String(e)})},{title:"Age",dataIndex:"age",key:"age",align:"right",sorter:(e,a)=>e.age-a.age},{title:"Actions",dataIndex:"action",key:"action",align:"center",render:()=>s.jsx(f,{type:"primary",size:"small",children:"Edit"})}],L={title:"Components/Table",component:v,parameters:{actions:{disable:!0}},args:{columns:h,dataSource:E,pagination:{defaultCurrent:1,defaultPageSize:4,showSizeChanger:!0}}},r={},t={args:{bordered:!0,size:"large"}},o={args:{loading:!0}},n={args:{dataSource:[],locale:{emptyText:"No users found"}}};var m,c,d;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(d=(c=r.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,p,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    bordered: true,
    size: 'large'
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,y,x;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var S,k,A;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    dataSource: [],
    locale: {
      emptyText: 'No users found'
    }
  }
}`,...(A=(k=n.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};const _=["Basic","Bordered","Loading","Empty"];export{r as Basic,t as Bordered,n as Empty,o as Loading,_ as __namedExportsOrder,L as default};
