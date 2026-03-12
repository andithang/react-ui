import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode
} from 'react';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import './Alert.scss';

type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertRef {
  nativeElement: HTMLDivElement;
}

export interface AlertSemanticType {
  classNames: {
    root?: string;
    icon?: string;
    section?: string;
    title?: string;
    description?: string;
    actions?: string;
    close?: string;
  };
  styles: {
    root?: CSSProperties;
    icon?: CSSProperties;
    section?: CSSProperties;
    title?: CSSProperties;
    description?: CSSProperties;
    actions?: CSSProperties;
    close?: CSSProperties;
  };
}

export type AlertClassNamesType = AlertSemanticType['classNames'];
export type AlertStylesType = AlertSemanticType['styles'];

export interface AlertClosable {
  closeIcon?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  afterClose?: () => void;
  [key: `aria-${string}`]: string | number | boolean | undefined;
  [key: `data-${string}`]: string | number | boolean | undefined;
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: AlertType;
  closable?: boolean | AlertClosable;
  /**
   * @deprecated Use `closable.closeIcon` instead.
   */
  closeText?: ReactNode;
  title?: ReactNode;
  /**
   * @deprecated Use `title` instead.
   */
  message?: ReactNode;
  description?: ReactNode;
  /**
   * @deprecated Use `closable.onClose` instead.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /**
   * @deprecated Use `closable.afterClose` instead.
   */
  afterClose?: () => void;
  showIcon?: boolean;
  role?: string;
  style?: CSSProperties;
  prefixCls?: string;
  className?: string;
  classNames?: AlertClassNamesType;
  styles?: AlertStylesType;
  rootClassName?: string;
  banner?: boolean;
  icon?: ReactNode;
  /**
   * @deprecated Use `closable.closeIcon` instead.
   */
  closeIcon?: ReactNode;
  action?: ReactNode;
  id?: string;
}

const DEFAULT_ICON_BY_TYPE = {
  success: 'checkCircle',
  info: 'info',
  warning: 'warningCircle',
  error: 'closeCircle'
} as const;

function pickAriaDataProps(source: Record<string, unknown>) {
  const picked: Record<string, string | number | boolean> = {};

  Object.keys(source).forEach((key) => {
    if (key.startsWith('aria-') || key.startsWith('data-')) {
      const value = source[key];
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        picked[key] = value;
      }
    }
  });

  return picked;
}

