export default function StatusBadge({ status, size = 'md' }) {
  // Handle undefined or null status
  if (!status) {
    return <span style={{ color: 'var(--slate-400)' }}>-</span>;
  }

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        label: 'Active',
        bg: 'var(--green-50)',
        color: 'var(--green-700)',
        border: 'var(--green-200)'
      },
      draft: {
        label: 'Draft',
        bg: 'var(--slate-50)',
        color: 'var(--slate-700)',
        border: 'var(--slate-200)'
      },
      archived: {
        label: 'Archived',
        bg: 'var(--red-50)',
        color: 'var(--red-700)',
        border: 'var(--red-200)'
      },
      published: {
        label: 'Published',
        bg: 'var(--blue-50)',
        color: 'var(--blue-700)',
        border: 'var(--blue-200)'
      },
      pending: {
        label: 'Pending',
        bg: 'var(--yellow-50)',
        color: 'var(--yellow-700)',
        border: 'var(--yellow-200)'
      }
    };

    const key = status?.toLowerCase() || 'draft';
    return configs[key] || configs.draft;
  };

  const sizeConfig = {
    sm: { fontSize: '0.75rem', padding: '0.25rem 0.5rem' },
    md: { fontSize: '0.8125rem', padding: '0.375rem 0.75rem' },
    lg: { fontSize: '0.875rem', padding: '0.5rem 1rem' }
  };

  const config = getStatusConfig(status);
  const sizing = sizeConfig[size];

  return (
    <span style={{
      display: 'inline-block',
      fontSize: sizing.fontSize,
      fontWeight: '600',
      padding: sizing.padding,
      backgroundColor: config.bg,
      color: config.color,
      border: `1px solid ${config.border}`,
      borderRadius: 'var(--radius-md)',
      textTransform: 'capitalize'
    }}>
      {config.label}
    </span>
  );
}
