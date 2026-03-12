import { type ReactNode } from 'react';
import { cn } from '../../utils';
import './Steps.scss';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  status?: StepStatus;
}

export interface StepsProps {
  items: StepItem[];
  current?: number;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function Steps({ items, current = 0, direction = 'horizontal', className }: StepsProps) {
  return (
    <ol className={cn('ui-steps', `ui-steps--${direction}`, className)}>
      {items.map((item, index) => {
        const computedStatus: StepStatus = item.status ?? (index < current ? 'finish' : index === current ? 'process' : 'wait');

        return (
          <li key={index} className={cn('ui-steps__item', `ui-steps__item--${computedStatus}`)}>
            <span className="ui-steps__icon">{item.icon ?? index + 1}</span>
            <div className="ui-steps__content">
              <span className="ui-steps__title">{item.title}</span>
              {item.description ? <span className="ui-steps__description">{item.description}</span> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
