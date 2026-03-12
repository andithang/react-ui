import { type ReactNode } from 'react';
import { cn } from '../../utils';
import './Breadcrumb.scss';

export interface BreadcrumbItem {
  title: ReactNode;
  href?: string;
  onClick?: () => void;
  menu?: { items: Array<{ key: string; label: ReactNode; onClick?: () => void }> };
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export function Breadcrumb({ items = [], separator = '/', className }: BreadcrumbProps) {
  return (
    <nav className={cn('ui-breadcrumb', className)} aria-label="Breadcrumb">
      <ol className="ui-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="ui-breadcrumb__item" aria-current={isLast ? 'page' : undefined}>
              {item.href && !isLast ? (
                <a href={item.href} onClick={item.onClick} className="ui-breadcrumb__link">
                  {item.title}
                </a>
              ) : (
                <span className="ui-breadcrumb__text">{item.title}</span>
              )}
              {!isLast ? <span className="ui-breadcrumb__separator">{separator}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
