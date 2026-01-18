"use client";

import { PageHeader, Footer } from '@/components';
import { useEffect, useState } from 'react';

export default function FinancialPage() {
  const [openYear, setOpenYear] = useState(null);
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load financial data (placeholder for now)
    const demoData = [
      {
        year: 2026,
        budget: {
          total: '₹85,00,000',
          maintenance: '₹42,50,000',
          repairs: '₹18,00,000',
          utilities: '₹12,00,000',
          security: '₹8,50,000',
          admin: '₹4,00,000'
        },
        audit: {
          status: 'In Progress',
          auditor: 'M/s. Sharma & Associates',
          expectedDate: 'March 2026'
        },
        reports: [
          { name: 'Q1 Financial Statement (Jan-Mar 2026)', status: 'Upcoming', url: '#' }
        ]
      },
      {
        year: 2025,
        budget: {
          total: '₹78,50,000',
          maintenance: '₹39,25,000',
          repairs: '₹16,50,000',
          utilities: '₹11,00,000',
          security: '₹7,75,000',
          admin: '₹4,00,000'
        },
        audit: {
          status: 'Completed',
          auditor: 'M/s. Sharma & Associates',
          completedDate: 'February 2025',
          findings: 'Clean audit report with no major observations'
        },
        reports: [
          { name: 'Annual Financial Statement 2025', status: 'Available', url: '#' },
          { name: 'Q4 Financial Statement (Oct-Dec 2025)', status: 'Available', url: '#' },
          { name: 'Q3 Financial Statement (Jul-Sep 2025)', status: 'Available', url: '#' },
          { name: 'Audit Report 2025', status: 'Available', url: '#' }
        ]
      },
      {
        year: 2024,
        budget: {
          total: '₹72,00,000',
          maintenance: '₹36,00,000',
          repairs: '₹15,00,000',
          utilities: '₹10,00,000',
          security: '₹7,00,000',
          admin: '₹4,00,000'
        },
        audit: {
          status: 'Completed',
          auditor: 'M/s. Sharma & Associates',
          completedDate: 'February 2024',
          findings: 'Clean audit report'
        },
        reports: [
          { name: 'Annual Financial Statement 2024', status: 'Available', url: '#' },
          { name: 'Audit Report 2024', status: 'Available', url: '#' }
        ]
      }
    ];

    setFinancialData(demoData);
    setLoading(false);
    // Auto-expand current year
    setOpenYear(2026);
  }, []);

  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  return (
    <>
      <PageHeader 
        title="Financial Information"
        description="Budgets, audits, and financial reports ensuring transparency and accountability"
        breadcrumbs={[
          { label: 'Governance', href: '/governance' },
          { label: 'Financial' }
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
              💼 Financial Transparency
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--blue-800)',
              margin: '0',
              lineHeight: '1.6'
            }}>
              We believe in complete financial transparency. All budgets, expenses, and audit reports are 
              available to society members. Our accounts are independently audited annually to ensure 
              proper financial management.
            </p>
          </div>

          {/* Year-wise Accordion */}
          {loading ? (
            <p style={{ color: 'var(--slate-500)', textAlign: 'center' }}>Loading financial data...</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {financialData.map((yearData) => (
                <div
                  key={yearData.year}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--slate-200)',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleYear(yearData.year)}
                    style={{
                      width: '100%',
                      padding: '1.5rem 2rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: openYear === yearData.year ? 'var(--slate-50)' : 'white',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (openYear !== yearData.year) {
                        e.currentTarget.style.backgroundColor = 'var(--slate-50)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (openYear !== yearData.year) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'var(--slate-900)',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Financial Year {yearData.year}
                      </h3>
                      <p style={{
                        fontSize: '0.9375rem',
                        color: 'var(--slate-600)',
                        margin: '0'
                      }}>
                        Total Budget: {yearData.budget.total} • Audit: {yearData.audit.status}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '1.5rem',
                      color: 'var(--slate-600)',
                      transform: openYear === yearData.year ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }}>
                      ▼
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {openYear === yearData.year && (
                    <div style={{
                      padding: '2rem',
                      borderTop: '2px solid var(--slate-200)',
                      backgroundColor: 'white'
                    }}>
                      <div className="row g-4 mb-4">
                        
                        {/* Budget Breakdown */}
                        <div className="col-md-6">
                          <div style={{
                            padding: '1.5rem',
                            backgroundColor: 'var(--slate-50)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--slate-200)'
                          }}>
                            <h4 style={{
                              fontSize: '1.125rem',
                              fontWeight: '600',
                              color: 'var(--slate-900)',
                              marginBottom: '1.25rem'
                            }}>
                              📊 Budget Breakdown
                            </h4>
                            <div className="d-flex flex-column gap-3">
                              {Object.entries(yearData.budget).filter(([key]) => key !== 'total').map(([category, amount]) => (
                                <div key={category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{
                                    fontSize: '0.9375rem',
                                    color: 'var(--slate-700)',
                                    textTransform: 'capitalize'
                                  }}>
                                    {category}
                                  </span>
                                  <span style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: 'var(--slate-900)'
                                  }}>
                                    {amount}
                                  </span>
                                </div>
                              ))}
                              <div style={{
                                marginTop: '0.5rem',
                                paddingTop: '1rem',
                                borderTop: '2px solid var(--slate-300)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span style={{
                                  fontSize: '1rem',
                                  fontWeight: '600',
                                  color: 'var(--slate-900)'
                                }}>
                                  Total Budget
                                </span>
                                <span style={{
                                  fontSize: '1.25rem',
                                  fontWeight: '700',
                                  color: 'var(--blue-600)'
                                }}>
                                  {yearData.budget.total}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Audit Information */}
                        <div className="col-md-6">
                          <div style={{
                            padding: '1.5rem',
                            backgroundColor: yearData.audit.status === 'Completed' ? 'var(--green-50)' : 'var(--yellow-50)',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${yearData.audit.status === 'Completed' ? 'var(--green-200)' : 'var(--yellow-200)'}`
                          }}>
                            <h4 style={{
                              fontSize: '1.125rem',
                              fontWeight: '600',
                              color: 'var(--slate-900)',
                              marginBottom: '1.25rem'
                            }}>
                              🔍 Audit Status
                            </h4>
                            <div className="d-flex flex-column gap-2">
                              <div>
                                <span style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--slate-600)',
                                  display: 'block',
                                  marginBottom: '0.25rem'
                                }}>
                                  Status
                                </span>
                                <span style={{
                                  display: 'inline-block',
                                  padding: '0.375rem 1rem',
                                  fontSize: '0.875rem',
                                  fontWeight: '600',
                                  backgroundColor: yearData.audit.status === 'Completed' ? 'var(--green-100)' : 'var(--yellow-100)',
                                  color: yearData.audit.status === 'Completed' ? 'var(--green-700)' : 'var(--yellow-700)',
                                  borderRadius: 'var(--radius-full)'
                                }}>
                                  {yearData.audit.status}
                                </span>
                              </div>
                              <div>
                                <span style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--slate-600)',
                                  display: 'block',
                                  marginBottom: '0.25rem'
                                }}>
                                  Auditor
                                </span>
                                <span style={{
                                  fontSize: '0.9375rem',
                                  fontWeight: '500',
                                  color: 'var(--slate-900)'
                                }}>
                                  {yearData.audit.auditor}
                                </span>
                              </div>
                              <div>
                                <span style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--slate-600)',
                                  display: 'block',
                                  marginBottom: '0.25rem'
                                }}>
                                  {yearData.audit.status === 'Completed' ? 'Completed' : 'Expected'}
                                </span>
                                <span style={{
                                  fontSize: '0.9375rem',
                                  fontWeight: '500',
                                  color: 'var(--slate-900)'
                                }}>
                                  {yearData.audit.completedDate || yearData.audit.expectedDate}
                                </span>
                              </div>
                              {yearData.audit.findings && (
                                <div style={{
                                  marginTop: '0.5rem',
                                  padding: '1rem',
                                  backgroundColor: 'white',
                                  borderRadius: 'var(--radius-md)',
                                  border: '1px solid var(--green-200)'
                                }}>
                                  <span style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--slate-600)',
                                    display: 'block',
                                    marginBottom: '0.25rem'
                                  }}>
                                    Findings
                                  </span>
                                  <span style={{
                                    fontSize: '0.9375rem',
                                    color: 'var(--slate-900)'
                                  }}>
                                    {yearData.audit.findings}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Financial Reports */}
                      <div style={{
                        padding: '1.5rem',
                        backgroundColor: 'var(--slate-50)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--slate-200)'
                      }}>
                        <h4 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: 'var(--slate-900)',
                          marginBottom: '1rem'
                        }}>
                          📄 Financial Reports & Documents
                        </h4>
                        <div className="d-flex flex-column gap-2">
                          {yearData.reports.map((report, index) => (
                            <a
                              key={index}
                              href={report.url}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem 1.25rem',
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--slate-200)',
                                textDecoration: 'none',
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
                              <div style={{ flex: 1 }}>
                                <span style={{
                                  fontSize: '0.9375rem',
                                  fontWeight: '500',
                                  color: 'var(--slate-900)',
                                  display: 'block'
                                }}>
                                  {report.name}
                                </span>
                              </div>
                              <span style={{
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                backgroundColor: report.status === 'Available' ? 'var(--green-100)' : 'var(--slate-200)',
                                color: report.status === 'Available' ? 'var(--green-700)' : 'var(--slate-600)',
                                borderRadius: 'var(--radius-full)',
                                textTransform: 'uppercase',
                                marginRight: '1rem'
                              }}>
                                {report.status}
                              </span>
                              {report.status === 'Available' && (
                                <span style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--blue-600)',
                                  fontWeight: '500'
                                }}>
                                  Download →
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