export const Alert = forwardRef<AlertRef, AlertProps>(function Alert(
  {
    description,
    prefixCls = 'ui-alert',
    message,
    title,
    banner,
    className,
    rootClassName,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick,
    afterClose,
    showIcon,
    closable,
    closeText,
    closeIcon,
    action,
    id,
    styles,
    classNames,
    icon,
    type: providedType,
    onClose,
    role = 'alert',
    ...otherProps
  },
  ref
) {
  const mergedTitle = title ?? message;
  const [closed, setClosed] = useState(false);
  const [closing, setClosing] = useState(false);
  const [closingActive, setClosingActive] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeCompletedRef = useRef(false);

  useImperativeHandle(ref, () => ({ nativeElement: rootRef.current as HTMLDivElement }), []);

  const closableConfig = typeof closable === 'object' && closable !== null ? closable : undefined;
  const closableOnClose = closableConfig?.onClose;
  const closableAfterClose = closableConfig?.afterClose;

  const type: AlertType = useMemo(() => {
    if (providedType !== undefined) {
      return providedType;
    }

    return banner ? 'warning' : 'info';
  }, [providedType, banner]);

  const isClosable = useMemo(() => {
    if (closableConfig && closableConfig.closeIcon) {
      return true;
    }

    if (closeText) {
      return true;
    }

    if (typeof closable === 'boolean') {
      return closable;
    }

    if (closeIcon !== false && closeIcon !== null && closeIcon !== undefined) {
      return true;
    }

    return false;
  }, [closeIcon, closeText, closable, closableConfig]);

  const isShowIcon = banner && showIcon === undefined ? true : showIcon;

  const mergedCloseIcon = useMemo(() => {
    if (closableConfig && closableConfig.closeIcon !== undefined) {
      return closableConfig.closeIcon;
    }

    if (closeText) {
      return closeText;
    }

    if (closeIcon !== undefined) {
      return closeIcon;
    }

    return undefined;
  }, [closeIcon, closeText, closableConfig]);

  const finalizeClose = useCallback(() => {
    if (closeCompletedRef.current) {
      return;
    }

    closeCompletedRef.current = true;
    setClosed(true);
    (closableAfterClose ?? afterClose)?.();
  }, [afterClose, closableAfterClose]);

  useEffect(() => {
    if (!closing || typeof window === 'undefined') {
      return undefined;
    }

    setMaxHeight(rootRef.current?.offsetHeight ?? 0);
    const animationFrame = window.requestAnimationFrame(() => {
      setClosingActive(true);
    });
    const fallbackTimer = window.setTimeout(() => {
      finalizeClose();
    }, 240);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(fallbackTimer);
    };
  }, [closing, finalizeClose]);

  const handleClose: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (closing || closed) {
      return;
    }

    setClosing(true);
    (closableOnClose ?? onClose)?.(event);
  };

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (event) => {
    if (!closing || !closingActive || event.target !== event.currentTarget) {
      return;
    }

    finalizeClose();
  };

  if (closed) {
    return null;
  }

  const rootAriaData = pickAriaDataProps(otherProps as Record<string, unknown>);
  const closeAriaData = closableConfig ? pickAriaDataProps(closableConfig as Record<string, unknown>) : {};
  const closeIconNode = mergedCloseIcon === true || mergedCloseIcon === undefined ? <Icon name="close" /> : mergedCloseIcon;
  const iconNode = icon ?? <Icon name={DEFAULT_ICON_BY_TYPE[type]} />;
  const mergedRootStyle: CSSProperties = {
    ...styles?.root,
    ...style,
    ...(closing && maxHeight !== null
      ? ({ ['--ui-alert-collapse-height' as '--ui-alert-collapse-height']: `${maxHeight}px` } as CSSProperties)
      : {})
  };

  return (
    <div
      id={id}
      ref={rootRef}
      data-show={!closed}
      className={cn(
        prefixCls,
        `${prefixCls}--${type}`,
        Boolean(description) && `${prefixCls}--with-description`,
        !isShowIcon && `${prefixCls}--no-icon`,
        Boolean(banner) && `${prefixCls}--banner`,
        closing && `${prefixCls}--closing`,
        closingActive && `${prefixCls}--closing-active`,
        classNames?.root,
        rootClassName,
        className
      )}
      style={mergedRootStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onTransitionEnd={handleTransitionEnd}
      role={role}
      {...rootAriaData}
    >
      {isShowIcon ? (
        <span className={cn(`${prefixCls}__icon`, classNames?.icon)} style={styles?.icon}>
          {iconNode}
        </span>
      ) : null}
      <div className={cn(`${prefixCls}__section`, classNames?.section)} style={styles?.section}>
        {mergedTitle ? (
          <div className={cn(`${prefixCls}__title`, classNames?.title)} style={styles?.title}>
            {mergedTitle}
          </div>
        ) : null}
        {description ? (
          <div className={cn(`${prefixCls}__description`, classNames?.description)} style={styles?.description}>
            {description}
          </div>
        ) : null}
      </div>
      {action ? (
        <div className={cn(`${prefixCls}__actions`, classNames?.actions)} style={styles?.actions}>
          {action}
        </div>
      ) : null}
      {isClosable ? (
        <button
          type="button"
          className={cn(`${prefixCls}__close`, classNames?.close)}
          style={styles?.close}
          onClick={handleClose}
          tabIndex={0}
          {...closeAriaData}
        >
          {closeIconNode}
        </button>
      ) : null}
    </div>
  );
});
