"use client";

import { PageHeader, Footer } from '@/components';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function NoticeDetailPage() {
  const params = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/notices`)
        .then(res => res.json())
        .then(data => {
          const foundNotice = data.find(n => n.id === params.id);
          setNotice(foundNotice);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <PageHeader 
          title="Loading..."
          description="Please wait"
          breadcrumbs={[
            { label: 'Governance', href: '/governance' },
            { label: 'Notices', href: '/notices' },
            { label: 'Loading...' }
          ]}
        />
        <section style={{ padding: '4rem 0', backgroundColor: 'white', minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
            <p style={{ color: 'var(--slate-500)' }}>Loading notice...</p>
          </div>
        </section>
      </>
    );
  }

  if (!notice) {
    return (
      <>
        <PageHeader 
          title="Notice Not Found"
          description="The requested notice could not be found"
          breadcrumbs={[
            { label: 'Governance', href: '/governance' },
            { label: 'Notices', href: '/notices' },
            { label: 'Not Found' }
          ]}
        />
        <section style={{ padding: '4rem 0', backgroundColor: 'white', minHeight: '50vh' }}>
          <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)', marginBottom: '2rem' }}>
              The notice you're looking for doesn't exist or has been removed.
            </p>
            <a 
              href="/notices"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: 'var(--blue-600)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none'
              }}
            >
              ← Back to Notices
            </a>
          </div>
        </section>
      </>
    );
  }

  const noticeDate = new Date(notice.date);
  const formattedDate = noticeDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

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

  const badgeStyle = getCategoryBadgeColor(notice.category);

  return (
    <>
      <PageHeader 
        title={notice.title}
        description={`${notice.category} | Issued on: ${formattedDate}`}
        breadcrumbs={[
          { label: 'Governance', href: '/governance' },
          { label: 'Notices', href: '/notices' },
          { label: 'View Notice' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Notice Header */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            marginBottom: '2rem'
          }}>
            <div className="d-flex align-items-center gap-3 flex-wrap mb-3">
              <span style={{
                display: 'inline-block',
                padding: '0.375rem 1rem',
                fontSize: '0.8125rem',
                fontWeight: '600',
                borderRadius: 'var(--radius-full)',
                backgroundColor: badgeStyle.bg,
                color: badgeStyle.color,
                textTransform: 'uppercase',
                letterSpacing: '0.025em'
              }}>
                {notice.category}
              </span>
              <span style={{
                fontSize: '0.9375rem',
                color: 'var(--slate-600)'
              }}>
                Issued on: {formattedDate}
              </span>
            </div>
            <div style={{
              fontSize: '0.9375rem',
              color: 'var(--slate-600)'
            }}>
              <strong>Issued by:</strong> {notice.issuedBy}
            </div>
          </div>

          {/* Notice Content */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--slate-900)',
              marginBottom: '1.5rem'
            }}>
              Notice Content
            </h2>
            <div style={{
              fontSize: '1.0625rem',
              lineHeight: '1.8',
              color: 'var(--slate-700)',
              whiteSpace: 'pre-wrap'
            }}>
              {notice.details}
            </div>
          </div>

          {/* Attachments (if any) */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--slate-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--slate-900)',
                marginBottom: '1rem'
              }}>
                Attachments
              </h3>
              <div className="d-flex flex-column gap-2">
                {notice.attachments.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      backgroundColor: 'white',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--slate-200)',
                      textDecoration: 'none',
                      color: 'var(--slate-900)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--blue-50)';
                      e.currentTarget.style.borderColor = 'var(--blue-300)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = 'var(--slate-200)';
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>📄</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.9375rem',
                        fontWeight: '500',
                        color: 'var(--slate-900)'
                      }}>
                        {file.name}
                      </div>
                      {file.size && (
                        <div style={{
                          fontSize: '0.8125rem',
                          color: 'var(--slate-500)'
                        }}>
                          {file.size}
                        </div>
                      )}
                    </div>
                    <span style={{
                      fontSize: '0.875rem',
                      color: 'var(--blue-600)',
                      fontWeight: '500'
                    }}>
                      Download →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div style={{ textAlign: 'center' }}>
            <a
              href="/notices"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'var(--slate-700)',
                backgroundColor: 'white',
                border: '2px solid var(--slate-300)',
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
              ← Back to Notices
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
