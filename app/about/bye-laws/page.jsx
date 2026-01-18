"use client";

import { PageHeader, Footer } from '@/components';
import { useState } from 'react';

export default function ByeLawsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const byeLaws = [
    {
      id: 'membership',
      title: 'Membership Rules',
      category: 'General',
      sections: [
        { number: '1.1', title: 'Eligibility for Membership', summary: 'Criteria for becoming a society member' },
        { number: '1.2', title: 'Rights of Members', summary: 'Voting rights, access to facilities, participation in meetings' },
        { number: '1.3', title: 'Obligations of Members', summary: 'Payment of dues, maintenance of property, compliance with rules' },
        { number: '1.4', title: 'Transfer of Membership', summary: 'Process for transfer upon sale or inheritance of property' }
      ]
    },
    {
      id: 'committee',
      title: 'Management Committee',
      category: 'Governance',
      sections: [
        { number: '2.1', title: 'Committee Composition', summary: 'Structure: President, Secretary, Treasurer, and Members' },
        { number: '2.2', title: 'Election Process', summary: 'Annual elections, nomination procedures, voting method' },
        { number: '2.3', title: 'Powers and Duties', summary: 'Administrative powers, financial authority, decision-making' },
        { number: '2.4', title: 'Term and Removal', summary: 'Two-year term, resignation process, removal procedures' }
      ]
    },
    {
      id: 'meetings',
      title: 'Meetings and Procedures',
      category: 'Governance',
      sections: [
        { number: '3.1', title: 'Annual General Meeting', summary: 'Mandatory AGM within 6 months of financial year end' },
        { number: '3.2', title: 'Special General Meetings', summary: 'Convening SGM on demand or for specific purposes' },
        { number: '3.3', title: 'Notice Requirements', summary: '21 days notice for AGM, 7 days for SGM' },
        { number: '3.4', title: 'Quorum and Voting', summary: 'Quorum requirements, voting procedures, proxy voting' }
      ]
    },
    {
      id: 'finances',
      title: 'Financial Management',
      category: 'Finance',
      sections: [
        { number: '4.1', title: 'Maintenance Charges', summary: 'Calculation, collection, and due dates for monthly charges' },
        { number: '4.2', title: 'Special Assessments', summary: 'Levying additional charges for major repairs or improvements' },
        { number: '4.3', title: 'Financial Records', summary: 'Maintaining accounts, audit requirements, transparency' },
        { number: '4.4', title: 'Banking Operations', summary: 'Bank accounts, signatories, financial transactions' }
      ]
    },
    {
      id: 'property',
      title: 'Property and Alterations',
      category: 'Property',
      sections: [
        { number: '5.1', title: 'Common Areas', summary: 'Definition and use of common property and facilities' },
        { number: '5.2', title: 'Alterations to Units', summary: 'Approval process for renovations and structural changes' },
        { number: '5.3', title: 'Parking Regulations', summary: 'Allocation, visitor parking, vehicle restrictions' },
        { number: '5.4', title: 'Lease and Rental', summary: 'Rules for renting units, tenant registration' }
      ]
    },
    {
      id: 'conduct',
      title: 'Conduct and Discipline',
      category: 'General',
      sections: [
        { number: '6.1', title: 'Code of Conduct', summary: 'Expected behavior, noise restrictions, pet rules' },
        { number: '6.2', title: 'Penalty Provisions', summary: 'Fines for violations, disconnection of services' },
        { number: '6.3', title: 'Dispute Resolution', summary: 'Grievance redressal mechanism, mediation process' },
        { number: '6.4', title: 'Security Measures', summary: 'Visitor management, CCTV, emergency protocols' }
      ]
    }
  ];

  const filteredByeLaws = searchTerm.trim() === '' 
    ? byeLaws 
    : byeLaws.filter(law => 
        law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        law.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        law.sections.some(section => 
          section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          section.summary.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  const getCategoryColor = (category) => {
    const colors = {
      'General': { bg: '#DBEAFE', color: '#1E40AF' },
      'Governance': { bg: '#D1FAE5', color: '#065F46' },
      'Finance': { bg: '#FEF3C7', color: '#92400E' },
      'Property': { bg: '#FCE7F3', color: '#831843' }
    };
    return colors[category] || colors['General'];
  };

  return (
    <>
      <PageHeader 
        title="Society Bye-laws"
        description="Rules and regulations governing our cooperative housing society"
        breadcrumbs={[
          { label: 'About', href: '/about' },
          { label: 'Bye-laws' }
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
              📜 Governing Framework
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--blue-800)',
              margin: '0 0 1rem 0',
              lineHeight: '1.6'
            }}>
              The society bye-laws are the governing rules that outline the rights and responsibilities 
              of members, the functioning of the management committee, and the procedures for society 
              operations. These bye-laws are registered under the Maharashtra Co-operative Societies Act.
            </p>
            <div style={{
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--blue-200)'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--blue-900)',
                margin: '0'
              }}>
                <strong>Last Updated:</strong> January 15, 2024 | <strong>Version:</strong> 3.0 | 
                <strong> Approved by:</strong> Registrar of Co-operative Societies
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            marginBottom: '3rem'
          }}>
            <div className="row align-items-center">
              <div className="col-md-12">
                <label style={{
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  color: 'var(--slate-700)',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  🔍 Search Bye-laws
                </label>
                <input
                  type="text"
                  placeholder="Search by title, category, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    fontSize: '1rem',
                    color: 'var(--slate-900)',
                    backgroundColor: 'white',
                    border: '2px solid var(--slate-300)',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--blue-500)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--slate-300)';
                  }}
                />
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--slate-500)',
                  margin: '0.5rem 0 0 0'
                }}>
                  {filteredByeLaws.length} {filteredByeLaws.length === 1 ? 'section' : 'sections'} found
                </p>
              </div>
            </div>
          </div>

          {/* Bye-laws List */}
          {filteredByeLaws.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              backgroundColor: 'var(--slate-50)',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--slate-300)'
            }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)' }}>
                No bye-laws found matching your search.
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {filteredByeLaws.map((law) => {
                const categoryStyle = getCategoryColor(law.category);
                return (
                  <div
                    key={law.id}
                    style={{
                      padding: '2rem',
                      backgroundColor: 'white',
                      borderRadius: 'var(--radius-lg)',
                      border: '2px solid var(--slate-200)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: 'var(--slate-900)',
                          marginBottom: '0.5rem'
                        }}>
                          {law.title}
                        </h3>
                      </div>
                      <span style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.8125rem',
                        fontWeight: '600',
                        backgroundColor: categoryStyle.bg,
                        color: categoryStyle.color,
                        borderRadius: 'var(--radius-full)',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                      }}>
                        {law.category}
                      </span>
                    </div>

                    <div className="d-flex flex-column gap-2">
                      {law.sections.map((section) => (
                        <div
                          key={section.number}
                          style={{
                            padding: '1rem 1.5rem',
                            backgroundColor: 'var(--slate-50)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--slate-200)',
                            transition: 'all 0.2s',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--blue-50)';
                            e.currentTarget.style.borderColor = 'var(--blue-300)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--slate-50)';
                            e.currentTarget.style.borderColor = 'var(--slate-200)';
                          }}
                        >
                          <div className="d-flex align-items-start gap-3">
                            <span style={{
                              display: 'inline-block',
                              minWidth: '3rem',
                              padding: '0.25rem 0.75rem',
                              fontSize: '0.8125rem',
                              fontWeight: '700',
                              backgroundColor: 'white',
                              color: 'var(--slate-700)',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--slate-300)',
                              textAlign: 'center'
                            }}>
                              {section.number}
                            </span>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: 'var(--slate-900)',
                                marginBottom: '0.25rem'
                              }}>
                                {section.title}
                              </h4>
                              <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--slate-600)',
                                margin: '0'
                              }}>
                                {section.summary}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Download Section */}
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: 'var(--green-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--green-200)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--green-900)',
              marginBottom: '1rem'
            }}>
              📥 Download Complete Bye-laws
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--green-800)',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Download the complete registered bye-laws document for detailed reference. 
              This includes all amendments and is certified by the Registrar of Co-operative Societies.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: 'var(--green-600)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--green-700)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--green-600)';
                }}
              >
                📄 Download PDF (English)
              </a>
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'var(--green-700)',
                  backgroundColor: 'white',
                  border: '2px solid var(--green-600)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--green-50)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                📄 Download PDF (Marathi)
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
