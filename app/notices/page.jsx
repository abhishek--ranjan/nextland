"use client";

import { PageHeader, Card, Footer } from '@/components';
import { useEffect, useState } from 'react';

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setFilteredNotices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = notices;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(n => n.category === selectedCategory);
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(n => n.date.startsWith(selectedYear));
    }

    setFilteredNotices(filtered);
  }, [selectedCategory, selectedYear, notices]);

  const categories = ['all', ...new Set(notices.map(n => n.category))];
  const years = ['all', ...new Set(notices.map(n => n.date.substring(0, 4)))];

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'Utility': { bg: '#FEF3C7', color: '#92400E' },
      'Governance': { bg: '#DBEAFE', color: '#1E40AF' },
      'Maintenance': { bg: '#FCE7F3', color: '#831843' },
      'Community Event': { bg: '#D1FAE5', color: '#065F46' },
      'Security': { bg: '#FEE2E2', color: '#991B1B' }
    };
    return colors[category] || { bg: '#F3F4F6', color: '#374151' };
  };

  return (
    <>
      <PageHeader 
        title="Notices & Circulars"
        description="Official communications from the Management Committee"
        breadcrumbs={[
          { label: 'Governance', href: '/governance' },
          { label: 'Notices & Circulars' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          
          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--slate-700)',
                marginBottom: '0.5rem'
              }}>
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9375rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-300)',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--slate-700)',
                marginBottom: '0.5rem'
              }}>
                Filter by Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '0.9375rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-300)',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-4">
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--slate-600)'
            }}>
              Showing {filteredNotices.length} {filteredNotices.length === 1 ? 'notice' : 'notices'}
            </p>
          </div>

          {/* Notices Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: 'var(--slate-500)' }}>Loading notices...</p>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              backgroundColor: 'var(--slate-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)'
            }}>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--slate-600)',
                marginBottom: '0'
              }}>
                No notices found matching your filters.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredNotices.map(notice => {
                const noticeDate = new Date(notice.date);
                const formattedDate = noticeDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                const badgeStyle = getCategoryBadgeColor(notice.category);

                return (
                  <div key={notice.id} className="col-md-6">
                    <div style={{
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--slate-200)',
                      boxShadow: 'var(--shadow-sm)',
                      backgroundColor: 'white',
                      padding: '1.75rem',
                      height: '100%',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      {/* Category + Date */}
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.color,
                          textTransform: 'uppercase',
                          letterSpacing: '0.025em'
                        }}>
                          {notice.category}
                        </span>
                        <small style={{
                          color: 'var(--slate-500)',
                          fontSize: '0.8125rem'
                        }}>
                          {formattedDate}
                        </small>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: 'var(--slate-900)',
                        lineHeight: '1.4',
                        marginBottom: '0.75rem'
                      }}>
                        {notice.title}
                      </h3>

                      {/* Issued By */}
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--slate-600)',
                        marginBottom: '1rem'
                      }}>
                        Issued by: {notice.issuedBy}
                      </p>

                      {/* Brief Description */}
                      <p style={{
                        fontSize: '0.9375rem',
                        lineHeight: '1.7',
                        color: 'var(--slate-600)',
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {notice.details}
                      </p>

                      {/* Action */}
                      <a
                        href={`/notices/${notice.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: 'var(--slate-700)',
                          backgroundColor: 'white',
                          border: '1px solid var(--slate-300)',
                          borderRadius: 'var(--radius-md)',
                          textDecoration: 'none',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--slate-50)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        Read full notice →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
