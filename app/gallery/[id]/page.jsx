"use client";

import { useState, useEffect } from 'react';
import { PageHeader, Footer } from '@/components';
import { getImagePath } from '@/utils';
import { use } from 'react';

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

  const getCategoryColor = (category) => {
    const colors = {
      'Community Event': 'var(--blue-100)',
      'Festival': 'var(--purple-100)',
      'Sports': 'var(--green-100)',
      'Workshop': 'var(--orange-100)',
      'Meeting': 'var(--slate-100)'
    };
    return colors[category] || 'var(--slate-100)';
  };

  const getCategoryTextColor = (category) => {
    const colors = {
      'Community Event': 'var(--blue-700)',
      'Festival': 'var(--purple-700)',
      'Sports': 'var(--green-700)',
      'Workshop': 'var(--orange-700)',
      'Meeting': 'var(--slate-700)'
    };
    return colors[category] || 'var(--slate-700)';
  };

  if (loading) {
    return (
      <>
        <PageHeader 
          title="Loading..."
          breadcrumbs={[
            { label: 'Gallery', href: '/gallery' },
            { label: 'Loading...' }
          ]}
        />
        <section style={{ padding: '4rem 0', backgroundColor: 'white', minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '1200px', textAlign: 'center' }}>
            <p style={{ color: 'var(--slate-600)' }}>Loading album...</p>
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
            { label: 'Gallery', href: '/gallery' },
            { label: 'Not Found' }
          ]}
        />
        <section style={{ padding: '4rem 0', backgroundColor: 'white', minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '1200px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--slate-900)', marginBottom: '1rem' }}>Album Not Found</h2>
            <p style={{ color: 'var(--slate-600)', marginBottom: '2rem' }}>
              The album you're looking for doesn't exist.
            </p>
            <a
              href="/gallery"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: 'var(--purple-600)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none'
              }}
            >
              ← Back to Gallery
            </a>
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
          { label: 'Gallery', href: '/gallery' },
          { label: album.title }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Album Info */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  backgroundColor: getCategoryColor(album.category),
                  color: getCategoryTextColor(album.category),
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '0.75rem'
                }}>
                  {album.category}
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--slate-700)',
                  margin: '0',
                  lineHeight: '1.6'
                }}>
                  {album.description}
                </p>
              </div>
              <div style={{
                padding: '1rem 1.5rem',
                backgroundColor: 'white',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--slate-200)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--purple-600)',
                  lineHeight: '1'
                }}>
                  {album.photos?.length || album.photoCount || 0}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--slate-600)',
                  marginTop: '0.25rem'
                }}>
                  Photos
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
                    style={{
                      width: '100%',
                      paddingBottom: '100%',
                      backgroundColor: 'var(--slate-100)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
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
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'var(--slate-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)'
            }}>
              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--slate-600)', 
                margin: '0' 
              }}>
                No photos available in this album yet.
              </p>
            </div>
          )}

          {/* Back to Gallery */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <a
              href="/gallery"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'var(--purple-600)',
                backgroundColor: 'white',
                border: '2px solid var(--purple-600)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.backgroundColor = 'var(--purple-600)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--purple-600)';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              ← Back to Gallery
            </a>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && album.images && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '2px solid white',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              zIndex: '10001'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
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
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
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
                style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '56px',
                  height: '56px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '2px solid white',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  zIndex: '10001'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
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
                style={{
                  position: 'absolute',
                  right: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '56px',
                  height: '56px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '2px solid white',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  zIndex: '10001'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
              >
                →
              </button>
            </>
          )}

          {/* Counter */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '2px solid white',
            borderRadius: 'var(--radius-full)',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '600',
            zIndex: '10001'
          }}>
            {currentImageIndex + 1} / {album.images.length}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
