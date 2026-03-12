import { useMemo, useState } from 'react';
import { cn } from '../../utils';
import './TreeSelect.scss';

export interface TreeSelectOption {
  title: string;
  value: string;
  disabled?: boolean;
  children?: TreeSelectOption[];
}

export interface TreeSelectProps {
  treeData: TreeSelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  multiple?: boolean;
  treeCheckable?: boolean;
  placeholder?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  className?: string;
  onChange?: (value: string | string[]) => void;
}

function flattenTree(treeData: TreeSelectOption[], depth = 0): Array<TreeSelectOption & { depth: number }> {
  return treeData.flatMap((item) => [
    { ...item, depth },
    ...(item.children ? flattenTree(item.children, depth + 1) : [])
  ]);
}

export function TreeSelect({
  treeData,
  value,
  defaultValue,
  multiple = false,
  treeCheckable = false,
  placeholder = 'Please select',
  showSearch = true,
  allowClear = true,
  className,
  onChange
}: TreeSelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );
  const [query, setQuery] = useState('');

  const selected = isControlled ? (Array.isArray(value) ? value : value ? [value] : []) : internalValue;
  const options = useMemo(() => flattenTree(treeData), [treeData]);
  const visible = options.filter((option) => option.title.toLowerCase().includes(query.toLowerCase()));

  const emit = (next: string[]) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(multiple || treeCheckable ? next : next[0] ?? '');
  };

  return (
    <div className={cn('ui-tree-select', className)}>
      <div className="ui-tree-select__trigger ui-control">
        {showSearch ? (
          <input
            className="ui-tree-select__search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={selected.length ? selected.join(', ') : placeholder}
          />
        ) : (
          <span>{selected.length ? selected.join(', ') : placeholder}</span>
        )}
        {allowClear && selected.length ? (
          <button type="button" className="ui-tree-select__clear" onClick={() => emit([])}>
            ×
          </button>
        ) : null}
      </div>
      <div className="ui-tree-select__dropdown" role="listbox" aria-multiselectable={multiple || treeCheckable}>
        {visible.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              className={cn('ui-tree-select__option', checked && 'ui-tree-select__option--selected')}
              style={{ paddingLeft: `${option.depth * 18 + 12}px` }}
              onClick={() => {
                if (multiple || treeCheckable) {
                  emit(checked ? selected.filter((v) => v !== option.value) : [...selected, option.value]);
                  return;
                }
                emit([option.value]);
              }}
            >
              {treeCheckable ? (
                <span
                  className={cn(
                    'ui-check__box',
                    'ui-tree-select__checkbox',
                    checked && 'ui-tree-select__checkbox--checked',
                    option.disabled && 'ui-tree-select__checkbox--disabled'
                  )}
                  aria-hidden
                />
              ) : null}
              <span>{option.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
