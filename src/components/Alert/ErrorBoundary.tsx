import React from 'react';
import { Alert } from './Alert';

export interface ErrorBoundaryProps {
  title?: React.ReactNode;
  /**
   * @deprecated Use `title` instead.
   */
  message?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
}

export interface ErrorBoundaryStates {
  error?: Error | null;
  info?: React.ErrorInfo;
}

function isNonNullable<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryStates> {
  state: ErrorBoundaryStates = {
    error: undefined,
    info: undefined
  };

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ error, info });
  }

  render() {
    const { message, title, description, id, children } = this.props;
    const { error, info } = this.state;
    const mergedTitle = title ?? message;
    const componentStack = info?.componentStack ?? null;
    const errorMessage = isNonNullable(mergedTitle) ? mergedTitle : error?.toString();
    const errorDescription = isNonNullable(description) ? description : componentStack;

    if (error) {
      return (
        <Alert
          id={id}
          type="error"
          title={errorMessage}
          description={
            <pre style={{ fontSize: '0.9em', margin: 0, padding: 0, overflowX: 'auto' }}>{errorDescription}</pre>
          }
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;

