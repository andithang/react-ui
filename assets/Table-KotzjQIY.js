import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as b}from"./index-oxIuDU2I.js";import{B as Z}from"./Button-Ds6xf3X3.js";import{C as ee}from"./Checkbox-DW_Xethd.js";import{P as ne}from"./Pagination-th4E_jcZ.js";import{c as f}from"./utils-2dOUpm6k.js";function re(p,g,u){return typeof g=="function"?g(p):typeof g=="string"&&g in p?String(p[g]):"key"in p?String(p.key):String(u)}function ae({className:p,style:g,columns:u,dataSource:P=[],rowKey:M,loading:B,bordered:H,size:K="middle",locale:q,pagination:r={},onChange:T,onRow:S,onHeaderRow:x,onScroll:D,expandedRowRender:c,rowExpandable:O,expandedRowKeys:I,defaultExpandedRowKeys:J,onExpand:R,onExpandedRowsChange:h}){const[o,Q]=b.useState({}),[y,U]=b.useState({}),[$,F]=b.useState(r&&r.defaultCurrent||1),[G,V]=b.useState(r&&r.defaultPageSize||10),[W,X]=b.useState(J??[]),_=r&&r.current?r.current:$,v=r&&r.pageSize?r.pageSize:G,j=I??W,N=b.useMemo(()=>{let n=[...P];u.forEach((e,i)=>{const s=e.key??e.dataIndex??String(i),a=e.filteredValue??y[s]??e.defaultFilteredValue;a!=null&&a.length&&(n=n.filter(m=>e.onFilter?a.some(w=>{var d;return(d=e.onFilter)==null?void 0:d.call(e,w,m)}):e.dataIndex?a.includes(m[e.dataIndex]):!0))});const l=u.find((e,i)=>{const s=e.key??e.dataIndex??String(i),a=e.sortOrder??(o.columnKey===s?o.order:e.defaultSortOrder);return!!(e.sorter&&a)});if(l&&typeof l.sorter=="function"){const e=u.indexOf(l),i=l.key??l.dataIndex??String(e),s=l.sortOrder??(o.columnKey===i?o.order:l.defaultSortOrder);n.sort(l.sorter),s==="descend"&&n.reverse()}return n},[u,P,y,o]),k=r&&r.total?r.total:N.length,L=r===!1?0:(_-1)*v,z=r===!1?N:N.slice(L,L+v),A=(n,l,e,i)=>{T==null||T(l,e,i,{action:n,currentDataSource:z})};return t.jsxs("div",{className:f("ui-table",p,H&&"ui-table--bordered",`ui-table--${K}`),style:g,children:[t.jsx("div",{className:"ui-table__scroll",onScroll:D,children:t.jsxs("table",{className:"ui-table__native",children:[t.jsx("thead",{children:t.jsxs("tr",{...x==null?void 0:x(u,0),children:[c?t.jsx("th",{className:"ui-table__expander-cell"}):null,u.map((n,l)=>{var s;const e=n.key??n.dataIndex??String(l),i=n.sortOrder??(o.columnKey===e?o.order:n.defaultSortOrder);return t.jsxs("th",{style:{textAlign:n.align,width:n.width},children:[t.jsxs("button",{type:"button",className:f("ui-table__header-button",n.sorter&&"ui-table__header-button--sortable"),onClick:()=>{if(!n.sorter||n.sortOrder)return;const m={columnKey:e,order:i==="ascend"?"descend":i==="descend"?void 0:"ascend"};Q(m),A("sort",{...r,current:_,pageSize:v,total:k},y,m)},children:[t.jsx("span",{children:n.title}),n.sorter?t.jsxs("span",{className:"ui-table__sorter","aria-hidden":"true",children:[t.jsx("span",{className:f("ui-table__sorter-up",i==="ascend"&&"is-active")}),t.jsx("span",{className:f("ui-table__sorter-down",i==="descend"&&"is-active")})]}):null]}),(s=n.filters)!=null&&s.length?t.jsx("div",{className:"ui-table__filters",children:n.filters.map(a=>{const m=(n.filteredValue??y[e]??[]).includes(a.value);return t.jsx(ee,{className:"ui-table__filter-item",checked:m,onChange:w=>{if(n.filteredValue)return;const d=[...y[e]??[]],C=w.target.checked?[...d,a.value]:d.filter(Y=>Y!==a.value),E={...y,[e]:C};U(E),A("filter",{...r,current:1,pageSize:v,total:k},E,o)},children:a.text},String(a.value))})}):null]},e)})]})}),t.jsx("tbody",{children:z.length?z.map((n,l)=>{const e=re(n,M,l),i=c?O?O(n):!0:!1,s=j.includes(e);return t.jsxs(b.Fragment,{children:[t.jsxs("tr",{...S==null?void 0:S(n,l),children:[c?t.jsx("td",{className:"ui-table__expander-cell",children:i?t.jsx(Z,{type:"text",size:"small",className:"ui-table__expand-button","aria-label":s?"Collapse row":"Expand row",onClick:()=>{const a=s?j.filter(m=>m!==e):[...j,e];I===void 0&&X(a),R==null||R(!s,n),h==null||h(a)},children:s?"−":"+"}):null}):null,u.map((a,m)=>{const w=a.key??a.dataIndex??String(m),d=a.dataIndex?n[a.dataIndex]:void 0,C=a.render?a.render(d,n,l):d;return t.jsx("td",{style:{textAlign:a.align},className:f(a.ellipsis&&"ui-table__cell--ellipsis"),children:C},w)})]}),c&&s?t.jsx("tr",{className:"ui-table__expanded-row",children:t.jsx("td",{colSpan:u.length+1,children:c(n,l)})},`${e}-expanded`):null]},e)}):t.jsx("tr",{children:t.jsx("td",{colSpan:u.length+(c?1:0),className:"ui-table__empty",children:(q==null?void 0:q.emptyText)??"No data"})})})]})}),B?t.jsx("div",{className:"ui-table__loading",children:"Loading..."}):null,r!==!1?t.jsx(ne,{...r,className:f("ui-table__pagination",r.className),size:r.size??"default",total:k,current:_,pageSize:v,onChange:(n,l)=>{var e;r.current||F(n),r.pageSize||V(l),(e=r.onChange)==null||e.call(r,n,l),A("paginate",{...r,current:n,pageSize:l,total:k},y,o)},onShowSizeChange:(n,l)=>{var e;r.pageSize||V(l),r.current||F(n),(e=r.onShowSizeChange)==null||e.call(r,n,l)}}):null]})}ae.__docgenInfo={description:"",methods:[],displayName:"Table",props:{className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"CSSProperties"},description:""},columns:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"text",value:{name:"ReactNode",required:!0}},{key:"value",value:{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}],required:!0}}]}}],raw:"ColumnFilterItem[]",required:!1}},{key:"filteredValue",value:{name:"union",raw:"Array<string | number | boolean> | null",elements:[{name:"Array",elements:[{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]}],raw:"Array<string | number | boolean>"},{name:"null"}],required:!1}},{key:"defaultFilteredValue",value:{name:"union",raw:"Array<string | number | boolean> | null",elements:[{name:"Array",elements:[{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]}],raw:"Array<string | number | boolean>"},{name:"null"}],required:!1}},{key:"onFilter",value:{name:"signature",type:"function",raw:"(value: string | number | boolean, record: RecordType) => boolean",signature:{arguments:[{type:{name:"union",raw:"string | number | boolean",elements:[{name:"string"},{name:"number"},{name:"boolean"}]},name:"value"},{type:{name:"RecordType"},name:"record"}],return:{name:"boolean"}},required:!1}}]}}],raw:"Array<TableColumnType<RecordType>>"},name:"columns"},{type:{name:"number"},name:"index"}],return:{name:"HTMLAttributes",elements:[{name:"HTMLTableRowElement"}],raw:"HTMLAttributes<HTMLTableRowElement>"}}},description:""},onScroll:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: UIEvent<HTMLDivElement>) => void",signature:{arguments:[{type:{name:"UIEvent",elements:[{name:"HTMLDivElement"}],raw:"UIEvent<HTMLDivElement>"},name:"event"}],return:{name:"void"}}},description:""},expandedRowRender:{required:!1,tsType:{name:"signature",type:"function",raw:"(record: RecordType, index: number) => ReactNode",signature:{arguments:[{type:{name:"RecordType"},name:"record"},{type:{name:"number"},name:"index"}],return:{name:"ReactNode"}}},description:""},rowExpandable:{required:!1,tsType:{name:"signature",type:"function",raw:"(record: RecordType) => boolean",signature:{arguments:[{type:{name:"RecordType"},name:"record"}],return:{name:"boolean"}}},description:""},expandedRowKeys:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Array<string | number>"},description:""},defaultExpandedRowKeys:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Array<string | number>"},description:""},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean, record: RecordType) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"},{type:{name:"RecordType"},name:"record"}],return:{name:"void"}}},description:""},onExpandedRowsChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(expandedRows: Array<string | number>) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Array<string | number>"},name:"expandedRows"}],return:{name:"void"}}},description:""}}};export{ae as T};
