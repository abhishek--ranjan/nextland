"use client";

import { useState, useEffect } from 'react';
import { PageHeader, Footer } from '@/components';
import { getImagePath } from '@/utils';
import { use } from 'react';
import Link from 'next/link';

export default function AlbumDetailPage({ params }) {
  const { id } = use(params);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        navigatePrevious();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex, album]);

  const fetchAlbum = async () => {
    try {
      const response = await fetch(`/api/gallery/${id}`);
      const data = await response.json();
      setAlbum(data);
    } catch (error) {
      console.error('Error fetching album:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateNext = () => {
    if (!album || !album.photos) return;
    const photos = album.photos || [];
    setCurrentImageIndex((prev) => 
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  const navigatePrevious = () => {
    if (!album || !album.photos) return;
    const photos = album.photos || [];
    setCurrentImageIndex((prev) => 
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'cultural': 'Cultural',
      'festival': 'Festival',
      'sports': 'Sports',
      'workshop': 'Workshop',
      'meeting': 'Meeting'
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <>
        <PageHeader 
          title="Loading..."
          breadcrumbs={[
            { label: 'Community', href: '/community' },
            { label: 'Photo Gallery', href: '/photo-gallery' },
            { label: 'Loading...' }
          ]}
        />
        <section style={{ padding: '4rem 0', backgroundColor: 'white', minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '1200px', textAlign: 'center' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading album...</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (!album) {
    return (
      <>
        <PageHeader 
          title="Album Not Found"
          breadcrumbs={[
            { label: 'Community', href: '/community' },
            { label: 'Photo Gallery', href: '/photo-gallery' },
            { label: 'Not Found' }
          ]}
        />
        <section style={{ padding: '4rem 0', backgroundColor: 'white', minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '1200px', textAlign: 'center' }}>
            <h2 className="mb-3">Album Not Found</h2>
            <p className="text-muted mb-4">The album you're looking for doesn't exist.</p>
            <Link href="/photo-gallery" className="btn btn-primary">
              Back to Gallery
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageHeader 
        title={album.title}
        description={formatDate(album.date)}
        breadcrumbs={[
          { label: 'Community', href: '/community' },
          { label: 'Photo Gallery', href: '/photo-gallery' },
          { label: album.title }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Album Info */}
          <div className="row mb-5">
            <div className="col-md-8">
              <div className="mb-3">
                <span className="badge bg-primary text-capitalize">
                  {getCategoryLabel(album.category)}
                </span>
              </div>
              {album.description && (
                <p className="lead text-muted">{album.description}</p>
              )}
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-light">
                <div className="card-body text-center">
                  <h2 className="display-4 text-primary mb-0">
                    {album.photos?.length || 0}
                  </h2>
                  <p className="text-muted mb-0">Photos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          {album.photos && album.photos.length > 0 ? (
            <div className="row g-3">
              {album.photos.map((photo, index) => (
                <div key={photo.id || index} className="col-6 col-md-4 col-lg-3">
                  <div
                    onClick={() => openLightbox(index)}
                    className="photo-thumbnail"
                    style={{
                      width: '100%',
                      paddingBottom: '100%',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={getImagePath(photo.url || photo, 'prod')}
                      alt={photo.caption || `${album.title} - Photo ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center">
              <p className="mb-0">No photos available in this album yet.</p>
            </div>
          )}

          {/* Back to Gallery */}
          <div className="text-center mt-5">
            <Link href="/photo-gallery" className="btn btn-outline-primary">
              ← Back to Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && album.photos && album.photos.length > 0 && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="btn btn-light"
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              zIndex: '10001',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>

          {/* Image */}
          <img
            src={getImagePath(album.photos[currentImageIndex]?.url || album.photos[currentImageIndex], 'prod')}
            alt={album.photos[currentImageIndex]?.caption || `${album.title} - Photo ${currentImageIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              cursor: 'default'
            }}
          />

          {/* Navigation Buttons */}
          {album.photos.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePrevious();
                }}
                className="btn btn-light"
                style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  zIndex: '10001'
                }}
              >
                ←
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateNext();
                }}
                className="btn btn-light"
                style={{
                  position: 'absolute',
                  right: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  zIndex: '10001'
                }}
              >
                →
              </button>
            </>
          )}

          {/* Image Counter */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: '600',
              zIndex: '10001'
            }}
          >
            {currentImageIndex + 1} / {album.photos.length}
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .photo-thumbnail {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .photo-thumbnail:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
      `}</style>
    </>
  );
}
