import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100dvh',
            gap: 16,
            padding: 24,
            background: '#09090b',
            color: '#fafafa',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
            <circle cx="8" cy="10" r="5" fill="#f97316" opacity="0.4" />
            <circle cx="24" cy="10" r="5" fill="#f97316" opacity="0.4" />
            <circle cx="16" cy="24" r="5" fill="#fb923c" opacity="0.4" />
            <line x1="8" y1="10" x2="24" y2="10" stroke="#f97316" strokeWidth="2" opacity="0.4" />
            <line x1="8" y1="10" x2="16" y2="24" stroke="#f97316" strokeWidth="2" opacity="0.4" />
            <line x1="24" y1="10" x2="16" y2="24" stroke="#f97316" strokeWidth="2" opacity="0.4" />
          </svg>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Something went wrong</p>
            <p style={{ fontSize: 13, color: '#71717a', maxWidth: 340 }}>
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '8px 20px',
              background: '#f97316',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
