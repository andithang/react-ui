import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactNode
} from 'react';
import { createPortal } from 'react-dom';
import { Button, type ButtonGroupProps, type ButtonHTMLType, type ButtonProps, type ButtonType } from '../Button/Button';
import { cn } from '../../utils';
import './Dropdown.scss';

const DROPDOWN_PLACEMENTS = [
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
  'top',
  'bottom'
] as const;

const DROPDOWN_TRIGGERS = ['click', 'hover', 'contextMenu'] as const;

export type DropdownPlacement = (typeof DROPDOWN_PLACEMENTS)[number];
export type DropdownTrigger = (typeof DROPDOWN_TRIGGERS)[number];

export type DataAttributes = {
  [Key in `data-${string}`]?: unknown;
};

export interface DropdownMenuInfo {
  key: React.Key;
  keyPath: React.Key[];
  domEvent: ReactMouseEvent<HTMLElement>;
}

export interface DropdownMenuItemType extends DataAttributes {
  key: React.Key;
  label?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  icon?: ReactNode;
  title?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (info: DropdownMenuInfo) => void;
}

export interface DropdownSubMenuType extends Omit<DropdownMenuItemType, 'onClick'> {
  children: DropdownMenuItemNode[];
}

export interface DropdownMenuItemGroupType extends DataAttributes {
  type: 'group';
  key?: React.Key;
  label?: ReactNode;
  children?: DropdownMenuItemNode[];
  className?: string;
  style?: CSSProperties;
}

export interface DropdownMenuDividerType extends DataAttributes {
  type: 'divider';
  key?: React.Key;
  dashed?: boolean;
  className?: string;
  style?: CSSProperties;
}

export type DropdownMenuItemNode =
  | DropdownMenuItemType
  | DropdownSubMenuType
  | DropdownMenuItemGroupType
  | DropdownMenuDividerType
  | null;

export type DropdownMenuItem = DropdownMenuItemType;

export interface DropdownMenuProps {
  items?: DropdownMenuItemNode[];
  className?: string;
  style?: CSSProperties;
  selectable?: boolean;
  multiple?: boolean;
  selectedKeys?: React.Key[];
  defaultSelectedKeys?: React.Key[];
  activeKey?: React.Key;
  onClick?: (info: DropdownMenuInfo) => void;
  onSelect?: (info: DropdownMenuInfo) => void;
  onDeselect?: (info: DropdownMenuInfo) => void;
}

export interface DropdownArrowOptions {
  pointAtCenter?: boolean;
}

export type DropdownSemanticClassNames = {
  root?: string;
  item?: string;
  itemTitle?: string;
  itemIcon?: string;
  itemContent?: string;
};

export type DropdownSemanticStyles = {
  root?: CSSProperties;
  item?: CSSProperties;
  itemTitle?: CSSProperties;
  itemIcon?: CSSProperties;
  itemContent?: CSSProperties;
};

type Resolvable<T, P> = T | ((info: { props: P }) => T);

export type DropdownClassNamesType = Resolvable<Readonly<DropdownSemanticClassNames>, DropdownProps>;
export type DropdownStylesType = Resolvable<Readonly<DropdownSemanticStyles>, DropdownProps>;

export interface DropdownAdjustOverflow {
  adjustX?: boolean | number;
  adjustY?: boolean | number;
}

