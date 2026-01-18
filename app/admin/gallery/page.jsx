'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingState from '@/components/admin/LoadingState';
import EmptyState from '@/components/admin/EmptyState';

export default function GalleryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [deleteDialog, setDeleteDialog] = useState({ show: false, album: null });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: '', description: '', date: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, [statusFilter, searchTerm]);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/gallery?${params}`);
      const data = await response.json();
      
      // Filter out null/undefined albums
      const validAlbums = (data.albums || []).filter(album => album && album.id);
      setAlbums(validAlbums);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAlbums();
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    
    if (!newAlbum.title.trim()) return;

    setCreating(true);
    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlbum)
      });

      if (response.ok) {
        const data = await response.json();
        setShowCreateModal(false);
        setNewAlbum({ title: '', description: '', date: '' });
        router.push(`/admin/gallery/${data.album.id}`);
      }
    } catch (error) {
      console.error('Failed to create album:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleArchive = async () => {
    if (!deleteDialog.album) return;

    try {
      const response = await fetch(`/api/admin/gallery/${deleteDialog.album.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchAlbums();
        setDeleteDialog({ show: false, album: null });
      }
    } catch (error) {
      console.error('Failed to archive album:', error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Gallery"
        description="Manage photo albums and images"
        action={{
          label: 'Create Album',
          onClick: () => setShowCreateModal(true)
        }}
      />

      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="col-md-4">
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
            
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading albums..." />
      ) : albums.length === 0 ? (
        <EmptyState
          icon="📸"
          title="No albums found"
          description={
            searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first album to get started'
          }
          action={
            searchTerm || statusFilter !== 'all'
              ? undefined
              : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Create Album
                  </button>
                )
          }
        />
      ) : (
        <div className="row g-3">
          {albums.map(album => (
            <div key={album.id} className="col-md-4">
              <div className="card h-100">
                <div 
                  className="card-img-top bg-light d-flex align-items-center justify-content-center"
                  style={{ height: '200px', overflow: 'hidden' }}
                >
                  {album.coverPhoto ? (
                    <img 
                      src={album.coverPhoto} 
                      alt={album.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-muted">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{album.title}</h5>
                    <StatusBadge status={album.status} />
                  </div>
                  {album.description && (
                    <p className="card-text small text-muted">{album.description}</p>
                  )}
                  <div className="small text-muted mb-3">
                    <span>{album.photos?.length || 0} photos</span>
                    {' • '}
                    <span>{new Date(album.date).toLocaleDateString()}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Link
                      href={`/admin/gallery/${album.id}`}
                      className="btn btn-sm btn-primary flex-grow-1"
                    >
                      Manage
                    </Link>
                    {album.status !== 'archived' && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setDeleteDialog({ show: true, album })}
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Album Modal */}
      {showCreateModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleCreateAlbum}>
                <div className="modal-header">
                  <h5 className="modal-title">Create New Album</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCreateModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      value={newAlbum.title}
                      onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                      required
                      disabled={creating}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      className="form-control"
                      rows="3"
                      value={newAlbum.description}
                      onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                      disabled={creating}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                      type="date"
                      id="date"
                      className="form-control"
                      value={newAlbum.date}
                      onChange={(e) => setNewAlbum({ ...newAlbum, date: e.target.value })}
                      disabled={creating}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                    disabled={creating}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={creating}>
                    {creating ? 'Creating...' : 'Create Album'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        show={deleteDialog.show}
        title="Archive Album"
        message={`Are you sure you want to archive "${deleteDialog.album?.title}"? All photos will remain but won't be visible.`}
        variant="warning"
        confirmLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setDeleteDialog({ show: false, album: null })}
      />
    </div>
  );
}
