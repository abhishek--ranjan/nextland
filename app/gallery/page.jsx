"use client";

import { useState, useEffect } from 'react';
import { PageHeader, Footer } from '@/components';
import { getImagePath } from '@/utils';

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Community Event', 'Festival', 'Sports', 'Workshop', 'Meeting'];
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
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
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

  return (
    <>
      <PageHeader 
        title="Photo Gallery"
        description="Memories from our community events and celebrations"
        breadcrumbs={[
          { label: 'Photo Gallery' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Filters */}
          <div style={{
            marginBottom: '3rem'
          }}>
            {/* Category Filters */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--slate-700)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem'
              }}>
                Category
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: selectedCategory === cat ? 'white' : 'var(--slate-700)',
                      backgroundColor: selectedCategory === cat ? 'var(--blue-600)' : 'var(--slate-100)',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textTransform: 'capitalize'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== cat) {
                        e.currentTarget.style.backgroundColor = 'var(--slate-200)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== cat) {
                        e.currentTarget.style.backgroundColor = 'var(--slate-100)';
                      }
                    }}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Filters */}
            <div>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--slate-700)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem'
              }}>
                Year
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                {years.map(yr => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: selectedYear === yr ? 'white' : 'var(--slate-700)',
                      backgroundColor: selectedYear === yr ? 'var(--purple-600)' : 'var(--slate-100)',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedYear !== yr) {
                        e.currentTarget.style.backgroundColor = 'var(--slate-200)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedYear !== yr) {
                        e.currentTarget.style.backgroundColor = 'var(--slate-100)';
                      }
                    }}
                  >
                    {yr === 'all' ? 'All Years' : yr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Albums Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: 'var(--slate-600)' }}>Loading albums...</p>
            </div>
          ) : albums.length === 0 ? (
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
                No albums found for the selected filters.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {albums.map(album => (
                <div key={album.id} className="col-md-6 col-lg-4">
                  <a
                    href={`/gallery/${album.id}`}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      height: '100%'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid var(--slate-200)',
                        overflow: 'hidden',
                        transition: 'all 0.2s',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--purple-400)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--slate-200)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Album Cover */}
                      <div style={{
                        width: '100%',
                        height: '250px',
                        backgroundColor: 'var(--slate-100)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={getImagePath(album.coverImage || 'gallery/default.jpg', 'prod')}
                          alt={album.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        {/* Category Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: getCategoryColor(album.category),
                          color: getCategoryTextColor(album.category),
                          borderRadius: 'var(--radius-full)'
                        }}>
                          {album.category}
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
                          borderRadius: 'var(--radius-md)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          📷 {album.photos?.length || album.photoCount || 0} Photos
                        </div>
                      </div>

                      {/* Album Content */}
                      <div style={{
                        padding: '1.5rem',
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {/* Date */}
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: 'var(--purple-600)',
                          marginBottom: '0.5rem'
                        }}>
                          📅 {formatDate(album.date)}
                        </div>

                        {/* Title */}
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: 'var(--slate-900)',
                          marginBottom: '0.75rem',
                          lineHeight: '1.4'
                        }}>
                          {album.title}
                        </h3>

                        {/* View Album Link */}
                        <div style={{
                          marginTop: 'auto',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: 'var(--purple-600)'
                        }}>
                          View Album →
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Upload CTA */}
          <div style={{
            marginTop: '4rem',
            padding: '2rem',
            backgroundColor: 'var(--purple-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--purple-200)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--purple-900)',
              marginBottom: '1rem'
            }}>
              Have Event Photos to Share?
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--purple-800)',
              marginBottom: '1.5rem'
            }}>
              Share your photos with the community. Contact the committee to submit your images.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: 'var(--purple-600)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--purple-700)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--purple-600)';
              }}
            >
              Contact Us →
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
