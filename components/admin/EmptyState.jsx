export default function EmptyState({ icon = '📭', title, description, action }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: 'white',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--slate-200)'
    }}>
      <div style={{
        fontSize: '4rem',
        marginBottom: '1rem'
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'var(--slate-900)',
        marginBottom: '0.5rem'
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          fontSize: '0.9375rem',
          color: 'var(--slate-600)',
          marginBottom: action ? '1.5rem' : 0,
          maxWidth: '400px',
          margin: action ? '0 auto 1.5rem' : '0 auto'
        }}>
          {description}
        </p>
      )}
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}
