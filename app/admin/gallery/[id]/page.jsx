'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/admin/PageHeader';
import PhotoUploader from '@/components/admin/PhotoUploader';
import LoadingState from '@/components/admin/LoadingState';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function AlbumDetailPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({ show: false, photo: null });

  useEffect(() => {
    fetchAlbum();
  }, [resolvedParams.id]);

  const fetchAlbum = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/gallery/${resolvedParams.id}`);
      const data = await response.json();
      setAlbum(data.album);
    } catch (error) {
      console.error('Failed to fetch album:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPhotos = async () => {
    if (photos.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      photos.forEach(photo => {
        formData.append('photos', photo);
      });

      const response = await fetch(`/api/admin/gallery/${resolvedParams.id}/photos`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setPhotos([]);
        fetchAlbum();
      }
    } catch (error) {
      console.error('Failed to upload photos:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!deleteDialog.photo) return;

    try {
      const response = await fetch(
        `/api/admin/gallery/${resolvedParams.id}/photos/${deleteDialog.photo.id}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        fetchAlbum();
        setDeleteDialog({ show: false, photo: null });
      }
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  };

  const handleSetCover = async (photoPath) => {
    try {
      const response = await fetch(`/api/admin/gallery/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverPhoto: photoPath })
      });

      if (response.ok) {
        fetchAlbum();
      }
    } catch (error) {
      console.error('Failed to set cover photo:', error);
    }
  };

  if (loading) {
    return <LoadingState message="Loading album..." />;
  }

  if (!album) {
    return (
      <div className="alert alert-danger">
        <h4>Album not found</h4>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={album.title}
        description={album.description || 'Manage album photos'}
      />

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Album Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-2"><strong>Date:</strong> {new Date(album.date).toLocaleDateString()}</p>
                  <p className="mb-2"><strong>Total Photos:</strong> {album.photos?.length || 0}</p>
                  <p className="mb-0"><strong>Status:</strong> <span className="badge bg-success">{album.status}</span></p>
                </div>
                <div className="col-md-6 text-md-end">
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => router.push('/admin/gallery')}
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Upload Photos</h5>
        </div>
        <div className="card-body">
          <PhotoUploader
            onPhotosSelect={setPhotos}
            disabled={uploading}
          />
          {photos.length > 0 && (
            <div className="mt-3">
              <button
                className="btn btn-primary"
                onClick={handleUploadPhotos}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : `Upload ${photos.length} Photo(s)`}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Album Photos ({album.photos?.length || 0})</h5>
        </div>
        <div className="card-body">
          {!album.photos || album.photos.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mx-auto mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No photos in this album yet. Upload some photos to get started!</p>
            </div>
          ) : (
            <div className="row g-3">
              {album.photos.map(photo => (
                <div key={photo.id} className="col-md-3">
                  <div className="card h-100">
                    <div className="position-relative">
                      <img
                        src={photo.path}
                        alt={photo.filename}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      {album.coverPhoto === photo.path && (
                        <span className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark">
                          Cover
                        </span>
                      )}
                    </div>
                    <div className="card-body p-2">
                      <p className="small text-muted mb-2 text-truncate" title={photo.filename}>
                        {photo.filename}
                      </p>
                      <div className="d-flex gap-1">
                        {album.coverPhoto !== photo.path && (
                          <button
                            className="btn btn-sm btn-outline-primary flex-grow-1"
                            onClick={() => handleSetCover(photo.path)}
                          >
                            Set Cover
                          </button>
                        )}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setDeleteDialog({ show: true, photo })}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        show={deleteDialog.show}
        title="Delete Photo"
        message="Are you sure you want to delete this photo? This action cannot be undone."
        variant="danger"
        confirmLabel="Delete"
        onConfirm={handleDeletePhoto}
        onCancel={() => setDeleteDialog({ show: false, photo: null })}
      />
    </div>
  );
}
