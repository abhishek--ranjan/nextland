"use client";

import { PageHeader, Footer } from '@/components';
import { useEffect, useState } from 'react';

export default function MinutesPage() {
  const [minutes, setMinutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    // Load minutes data (placeholder for now)
    const demoMinutes = [
      {
        id: 'MIN-20260115',
        title: 'Annual General Meeting Minutes',
        date: '2026-01-15',
        type: 'AGM',
        year: 2026,
        attendees: 125,
        resolutions: 6,
        approved: true,
        approvedDate: '2026-02-01'
      },
      {
        id: 'MIN-20250720',
        title: 'Special General Body Meeting Minutes',
        date: '2025-07-20',
        type: 'GBM',
        year: 2025,
        attendees: 98,
        resolutions: 4,
        approved: true,
        approvedDate: '2025-08-05'
      },
      {
        id: 'MIN-20250115',
        title: 'Annual General Meeting Minutes',
        date: '2025-01-15',
        type: 'AGM',
        year: 2025,
        attendees: 142,
        resolutions: 8,
        approved: true,
        approvedDate: '2025-02-01'
      },
      {
        id: 'MIN-20240920',
        title: 'Extraordinary General Meeting Minutes',
        date: '2024-09-20',
        type: 'EGM',
        year: 2024,
        attendees: 87,
        resolutions: 3,
        approved: true,
        approvedDate: '2024-10-05'
      }
    ];

    setMinutes(demoMinutes);
    setLoading(false);
  }, []);

  const years = ['all', ...new Set(minutes.map(m => m.year))].sort((a, b) => {
    if (a === 'all') return -1;
    if (b === 'all') return 1;
    return b - a;
  });

  const filteredMinutes = selectedYear === 'all' 
    ? minutes 
    : minutes.filter(m => m.year === parseInt(selectedYear));

  const getMeetingTypeBadge = (type) => {
    const styles = {
      'AGM': { bg: '#DBEAFE', color: '#1E40AF' },
      'GBM': { bg: '#D1FAE5', color: '#065F46' },
      'EGM': { bg: '#FEF3C7', color: '#92400E' }
    };
    return styles[type] || { bg: '#F3F4F6', color: '#374151' };
  };

  return (
    <>
      <PageHeader 
        title="Meeting Minutes"
        description="Official records of all general body meetings, resolutions, and decisions"
        breadcrumbs={[
          { label: 'Governance', href: '/governance' },
          { label: 'Minutes' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Filter Bar */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            marginBottom: '3rem'
          }}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--slate-900)',
                  margin: '0'
                }}>
                  📚 All Meeting Minutes
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--slate-600)',
                  margin: '0.25rem 0 0 0'
                }}>
                  {filteredMinutes.length} {filteredMinutes.length === 1 ? 'record' : 'records'} found
                </p>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2">
                  <label style={{
                    fontSize: '0.9375rem',
                    fontWeight: '500',
                    color: 'var(--slate-700)',
                    whiteSpace: 'nowrap'
                  }}>
                    Filter by Year:
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{
                      flex: '1',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9375rem',
                      color: 'var(--slate-900)',
                      backgroundColor: 'white',
                      border: '1px solid var(--slate-300)',
                      borderRadius: 'var(--radius-md)',
                      outline: 'none'
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
            </div>
          </div>

          {/* Minutes Table */}
          {loading ? (
            <p style={{ color: 'var(--slate-500)', textAlign: 'center' }}>Loading minutes...</p>
          ) : filteredMinutes.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              backgroundColor: 'var(--slate-50)',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--slate-300)'
            }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)' }}>
                No meeting minutes found for the selected year.
              </p>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{
                      backgroundColor: 'var(--slate-100)',
                      borderBottom: '2px solid var(--slate-200)'
                    }}>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Meeting Details
                      </th>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Type
                      </th>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Attendees
                      </th>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Resolutions
                      </th>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Status
                      </th>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'right',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMinutes.map((minute, index) => {
                      const badgeStyle = getMeetingTypeBadge(minute.type);
                      return (
                        <tr
                          key={minute.id}
                          style={{
                            borderBottom: index < filteredMinutes.length - 1 ? '1px solid var(--slate-200)' : 'none',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--slate-50)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                          }}
                        >
                          <td style={{ padding: '1.25rem 1.5rem' }}>
                            <div>
                              <div style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: 'var(--slate-900)',
                                marginBottom: '0.25rem'
                              }}>
                                {minute.title}
                              </div>
                              <div style={{
                                fontSize: '0.875rem',
                                color: 'var(--slate-500)'
                              }}>
                                {new Date(minute.date).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '0.375rem 0.875rem',
                              fontSize: '0.8125rem',
                              fontWeight: '600',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: badgeStyle.bg,
                              color: badgeStyle.color,
                              textTransform: 'uppercase'
                            }}>
                              {minute.type}
                            </span>
                          </td>
                          <td style={{
                            padding: '1.25rem 1.5rem',
                            textAlign: 'center',
                            fontSize: '0.9375rem',
                            fontWeight: '500',
                            color: 'var(--slate-700)'
                          }}>
                            {minute.attendees}
                          </td>
                          <td style={{
                            padding: '1.25rem 1.5rem',
                            textAlign: 'center',
                            fontSize: '0.9375rem',
                            fontWeight: '500',
                            color: 'var(--slate-700)'
                          }}>
                            {minute.resolutions}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                            {minute.approved ? (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.375rem 0.875rem',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: 'var(--green-100)',
                                color: 'var(--green-700)'
                              }}>
                                ✓ Approved
                              </span>
                            ) : (
                              <span style={{
                                display: 'inline-block',
                                padding: '0.375rem 0.875rem',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: 'var(--yellow-100)',
                                color: 'var(--yellow-700)'
                              }}>
                                Pending
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                            <a
                              href={`#`}
                              style={{
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: 'var(--blue-600)',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--blue-700)';
                                e.currentTarget.style.textDecoration = 'underline';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--blue-600)';
                                e.currentTarget.style.textDecoration = 'none';
                              }}
                            >
                              View Details →
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