export interface DropdownAlign {
  offset?: [number, number];
  overflow?: DropdownAdjustOverflow;
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  classNames?: DropdownClassNamesType;
  styles?: DropdownStylesType;
  menu?: DropdownMenuProps;
  autoFocus?: boolean;
  arrow?: boolean | DropdownArrowOptions;
  trigger?: DropdownTrigger[];
  /** @deprecated Please use `popupRender` instead. */
  dropdownRender?: (originNode: ReactNode) => ReactNode;
  popupRender?: (originNode: ReactNode) => ReactNode;
  onOpenChange?: (open: boolean, info: { source: 'trigger' | 'menu' }) => void;
  open?: boolean;
  disabled?: boolean;
  /** @deprecated Please use `destroyOnHidden` instead. */
  destroyPopupOnHide?: boolean;
  destroyOnHidden?: boolean;
  align?: DropdownAlign;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  transitionName?: string;
  placement?: DropdownPlacement;
  /** @deprecated Please use `classNames.root` instead. */
  overlayClassName?: string;
  /** @deprecated Please use `styles.root` instead. */
  overlayStyle?: CSSProperties;
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  openClassName?: string;
  children?: ReactNode;
  autoAdjustOverflow?: boolean | DropdownAdjustOverflow;
  /** @deprecated Please use `open` instead. */
  visible?: boolean;
  /** @deprecated Please use `onOpenChange` instead. */
  onVisibleChange?: (open: boolean) => void;
  /** @deprecated Please use `menu.items` instead. */
  items?: DropdownMenuItemNode[];
}

export type DropdownButtonType = ButtonType;

export interface DropdownButtonProps extends ButtonGroupProps, Omit<DropdownProps, 'children'> {
  type?: DropdownButtonType;
  htmlType?: ButtonHTMLType;
  danger?: boolean;
  disabled?: boolean;
  loading?: ButtonProps['loading'];
  onClick?: React.MouseEventHandler<HTMLElement>;
  icon?: ReactNode;
  href?: string;
  children?: ReactNode;
  title?: string;
  buttonsRender?: (buttons: ReactNode[]) => ReactNode[];
}

function resolveSemantic<T, P>(value: Resolvable<T, P> | undefined, props: P) {
  if (!value) {
    return undefined;
  }

  return typeof value === 'function' ? (value as (info: { props: P }) => T)({ props }) : value;
}

function toStringKey(value: React.Key): string {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return value.toString();
}

function isDividerItem(item: DropdownMenuItemNode): item is DropdownMenuDividerType {
  return Boolean(item && typeof item === 'object' && 'type' in item && item.type === 'divider');
}

function isGroupItem(item: DropdownMenuItemNode): item is DropdownMenuItemGroupType {
  return Boolean(item && typeof item === 'object' && 'type' in item && item.type === 'group');
}

function isSubMenuItem(item: DropdownMenuItemNode): item is DropdownSubMenuType {
  return Boolean(item && typeof item === 'object' && 'children' in item && Array.isArray(item.children));
}

function normalizePlacement(placement: DropdownPlacement): Exclude<DropdownPlacement, 'top' | 'bottom'> {
  if (placement === 'top') {
    return 'topCenter';
  }

  if (placement === 'bottom') {
    return 'bottomCenter';
  }

  return placement;
}

function flipVerticalPlacement(placement: Exclude<DropdownPlacement, 'top' | 'bottom'>): Exclude<DropdownPlacement, 'top' | 'bottom'> {
  if (placement.startsWith('top')) {
    return placement.replace('top', 'bottom') as Exclude<DropdownPlacement, 'top' | 'bottom'>;
  }

  return placement.replace('bottom', 'top') as Exclude<DropdownPlacement, 'top' | 'bottom'>;
}

function getPlacementCoordinates(
  placement: Exclude<DropdownPlacement, 'top' | 'bottom'>,
  triggerRect: DOMRect,
  popupRect: DOMRect,
  gap: number
) {
  const horizontalCenter = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2;
  const leftMap: Record<Exclude<DropdownPlacement, 'top' | 'bottom'>, number> = {
    topLeft: triggerRect.left,
    topCenter: horizontalCenter,
    topRight: triggerRect.right - popupRect.width,
    bottomLeft: triggerRect.left,
    bottomCenter: horizontalCenter,
    bottomRight: triggerRect.right - popupRect.width
  };
  const topMap: Record<Exclude<DropdownPlacement, 'top' | 'bottom'>, number> = {
    topLeft: triggerRect.top - popupRect.height - gap,
    topCenter: triggerRect.top - popupRect.height - gap,
    topRight: triggerRect.top - popupRect.height - gap,
    bottomLeft: triggerRect.bottom + gap,
    bottomCenter: triggerRect.bottom + gap,
    bottomRight: triggerRect.bottom + gap
  };

  return {
    left: leftMap[placement],
    top: topMap[placement]
  };
}

