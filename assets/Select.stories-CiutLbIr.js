import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as r}from"./Select-xVUqj71N.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Tag-BjdK_R01.js";import"./utils-2dOUpm6k.js";import"./Icon-DE5ZeXya.js";const q={title:"Components/Select",component:r,args:{label:"Role",hint:"Choose one role.",error:"",defaultValue:"frontend"}},n={render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},t={args:{prefixTitle:"Role:"},render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},a={args:{label:"Skills",hint:"Choose one or more skills.",multiple:!0,defaultValue:["react","typescript"]},render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"react",children:"React"}),e.jsx("option",{value:"typescript",children:"TypeScript"}),e.jsx("option",{value:"storybook",children:"Storybook"}),e.jsx("option",{value:"a11y",children:"Accessibility"})]})},l={args:{label:"Skills",multiple:!0,enableSelectAll:!0,selectAllValue:-1,maxSelectedItemsShown:1,defaultValue:["react"]},render:o=>e.jsxs(r,{...o,children:[e.jsxs("optgroup",{label:"Frontend",children:[e.jsx("option",{value:"react",children:"React"}),e.jsx("option",{value:"typescript",children:"TypeScript"})]}),e.jsxs("optgroup",{label:"Tools",children:[e.jsx("option",{value:"storybook",children:"Storybook"}),e.jsx("option",{value:"a11y",disabled:!0,children:"Accessibility (disabled)"})]})]})},s={args:{label:"Data source",multiple:!0,onScrollToLoad:()=>{console.log("load more options...")}},render:o=>e.jsx(r,{...o,children:Array.from({length:30},(N,d)=>e.jsxs("option",{value:`item-${d+1}`,children:["Item ",d+1]},d))})},i={args:{searchable:!1},render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},c={args:{clearable:!1},render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})},p={args:{error:"Please select a role."},render:o=>e.jsxs(r,{...o,children:[e.jsx("option",{value:"frontend",children:"Frontend Engineer"}),e.jsx("option",{value:"backend",children:"Backend Engineer"}),e.jsx("option",{value:"design",children:"Product Designer"})]})};var u,g,m;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(m=(g=n.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var S,h,v;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    prefixTitle: 'Role:'
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(v=(h=t.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var b,x,k;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(k=(x=a.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var j,f,y;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(y=(f=l.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var E,P,A;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Data source',
    multiple: true,
    onScrollToLoad: () => {
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
}`,...(A=(P=s.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var B,D,F;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    searchable: false
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(F=(D=i.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var T,R,V;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    clearable: false
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(V=(R=c.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var C,I,M;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    error: 'Please select a role.'
  },
  render: args => <Select {...args}>
      <option value="frontend">Frontend Engineer</option>
      <option value="backend">Backend Engineer</option>
      <option value="design">Product Designer</option>
    </Select>
}`,...(M=(I=p.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};const z=["Basic","WithPrefixTitle","Multiple","MultipleWithSelectAll","InfiniteScrollHook","NotSearchable","NotClearable","ErrorState"];export{n as Basic,p as ErrorState,s as InfiniteScrollHook,a as Multiple,l as MultipleWithSelectAll,c as NotClearable,i as NotSearchable,t as WithPrefixTitle,z as __namedExportsOrder,q as default};
