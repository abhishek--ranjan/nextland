"use client";

import { PageHeader, Card, Footer } from '@/components';
import { useEffect, useState } from 'react';

export default function AGMPage() {
  const [activeTab, setActiveTab] = useState('notices'); // notices, agenda, minutes
  const [notices, setNotices] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [minutes, setMinutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load AGM/GBM related data
    Promise.all([
      fetch('/api/notices?category=Governance').then(res => res.json()),
      // For now, creating placeholder data for agendas and minutes
      Promise.resolve([
        {
          id: 'AGD-20260120',
          title: '2026 Annual General Meeting Agenda',
          date: '2026-01-20',
          year: 2026,
          type: 'AGM',
          items: [
            'Confirmation of Minutes of previous AGM',
            'Adoption of Annual Report 2025',
            'Adoption of Audited Accounts 2025',
            'Election of Managing Committee 2026-2027',
            'Appointment of Auditors',
            'Any Other Business'
          ]
        }
      ]),
      Promise.resolve([
        {
          id: 'MIN-20250115',
          title: 'Minutes of AGM 2025',
          date: '2025-01-15',
          year: 2025,
          type: 'AGM',
          summary: 'Annual General Meeting held on 15th January 2025',
          approved: true
        }
      ])
    ])
      .then(([noticesData, agendasData, minutesData]) => {
        setNotices(noticesData);
        setAgendas(agendasData);
        setMinutes(minutesData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const tabButtonStyle = (isActive) => ({
    flex: '1',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: isActive ? 'white' : 'var(--slate-700)',
    backgroundColor: isActive ? 'var(--blue-600)' : 'white',
    border: '2px solid var(--blue-600)',
    borderRadius: '0',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none'
  });

  return (
    <>
      <PageHeader 
        title="Annual General Meetings (AGM) & General Body Meetings (GBM)"
        description="Important meetings that shape our society's direction and governance"
        breadcrumbs={[
          { label: 'Governance', href: '/governance' },
          { label: 'AGM & GBM' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '0',
            marginBottom: '3rem',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={() => setActiveTab('notices')}
              style={{
                ...tabButtonStyle(activeTab === 'notices'),
                borderTopLeftRadius: 'var(--radius-lg)',
                borderBottomLeftRadius: 'var(--radius-lg)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'notices') {
                  e.currentTarget.style.backgroundColor = 'var(--blue-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'notices') {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              📢 Meeting Notices
            </button>
            <button
              onClick={() => setActiveTab('agenda')}
              style={tabButtonStyle(activeTab === 'agenda')}
              onMouseEnter={(e) => {
                if (activeTab !== 'agenda') {
                  e.currentTarget.style.backgroundColor = 'var(--blue-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'agenda') {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              📋 Meeting Agenda
            </button>
            <button
              onClick={() => setActiveTab('minutes')}
              style={{
                ...tabButtonStyle(activeTab === 'minutes'),
                borderTopRightRadius: 'var(--radius-lg)',
                borderBottomRightRadius: 'var(--radius-lg)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'minutes') {
                  e.currentTarget.style.backgroundColor = 'var(--blue-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'minutes') {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              📝 Meeting Minutes
            </button>
          </div>

          {/* Tab Content: Notices */}
          {activeTab === 'notices' && (
            <div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '600',
                color: 'var(--slate-900)',
                marginBottom: '1.5rem'
              }}>
                AGM/GBM Notices
              </h2>
              {loading ? (
                <p style={{ color: 'var(--slate-500)' }}>Loading notices...</p>
              ) : notices.length === 0 ? (
                <div style={{
                  padding: '3rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--slate-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px dashed var(--slate-300)'
                }}>
                  <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)' }}>
                    No meeting notices available at this time.
                  </p>
                </div>
              ) : (
                <div className="row g-4">
                  {notices.map((notice) => (
                    <div className="col-md-6" key={notice.id}>
                      <Card
                        title={notice.title}
                        description={notice.description}
                        category={notice.category}
                        metadata={new Date(notice.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        link={`/notices/${notice.id}`}
                        linkText="Read Full Notice"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Agenda */}
          {activeTab === 'agenda' && (
            <div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '600',
                color: 'var(--slate-900)',
                marginBottom: '1.5rem'
              }}>
                Meeting Agendas
              </h2>
              {loading ? (
                <p style={{ color: 'var(--slate-500)' }}>Loading agendas...</p>
              ) : agendas.length === 0 ? (
                <div style={{
                  padding: '3rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--slate-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px dashed var(--slate-300)'
                }}>
                  <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)' }}>
                    No agendas available at this time.
                  </p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-4">
                  {agendas.map((agenda) => (
                    <div
                      key={agenda.id}
                      style={{
                        padding: '2rem',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--slate-200)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: 'var(--slate-900)',
                            marginBottom: '0.5rem'
                          }}>
                            {agenda.title}
                          </h3>
                          <p style={{
                            fontSize: '0.9375rem',
                            color: 'var(--slate-600)',
                            margin: '0'
                          }}>
                            {new Date(agenda.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <span style={{
                          padding: '0.375rem 1rem',
                          fontSize: '0.8125rem',
                          fontWeight: '600',
                          backgroundColor: 'var(--blue-100)',
                          color: 'var(--blue-700)',
                          borderRadius: 'var(--radius-full)',
                          textTransform: 'uppercase'
                        }}>
                          {agenda.type}
                        </span>
                      </div>
                      <div style={{
                        padding: '1.5rem',
                        backgroundColor: 'var(--slate-50)',
                        borderRadius: 'var(--radius-md)',
                        marginTop: '1rem'
                      }}>
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: 'var(--slate-900)',
                          marginBottom: '1rem'
                        }}>
                          Agenda Items:
                        </h4>
                        <ol style={{
                          margin: '0',
                          paddingLeft: '1.5rem',
                          color: 'var(--slate-700)'
                        }}>
                          {agenda.items.map((item, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem' }}>
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Minutes */}
          {activeTab === 'minutes' && (
            <div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '600',
                color: 'var(--slate-900)',
                marginBottom: '1.5rem'
              }}>
                Meeting Minutes
              </h2>
              {loading ? (
                <p style={{ color: 'var(--slate-500)' }}>Loading minutes...</p>
              ) : minutes.length === 0 ? (
                <div style={{
                  padding: '3rem',
                  textAlign: 'center',
                  backgroundColor: 'var(--slate-50)',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px dashed var(--slate-300)'
                }}>
                  <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)' }}>
                    No meeting minutes available at this time.
                  </p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {minutes.map((minute) => (
                    <div
                      key={minute.id}
                      style={{
                        padding: '1.5rem',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--slate-200)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: 'var(--slate-900)',
                          marginBottom: '0.375rem'
                        }}>
                          {minute.title}
                        </h3>
                        <p style={{
                          fontSize: '0.9375rem',
                          color: 'var(--slate-600)',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {minute.summary}
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <span style={{
                            fontSize: '0.875rem',
                            color: 'var(--slate-500)'
                          }}>
                            Date: {new Date(minute.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          {minute.approved && (
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              backgroundColor: 'var(--green-100)',
                              color: 'var(--green-700)',
                              borderRadius: 'var(--radius-full)',
                              textTransform: 'uppercase'
                            }}>
                              ✓ Approved
                            </span>
                          )}
                        </div>
                      </div>
                      <a
                        href={`#`}
                        style={{
                          padding: '0.75rem 1.5rem',
                          fontSize: '0.9375rem',
                          fontWeight: '500',
                          color: 'white',
                          backgroundColor: 'var(--blue-600)',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--blue-700)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--blue-600)';
                        }}
                      >
                        View Details →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
