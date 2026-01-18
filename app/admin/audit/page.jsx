'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import LoadingState from '@/components/admin/LoadingState';
import EmptyState from '@/components/admin/EmptyState';
import { getActionLabel, formatLogTimestamp, getActionIcon } from '@/utils/auditLogClient';

export default function AuditLogPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    users: [],
    actions: [],
    entities: []
  });
  
  // Filters
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  useEffect(() => {
    fetchLogs();
  }, [selectedUser, selectedAction, selectedEntity, startDate, endDate]);

  useEffect(() => {
    applyFilters();
  }, [logs, searchTerm]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (selectedUser) params.append('user', selectedUser);
      if (selectedAction) params.append('action', selectedAction);
      if (selectedEntity) params.append('entity', selectedEntity);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      params.append('limit', '1000');

      const response = await fetch(`/api/admin/audit?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch audit logs');
      }

      const data = await response.json();
      setLogs(data.logs);
      setFilterOptions(data.filters);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...logs];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(log => 
        log.user.email.toLowerCase().includes(term) ||
        log.user.name?.toLowerCase().includes(term) ||
        log.action.toLowerCase().includes(term) ||
        log.entity.toLowerCase().includes(term) ||
        log.entityId?.toLowerCase().includes(term)
      );
    }
    
    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedUser) params.append('user', selectedUser);
      if (selectedAction) params.append('action', selectedAction);
      if (selectedEntity) params.append('entity', selectedEntity);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/admin/audit/export?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to export logs');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting logs:', error);
      alert('Failed to export audit logs');
    }
  };

  const clearFilters = () => {
    setSelectedUser('');
    setSelectedAction('');
    setSelectedEntity('');
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getEntityBadge = (entity) => {
    const colors = {
      notice: 'primary',
      document: 'success',
      event: 'warning',
      gallery: 'info',
      committee: 'secondary',
      contact: 'dark',
      settings: 'danger',
      demo: 'danger'
    };
    
    return colors[entity] || 'secondary';
  };

  if (loading) {
    return <LoadingState message="Loading audit logs..." />;
  }

  return (
    <div className="container-fluid">
      <PageHeader
        title="Audit Trail"
        description="View system activity and change logs"
      >
        <button
          className="btn btn-success"
          onClick={handleExport}
          disabled={logs.length === 0}
        >
          <i className="bi bi-download me-2"></i>
          Export to CSV
        </button>
      </PageHeader>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-semibold">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <label className="form-label small fw-semibold">User</label>
              <select
                className="form-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">All Users</option>
                {filterOptions.users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label small fw-semibold">Entity</label>
              <select
                className="form-select"
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
              >
                <option value="">All Entities</option>
                {filterOptions.entities.map(entity => (
                  <option key={entity} value={entity}>
                    {entity.charAt(0).toUpperCase() + entity.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label small fw-semibold">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <label className="form-label small fw-semibold">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-md-1 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
                title="Clear all filters"
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
          </div>

          {(selectedUser || selectedEntity || startDate || endDate || searchTerm) && (
            <div className="mt-3">
              <small className="text-muted">
                Showing {filteredLogs.length} of {logs.length} logs
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="card">
        <div className="card-body">
          {currentLogs.length === 0 ? (
            <EmptyState
              title="No Audit Logs"
              message={searchTerm || selectedUser || selectedEntity 
                ? "No logs match your filters"
                : "No activity has been logged yet"
              }
              icon="clipboard-data"
            />
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: '180px' }}>Timestamp</th>
                      <th>User</th>
                      <th>Action</th>
                      <th>Entity</th>
                      <th>Entity ID</th>
                      <th style={{ width: '200px' }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLogs.map((log) => (
                      <tr key={log.id}>
                        <td>
                          <small className="text-muted">
                            {formatLogTimestamp(log.timestamp)}
                          </small>
                        </td>
                        <td>
                          <div>
                            <strong>{log.user.name || log.user.email}</strong>
                          </div>
                          <small className="text-muted">{log.user.email}</small>
                        </td>
                        <td>
                          <i className={`bi bi-${getActionIcon(log.action)} me-2`}></i>
                          {getActionLabel(log.action)}
                        </td>
                        <td>
                          <span className={`badge bg-${getEntityBadge(log.entity)}`}>
                            {log.entity.charAt(0).toUpperCase() + log.entity.slice(1)}
                          </span>
                        </td>
                        <td>
                          <code className="small">{log.entityId || '-'}</code>
                        </td>
                        <td>
                          {log.details && Object.keys(log.details).length > 0 ? (
                            <details>
                              <summary className="cursor-pointer small text-primary">
                                View details
                              </summary>
                              <pre className="small mt-2 mb-0" style={{ fontSize: '0.75rem' }}>
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </details>
                          ) : (
                            <span className="text-muted small">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      // Show first, last, current, and adjacent pages
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      ) {
                        return (
                          <li
                            key={page}
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(page)}
                            >
                              {page}
                            </button>
                          </li>
                        );
                      } else if (page === currentPage - 3 || page === currentPage + 3) {
                        return (
                          <li key={page} className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        );
                      }
                      return null;
                    })}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                  <div className="text-center text-muted small">
                    Page {currentPage} of {totalPages} ({filteredLogs.length} total logs)
                  </div>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Total Logs</h6>
              <div className="display-6">{logs.length}</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Unique Users</h6>
              <div className="display-6">{filterOptions.users.length}</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Entities Tracked</h6>
              <div className="display-6">{filterOptions.entities.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
