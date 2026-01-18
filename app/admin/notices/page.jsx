'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingState from '@/components/admin/LoadingState';
import EmptyState from '@/components/admin/EmptyState';

export default function NoticesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [deleteDialog, setDeleteDialog] = useState({ show: false, notice: null });

  useEffect(() => {
    fetchNotices();
  }, [statusFilter, categoryFilter, searchTerm]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/notices?${params}`);
      const data = await response.json();
      
      // Filter out null/undefined notices
      const validNotices = (data.notices || []).filter(notice => notice && notice.id);
      setNotices(validNotices);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNotices();
  };

  const handleArchive = async () => {
    if (!deleteDialog.notice) return;

    try {
      const response = await fetch(`/api/admin/notices/${deleteDialog.notice.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchNotices();
        setDeleteDialog({ show: false, notice: null });
      }
    } catch (error) {
      console.error('Failed to archive notice:', error);
    }
  };

  const handleRestore = async (noticeId) => {
    try {
      const response = await fetch(`/api/admin/notices/${noticeId}/restore`, {
        method: 'POST'
      });

      if (response.ok) {
        fetchNotices();
      }
    } catch (error) {
      console.error('Failed to restore notice:', error);
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (value, notice) => (
        <div>
          <Link 
            href={`/admin/notices/${notice.id}`}
            className="text-decoration-none fw-semibold"
          >
            {notice.title}
          </Link>
          {notice.priority === 'urgent' && (
            <span className="badge bg-danger ms-2">Urgent</span>
          )}
          {notice.priority === 'high' && (
            <span className="badge bg-warning ms-2">High</span>
          )}
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (value, notice) => (
        <span className="text-capitalize">{notice.category}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, notice) => <StatusBadge status={notice.status} />
    },
    {
      key: 'date',
      label: 'Date',
      render: (value, notice) => new Date(notice.date || notice.createdAt).toLocaleDateString()
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, notice) => (
        <div className="d-flex gap-2">
          <Link
            href={`/admin/notices/${notice.id}`}
            className="btn btn-sm btn-outline-primary"
          >
            Edit
          </Link>
          {notice.status === 'archived' ? (
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => handleRestore(notice.id)}
            >
              Restore
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setDeleteDialog({ show: true, notice })}
            >
              Archive
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div>
      <PageHeader
        title="Notices"
        description="Manage society notices and announcements"
        action={{
          label: 'Create Notice',
          onClick: () => router.push('/admin/notices/new')
        }}
      />

      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="maintenance">Maintenance</option>
                <option value="event">Event</option>
                <option value="security">Security</option>
                <option value="financial">Financial</option>
                <option value="meeting">Meeting</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading notices..." />
      ) : notices.length === 0 ? (
        <EmptyState
          icon="📢"
          title="No notices found"
          description={
            searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first notice to get started'
          }
          action={
            searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
              ? undefined
              : {
                  label: 'Create Notice',
                  onClick: () => router.push('/admin/notices/new')
                }
          }
        />
      ) : (
        <div className="card">
          <div className="card-body">
            <DataTable columns={columns} data={notices} />
          </div>
        </div>
      )}

      <ConfirmDialog
        show={deleteDialog.show}
        title="Archive Notice"
        message={`Are you sure you want to archive "${deleteDialog.notice?.title}"? You can restore it later from the archived notices.`}
        variant="warning"
        confirmLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setDeleteDialog({ show: false, notice: null })}
      />
    </div>
  );
}
