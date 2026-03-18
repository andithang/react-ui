import { HTMLAttributes, ReactNode } from '../../../node_modules/react';
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
    onProgress?: (event: {
        percent: number;
    }) => void;
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
    showUploadList?: boolean | {
        showRemoveIcon?: boolean;
        showPreviewIcon?: boolean;
        showDownloadIcon?: boolean;
    };
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
export declare function Upload<T = unknown>({ action, accept, multiple, directory, disabled, method, name, data, headers, withCredentials, showUploadList, listType, defaultFileList, fileList, maxCount, openFileDialogOnClick, beforeUpload, customRequest, onChange, onDrop, onPreview, onDownload, onRemove, children, className, ...props }: UploadProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Upload.d.ts.map