"use client";

import { useState, useEffect } from 'react';
import { PageHeader, Footer } from '@/components';
import { getImagePath } from '@/utils';
import Link from 'next/link';

export default function PhotoGalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'cultural', 'festival', 'sports', 'workshop', 'meeting'];
  const years = ['all', '2026', '2025', '2024'];

  useEffect(() => {
    fetchAlbums();
  }, [selectedCategory, selectedYear]);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (selectedYear !== 'all') {
        params.append('year', selectedYear);
      }
      const response = await fetch(`/api/gallery?${params}`);
      const data = await response.json();
      setAlbums(data || []);
    } catch (error) {
      console.error('Error fetching albums:', error);
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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

  return (
    <>
      <PageHeader 
        title="Photo Gallery"
        description="Memories from our community events and celebrations"
        breadcrumbs={[
          { label: 'Community', href: '/community' },
          { label: 'Photo Gallery' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Filters */}
          <div className="mb-4">
            <div className="row g-3">
              {/* Category Filter */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Category</label>
                <div className="d-flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {cat === 'all' ? 'All Categories' : getCategoryLabel(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Year</label>
                <div className="d-flex flex-wrap gap-2">
                  {years.map(yr => (
                    <button
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className={`btn btn-sm ${selectedYear === yr ? 'btn-primary' : 'btn-outline-secondary'}`}
                    >
                      {yr === 'all' ? 'All Years' : yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Albums Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading albums...</p>
            </div>
          ) : albums.length === 0 ? (
            <div className="alert alert-info text-center">
              <h5>No albums found</h5>
              <p className="mb-0">No albums match the selected filters.</p>
            </div>
          ) : (
            <div className="row g-4">
              {albums.map(album => (
                <div key={album.id} className="col-md-6 col-lg-4">
                  <Link
                    href={`/photo-gallery/${album.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100 border-0 shadow-sm hover-lift">
                      {/* Album Cover */}
                      <div style={{
                        width: '100%',
                        height: '250px',
                        backgroundColor: '#f8f9fa',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={getImagePath(album.coverImage || 'gallery/default.jpg', 'prod')}
                          alt={album.title}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                        />
                        
                        {/* Category Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: 'rgba(13, 110, 253, 0.9)',
                          color: 'white',
                          borderRadius: '50px',
                          textTransform: 'capitalize'
                        }}>
                          {getCategoryLabel(album.category)}
                        </div>
                        
                        {/* Photo Count */}
                        <div style={{
                          position: 'absolute',
                          bottom: '1rem',
                          left: '1rem',
                          padding: '0.5rem 1rem',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          borderRadius: '8px'
                        }}>
                          📷 {album.photos?.length || 0} Photos
                        </div>
                      </div>

                      {/* Album Content */}
                      <div className="card-body">
                        <div className="text-primary small mb-2">
                          📅 {formatDate(album.date)}
                        </div>
                        <h5 className="card-title mb-2">{album.title}</h5>
                        {album.description && (
                          <p className="card-text text-muted small mb-0">
                            {album.description.length > 100 
                              ? `${album.description.substring(0, 100)}...` 
                              : album.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Upload CTA */}
          {albums.length > 0 && (
            <div className="mt-5 p-4 bg-light rounded text-center">
              <h4 className="mb-3">Have Event Photos to Share?</h4>
              <p className="mb-3">Share your photos with the community. Contact the committee to submit your images.</p>
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </>
  );
}
