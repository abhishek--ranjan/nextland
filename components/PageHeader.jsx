/**
 * PageHeader Component
 * Standard page header for all internal pages (not Home)
 * Displays title, description, and breadcrumb navigation
 */

export default function PageHeader({ 
  title, 
  description, 
  breadcrumbs = [],
  backgroundColor = 'white'
}) {
  return (
    <section style={{
      padding: '4rem 0 2rem',
      backgroundColor: backgroundColor === 'light' ? 'var(--slate-50)' : 'white',
      borderBottom: '1px solid var(--slate-200)'
    }}>
      <div className="container" style={{ maxWidth: '1140px' }}>
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0" style={{ fontSize: '0.875rem' }}>
              <li className="breadcrumb-item">
                <a href="/home" style={{ color: 'var(--slate-600)', textDecoration: 'none' }}>
                  Home
                </a>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li 
                  key={index} 
                  className={`breadcrumb-item${index === breadcrumbs.length - 1 ? ' active' : ''}`}
                  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                >
                  {crumb.href && index !== breadcrumbs.length - 1 ? (
                    <a href={crumb.href} style={{ color: 'var(--slate-600)', textDecoration: 'none' }}>
                      {crumb.label}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--slate-900)' }}>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <h1 className="mb-3" style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: 'var(--slate-900)',
          letterSpacing: '-0.01em',
          lineHeight: '1.2'
        }}>
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="mb-0" style={{
            fontSize: '1.125rem',
            lineHeight: '1.6',
            color: 'var(--slate-600)',
            maxWidth: '800px'
          }}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
