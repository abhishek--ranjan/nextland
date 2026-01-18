'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-body text-center p-5">
                    <div className="text-danger mb-4">
                      <i className="bi bi-exclamation-triangle" style={{ fontSize: '4rem' }}></i>
                    </div>
                    
                    <h2 className="h3 mb-3">Something went wrong</h2>
                    
                    <p className="text-muted mb-4">
                      We're sorry, but something unexpected happened. 
                      Please try reloading the page or contact support if the problem persists.
                    </p>

                    {this.state.error && process.env.NODE_ENV === 'development' && (
                      <details className="text-start mb-4">
                        <summary className="btn btn-link p-0 mb-2">
                          View error details
                        </summary>
                        <div className="alert alert-danger small">
                          <strong>Error:</strong> {this.state.error.toString()}
                          <br />
                          <br />
                          <strong>Component Stack:</strong>
                          <pre className="mb-0 mt-2" style={{ fontSize: '0.75rem' }}>
                            {this.state.errorInfo?.componentStack}
                          </pre>
                        </div>
                      </details>
                    )}

                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-primary"
                        onClick={this.handleReset}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Reload Page
                      </button>
                      <a href="/admin" className="btn btn-outline-secondary">
                        <i className="bi bi-house me-2"></i>
                        Go to Dashboard
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
