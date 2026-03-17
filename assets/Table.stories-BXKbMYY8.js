import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as y}from"./index-oxIuDU2I.js";import{B as re}from"./Button-Ds6xf3X3.js";import{C as ve}from"./Checkbox-DW_Xethd.js";import{P as we}from"./Pagination-LlNqT0_C.js";import{c as f}from"./utils-2dOUpm6k.js";import{T as D}from"./Tag-BjdK_R01.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Input-lvNa50N7.js";import"./Select-4Axy4lcp.js";import"./Icon-DE5ZeXya.js";function ke(i,o,m){return typeof o=="function"?o(i):typeof o=="string"&&o in i?String(i[o]):"key"in i?String(i.key):String(m)}function te({className:i,style:o,columns:m,dataSource:E=[],rowKey:le,loading:ie,bordered:se,size:ue="middle",locale:h,pagination:a={},onChange:R,onRow:_,onHeaderRow:j,onScroll:oe,expandedRowRender:b,rowExpandable:V,expandedRowKeys:L,defaultExpandedRowKeys:me,onExpand:N,onExpandedRowsChange:z}){const[p,de]=y.useState({}),[c,pe]=y.useState({}),[ge,B]=y.useState(a&&a.defaultCurrent||1),[ce,M]=y.useState(a&&a.defaultPageSize||10),[ye,be]=y.useState(me??[]),A=a&&a.current?a.current:ge,v=a&&a.pageSize?a.pageSize:ce,C=L??ye,P=y.useMemo(()=>{let n=[...E];m.forEach((e,s)=>{const u=e.key??e.dataIndex??String(s),t=e.filteredValue??c[u]??e.defaultFilteredValue;t!=null&&t.length&&(n=n.filter(d=>e.onFilter?t.some(w=>{var g;return(g=e.onFilter)==null?void 0:g.call(e,w,d)}):e.dataIndex?t.includes(d[e.dataIndex]):!0))});const l=m.find((e,s)=>{const u=e.key??e.dataIndex??String(s),t=e.sortOrder??(p.columnKey===u?p.order:e.defaultSortOrder);return!!(e.sorter&&t)});if(l&&typeof l.sorter=="function"){const e=m.indexOf(l),s=l.key??l.dataIndex??String(e),u=l.sortOrder??(p.columnKey===s?p.order:l.defaultSortOrder);n.sort(l.sorter),u==="descend"&&n.reverse()}return n},[m,E,c,p]),k=a&&a.total?a.total:P.length,H=a===!1?0:(A-1)*v,O=a===!1?P:P.slice(H,H+v),I=(n,l,e,s)=>{R==null||R(l,e,s,{action:n,currentDataSource:O})};return r.jsxs("div",{className:f("ui-table",i,se&&"ui-table--bordered",`ui-table--${ue}`),style:o,children:[r.jsx("div",{className:"ui-table__scroll",onScroll:oe,children:r.jsxs("table",{className:"ui-table__native",children:[r.jsx("thead",{children:r.jsxs("tr",{...j==null?void 0:j(m,0),children:[b?r.jsx("th",{className:"ui-table__expander-cell"}):null,m.map((n,l)=>{var u;const e=n.key??n.dataIndex??String(l),s=n.sortOrder??(p.columnKey===e?p.order:n.defaultSortOrder);return r.jsxs("th",{style:{textAlign:n.align,width:n.width},children:[r.jsxs("button",{type:"button",className:f("ui-table__header-button",n.sorter&&"ui-table__header-button--sortable"),onClick:()=>{if(!n.sorter||n.sortOrder)return;const d={columnKey:e,order:s==="ascend"?"descend":s==="descend"?void 0:"ascend"};de(d),I("sort",{...a,current:A,pageSize:v,total:k},c,d)},children:[r.jsx("span",{children:n.title}),n.sorter?r.jsxs("span",{className:"ui-table__sorter","aria-hidden":"true",children:[r.jsx("span",{className:f("ui-table__sorter-up",s==="ascend"&&"is-active")}),r.jsx("span",{className:f("ui-table__sorter-down",s==="descend"&&"is-active")})]}):null]}),(u=n.filters)!=null&&u.length?r.jsx("div",{className:"ui-table__filters",children:n.filters.map(t=>{const d=(n.filteredValue??c[e]??[]).includes(t.value);return r.jsx(ve,{className:"ui-table__filter-item",checked:d,onChange:w=>{if(n.filteredValue)return;const g=[...c[e]??[]],F=w.target.checked?[...g,t.value]:g.filter(fe=>fe!==t.value),K={...c,[e]:F};pe(K),I("filter",{...a,current:1,pageSize:v,total:k},K,p)},children:t.text},String(t.value))})}):null]},e)})]})}),r.jsx("tbody",{children:O.length?O.map((n,l)=>{const e=ke(n,le,l),s=b?V?V(n):!0:!1,u=C.includes(e);return r.jsxs(y.Fragment,{children:[r.jsxs("tr",{..._==null?void 0:_(n,l),children:[b?r.jsx("td",{className:"ui-table__expander-cell",children:s?r.jsx(re,{type:"text",size:"small",className:"ui-table__expand-button","aria-label":u?"Collapse row":"Expand row",onClick:()=>{const t=u?C.filter(d=>d!==e):[...C,e];L===void 0&&be(t),N==null||N(!u,n),z==null||z(t)},children:u?"−":"+"}):null}):null,m.map((t,d)=>{const w=t.key??t.dataIndex??String(d),g=t.dataIndex?n[t.dataIndex]:void 0,F=t.render?t.render(g,n,l):g;return r.jsx("td",{style:{textAlign:t.align},className:f(t.ellipsis&&"ui-table__cell--ellipsis"),children:F},w)})]}),b&&u?r.jsx("tr",{className:"ui-table__expanded-row",children:r.jsx("td",{colSpan:m.length+1,children:b(n,l)})},`${e}-expanded`):null]},e)}):r.jsx("tr",{children:r.jsx("td",{colSpan:m.length+(b?1:0),className:"ui-table__empty",children:(h==null?void 0:h.emptyText)??"No data"})})})]})}),ie?r.jsx("div",{className:"ui-table__loading",children:"Loading..."}):null,a!==!1?r.jsx(we,{...a,className:f("ui-table__pagination",a.className),size:a.size??"default",total:k,current:A,pageSize:v,onChange:(n,l)=>{var e;a.current||B(n),a.pageSize||M(l),(e=a.onChange)==null||e.call(a,n,l),I("paginate",{...a,current:n,pageSize:l,total:k},c,p)},onShowSizeChange:(n,l)=>{var e;a.pageSize||M(l),a.current||B(n),(e=a.onShowSizeChange)==null||e.call(a,n,l)}}):null]})}te.__docgenInfo={description:"",methods:[],displayName:"Table",props:{className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},columns:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  key?: string;
  title?: ReactNode;
  dataIndex?: keyof RecordType & string;
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  width?: number | string;
  render?: (value: unknown, record: RecordType, index: number) => ReactNode;
  sorter?: boolean | CompareFn<RecordType>;
  sortOrder?: SortOrder;
  defaultSortOrder?: SortOrder;
  filters?: ColumnFilterItem[];
  filteredValue?: FilterValue;
  defaultFilteredValue?: FilterValue;
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean;
}`,signature:{properties:[{key:"key",value:{name:"string",required:!1}},{key:"title",value:{name:"ReactNode",required:!1}},{key:"dataIndex",value:{name:"intersection",raw:"keyof RecordType & string",elements:[{name:"RecordType"},{name:"string"}],required:!1}},{key:"align",value:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}],required:!1}},{key:"ellipsis",value:{name:"boolean",required:!1}},{key:"width",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"render",value:{name:"signature",type:"function",raw:"(value: unknown, record: RecordType, index: number) => ReactNode",signature:{arguments:[{type:{name:"unknown"},name:"value"},{type:{name:"RecordType"},name:"record"},{type:{name:"number"},name:"index"}],return:{name:"ReactNode"}},required:!1}},{key:"sorter",value:{name:"union",raw:"boolean | CompareFn<RecordType>",elements:[{name:"boolean"},{name:"signature",type:"function",raw:"(a: RecordType, b: RecordType) => number",signature:{arguments:[{type:{name:"RecordType"},name:"a"},{type:{name:"RecordType"},name:"b"}],return:{name:"number"}}}],required:!1}},{key:"sortOrder",value:{name:"union",raw:"'ascend' | 'descend'",elements:[{name:"literal",value:"'ascend'"},{name:"literal",value:"'descend'"}],required:!1}},{key:"defaultSortOrder",value:{name:"union",raw:"'ascend' | 'descend'",elements:[{name:"literal",value:"'ascend'"},{name:"literal",value:"'descend'"}],required:!1}},{key:"filters",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  text: ReactNode;
  value: string | number | boolean;
}`,signature:{properties:[{key:"text",value:{name:"ReactNode",required:!0}},{key:"value",value:{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}],required:!0}}]}}],raw:"ColumnFilterItem[]",required:!1}},{key:"filteredValue",value:{name:"union",raw:"Array<string | number | boolean> | null",elements:[{name:"Array",elements:[{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]}],raw:"Array<string | number | boolean>"},{name:"null"}],required:!1}},{key:"defaultFilteredValue",value:{name:"union",raw:"Array<string | number | boolean> | null",elements:[{name:"Array",elements:[{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]}],raw:"Array<string | number | boolean>"},{name:"null"}],required:!1}},{key:"onFilter",value:{name:"signature",type:"function",raw:"(value: string | number | boolean, record: RecordType) => boolean",signature:{arguments:[{type:{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]},name:"value"},{type:{name:"RecordType"},name:"record"}],return:{name:"boolean"}},required:!1}}]}}],raw:"Array<TableColumnType<RecordType>>"},description:""},dataSource:{required:!1,tsType:{name:"Array",elements:[{name:"RecordType"}],raw:"RecordType[]"},description:"",defaultValue:{value:"[]",computed:!1}},rowKey:{required:!1,tsType:{name:"union",raw:"keyof RecordType & string | ((record: RecordType) => string | number)",elements:[{name:"intersection",raw:"keyof RecordType & string",elements:[{name:"RecordType"},{name:"string"}]},{name:"unknown"}]},description:""},loading:{required:!1,tsType:{name:"boolean"},description:""},bordered:{required:!1,tsType:{name:"boolean"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'middle' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'middle'",computed:!1}},locale:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  emptyText?: ReactNode;
}`,signature:{properties:[{key:"emptyText",value:{name:"ReactNode",required:!1}}]}},description:""},pagination:{required:!1,tsType:{name:"union",raw:"false | TablePaginationConfig",elements:[{name:"literal",value:"false"},{name:"intersection",raw:`PaginationProps & {
  position?: TablePaginationPosition[];
}`,elements:[{name:"signature",type:"object",raw:`{
  className?: string;
  style?: CSSProperties;
  total?: number;
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: Array<string | number>;
  showQuickJumper?: boolean | { goButton?: ReactNode };
  showLessItems?: boolean;
  showTitle?: boolean;
  showTotal?: PaginationShowTotal;
  simple?: boolean | { readOnly?: boolean };
  responsive?: boolean;
  size?: PaginationSize;
  align?: PaginationAlign;
  pageBufferSize?: number;
  locale?: {
    items_per_page?: string;
    jump_to?: string;
    jump_to_confirm?: string;
    page?: string;
    prev_page?: string;
    next_page?: string;
    prev_5?: string;
    next_5?: string;
  };
  itemRender?: PaginationItemRender;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"style",value:{name:"CSSProperties",required:!1}},{key:"total",value:{name:"number",required:!1}},{key:"current",value:{name:"number",required:!1}},{key:"defaultCurrent",value:{name:"number",required:!1}},{key:"pageSize",value:{name:"number",required:!1}},{key:"defaultPageSize",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"hideOnSinglePage",value:{name:"boolean",required:!1}},{key:"showSizeChanger",value:{name:"boolean",required:!1}},{key:"pageSizeOptions",value:{name:"Array",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Array<string | number>",required:!1}},{key:"showQuickJumper",value:{name:"union",raw:"boolean | { goButton?: ReactNode }",elements:[{name:"boolean"},{name:"signature",type:"object",raw:"{ goButton?: ReactNode }",signature:{properties:[{key:"goButton",value:{name:"ReactNode",required:!1}}]}}],required:!1}},{key:"showLessItems",value:{name:"boolean",required:!1}},{key:"showTitle",value:{name:"boolean",required:!1}},{key:"showTotal",value:{name:"signature",type:"function",raw:"(total: number, range: [number, number]) => ReactNode",signature:{arguments:[{type:{name:"number"},name:"total"},{type:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},name:"range"}],return:{name:"ReactNode"}},required:!1}},{key:"simple",value:{name:"union",raw:"boolean | { readOnly?: boolean }",elements:[{name:"boolean"},{name:"signature",type:"object",raw:"{ readOnly?: boolean }",signature:{properties:[{key:"readOnly",value:{name:"boolean",required:!1}}]}}],required:!1}},{key:"responsive",value:{name:"boolean",required:!1}},{key:"size",value:{name:"union",raw:"'default' | 'small'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'small'"}],required:!1}},{key:"align",value:{name:"union",raw:"'start' | 'center' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'center'"},{name:"literal",value:"'end'"}],required:!1}},{key:"pageBufferSize",value:{name:"number",required:!1}},{key:"locale",value:{name:"signature",type:"object",raw:`{
  items_per_page?: string;
  jump_to?: string;
  jump_to_confirm?: string;
  page?: string;
  prev_page?: string;
  next_page?: string;
  prev_5?: string;
  next_5?: string;
}`,signature:{properties:[{key:"items_per_page",value:{name:"string",required:!1}},{key:"jump_to",value:{name:"string",required:!1}},{key:"jump_to_confirm",value:{name:"string",required:!1}},{key:"page",value:{name:"string",required:!1}},{key:"prev_page",value:{name:"string",required:!1}},{key:"next_page",value:{name:"string",required:!1}},{key:"prev_5",value:{name:"string",required:!1}},{key:"next_5",value:{name:"string",required:!1}}]},required:!1}},{key:"itemRender",value:{name:"signature",type:"function",raw:`(
  page: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  element: ReactNode
) => ReactNode`,signature:{arguments:[{type:{name:"number"},name:"page"},{type:{name:"union",raw:"'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next'",elements:[{name:"literal",value:"'page'"},{name:"literal",value:"'prev'"},{name:"literal",value:"'next'"},{name:"literal",value:"'jump-prev'"},{name:"literal",value:"'jump-next'"}]},name:"type"},{type:{name:"ReactNode"},name:"element"}],return:{name:"ReactNode"}},required:!1}},{key:"onChange",value:{name:"signature",type:"function",raw:"(page: number, pageSize: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"},{type:{name:"number"},name:"pageSize"}],return:{name:"void"}},required:!1}},{key:"onShowSizeChange",value:{name:"signature",type:"function",raw:"(current: number, size: number) => void",signature:{arguments:[{type:{name:"number"},name:"current"},{type:{name:"number"},name:"size"}],return:{name:"void"}},required:!1}}]}},{name:"signature",type:"object",raw:`{
  position?: TablePaginationPosition[];
}`,signature:{properties:[{key:"position",value:{name:"Array",elements:[{name:"literal",value:"'bottomRight'"}],raw:"TablePaginationPosition[]",required:!1}}]}}]}]},description:"",defaultValue:{value:"{}",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: { columnKey?: string; order?: SortOrder },
  extra: TableOnChangeExtra<RecordType>
) => void`,signature:{arguments:[{type:{name:"intersection",raw:`PaginationProps & {
  position?: TablePaginationPosition[];
}`,elements:[{name:"signature",type:"object",raw:`{
  className?: string;
  style?: CSSProperties;
  total?: number;
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: Array<string | number>;
  showQuickJumper?: boolean | { goButton?: ReactNode };
  showLessItems?: boolean;
  showTitle?: boolean;
  showTotal?: PaginationShowTotal;
  simple?: boolean | { readOnly?: boolean };
  responsive?: boolean;
  size?: PaginationSize;
  align?: PaginationAlign;
  pageBufferSize?: number;
  locale?: {
    items_per_page?: string;
    jump_to?: string;
    jump_to_confirm?: string;
    page?: string;
    prev_page?: string;
    next_page?: string;
    prev_5?: string;
    next_5?: string;
  };
  itemRender?: PaginationItemRender;
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1}},{key:"style",value:{name:"CSSProperties",required:!1}},{key:"total",value:{name:"number",required:!1}},{key:"current",value:{name:"number",required:!1}},{key:"defaultCurrent",value:{name:"number",required:!1}},{key:"pageSize",value:{name:"number",required:!1}},{key:"defaultPageSize",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"hideOnSinglePage",value:{name:"boolean",required:!1}},{key:"showSizeChanger",value:{name:"boolean",required:!1}},{key:"pageSizeOptions",value:{name:"Array",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Array<string | number>",required:!1}},{key:"showQuickJumper",value:{name:"union",raw:"boolean | { goButton?: ReactNode }",elements:[{name:"boolean"},{name:"signature",type:"object",raw:"{ goButton?: ReactNode }",signature:{properties:[{key:"goButton",value:{name:"ReactNode",required:!1}}]}}],required:!1}},{key:"showLessItems",value:{name:"boolean",required:!1}},{key:"showTitle",value:{name:"boolean",required:!1}},{key:"showTotal",value:{name:"signature",type:"function",raw:"(total: number, range: [number, number]) => ReactNode",signature:{arguments:[{type:{name:"number"},name:"total"},{type:{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},name:"range"}],return:{name:"ReactNode"}},required:!1}},{key:"simple",value:{name:"union",raw:"boolean | { readOnly?: boolean }",elements:[{name:"boolean"},{name:"signature",type:"object",raw:"{ readOnly?: boolean }",signature:{properties:[{key:"readOnly",value:{name:"boolean",required:!1}}]}}],required:!1}},{key:"responsive",value:{name:"boolean",required:!1}},{key:"size",value:{name:"union",raw:"'default' | 'small'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'small'"}],required:!1}},{key:"align",value:{name:"union",raw:"'start' | 'center' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'center'"},{name:"literal",value:"'end'"}],required:!1}},{key:"pageBufferSize",value:{name:"number",required:!1}},{key:"locale",value:{name:"signature",type:"object",raw:`{
  items_per_page?: string;
  jump_to?: string;
  jump_to_confirm?: string;
  page?: string;
  prev_page?: string;
  next_page?: string;
  prev_5?: string;
  next_5?: string;
}`,signature:{properties:[{key:"items_per_page",value:{name:"string",required:!1}},{key:"jump_to",value:{name:"string",required:!1}},{key:"jump_to_confirm",value:{name:"string",required:!1}},{key:"page",value:{name:"string",required:!1}},{key:"prev_page",value:{name:"string",required:!1}},{key:"next_page",value:{name:"string",required:!1}},{key:"prev_5",value:{name:"string",required:!1}},{key:"next_5",value:{name:"string",required:!1}}]},required:!1}},{key:"itemRender",value:{name:"signature",type:"function",raw:`(
  page: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  element: ReactNode
) => ReactNode`,signature:{arguments:[{type:{name:"number"},name:"page"},{type:{name:"union",raw:"'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next'",elements:[{name:"literal",value:"'page'"},{name:"literal",value:"'prev'"},{name:"literal",value:"'next'"},{name:"literal",value:"'jump-prev'"},{name:"literal",value:"'jump-next'"}]},name:"type"},{type:{name:"ReactNode"},name:"element"}],return:{name:"ReactNode"}},required:!1}},{key:"onChange",value:{name:"signature",type:"function",raw:"(page: number, pageSize: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"},{type:{name:"number"},name:"pageSize"}],return:{name:"void"}},required:!1}},{key:"onShowSizeChange",value:{name:"signature",type:"function",raw:"(current: number, size: number) => void",signature:{arguments:[{type:{name:"number"},name:"current"},{type:{name:"number"},name:"size"}],return:{name:"void"}},required:!1}}]}},{name:"signature",type:"object",raw:`{
  position?: TablePaginationPosition[];
}`,signature:{properties:[{key:"position",value:{name:"Array",elements:[{name:"literal",value:"'bottomRight'"}],raw:"TablePaginationPosition[]",required:!1}}]}}]},name:"pagination"},{type:{name:"Record",elements:[{name:"string"},{name:"union",raw:"FilterValue | null",elements:[{name:"union",raw:"Array<string | number | boolean> | null",elements:[{name:"Array",elements:[{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]}],raw:"Array<string | number | boolean>"},{name:"null"}]},{name:"null"}]}],raw:"Record<string, FilterValue | null>"},name:"filters"},{type:{name:"signature",type:"object",raw:"{ columnKey?: string; order?: SortOrder }",signature:{properties:[{key:"columnKey",value:{name:"string",required:!1}},{key:"order",value:{name:"union",raw:"'ascend' | 'descend'",elements:[{name:"literal",value:"'ascend'"},{name:"literal",value:"'descend'"}],required:!1}}]}},name:"sorter"},{type:{name:"signature",type:"object",raw:`{
  currentDataSource: RecordType[];
  action: 'paginate' | 'sort' | 'filter';
}`,signature:{properties:[{key:"currentDataSource",value:{name:"Array",elements:[{name:"RecordType"}],raw:"RecordType[]",required:!0}},{key:"action",value:{name:"union",raw:"'paginate' | 'sort' | 'filter'",elements:[{name:"literal",value:"'paginate'"},{name:"literal",value:"'sort'"},{name:"literal",value:"'filter'"}],required:!0}}]}},name:"extra"}],return:{name:"void"}}},description:""},onRow:{required:!1,tsType:{name:"signature",type:"function",raw:"(record: RecordType, index?: number) => HTMLAttributes<HTMLTableRowElement>",signature:{arguments:[{type:{name:"RecordType"},name:"record"},{type:{name:"number"},name:"index"}],return:{name:"HTMLAttributes",elements:[{name:"HTMLTableRowElement"}],raw:"HTMLAttributes<HTMLTableRowElement>"}}},description:""},onHeaderRow:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  columns: ColumnsType<RecordType>,
  index: number
) => HTMLAttributes<HTMLTableRowElement>`,signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  key?: string;
  title?: ReactNode;
  dataIndex?: keyof RecordType & string;
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  width?: number | string;
  render?: (value: unknown, record: RecordType, index: number) => ReactNode;
  sorter?: boolean | CompareFn<RecordType>;
  sortOrder?: SortOrder;
  defaultSortOrder?: SortOrder;
  filters?: ColumnFilterItem[];
  filteredValue?: FilterValue;
  defaultFilteredValue?: FilterValue;
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean;
}`,signature:{properties:[{key:"key",value:{name:"string",required:!1}},{key:"title",value:{name:"ReactNode",required:!1}},{key:"dataIndex",value:{name:"intersection",raw:"keyof RecordType & string",elements:[{name:"RecordType"},{name:"string"}],required:!1}},{key:"align",value:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}],required:!1}},{key:"ellipsis",value:{name:"boolean",required:!1}},{key:"width",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!1}},{key:"render",value:{name:"signature",type:"function",raw:"(value: unknown, record: RecordType, index: number) => ReactNode",signature:{arguments:[{type:{name:"unknown"},name:"value"},{type:{name:"RecordType"},name:"record"},{type:{name:"number"},name:"index"}],return:{name:"ReactNode"}},required:!1}},{key:"sorter",value:{name:"union",raw:"boolean | CompareFn<RecordType>",elements:[{name:"boolean"},{name:"signature",type:"function",raw:"(a: RecordType, b: RecordType) => number",signature:{arguments:[{type:{name:"RecordType"},name:"a"},{type:{name:"RecordType"},name:"b"}],return:{name:"number"}}}],required:!1}},{key:"sortOrder",value:{name:"union",raw:"'ascend' | 'descend'",elements:[{name:"literal",value:"'ascend'"},{name:"literal",value:"'descend'"}],required:!1}},{key:"defaultSortOrder",value:{name:"union",raw:"'ascend' | 'descend'",elements:[{name:"literal",value:"'ascend'"},{name:"literal",value:"'descend'"}],required:!1}},{key:"filters",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  text: ReactNode;
  value: string | number | boolean;
}`,signature:{properties:[{key:"text",value:{name:"ReactNode",required:!0}},{key:"value",value:{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}],required:!0}}]}}],raw:"ColumnFilterItem[]",required:!1}},{key:"filteredValue",value:{name:"union",raw:"Array<string | number | boolean> | null",elements:[{name:"Array",elements:[{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]}],raw:"Array<string | number | boolean>"},{name:"null"}],required:!1}},{key:"defaultFilteredValue",value:{name:"union",raw:"Array<string | number | boolean> | null",elements:[{name:"Array",elements:[{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]}],raw:"Array<string | number | boolean>"},{name:"null"}],required:!1}},{key:"onFilter",value:{name:"signature",type:"function",raw:"(value: string | number | boolean, record: RecordType) => boolean",signature:{arguments:[{type:{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]},name:"value"},{type:{name:"RecordType"},name:"record"}],return:{name:"boolean"}},required:!1}}]}}],raw:"Array<TableColumnType<RecordType>>"},name:"columns"},{type:{name:"number"},name:"index"}],return:{name:"HTMLAttributes",elements:[{name:"HTMLTableRowElement"}],raw:"HTMLAttributes<HTMLTableRowElement>"}}},description:""},onScroll:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: UIEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"UIEvent",elements:[{name:"HTMLDivElement"}],raw:"UIEvent<HTMLDivElement>"},name:"event"}],return:{name:"void"}}},description:""},expandedRowRender:{required:!1,tsType:{name:"signature",type:"function",raw:"(record: RecordType, index: number) => ReactNode",signature:{arguments:[{type:{name:"RecordType"},name:"record"},{type:{name:"number"},name:"index"}],return:{name:"ReactNode"}}},description:""},rowExpandable:{required:!1,tsType:{name:"signature",type:"function",raw:"(record: RecordType) => boolean",signature:{arguments:[{type:{name:"RecordType"},name:"record"}],return:{name:"boolean"}}},description:""},expandedRowKeys:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Array<string | number>"},description:""},defaultExpandedRowKeys:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Array<string | number>"},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean, record: RecordType) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"},{type:{name:"RecordType"},name:"record"}],return:{name:"void"}}},description:""},onExpandedRowsChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(expandedRows: Array<string | number>) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Array<string | number>"},name:"expandedRows"}],return:{name:"void"}}},description:""}}};const qe=[{key:"1",name:"Jane Cooper",email:"jane@company.com",role:"Admin",status:"Active",age:34,action:"edit"},{key:"2",name:"Arlene McCoy",email:"arlene@company.com",role:"Editor",status:"Active",age:29,action:"edit"},{key:"3",name:"Ronald Richards",email:"ronald@company.com",role:"Viewer",status:"Inactive",age:42,action:"edit"},{key:"4",name:"Cameron Williamson",email:"cameron@company.com",role:"Viewer",status:"Active",age:25,action:"edit"},{key:"5",name:"Savannah Nguyen",email:"savannah@company.com",role:"Editor",status:"Inactive",age:31,action:"edit"},{key:"6",name:"Wade Warren",email:"wade@company.com",role:"Admin",status:"Active",age:38,action:"edit"}],Te=[{title:"Name",dataIndex:"name",key:"name",sorter:(i,o)=>i.name.localeCompare(o.name),ellipsis:!0},{title:"Email",dataIndex:"email",key:"email",ellipsis:!0},{title:"Role",dataIndex:"role",key:"role",filters:[{text:"Admin",value:"Admin"},{text:"Editor",value:"Editor"},{text:"Viewer",value:"Viewer"}],onFilter:(i,o)=>o.role===i,render:i=>r.jsx(D,{color:"blue",children:String(i)})},{title:"Status",dataIndex:"status",key:"status",render:i=>r.jsx(D,{color:i==="Active"?"green":"red",children:String(i)})},{title:"Age",dataIndex:"age",key:"age",align:"right",sorter:(i,o)=>i.age-o.age},{title:"Actions",dataIndex:"action",key:"action",align:"center",render:()=>r.jsx(re,{type:"primary",size:"small",children:"Edit"})}],Oe={title:"Components/Table",component:te,parameters:{actions:{disable:!0}},args:{columns:Te,dataSource:qe,pagination:{defaultCurrent:1,defaultPageSize:4,showSizeChanger:!0}}},q={},T={args:{bordered:!0,size:"large"}},x={args:{loading:!0}},S={args:{dataSource:[],locale:{emptyText:"No users found"}}};var J,Q,U;q.parameters={...q.parameters,docs:{...(J=q.parameters)==null?void 0:J.docs,source:{originalSource:"{}",...(U=(Q=q.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var W,$,G;T.parameters={...T.parameters,docs:{...(W=T.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    bordered: true,
    size: 'large'
  }
}`,...(G=($=T.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var X,Y,Z;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...(Z=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ne,ae;S.parameters={...S.parameters,docs:{...(ee=S.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    dataSource: [],
    locale: {
      emptyText: 'No users found'
    }
  }
}`,...(ae=(ne=S.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};const Ie=["Basic","Bordered","Loading","Empty"];export{q as Basic,T as Bordered,S as Empty,x as Loading,Ie as __namedExportsOrder,Oe as default};
