import { Alert as InternalAlert } from './Alert';
import { default as ErrorBoundary } from './ErrorBoundary';
type CompoundedComponent = typeof InternalAlert & {
    ErrorBoundary: typeof ErrorBoundary;
};
declare const Alert: CompoundedComponent;
export { Alert };
export default Alert;
export type { AlertClassNamesType, AlertClosable, AlertProps, AlertRef, AlertSemanticType, AlertStylesType } from './Alert';
export type { ErrorBoundaryProps } from './ErrorBoundary';
//# sourceMappingURL=index.d.ts.map