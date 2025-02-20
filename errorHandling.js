import * as Sentry from "@sentry/react";

// Initialize Sentry for error tracking
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV
});

export const logError = (error, errorInfo = null) => {
  console.error('Error:', error);
  if (errorInfo) {
    console.error('Error Info:', errorInfo);
  }
  Sentry.captureException(error, { extra: errorInfo });
};

export const ErrorFallback = ({ error }) => (
  <div role="alert">
    <h2>Oops! Something went wrong.</h2>
    <pre>{error.message}</pre>
  </div>
);

export const withErrorBoundary = (Component) => (props) => (
  <Sentry.ErrorBoundary fallback={ErrorFallback}>
    <Component {...props} />
  </Sentry.ErrorBoundary>
);
