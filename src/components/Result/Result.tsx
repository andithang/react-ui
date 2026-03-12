import { type ReactNode } from 'react';
import { cn } from '../../utils';
import './Result.scss';

export type ResultStatus = 'success' | 'info' | 'warning' | 'error' | '403' | '404' | '500';

export interface ResultProps {
  status?: ResultStatus;
  title?: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const statusGlyph: Record<ResultStatus, string> = {
  success: '✓',
  info: 'i',
  warning: '!',
  error: '×',
  '403': '403',
  '404': '404',
  '500': '500'
};

export function Result({ status = 'info', title, subTitle, icon, extra, children, className }: ResultProps) {
  return (
    <section className={cn('ui-result', className)}>
      <div className={cn('ui-result__icon', `ui-result__icon--${status}`)}>{icon ?? statusGlyph[status]}</div>
      {title ? <h3 className="ui-result__title">{title}</h3> : null}
      {subTitle ? <p className="ui-result__subtitle">{subTitle}</p> : null}
      {children ? <div className="ui-result__content">{children}</div> : null}
      {extra ? <div className="ui-result__extra">{extra}</div> : null}
    </section>
  );
}
