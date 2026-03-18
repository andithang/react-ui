import { useEffect, useMemo, useState, type AnchorHTMLAttributes, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';
import './Anchor.scss';

export interface AnchorLinkItemProps {
  key?: string;
  href: string;
  title: ReactNode;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  children?: AnchorLinkItemProps[];
  className?: string;
  style?: CSSProperties;
}

export interface AnchorDirectionBounds {
  top?: number;
  bottom?: number;
}

export interface AnchorProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'onClick'> {
  items?: AnchorLinkItemProps[];
  bounds?: number;
  offsetTop?: number;
  targetOffset?: number;
  affix?: boolean;
  showInkInFixed?: boolean;
  getContainer?: () => HTMLElement | Window;
  getCurrentAnchor?: (activeLink: string) => string;
  direction?: 'vertical' | 'horizontal';
  replace?: boolean;
  onChange?: (currentActiveLink: string) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>, link: AnchorLinkItemProps) => void;
}

function flattenLinks(items: AnchorLinkItemProps[] = []): AnchorLinkItemProps[] {
  return items.flatMap((item) => [item, ...flattenLinks(item.children ?? [])]);
}

export function Anchor({
  items = [],
  bounds = 5,
  offsetTop = 0,
  targetOffset,
  affix = true,
  direction = 'vertical',
  replace,
  getContainer,
  getCurrentAnchor,
  onChange,
  onClick,
  className,
  ...props
}: AnchorProps) {
  const links = useMemo(() => flattenLinks(items), [items]);
  const [activeLink, setActiveLink] = useState<string>('');

  useEffect(() => {
    const container = getContainer?.() ?? window;
    const getScrollTop = () => (container instanceof Window ? container.scrollY : container.scrollTop);

    const calcActiveLink = () => {
      const currentTop = getScrollTop() + (targetOffset ?? offsetTop);
      let closest: { href: string; distance: number } | null = null;

      for (const link of links) {
        const id = link.href.replace(/^#/, '');
        const target = document.getElementById(id);
        if (!target) continue;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        const distance = Math.abs(targetTop - currentTop);
        if (!closest || distance < closest.distance + bounds) {
          closest = { href: link.href, distance };
        }
      }

      const next = getCurrentAnchor?.(closest?.href ?? '') ?? closest?.href ?? '';
      if (next !== activeLink) {
        setActiveLink(next);
        onChange?.(next);
      }
    };

    calcActiveLink();
    const targetNode: EventTarget = container instanceof Window ? window : container;
    targetNode.addEventListener('scroll', calcActiveLink);
    return () => targetNode.removeEventListener('scroll', calcActiveLink);
  }, [activeLink, bounds, getContainer, getCurrentAnchor, links, offsetTop, onChange, targetOffset]);

  const scrollTo = (href: string) => {
    const id = href.replace(/^#/, '');
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - (targetOffset ?? offsetTop);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const renderItems = (anchorItems: AnchorLinkItemProps[]) => (
    <ul className="ui-anchor__list">
      {anchorItems.map((item) => {
        const isActive = activeLink === item.href;
        return (
          <li key={item.key ?? item.href} className="ui-anchor__item">
            <a
              href={item.href}
              target={item.target}
              className={cn('ui-anchor__link', isActive && 'is-active', item.className)}
              style={item.style}
              onClick={(event) => {
                event.preventDefault();
                onClick?.(event, item);
                if (replace) {
                  window.history.replaceState(null, '', item.href);
                } else {
                  window.history.pushState(null, '', item.href);
                }
                scrollTo(item.href);
              }}
            >
              {item.title}
            </a>
            {item.children?.length ? renderItems(item.children) : null}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav
      className={cn('ui-anchor', `ui-anchor--${direction}`, affix && 'ui-anchor--affix', className)}
      style={affix ? ({ top: offsetTop } as CSSProperties) : undefined}
      {...props}
    >
      {renderItems(items)}
    </nav>
  );
}
