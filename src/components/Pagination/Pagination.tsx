import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { cn } from '../../utils';
import './Pagination.scss';
import { Icon } from '../Icon/Icon';

export type PaginationAlign = 'start' | 'center' | 'end';
export type PaginationPosition = 'top' | 'bottom' | 'both';
export type PaginationSize = 'default' | 'small';

export type PaginationItemRender = (
  page: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  element: ReactNode
) => ReactNode;

export type PaginationShowTotal = (total: number, range: [number, number]) => ReactNode;

export type PaginationProps = {
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
};

function getPages(current: number, totalPages: number, pageBufferSize: number) {
  const pages: Array<number | 'jump-prev' | 'jump-next'> = [];
  const left = Math.max(2, current - pageBufferSize);
  const right = Math.min(totalPages - 1, current + pageBufferSize);

  pages.push(1);
  if (left > 2) pages.push('jump-prev');
  for (let page = left; page <= right; page += 1) pages.push(page);
  if (right < totalPages - 1) pages.push('jump-next');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export function Pagination({
  className,
  style,
  total = 0,
  current,
  defaultCurrent = 1,
  pageSize,
  defaultPageSize = 10,
  disabled,
  hideOnSinglePage,
  showSizeChanger,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper,
  showLessItems,
  showTitle = true,
  showTotal,
  simple,
  size = 'default',
  align = 'end',
  pageBufferSize,
  locale,
  itemRender,
  onChange,
  onShowSizeChange
}: PaginationProps) {
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const [quickPage, setQuickPage] = useState('');

  const mergedCurrent = current ?? internalCurrent;
  const mergedPageSize = pageSize ?? internalPageSize;
  const totalPages = Math.max(1, Math.ceil(total / mergedPageSize));
  const jumpStep = showLessItems ? 3 : 5;
  const buffer = pageBufferSize ?? (showLessItems ? 1 : 2);

  const effectiveCurrent = Math.min(Math.max(1, mergedCurrent), totalPages);
  const start = total === 0 ? 0 : (effectiveCurrent - 1) * mergedPageSize + 1;
  const end = Math.min(total, effectiveCurrent * mergedPageSize);

  const updatePage = (nextPage: number, nextPageSize = mergedPageSize) => {
    const clamped = Math.min(Math.max(1, nextPage), Math.max(1, Math.ceil(total / nextPageSize)));
    if (current === undefined) setInternalCurrent(clamped);
    onChange?.(clamped, nextPageSize);
  };

  const updatePageSize = (nextPageSize: number) => {
    const nextCurrent = 1;
    if (pageSize === undefined) setInternalPageSize(nextPageSize);
    if (current === undefined) setInternalCurrent(nextCurrent);
    onShowSizeChange?.(nextCurrent, nextPageSize);
    onChange?.(nextCurrent, nextPageSize);
  };

  const pages = useMemo(() => getPages(effectiveCurrent, totalPages, buffer), [buffer, effectiveCurrent, totalPages]);

  if (hideOnSinglePage && totalPages <= 1) return null;

  const prevText = locale?.prev_page ?? 'Previous';
  const nextText = locale?.next_page ?? 'Next';
  const renderItem = (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', label: ReactNode) =>
    itemRender ? itemRender(page, type, label) : label;
  const simpleReadOnly = typeof simple === 'object' ? simple.readOnly : false;

  return (
    <div className={cn('ui-pagination', `ui-pagination--${size}`, `ui-pagination--align-${align}`, className)} style={style}>
      {showTotal ? <span className="ui-pagination__total">{showTotal(total, [start, end])}</span> : null}

      <ul className="ui-pagination__list">
        <li>
          <Button
            type="text"
            size={size === 'small' ? 'small' : 'middle'}
            disabled={disabled || effectiveCurrent <= 1}
            onClick={() => updatePage(effectiveCurrent - 1)}
            title={showTitle ? prevText : undefined}
            className="ui-pagination__control"
          >
            {renderItem(effectiveCurrent - 1, 'prev', <Icon name='leftOutline' />)}
          </Button>
        </li>

        {simple ? (
          <li className="ui-pagination__simple">
            {simpleReadOnly ? (
              <span>{effectiveCurrent}/{totalPages}</span>
            ) : (
              <>
                <Input
                  aria-label="Current page"
                  type="number"
                  min={1}
                  max={totalPages}
                  value={String(effectiveCurrent)}
                  onChange={(event) => updatePage(Number(event.target.value || 1))}
                  className="ui-pagination__simple-input"
                />
                <span>/ {totalPages}</span>
              </>
            )}
          </li>
        ) : (
          pages.map((entry, idx) => {
            if (entry === 'jump-prev' || entry === 'jump-next') {
              const target = entry === 'jump-prev' ? effectiveCurrent - jumpStep : effectiveCurrent + jumpStep;
              return (
                <li key={`${entry}-${idx}`}>
                  <Button
                    type="text"
                    size={size === 'small' ? 'small' : 'middle'}
                    disabled={disabled}
                    onClick={() => updatePage(target)}
                    className="ui-pagination__item"
                    title={showTitle ? (entry === 'jump-prev' ? locale?.prev_5 ?? 'Previous 5 pages' : locale?.next_5 ?? 'Next 5 pages') : undefined}
                  >
                    {renderItem(target, entry, '•••')}
                  </Button>
                </li>
              );
            }

            const isActive = entry === effectiveCurrent;
            return (
              <li key={entry}>
                <Button
                  type={isActive ? 'primary' : 'text'}
                  size={size === 'small' ? 'small' : 'middle'}
                  disabled={disabled}
                  onClick={() => updatePage(entry)}
                  className={cn('ui-pagination__item', isActive && 'is-active')}
                  title={showTitle ? `Page ${entry}` : undefined}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {renderItem(entry, 'page', entry)}
                </Button>
              </li>
            );
          })
        )}

        <li>
          <Button
            type="text"
            size={size === 'small' ? 'small' : 'middle'}
            disabled={disabled || effectiveCurrent >= totalPages}
            onClick={() => updatePage(effectiveCurrent + 1)}
            title={showTitle ? nextText : undefined}
            className="ui-pagination__control"
          >
            {renderItem(effectiveCurrent + 1, 'next', <Icon name='rightOutline' />)}
          </Button>
        </li>
      </ul>

      {showSizeChanger ? (
        <Select
          className="ui-pagination__size"
          value={String(mergedPageSize)}
          onChange={(event) => updatePageSize(Number(event.target.value))}
          clearable={false}
          searchable={false}
          aria-label="Items per page"
        >
          {pageSizeOptions.map((option) => (
            <option key={String(option)} value={String(option)}>
              {`${option} ${locale?.items_per_page ?? '/ page'}`}
            </option>
          ))}
        </Select>
      ) : null}

      {showQuickJumper ? (
        <div className="ui-pagination__quick-jumper">
          <span>{locale?.jump_to ?? 'Go to'}</span>
          <Input
            aria-label="Quick jumper"
            type="number"
            min={1}
            max={totalPages}
            value={quickPage}
            onChange={(event) => setQuickPage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') updatePage(Number(quickPage || effectiveCurrent));
            }}
          />
          {typeof showQuickJumper === 'object' && showQuickJumper.goButton ? (
            <Button size={size === 'small' ? 'small' : 'middle'} onClick={() => updatePage(Number(quickPage || effectiveCurrent))} disabled={disabled}>
              {showQuickJumper.goButton}
            </Button>
          ) : null}
          <span>{locale?.page ?? 'Page'}</span>
        </div>
      ) : null}
    </div>
  );
}
