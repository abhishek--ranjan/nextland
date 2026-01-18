'use client';

import { useState } from 'react';

export default function NoticePreview({ notice, onStatusChange }) {
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleToggleStatus = async () => {
    if (!notice) return;

    setUpdating(true);
    try {
      const newStatus = notice.status === 'active' ? 'draft' : 'active';
      
      const response = await fetch(`/api/admin/notices/${notice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const data = await response.json();
        if (onStatusChange) {
          onStatusChange(data.notice);
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (!notice) return null;

  return (
    <>
      <div className="notice-preview">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h3 className="mb-1">{notice.title}</h3>
            <div className="text-muted small">
              <span className="text-capitalize">{notice.category}</span>
              {' • '}
              <span>{new Date(notice.date || notice.createdAt).toLocaleDateString()}</span>
              {notice.priority && notice.priority !== 'normal' && (
                <>
                  {' • '}
                  <span className={`text-${notice.priority === 'urgent' ? 'danger' : 'warning'} fw-semibold`}>
                    {notice.priority.toUpperCase()}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowModal(true)}
            >
              Preview
            </button>
            
            <button
              className={`btn btn-sm ${notice.status === 'active' ? 'btn-warning' : 'btn-success'}`}
              onClick={handleToggleStatus}
              disabled={updating}
            >
              {updating ? 'Updating...' : notice.status === 'active' ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        </div>

        <div className="notice-content">
          <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
            {notice.content}
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notice Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="notice-preview-content">
                  <div className="mb-3">
                    <h4>{notice.title}</h4>
                    <div className="text-muted small mb-2">
                      <span className="badge bg-secondary me-2 text-capitalize">
                        {notice.category}
                      </span>
                      {notice.priority && notice.priority !== 'normal' && (
                        <span className={`badge bg-${notice.priority === 'urgent' ? 'danger' : 'warning'} me-2`}>
                          {notice.priority.toUpperCase()}
                        </span>
                      )}
                      <span>{new Date(notice.date || notice.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="notice-content border-top pt-3">
                    <p style={{ whiteSpace: 'pre-wrap' }}>{notice.content}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
