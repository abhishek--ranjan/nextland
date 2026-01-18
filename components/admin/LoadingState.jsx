export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      color: 'var(--slate-600)'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid var(--slate-200)',
        borderTop: '4px solid var(--blue-600)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1.5rem'
      }} />
      <p style={{
        fontSize: '1rem',
        fontWeight: '500',
        margin: 0
      }}>
        {message}
      </p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
