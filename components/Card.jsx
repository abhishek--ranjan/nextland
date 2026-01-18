/**
 * Card Component
 * Reusable card for notices, events, albums, committee members, etc.
 * Supports multiple variants based on content type
 */

export default function Card({ 
  variant = 'default',
  title,
  category,
  date,
  badge,
  description,
  imageUrl,
  imageSrc,
  icon,
  metadata,
  actionLabel = 'View details',
  actionHref,
  onClick
}) {
  const cardStyles = {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--slate-200)',
    boxShadow: 'var(--shadow-sm)',
    backgroundColor: 'white',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const cardBodyStyles = {
    padding: '1.75rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyles = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: 'var(--slate-900)',
    lineHeight: '1.4',
    marginBottom: '0.75rem'
  };

  const descriptionStyles = {
    lineHeight: '1.7',
    fontSize: '0.9375rem',
    color: 'var(--slate-600)',
    marginBottom: '1rem',
    flex: 1
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (actionHref) {
      window.location.href = actionHref;
    }
  };

  return (
    <div 
      className="card h-100" 
      style={cardStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Image (for events, gallery, etc.) */}
      {(imageUrl || imageSrc) && (
        <div style={{ 
          width: '100%', 
          height: '200px', 
          overflow: 'hidden',
          backgroundColor: 'var(--slate-100)'
        }}>
          <img 
            src={imageUrl || imageSrc} 
            alt={title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
        </div>
      )}

      <div className="card-body" style={cardBodyStyles}>
        {/* Category/Badge + Date */}
        {(category || badge || date) && (
          <div className="d-flex align-items-center gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
            {icon && (
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
            )}
            {(category || badge) && (
              <span style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--blue-50)',
                color: 'var(--blue-700)',
                textTransform: 'uppercase',
                letterSpacing: '0.025em'
              }}>
                {category || badge}
              </span>
            )}
            {date && (
              <small style={{ 
                color: 'var(--slate-500)', 
                fontSize: '0.8125rem',
                marginLeft: category || badge ? '0' : 'auto'
              }}>
                {date}
              </small>
            )}
          </div>
        )}

        {/* Title */}
        <h5 className="card-title mb-3" style={titleStyles}>
          {title}
        </h5>

        {/* Metadata (for notices: issued by, for events: location, etc.) */}
        {metadata && (
          <div className="mb-3" style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
            {metadata}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="card-text mb-4" style={descriptionStyles}>
            {description}
          </p>
        )}

        {/* Action Button */}
        {(actionHref || onClick) && (
          <div style={{ marginTop: 'auto' }}>
            {actionHref ? (
              <a 
                href={actionHref} 
                className="btn btn-sm"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-300)',
                  color: 'var(--slate-700)',
                  backgroundColor: 'white',
                  padding: '0.5rem 1rem',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                {actionLabel} →
              </a>
            ) : (
              <button 
                onClick={handleClick}
                className="btn btn-sm"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-300)',
                  color: 'var(--slate-700)',
                  backgroundColor: 'white',
                  padding: '0.5rem 1rem',
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}
              >
                {actionLabel} →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