function extractDataAttributes(target: DataAttributes): Record<string, unknown> {
  return Object.entries(target).reduce<Record<string, unknown>>((result, [key, value]) => {
    if (!key.startsWith('data-')) {
      return result;
    }

    result[key] = value;
    return result;
  }, {});
}

const DEFAULT_TRIGGER: DropdownTrigger[] = ['hover'];
const POPUP_GAP = 6;

function DropdownBase(rawProps: DropdownProps) {
  const {
    classNames,
    styles,
    menu,
    autoFocus,
    arrow,
    trigger = DEFAULT_TRIGGER,
    dropdownRender,
    popupRender,
    onOpenChange,
    open,
    disabled,
    destroyPopupOnHide,
    destroyOnHidden,
    align,
    getPopupContainer,
    prefixCls = 'ui-dropdown',
    className,
    rootClassName,
    transitionName,
    placement = 'bottomLeft',
    overlayClassName,
    overlayStyle,
    forceRender,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    openClassName,
    children,
    autoAdjustOverflow = true,
    visible,
    onVisibleChange,
    items,
    ...rest
  } = rawProps;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<React.Key[]>(menu?.defaultSelectedKeys ?? []);
  const [popupPositionStyle, setPopupPositionStyle] = useState<CSSProperties>({});
  const [popupPlacement, setPopupPlacement] = useState<Exclude<DropdownPlacement, 'top' | 'bottom'>>(normalizePlacement(placement));
  const popupIdSeed = useId();
  const popupId = useMemo(() => `ui-dropdown-popup-${popupIdSeed.replace(/:/g, '')}`, [popupIdSeed]);
  const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined';
  const mergedOpen = open ?? visible;
  const isControlled = mergedOpen !== undefined;
  const isOpen = isControlled ? Boolean(mergedOpen) : internalOpen;
  const destroyHidden = destroyOnHidden ?? destroyPopupOnHide ?? false;
  const shouldRenderPopup = forceRender || isOpen || !destroyHidden;
  const mergedTrigger = useMemo(() => (trigger.length > 0 ? trigger : DEFAULT_TRIGGER), [trigger]);
  const triggerActions = useMemo(() => new Set(mergedTrigger), [mergedTrigger]);
  const mergedMenu = useMemo<DropdownMenuProps>(() => {
    if (menu) {
      return {
        ...menu,
        items: menu.items ?? items ?? []
      };
    }

    return {
      items: items ?? []
    };
  }, [items, menu]);
  const selectedKeys = mergedMenu.selectedKeys ?? internalSelectedKeys;
  const selectedKeySet = useMemo(() => new Set(selectedKeys.map(toStringKey)), [selectedKeys]);
  const resolvedClassNames = resolveSemantic(classNames, rawProps);
  const resolvedStyles = resolveSemantic(styles, rawProps);
  const mergedPopupRender = popupRender ?? dropdownRender;
  const arrowEnabled = Boolean(arrow);
  const arrowAtCenter = typeof arrow === 'object' && Boolean(arrow.pointAtCenter);
  const alignsWithHover = triggerActions.has('hover');

  const clearOpenTimer = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (openTimerRef.current === null) {
      return;
    }

    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = null;
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (closeTimerRef.current === null) {
      return;
    }

    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const updateOpenState = useCallback(
    (nextOpen: boolean, source: 'trigger' | 'menu') => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen, { source });
      onVisibleChange?.(nextOpen);
    },
    [isControlled, onOpenChange, onVisibleChange]
  );

  const updatePopupPosition = useCallback(() => {
    const triggerNode = triggerRef.current;
    const popupNode = popupRef.current;

    if (!triggerNode || !popupNode || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const container = getPopupContainer?.(triggerNode) ?? document.body;
    const triggerRect = triggerNode.getBoundingClientRect();
    const popupRect = popupNode.getBoundingClientRect();
    const offsetX = align?.offset?.[0] ?? 0;
    const offsetY = align?.offset?.[1] ?? 0;
    const gap = POPUP_GAP + offsetY;

    let nextPlacement = normalizePlacement(placement);
    let coords = getPlacementCoordinates(nextPlacement, triggerRect, popupRect, gap);
    const adjustOverflowFromAlign = align?.overflow;
    const adjustXFromAlign = Boolean(
      adjustOverflowFromAlign && typeof adjustOverflowFromAlign.adjustX !== 'undefined'
        ? adjustOverflowFromAlign.adjustX
        : undefined
    );
    const adjustYFromAlign = Boolean(
      adjustOverflowFromAlign && typeof adjustOverflowFromAlign.adjustY !== 'undefined'
        ? adjustOverflowFromAlign.adjustY
        : undefined
    );
    const adjustOverflowObject = typeof autoAdjustOverflow === 'object' ? autoAdjustOverflow : undefined;
    const adjustX = adjustOverflowObject
      ? Boolean(adjustOverflowObject.adjustX)
      : typeof adjustOverflowFromAlign?.adjustX !== 'undefined'
        ? adjustXFromAlign
        : Boolean(autoAdjustOverflow);
    const adjustY = adjustOverflowObject
      ? Boolean(adjustOverflowObject.adjustY)
      : typeof adjustOverflowFromAlign?.adjustY !== 'undefined'
        ? adjustYFromAlign
        : Boolean(autoAdjustOverflow);
    const viewportMargin = 4;

    if (adjustY) {
      const overflowTop = coords.top < viewportMargin;
      const overflowBottom = coords.top + popupRect.height > window.innerHeight - viewportMargin;

      if (overflowTop || overflowBottom) {
        const flipped = flipVerticalPlacement(nextPlacement);
        const flippedCoords = getPlacementCoordinates(flipped, triggerRect, popupRect, gap);
        const fitsAfterFlip =
          flippedCoords.top >= viewportMargin && flippedCoords.top + popupRect.height <= window.innerHeight - viewportMargin;

        if (fitsAfterFlip || (overflowTop && flippedCoords.top > coords.top) || (overflowBottom && flippedCoords.top < coords.top)) {
          nextPlacement = flipped;
          coords = flippedCoords;
        }
      }

      coords.top = Math.min(Math.max(coords.top, viewportMargin), window.innerHeight - popupRect.height - viewportMargin);
    }

    if (adjustX) {
      coords.left = Math.min(Math.max(coords.left, viewportMargin), window.innerWidth - popupRect.width - viewportMargin);
    }

    const isBodyContainer = container === document.body;

    if (isBodyContainer) {
      setPopupPositionStyle({
        position: 'fixed',
        top: coords.top,
        left: coords.left + offsetX
      });
    } else {
      const containerRect = container.getBoundingClientRect();
      setPopupPositionStyle({
        position: 'absolute',
        top: coords.top - containerRect.top + container.scrollTop,
        left: coords.left - containerRect.left + container.scrollLeft + offsetX
      });
    }

    setPopupPlacement(nextPlacement);
  }, [align?.offset, align?.overflow, autoAdjustOverflow, getPopupContainer, placement]);

  useEffect(() => {
    if (!canUseDOM || !isOpen) {
      clearOpenTimer();
      clearCloseTimer();
      return;
    }

    updatePopupPosition();

    const onViewportChange = () => updatePopupPosition();
    window.addEventListener('resize', onViewportChange);
    window.addEventListener('scroll', onViewportChange, true);

    return () => {
      window.removeEventListener('resize', onViewportChange);
      window.removeEventListener('scroll', onViewportChange, true);
    };
  }, [canUseDOM, clearCloseTimer, clearOpenTimer, isOpen, updatePopupPosition]);

  useEffect(() => {
    if (!canUseDOM || !isOpen) {
      return;
    }

    const onDocumentPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!target) {
        return;
      }

      if (rootRef.current?.contains(target) || popupRef.current?.contains(target)) {
        return;
      }

      updateOpenState(false, 'trigger');
    };

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      updateOpenState(false, 'trigger');
    };

    document.addEventListener('mousedown', onDocumentPointer);
    document.addEventListener('touchstart', onDocumentPointer);
    document.addEventListener('keydown', onDocumentKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocumentPointer);
      document.removeEventListener('touchstart', onDocumentPointer);
      document.removeEventListener('keydown', onDocumentKeyDown);
    };
  }, [canUseDOM, isOpen, updateOpenState]);

  useEffect(() => {
    if (!canUseDOM || !autoFocus || !isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      const firstItem = popupRef.current?.querySelector<HTMLButtonElement>('.ui-dropdown__item-btn:not(:disabled)');
      firstItem?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [autoFocus, canUseDOM, isOpen]);

  useEffect(() => {
    setPopupPlacement(normalizePlacement(placement));
  }, [placement]);

  useEffect(
    () => () => {
      clearOpenTimer();
      clearCloseTimer();
    },
    [clearCloseTimer, clearOpenTimer]
  );

  const scheduleOpenFromHover = useCallback(() => {
    if (!alignsWithHover || disabled) {
      return;
    }

    clearCloseTimer();
    clearOpenTimer();
    openTimerRef.current = window.setTimeout(() => {
      updateOpenState(true, 'trigger');
    }, mouseEnterDelay * 1000);
  }, [alignsWithHover, clearCloseTimer, clearOpenTimer, disabled, mouseEnterDelay, updateOpenState]);

  const scheduleCloseFromHover = useCallback(() => {
    if (!alignsWithHover) {
      return;
    }

    clearOpenTimer();
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      updateOpenState(false, 'trigger');
    }, mouseLeaveDelay * 1000);
  }, [alignsWithHover, clearCloseTimer, clearOpenTimer, mouseLeaveDelay, updateOpenState]);

  const handleMenuItemAction = useCallback(
    (menuItem: DropdownMenuItemType, keyPath: React.Key[], event: ReactMouseEvent<HTMLElement>) => {
      if (disabled || menuItem.disabled) {
        return;
      }

      const info: DropdownMenuInfo = {
        key: menuItem.key,
        keyPath,
        domEvent: event
      };
      const currentKey = toStringKey(menuItem.key);

      menuItem.onClick?.(info);
      mergedMenu.onClick?.(info);

      if (mergedMenu.selectable) {
        const alreadySelected = selectedKeySet.has(currentKey);
        let nextKeys: React.Key[];

        if (alreadySelected) {
          nextKeys = selectedKeys.filter((key) => toStringKey(key) !== currentKey);
          mergedMenu.onDeselect?.(info);
        } else if (mergedMenu.multiple) {
          nextKeys = [...selectedKeys, menuItem.key];
          mergedMenu.onSelect?.(info);
        } else {
          nextKeys = [menuItem.key];
          mergedMenu.onSelect?.(info);
        }

        if (mergedMenu.selectedKeys === undefined) {
          setInternalSelectedKeys(nextKeys);
        }

        return;
      }

      updateOpenState(false, 'menu');
    },
    [disabled, mergedMenu, selectedKeySet, selectedKeys, updateOpenState]
  );

  const renderMenuNodes = useCallback(
    (menuNodes: DropdownMenuItemNode[], parentPath: React.Key[] = []): ReactNode =>
      menuNodes.map((node, index) => {
        if (!node) {
          return null;
        }

        const fallbackKey = `dropdown-item-${parentPath.length}-${index}`;
        if (isDividerItem(node)) {
          return (
            <li
              key={node.key ?? fallbackKey}
              role="separator"
              className={cn('ui-dropdown__divider', node.dashed && 'ui-dropdown__divider--dashed', node.className)}
              style={node.style}
              {...extractDataAttributes(node)}
            />
          );
        }

        if (isGroupItem(node)) {
          const groupKey = node.key ?? fallbackKey;
          return (
            <li
              key={groupKey}
              role="presentation"
              className={cn('ui-dropdown__group', node.className)}
              style={node.style}
              {...extractDataAttributes(node)}
            >
              {node.label !== undefined ? (
                <div className={cn('ui-dropdown__group-title', resolvedClassNames?.itemTitle)} style={resolvedStyles?.itemTitle}>
                  {node.label}
                </div>
              ) : null}
              <ul className="ui-dropdown__group-list" role="group">
                {renderMenuNodes(node.children ?? [], [groupKey, ...parentPath])}
              </ul>
            </li>
          );
        }

        const nodeKey = node.key ?? fallbackKey;
        const keyPath = [nodeKey, ...parentPath];
        const selected = selectedKeySet.has(toStringKey(nodeKey));

        if (isSubMenuItem(node)) {
          return (
            <li
              key={nodeKey}
              className={cn('ui-dropdown__submenu', node.className, resolvedClassNames?.item)}
              style={{ ...resolvedStyles?.item, ...node.style }}
              {...extractDataAttributes(node)}
            >
              <div className={cn('ui-dropdown__submenu-title', resolvedClassNames?.itemTitle)} style={resolvedStyles?.itemTitle}>
                {node.icon ? (
                  <span className={cn('ui-dropdown__item-icon', resolvedClassNames?.itemIcon)} style={resolvedStyles?.itemIcon}>
                    {node.icon}
                  </span>
                ) : null}
                <span className={cn('ui-dropdown__item-content', resolvedClassNames?.itemContent)} style={resolvedStyles?.itemContent}>
                  {node.label}
                </span>
              </div>
              <ul className="ui-dropdown__submenu-list" role="menu">
                {renderMenuNodes(node.children, keyPath)}
              </ul>
            </li>
          );
        }

        return (
          <li key={nodeKey} className="ui-dropdown__item-wrapper">
            <button
              type="button"
              role="menuitem"
              title={node.title}
              disabled={node.disabled || disabled}
              className={cn(
                'ui-dropdown__item-btn',
                selected && 'ui-dropdown__item-btn--selected',
                node.danger && 'ui-dropdown__item-btn--danger',
                node.className,
                resolvedClassNames?.item
              )}
              style={{ ...resolvedStyles?.item, ...node.style }}
              onClick={(event) => handleMenuItemAction(node, keyPath, event)}
              {...extractDataAttributes(node)}
            >
              {node.icon ? (
                <span className={cn('ui-dropdown__item-icon', resolvedClassNames?.itemIcon)} style={resolvedStyles?.itemIcon}>
                  {node.icon}
                </span>
              ) : null}
              <span className={cn('ui-dropdown__item-content', resolvedClassNames?.itemContent)} style={resolvedStyles?.itemContent}>
                {node.label}
              </span>
            </button>
          </li>
        );
      }),
    [disabled, handleMenuItemAction, resolvedClassNames?.item, resolvedClassNames?.itemContent, resolvedClassNames?.itemIcon, resolvedClassNames?.itemTitle, resolvedStyles?.item, resolvedStyles?.itemContent, resolvedStyles?.itemIcon, resolvedStyles?.itemTitle, selectedKeySet]
  );

  const menuNode = (
    <ul
      className={cn('ui-dropdown__menu', mergedMenu.className)}
      style={mergedMenu.style}
      role="menu"
      aria-activedescendant={mergedMenu.activeKey ? toStringKey(mergedMenu.activeKey) : undefined}
    >
      {renderMenuNodes(mergedMenu.items ?? [])}
    </ul>
  );

  const popupNode = (
    <div
      id={popupId}
      ref={popupRef}
      className={cn(
        'ui-dropdown__popup',
        `ui-dropdown__popup--${popupPlacement}`,
        !isOpen && 'ui-dropdown__popup--hidden',
        arrowEnabled && 'ui-dropdown__popup--with-arrow',
        arrowAtCenter && 'ui-dropdown__popup--arrow-center',
        transitionName,
        overlayClassName,
        rootClassName,
        resolvedClassNames?.root
      )}
      style={{
        ...popupPositionStyle,
        ...resolvedStyles?.root,
        ...overlayStyle
      }}
      onMouseEnter={() => {
        if (alignsWithHover) {
          clearCloseTimer();
        }
      }}
      onMouseLeave={() => {
        if (alignsWithHover) {
          scheduleCloseFromHover();
        }
      }}
    >
      {arrowEnabled ? <span className="ui-dropdown__arrow" aria-hidden="true" /> : null}
      {mergedPopupRender ? mergedPopupRender(menuNode) : menuNode}
    </div>
  );

  const triggerContent = children ?? <Button type="default">Open</Button>;

  const handleTriggerClick = (event: ReactMouseEvent<HTMLSpanElement>) => {
    if (disabled || !triggerActions.has('click')) {
      return;
    }

    updateOpenState(!isOpen, 'trigger');
  };

  const handleTriggerContextMenu = (event: ReactMouseEvent<HTMLSpanElement>) => {
    if (disabled || !triggerActions.has('contextMenu')) {
      return;
    }

    event.preventDefault();
    updateOpenState(true, 'trigger');
  };

  const popupContainer = canUseDOM && triggerRef.current && getPopupContainer ? getPopupContainer(triggerRef.current) : undefined;

  return (
    <div
      {...rest}
      className={cn('ui-dropdown', prefixCls !== 'ui-dropdown' && prefixCls, disabled && 'ui-dropdown--disabled', className)}
      ref={rootRef}
    >
      <span
        ref={triggerRef}
        className={cn('ui-dropdown__trigger', isOpen && openClassName)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? popupId : undefined}
        aria-haspopup="menu"
        onClick={handleTriggerClick}
        onContextMenu={handleTriggerContextMenu}
        onMouseEnter={scheduleOpenFromHover}
        onMouseLeave={scheduleCloseFromHover}
      >
        {triggerContent}
      </span>

      {canUseDOM && shouldRenderPopup
        ? popupContainer
          ? createPortal(popupNode, popupContainer)
          : createPortal(popupNode, document.body)
        : null}
    </div>
  );
}

