"use client";

import { useState, useEffect } from 'react';
import { PageHeader, Footer } from '@/components';
import { getImagePath } from '@/utils';
import { use } from 'react';

export default function EventDetailPage({ params }) {
  const { id } = use(params);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events`);
      const events = await response.json();
      const foundEvent = events.find(e => e.id === id);
      setEvent(foundEvent);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return null;
    return timeString;
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

  const isPastEvent = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  };

  if (loading) {
    return (
      <>
        <PageHeader 
          title="Loading..."
          breadcrumbs={[
            { label: 'Events', href: '/events' },
            { label: 'Loading...' }
          ]}
        />
        <section style={{ padding: '4rem 0', backgroundColor: 'white', minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
            <p style={{ color: 'var(--slate-600)' }}>Loading event details...</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <PageHeader 
          title="Event Not Found"
          breadcrumbs={[
            { label: 'Events', href: '/events' },
            { label: 'Not Found' }
          ]}
        />
        <section style={{ padding: '4rem 0', backgroundColor: 'white', minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--slate-900)', marginBottom: '1rem' }}>Event Not Found</h2>
            <p style={{ color: 'var(--slate-600)', marginBottom: '2rem' }}>
              The event you're looking for doesn't exist.
            </p>
            <a
              href="/events"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: 'var(--blue-600)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none'
              }}
            >
              ← Back to Events
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
        title={event.title}
        description={formatDate(event.date)}
        breadcrumbs={[
          { label: 'Events', href: '/events' },
          { label: event.title }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Hero Image */}
          <div style={{
            width: '100%',
            height: '400px',
            backgroundColor: 'var(--slate-100)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '3rem',
            position: 'relative'
          }}>
            <img
              src={getImagePath(event.image || event.imagePath || 'events/default.jpg', 'prod')}
              alt={event.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {/* Category Badge */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: getCategoryColor(event.category),
              color: getCategoryTextColor(event.category),
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              {event.category}
            </div>
          </div>

          {/* Event Details Box */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            marginBottom: '3rem'
          }}>
            <div className="row g-4">
              {/* Date */}
              <div className="col-md-4">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'var(--blue-100)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    📅
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--slate-600)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.25rem'
                    }}>
                      Date
                    </div>
                    <div style={{
                      fontSize: '0.9375rem',
                      fontWeight: '600',
                      color: 'var(--slate-900)'
                    }}>
                      {formatDate(event.date)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Time */}
              {event.time && (
                <div className="col-md-4">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'var(--purple-100)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      ⏰
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--slate-600)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.25rem'
                      }}>
                        Time
                      </div>
                      <div style={{
                        fontSize: '0.9375rem',
                        fontWeight: '600',
                        color: 'var(--slate-900)'
                      }}>
                        {formatTime(event.time)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              {event.location && (
                <div className="col-md-4">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'var(--green-100)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      📍
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--slate-600)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.25rem'
                      }}>
                        Location
                      </div>
                      <div style={{
                        fontSize: '0.9375rem',
                        fontWeight: '600',
                        color: 'var(--slate-900)'
                      }}>
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div style={{
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--slate-900)',
              marginBottom: '1rem'
            }}>
              About This Event
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--slate-700)',
              lineHeight: '1.8'
            }}>
              {event.description}
            </p>
          </div>

          {/* Additional Details */}
          {event.details && (
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--blue-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--blue-200)',
              marginBottom: '3rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--blue-900)',
                marginBottom: '1rem'
              }}>
                Event Details
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                color: 'var(--blue-800)',
                lineHeight: '1.7',
                margin: '0',
                whiteSpace: 'pre-line'
              }}>
                {event.details}
              </p>
            </div>
          )}

          {/* Past Event Gallery CTA */}
          {isPastEvent(event.date) && (
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--purple-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--purple-200)',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--purple-900)',
                marginBottom: '1rem'
              }}>
                📸 Event Memories
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--purple-800)',
                marginBottom: '1.5rem'
              }}>
                Check out photos and highlights from this event in our gallery.
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
                View Photo Gallery →
              </a>
            </div>
          )}

          {/* Back to Events */}
          <div style={{ textAlign: 'center' }}>
            <a
              href="/events"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'var(--blue-600)',
                backgroundColor: 'white',
                border: '2px solid var(--blue-600)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.backgroundColor = 'var(--blue-600)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--blue-600)';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              ← Back to All Events
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
