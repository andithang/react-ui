import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as r}from"./Select-BxQ7MXRi.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-2dOUpm6k.js";const C={title:"Components/Select",component:r,args:{label:"Role",hint:"Choose one role.",error:"",defaultValue:"frontend"}},t={render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},n={args:{prefixTitle:"Role:"},render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},l={args:{label:"Skills",hint:"Choose one or more skills.",multiple:!0,defaultValue:["react","typescript"]},render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"react",children:"React"}),e.jsx("option",{value:"typescript",children:"TypeScript"}),e.jsx("option",{value:"storybook",children:"Storybook"}),e.jsx("option",{value:"a11y",children:"Accessibility"})]})},a={args:{label:"Skills",multiple:!0,enableSelectAll:!0,selectAllValue:-1,maxSelectedItemsShown:1,defaultValue:["react"]},render:o=>e.jsxs(r,{...o,children:[e.jsxs("optgroup",{label:"Frontend",children:[e.jsx("option",{value:"react",children:"React"}),e.jsx("option",{value:"typescript",children:"TypeScript"})]}),e.jsxs("optgroup",{label:"Tools",children:[e.jsx("option",{value:"storybook",children:"Storybook"}),e.jsx("option",{value:"a11y",disabled:!0,children:"Accessibility (disabled)"})]})]})},i={args:{label:"Data source",multiple:!0,onScrollToLoad:()=>{console.log("load more options...")}},render:o=>e.jsx(r,{...o,children:Array.from({length:30},(B,c)=>e.jsxs("option",{value:`item-${c+1}`,children:["Item ",c+1]},c))})},s={args:{error:"Please select a role."},render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})};var p,d,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var g,m,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    prefixTitle: 'Role:'
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(S=(m=n.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var h,x,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Skills',
    hint: 'Choose one or more skills.',
    multiple: true,
    defaultValue: ['react', 'typescript']
  },
  render: args => <Select {...args}>
      <option value="react">React</option>
      <option value="typescript">TypeScript</option>
      <option value="storybook">Storybook</option>
      <option value="a11y">Accessibility</option>
    </Select>
}`,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var v,k,y;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Skills',
    multiple: true,
    enableSelectAll: true,
    selectAllValue: -1,
    maxSelectedItemsShown: 1,
    defaultValue: ['react']
  },
  render: args => <Select {...args}>
      <optgroup label="Frontend">
        <option value="react">React</option>
        <option value="typescript">TypeScript</option>
      </optgroup>
      <optgroup label="Tools">
        <option value="storybook">Storybook</option>
        <option value="a11y" disabled>
          Accessibility (disabled)
        </option>
      </optgroup>
    </Select>
}`,...(y=(k=a.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var j,f,E;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Data source',
    multiple: true,
    onScrollToLoad: () => {
      // eslint-disable-next-line no-console
      console.log('load more options...');
    }
  },
  render: args => <Select {...args}>
      {Array.from({
      length: 30
    }, (_, index) => <option key={index} value={\`item-\${index + 1}\`}>
          Item {index + 1}
        </option>)}
    </Select>
}`,...(E=(f=i.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};var A,T,P;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    error: 'Please select a role.'
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(P=(T=s.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};const M=["Basic","WithPrefixTitle","Multiple","MultipleWithSelectAll","InfiniteScrollHook","ErrorState"];export{t as Basic,s as ErrorState,i as InfiniteScrollHook,l as Multiple,a as MultipleWithSelectAll,n as WithPrefixTitle,M as __namedExportsOrder,C as default};
