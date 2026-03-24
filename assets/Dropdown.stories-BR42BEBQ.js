import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{B as l}from"./Button-Ds6xf3X3.js";import{D as n}from"./Dropdown-DWxEDuSi.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";import"./index-Dn0hWNo5.js";import"./index-ChhEEol8.js";const S={title:"Components/Dropdown",component:n},t={args:{trigger:["hover"],menu:{items:[{key:"1",label:"1st menu item"},{key:"2",label:"2nd menu item"},{key:"3",label:"Delete",danger:!0}]},children:r.jsx(l,{children:"Actions"})},render:e=>r.jsx(n,{...e,children:e.children})},o={args:{trigger:["click"],placement:"bottomRight",menu:{items:[{key:"profile",label:"Profile"},{key:"settings",label:"Settings"},{key:"logout",label:"Log out",danger:!0}]},children:r.jsx(l,{type:"primary",children:"Open menu"})},render:e=>r.jsx(n,{...e,children:e.children})},a={args:{trigger:["click"],arrow:{pointAtCenter:!0},placement:"topCenter",menu:{items:[{key:"copy",label:"Copy"},{key:"rename",label:"Rename"},{key:"archive",label:"Archive"}]},children:r.jsx(l,{children:"Arrow menu"})},render:e=>r.jsx(n,{...e,children:e.children})},i={render:()=>r.jsx(n.Button,{type:"primary",trigger:["click"],menu:{items:[{key:"edit",label:"Edit"},{key:"duplicate",label:"Duplicate"},{key:"remove",label:"Remove",danger:!0}]},children:"Primary action"})};var s,c,m;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    trigger: ['hover'],
    menu: {
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
    },
    children: <Button>Actions</Button>
  },
  render: args => <Dropdown {...args}>{args.children}</Dropdown>
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,d,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    trigger: ['click'],
    placement: 'bottomRight',
    menu: {
      items: [{
        key: 'profile',
        label: 'Profile'
      }, {
        key: 'settings',
        label: 'Settings'
      }, {
        key: 'logout',
        label: 'Log out',
        danger: true
      }]
    },
    children: <Button type="primary">Open menu</Button>
  },
  render: args => <Dropdown {...args}>{args.children}</Dropdown>
}`,...(u=(d=o.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var g,y,k;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    trigger: ['click'],
    arrow: {
      pointAtCenter: true
    },
    placement: 'topCenter',
    menu: {
      items: [{
        key: 'copy',
        label: 'Copy'
      }, {
        key: 'rename',
        label: 'Rename'
      }, {
        key: 'archive',
        label: 'Archive'
      }]
    },
    children: <Button>Arrow menu</Button>
  },
  render: args => <Dropdown {...args}>{args.children}</Dropdown>
}`,...(k=(y=a.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};var h,b,w;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Dropdown.Button type="primary" trigger={['click']} menu={{
    items: [{
      key: 'edit',
      label: 'Edit'
    }, {
      key: 'duplicate',
      label: 'Duplicate'
    }, {
      key: 'remove',
      label: 'Remove',
      danger: true
    }]
  }}>
      Primary action
    </Dropdown.Button>
}`,...(w=(b=i.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};const R=["Basic","ClickTrigger","WithArrow","DropdownButtonStory"];export{t as Basic,o as ClickTrigger,i as DropdownButtonStory,a as WithArrow,R as __namedExportsOrder,S as default};
