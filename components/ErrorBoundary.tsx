import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-thai-bg flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border-2 border-black p-8 shadow-hard">
            <h1 className="font-roboto font-black italic text-3xl uppercase mb-4">
              Что-то пошло не так
            </h1>
            <p className="font-roboto text-lg mb-6">
              Произошла ошибка при загрузке страницы. Попробуйте обновить страницу или вернуться на главную.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-black text-white font-bold uppercase py-3 px-6 hover:bg-thai-magenta transition-colors"
              >
                Обновить
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 border-2 border-black font-bold uppercase py-3 px-6 hover:bg-thai-cyan transition-colors"
              >
                На главную
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-sm">
                <summary className="cursor-pointer font-bold">Детали ошибки</summary>
                <pre className="mt-2 p-4 bg-gray-100 overflow-auto text-xs">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