function DropdownButton({
  type = 'default',
  htmlType = 'button',
  danger,
  disabled,
  loading,
  onClick,
  icon,
  href,
  children,
  title,
  buttonsRender,
  className,
  size,
  style,
  prefixCls,
  trigger,
  menu,
  ...dropdownProps
}: DropdownButtonProps) {
  const leftButton = (
    <Button type={type} htmlType={htmlType} danger={danger} disabled={disabled} loading={loading} onClick={onClick} href={href} title={title}>
      {children}
    </Button>
  );
  const rightButton = (
    <Button
      type={type}
      danger={danger}
      disabled={disabled}
      icon={icon ?? <span aria-hidden="true">&#9662;</span>}
      aria-label={title ?? 'Open dropdown'}
    />
  );
  const renderedButtons = buttonsRender?.([leftButton, rightButton]) ?? [leftButton, rightButton];
  const [primaryButton = leftButton, triggerButton = rightButton] = renderedButtons;

  return (
    <Button.Group size={size} style={style} className={cn('ui-dropdown-button', className)} prefixCls={prefixCls}>
      {primaryButton}
      <DropdownBase {...dropdownProps} menu={menu} disabled={disabled} trigger={trigger ?? ['click']}>
        {triggerButton}
      </DropdownBase>
    </Button.Group>
  );
}

function WrapPurePanel(props: DropdownProps) {
  return <DropdownBase {...props} open={true} trigger={['click']} />;
}

type DropdownComponent = typeof DropdownBase & {
  Button: typeof DropdownButton;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof WrapPurePanel;
};

export const Dropdown = DropdownBase as DropdownComponent;
Dropdown.Button = DropdownButton;
Dropdown._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;
