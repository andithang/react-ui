import { useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils';
import './Textarea.scss';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, id, className, ...props }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <label className={cn('ui-textarea', className)} htmlFor={textareaId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <textarea id={textareaId} className={cn('ui-control', error && 'ui-control--error')} {...props} />
      {error ? <span className="ui-textarea__error">{error}</span> : hint ? <span className="ui-helptext">{hint}</span> : null}
    </label>
  );
}
