"use client";

import { useState, useEffect } from 'react';
import { PageHeader, Footer } from '@/components';
import { getImagePath } from '@/utils';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Community Event', 'Festival', 'Sports', 'Workshop', 'Meeting'];

  useEffect(() => {
    fetchEvents();
  }, [activeTab, selectedCategory]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: activeTab });
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      const response = await fetch(`/api/events?${params}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
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
        title="Events & Celebrations"
        description="Community events, festivals, and social gatherings"
        breadcrumbs={[
          { label: 'Events & Celebrations' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '2px solid var(--slate-200)'
          }}>
            <button
              onClick={() => setActiveTab('upcoming')}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: activeTab === 'upcoming' ? 'var(--blue-600)' : 'var(--slate-600)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'upcoming' ? '3px solid var(--blue-600)' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '-2px'
              }}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: activeTab === 'past' ? 'var(--blue-600)' : 'var(--slate-600)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'past' ? '3px solid var(--blue-600)' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '-2px'
              }}
            >
              Past Events
            </button>
          </div>

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '2rem'
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

          {/* Events Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: 'var(--slate-600)' }}>Loading events...</p>
            </div>
          ) : events.length === 0 ? (
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
                No {activeTab} events found{selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {events.map(event => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <a
                    href={`/events/${event.id}`}
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
                        e.currentTarget.style.borderColor = 'var(--blue-400)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--slate-200)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Event Image */}
                      <div style={{
                        width: '100%',
                        height: '200px',
                        backgroundColor: 'var(--slate-100)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={getImagePath(event.image || '/images/events/default.jpg')}
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
                          top: '1rem',
                          right: '1rem',
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: getCategoryColor(event.category),
                          color: getCategoryTextColor(event.category),
                          borderRadius: 'var(--radius-full)'
                        }}>
                          {event.category}
                        </div>
                      </div>

                      {/* Event Content */}
                      <div style={{
                        padding: '1.5rem',
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {/* Date */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.75rem'
                        }}>
                          <span style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: 'var(--blue-600)'
                          }}>
                            📅 {formatDate(event.date)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: 'var(--slate-900)',
                          marginBottom: '0.75rem',
                          lineHeight: '1.4'
                        }}>
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--slate-600)',
                          lineHeight: '1.6',
                          marginBottom: '1rem',
                          flex: '1'
                        }}>
                          {event.description}
                        </p>

                        {/* Location */}
                        {event.location && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            color: 'var(--slate-500)',
                            marginTop: 'auto'
                          }}>
                            📍 {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Event Submission CTA */}
          {activeTab === 'upcoming' && (
            <div style={{
              marginTop: '4rem',
              padding: '2rem',
              backgroundColor: 'var(--blue-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--blue-200)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--blue-900)',
                marginBottom: '1rem'
              }}>
                Have an Event Idea?
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--blue-800)',
                marginBottom: '1.5rem'
              }}>
                Submit your event proposal to the committee for consideration.
              </p>
              <a
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '0.875rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: 'var(--blue-600)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--blue-700)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--blue-600)';
                }}
              >
                Contact Committee →
              </a>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
