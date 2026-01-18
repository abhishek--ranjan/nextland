export default function PageHeader({ title, description, action }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem'
    }}>
      <div>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'var(--slate-900)',
          marginBottom: '0.5rem'
        }}>
          {title}
        </h1>
        {description && (
          <p style={{
            fontSize: '1rem',
            color: 'var(--slate-600)',
            margin: 0
          }}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <div>
          {typeof action === 'object' && action.label ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ) : (
            action
          )}
        </div>
      )}
    </div>
  );
}
