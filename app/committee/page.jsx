"use client";

import { PageHeader, Footer } from '@/components';
import { useEffect, useState } from 'react';

export default function CommitteePage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/committee')
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getDesignationColor = (designation) => {
    const colors = {
      'President': { bg: '#DBEAFE', border: '#2563EB', text: '#1E40AF' },
      'Vice President': { bg: '#E0E7FF', border: '#6366F1', text: '#4338CA' },
      'Secretary': { bg: '#D1FAE5', border: '#10B981', text: '#065F46' },
      'Joint Secretary': { bg: '#D1FAE5', border: '#10B981', text: '#065F46' },
      'Treasurer': { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E' },
      'Member': { bg: '#F3F4F6', border: '#6B7280', text: '#374151' }
    };
    return colors[designation] || colors['Member'];
  };

  return (
    <>
      <PageHeader 
        title="Management Committee"
        description="Elected representatives working for the betterment of our society"
        breadcrumbs={[
          { label: 'Committee', href: '/committee' },
          { label: 'Management Committee' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Introduction */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--blue-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--blue-200)',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--blue-900)',
              marginBottom: '1rem'
            }}>
              👥 Current Management Committee (2024-2026)
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--blue-800)',
              margin: '0',
              lineHeight: '1.6'
            }}>
              The Management Committee is elected by the general body and is responsible for the 
              day-to-day administration of the society. Members serve a two-year term and work 
              towards ensuring smooth operations and resident welfare.
            </p>
          </div>

          {/* Committee Members Grid */}
          {loading ? (
            <p style={{ color: 'var(--slate-500)', textAlign: 'center' }}>Loading committee members...</p>
          ) : members.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              backgroundColor: 'var(--slate-50)',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--slate-300)'
            }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)' }}>
                No committee members available at this time.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {members.map((member) => {
                const colors = getDesignationColor(member.designation);
                return (
                  <div className="col-lg-4 col-md-6" key={member.id}>
                    <div style={{
                      height: '100%',
                      padding: '2rem',
                      backgroundColor: 'white',
                      borderRadius: 'var(--radius-lg)',
                      border: `2px solid ${colors.border}`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                      }}
                    >
                      {/* Designation Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: colors.bg,
                        borderBottomLeftRadius: 'var(--radius-lg)',
                        borderTopRightRadius: 'var(--radius-lg)'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          color: colors.text,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {member.designation}
                        </span>
                      </div>

                      {/* Avatar Placeholder */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: colors.bg,
                        border: `3px solid ${colors.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: '600',
                        color: colors.text,
                        marginBottom: '1.5rem',
                        marginTop: '1rem'
                      }}>
                        {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>

                      {/* Member Details */}
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--slate-900)',
                        marginBottom: '0.5rem'
                      }}>
                        {member.name}
                      </h3>

                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--slate-500)',
                        marginBottom: '1rem'
                      }}>
                        Term: {member.term}
                      </p>

                      <div style={{
                        padding: '1rem',
                        backgroundColor: 'var(--slate-50)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem'
                      }}>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--slate-700)',
                          margin: '0',
                          lineHeight: '1.5'
                        }}>
                          {member.responsibilities}
                        </p>
                      </div>

                      {/* Contact Information */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}>
                        {member.flat && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            color: 'var(--slate-600)'
                          }}>
                            <span>🏠</span>
                            <span>Flat {member.flat}</span>
                          </div>
                        )}
                        {member.phone && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            color: 'var(--slate-600)'
                          }}>
                            <span>📞</span>
                            <a href={`tel:${member.phone}`} style={{
                              color: 'var(--blue-600)',
                              textDecoration: 'none'
                            }}>
                              {member.phone}
                            </a>
                          </div>
                        )}
                        {member.email && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            color: 'var(--slate-600)',
                            wordBreak: 'break-word'
                          }}>
                            <span>✉️</span>
                            <a href={`mailto:${member.email}`} style={{
                              color: 'var(--blue-600)',
                              textDecoration: 'none'
                            }}>
                              {member.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Additional Information */}
          <div style={{
            marginTop: '4rem',
            padding: '2rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--slate-900)',
              marginBottom: '1rem'
            }}>
              📋 Committee Guidelines
            </h3>
            <ul style={{
              fontSize: '0.9375rem',
              color: 'var(--slate-700)',
              lineHeight: '1.8',
              margin: '0',
              paddingLeft: '1.5rem'
            }}>
              <li>Committee meetings are held on the first Saturday of every month</li>
              <li>Members are available for resident queries during office hours (10 AM - 12 PM on weekdays)</li>
              <li>For urgent matters, please contact the President or Secretary</li>
              <li>Election for the next committee will be held in December 2025</li>
              <li>All committee decisions are documented and available in meeting minutes</li>
            </ul>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
