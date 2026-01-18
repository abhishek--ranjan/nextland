import StatusBadge from './StatusBadge';

export default function DataTable({ columns, data, actions, emptyMessage = 'No data available' }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-5 bg-white rounded border">
        <p className="text-muted mb-0">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="card border">
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-uppercase small fw-semibold"
                  style={{ 
                    textAlign: column.align || 'left',
                    whiteSpace: 'nowrap'
                  }}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="text-uppercase small fw-semibold text-end" scope="col">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.filter(row => row && row.id).map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    style={{ textAlign: column.align || 'left' }}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="text-end">
                    <div className="d-flex gap-2 justify-content-end flex-wrap">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
