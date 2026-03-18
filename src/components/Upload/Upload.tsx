import { useRef, useState, type ChangeEvent, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';
import { Button } from '../Button/Button';
import { Progress } from '../Progress/Progress';
import './Upload.scss';

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface UploadFile<T = unknown> {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  originFileObj?: File;
  response?: T;
  error?: unknown;
  type?: string;
  thumbUrl?: string;
}

export interface UploadRequestOption<T = unknown> {
  file: File;
  filename?: string;
  action?: string;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  onProgress?: (event: { percent: number }) => void;
  onSuccess?: (response: T, file: File) => void;
  onError?: (error: unknown) => void;
}

export interface UploadChangeParam<T = unknown> {
  file: UploadFile<T>;
  fileList: UploadFile<T>[];
}

export interface UploadProps<T = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  action?: string;
  accept?: string;
  multiple?: boolean;
  directory?: boolean;
  disabled?: boolean;
  method?: 'post' | 'put' | 'patch';
  name?: string;
  data?: Record<string, unknown> | ((file: File) => Record<string, unknown> | Promise<Record<string, unknown>>);
  headers?: Record<string, string>;
  withCredentials?: boolean;
  showUploadList?: boolean | { showRemoveIcon?: boolean; showPreviewIcon?: boolean; showDownloadIcon?: boolean };
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  defaultFileList?: UploadFile<T>[];
  fileList?: UploadFile<T>[];
  maxCount?: number;
  openFileDialogOnClick?: boolean;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  customRequest?: (options: UploadRequestOption<T>) => void;
  onChange?: (info: UploadChangeParam<T>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onPreview?: (file: UploadFile<T>) => void;
  onDownload?: (file: UploadFile<T>) => void;
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  children?: ReactNode;
}

function toUploadFile(file: File): UploadFile {
  return {
    uid: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    lastModifiedDate: new Date(file.lastModified),
    originFileObj: file,
    status: 'uploading',
    percent: 0
  };
}

export function Upload<T = unknown>({
  action,
  accept,
  multiple,
  directory,
  disabled,
  method = 'post',
  name,
  data,
  headers,
  withCredentials,
  showUploadList = true,
  listType = 'text',
  defaultFileList,
  fileList,
  maxCount,
  openFileDialogOnClick = true,
  beforeUpload,
  customRequest,
  onChange,
  onDrop,
  onPreview,
  onDownload,
  onRemove,
  children,
  className,
  ...props
}: UploadProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [innerFileList, setInnerFileList] = useState<UploadFile<T>[]>(defaultFileList ?? []);
  const controlled = fileList !== undefined;
  const mergedFileList = fileList ?? innerFileList;

  const commitList = (nextList: UploadFile<T>[], currentFile: UploadFile<T>) => {
    if (!controlled) {
      setInnerFileList(nextList);
    }
    onChange?.({ file: currentFile, fileList: nextList });
  };

  const runRequest = async (nextFile: UploadFile<T>) => {
    const file = nextFile.originFileObj;
    if (!file) return;

    if (customRequest) {
      customRequest({
        file,
        filename: name,
        action,
        headers,
        withCredentials,
        data: typeof data === 'function' ? await data(file) : data,
        onProgress: (event) => {
          const next = mergedFileList.map((entry) => (entry.uid === nextFile.uid ? { ...entry, percent: event.percent } : entry));
          commitList(next as UploadFile<T>[], { ...nextFile, percent: event.percent });
        },
        onSuccess: (response) => {
          const next = mergedFileList.map((entry) =>
            entry.uid === nextFile.uid ? ({ ...entry, status: 'done', percent: 100, response } as UploadFile<T>) : entry
          );
          commitList(next, { ...nextFile, status: 'done', percent: 100, response });
        },
        onError: (error) => {
          const next = mergedFileList.map((entry) => (entry.uid === nextFile.uid ? ({ ...entry, status: 'error', error } as UploadFile<T>) : entry));
          commitList(next, { ...nextFile, status: 'error', error });
        }
      });
      return;
    }

    const doneFile = { ...nextFile, status: 'done', percent: 100 } as UploadFile<T>;
    const next = mergedFileList.map((entry) => (entry.uid === nextFile.uid ? doneFile : entry));
    commitList(next, doneFile);
  };

  const handleFiles = async (files: File[]) => {
    const accepted: UploadFile<T>[] = [];

    for (const file of files) {
      if (beforeUpload && !(await beforeUpload(file, files))) {
        continue;
      }
      accepted.push(toUploadFile(file) as UploadFile<T>);
    }

    let nextList = [...mergedFileList, ...accepted];
    if (maxCount && nextList.length > maxCount) {
      nextList = nextList.slice(nextList.length - maxCount);
    }

    for (const currentFile of accepted) {
      commitList(nextList, currentFile);
      await runRequest(currentFile);
    }
  };

  const removeFile = async (file: UploadFile<T>) => {
    const result = await onRemove?.(file);
    if (result === false) return;
    const next = mergedFileList.filter((entry) => entry.uid !== file.uid);
    commitList(next, { ...file, status: 'removed' });
  };

  return (
    <div
      className={cn('ui-upload', `ui-upload--${listType}`, className)}
      onDrop={(event) => {
        event.preventDefault();
        if (disabled) return;
        const files = Array.from(event.dataTransfer.files);
        void handleFiles(files);
        onDrop?.(event);
      }}
      onDragOver={(event) => event.preventDefault()}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        name={name}
        className="ui-upload__input"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const files = Array.from(event.target.files ?? []);
          void handleFiles(files);
          event.currentTarget.value = '';
        }}
        {...(directory ? ({ webkitdirectory: 'true' } as unknown as HTMLAttributes<HTMLInputElement>) : {})}
      />

      <div className="ui-upload__trigger">
        {children ?? (
          <Button type="default" disabled={disabled} onClick={() => openFileDialogOnClick && inputRef.current?.click()}>
            Select file
          </Button>
        )}
      </div>

      {showUploadList ? (
        <ul className="ui-upload__list">
          {mergedFileList.map((file) => (
            <li key={file.uid} className="ui-upload__item">
              <button type="button" className="ui-upload__name" onClick={() => onPreview?.(file)}>
                {file.name}
              </button>
              <div className="ui-upload__actions">
                {typeof file.percent === 'number' && file.status === 'uploading' ? (
                  <Progress percent={Math.round(file.percent)} size="small" showInfo={false} />
                ) : null}
                {file.url ? (
                  <button type="button" onClick={() => onDownload?.(file)} className="ui-upload__action">
                    Download
                  </button>
                ) : null}
                {(typeof showUploadList === 'boolean' || showUploadList.showRemoveIcon !== false) && (
                  <button type="button" onClick={() => void removeFile(file)} className="ui-upload__action">
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <input type="hidden" value={action} data-method={method} data-with-credentials={withCredentials ? 'true' : 'false'} />
      <input type="hidden" value={JSON.stringify(headers ?? {})} />
    </div>
  );
}
