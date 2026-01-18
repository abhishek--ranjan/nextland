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

export default function DocumentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [deleteDialog, setDeleteDialog] = useState({ show: false, document: null });

  useEffect(() => {
    fetchDocuments();
  }, [statusFilter, categoryFilter, searchTerm]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/documents?${params}`);
      const data = await response.json();
      
      // Filter out null/undefined documents and ensure all required fields
      const validDocuments = (data.documents || [])
        .filter(doc => doc && doc.id)
        .map(doc => ({
          ...doc,
          status: doc.status || 'active',
          date: doc.date || doc.uploadDate || doc.createdAt,
          fileSize: doc.fileSize || doc.size || 0
        }));
      setDocuments(validDocuments);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDocuments();
  };

  const handleArchive = async () => {
    if (!deleteDialog.document) return;

    try {
      const response = await fetch(`/api/admin/documents/${deleteDialog.document.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchDocuments();
        setDeleteDialog({ show: false, document: null });
      }
    } catch (error) {
      console.error('Failed to archive document:', error);
    }
  };

  const handleRestore = async (docId) => {
    try {
      const response = await fetch(`/api/admin/documents/${docId}/restore`, {
        method: 'POST'
      });

      if (response.ok) {
        fetchDocuments();
      }
    } catch (error) {
      console.error('Failed to restore document:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (doc) => (
        <div>
          <Link 
            href={`/admin/documents/${doc.id}`}
            className="text-decoration-none fw-semibold"
          >
            {doc.title}
          </Link>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (doc) => {
        const categoryLabels = {
          minutes: 'Meeting Minutes',
          financial: 'Financial Reports',
          bylaws: 'Bylaws & Rules',
          circular: 'Circulars',
          agreement: 'Agreements',
          other: 'Other'
        };
        return categoryLabels[doc.category] || doc.category;
      }
    },
    {
      key: 'fileSize',
      label: 'File Size',
      render: (doc) => formatFileSize(doc.fileSize)
    },
    {
      key: 'status',
      label: 'Status',
      render: (doc) => <StatusBadge status={doc?.status || 'active'} />
    },
    {
      key: 'date',
      label: 'Date',
      render: (doc) => {
        const dateValue = doc?.date || doc?.uploadDate || doc?.createdAt;
        return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (doc) => {
        if (!doc) return null;
        const docStatus = doc.status || 'active';
        return (
          <div className="d-flex gap-2">
            {docStatus !== 'archived' && (
              <a
                href={doc.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-info"
              >
                View
              </a>
            )}
            <Link
              href={`/admin/documents/${doc.id}`}
              className="btn btn-sm btn-outline-primary"
            >
              Edit
            </Link>
            {docStatus === 'archived' ? (
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => handleRestore(doc.id)}
              >
                Restore
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setDeleteDialog({ show: true, document: doc })}
              >
                Archive
              </button>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <PageHeader
        title="Documents"
        description="Manage society documents and files"
        action={{
          label: 'Upload Document',
          onClick: () => router.push('/admin/documents/new')
        }}
      />

      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search documents..."
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
                <option value="minutes">Meeting Minutes</option>
                <option value="financial">Financial Reports</option>
                <option value="bylaws">Bylaws & Rules</option>
                <option value="circular">Circulars</option>
                <option value="agreement">Agreements</option>
                <option value="other">Other</option>
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
        <LoadingState message="Loading documents..." />
      ) : documents.length === 0 ? (
        <EmptyState
          icon="📄"
          title="No documents found"
          description={
            searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Upload your first document to get started'
          }
          action={
            searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
              ? undefined
              : (
                  <button
                    className="btn btn-primary"
                    onClick={() => router.push('/admin/documents/new')}
                  >
                    Upload Document
                  </button>
                )
          }
        />
      ) : (
        <div className="card">
          <div className="card-body">
            <DataTable columns={columns} data={documents} />
          </div>
        </div>
      )}

      <ConfirmDialog
        show={deleteDialog.show}
        title="Archive Document"
        message={`Are you sure you want to archive "${deleteDialog.document?.title}"? The file will remain but won't be visible to users.`}
        variant="warning"
        confirmLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setDeleteDialog({ show: false, document: null })}
      />
    </div>
  );
}
