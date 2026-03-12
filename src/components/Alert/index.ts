import { Alert as InternalAlert } from './Alert';
import ErrorBoundary from './ErrorBoundary';

type CompoundedComponent = typeof InternalAlert & {
  ErrorBoundary: typeof ErrorBoundary;
};

const Alert = InternalAlert as CompoundedComponent;
Alert.ErrorBoundary = ErrorBoundary;

export { Alert };
export default Alert;
export type {
  AlertClassNamesType,
  AlertClosable,
  AlertProps,
  AlertRef,
  AlertSemanticType,
  AlertStylesType
} from './Alert';
export type { ErrorBoundaryProps } from './ErrorBoundary';

