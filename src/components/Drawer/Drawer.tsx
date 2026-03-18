import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import './Drawer.scss';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface DrawerClassNames {
  mask?: string;
  content?: string;
  header?: string;
  body?: string;
  footer?: string;
}

export interface DrawerStyles {
  mask?: CSSProperties;
  content?: CSSProperties;
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
}

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean;
  afterOpenChange?: (open: boolean) => void;
  onClose?: (event: MouseEvent | globalThis.KeyboardEvent | React.MouseEvent<HTMLElement>) => void;
  placement?: DrawerPlacement;
  size?: 'default' | 'large';
  title?: ReactNode;
  extra?: ReactNode;
  footer?: ReactNode;
  footerStyle?: CSSProperties;
  width?: string | number;
  height?: string | number;
  zIndex?: number;
  keyboard?: boolean;
  closable?: boolean;
  closeIcon?: ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  push?: boolean | { distance: string | number };
  getContainer?: HTMLElement | string | false | (() => HTMLElement);
  rootClassName?: string;
  classNames?: DrawerClassNames;
  styles?: DrawerStyles;
  destroyOnClose?: boolean;
  children?: ReactNode;
}

export function Drawer({
  open = false,
  afterOpenChange,
  onClose,
  placement = 'right',
  size = 'default',
  title,
  extra,
  footer,
  footerStyle,
  width,
  height,
  zIndex = 1000,
  keyboard = true,
  closable = true,
  closeIcon,
  mask = true,
  maskClosable = true,
  getContainer,
  rootClassName,
  classNames,
  styles,
  destroyOnClose,
  className,
  children,
  ...props
}: DrawerProps) {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
    } else if (destroyOnClose) {
      setMounted(false);
    }
    afterOpenChange?.(open);
  }, [afterOpenChange, destroyOnClose, open]);

  useEffect(() => {
    if (!open || !keyboard) return;
    const handler = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.(event);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [keyboard, onClose, open]);

  const container = useMemo(() => {
    if (getContainer === false) {
      return null;
    }

    if (typeof getContainer === 'string') {
      return document.querySelector(getContainer);
    }

    if (typeof getContainer === 'function') {
      return getContainer();
    }

    return getContainer ?? document.body;
  }, [getContainer]);

  if (!mounted && !open) return null;

  const panelStyle: CSSProperties = {
    width: placement === 'left' || placement === 'right' ? (width ?? (size === 'large' ? 736 : 378)) : undefined,
    height: placement === 'top' || placement === 'bottom' ? (height ?? (size === 'large' ? '60vh' : '40vh')) : undefined,
    zIndex,
    ...styles?.content
  };

  const node = (
    <div className={cn('ui-drawer', rootClassName, open && 'is-open')} style={{ zIndex }}>
      {mask ? (
        <button
          type="button"
          className={cn('ui-drawer__mask', classNames?.mask)}
          style={styles?.mask}
          aria-label="Close drawer overlay"
          onClick={(event) => {
            if (maskClosable) {
              onClose?.(event);
            }
          }}
        />
      ) : null}

      <section
        className={cn('ui-drawer__content', `ui-drawer__content--${placement}`, className, classNames?.content)}
        style={panelStyle}
        aria-modal="true"
        role="dialog"
        {...props}
      >
        <header className={cn('ui-drawer__header', classNames?.header)} style={styles?.header}>
          <div className="ui-drawer__title-wrap">
            {closable ? (
              <Button
                variant="text"
                size="small"
                onClick={(event) => onClose?.(event)}
                aria-label="Close drawer"
                className="ui-drawer__close"
              >
                {closeIcon ?? <Icon name="close" size={16} />}
              </Button>
            ) : null}
            <div className="ui-drawer__title">{title}</div>
          </div>
          {extra ? <div className="ui-drawer__extra">{extra}</div> : null}
        </header>

        <div className={cn('ui-drawer__body', classNames?.body)} style={styles?.body}>
          {children}
        </div>

        {footer ? (
          <footer className={cn('ui-drawer__footer', classNames?.footer)} style={{ ...styles?.footer, ...footerStyle }}>
            {footer}
          </footer>
        ) : null}
      </section>
    </div>
  );

  return container ? createPortal(node, container) : node;
}
