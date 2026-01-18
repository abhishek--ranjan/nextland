"use client";

import { PageHeader, Footer } from '@/components';

export default function VendorsPage() {
  const vendors = [
    {
      category: 'Plumbing',
      vendors: [
        { name: 'ABC Plumbers', service: 'General plumbing, pipe repairs', contact: 'Contact office' },
        { name: 'QuickFix Plumbing', service: 'Emergency repairs, drainage', contact: 'Contact office' }
      ]
    },
    {
      category: 'Electrical',
      vendors: [
        { name: 'XYZ Electricals', service: 'Wiring, fixtures, MCB repairs', contact: 'Contact office' },
        { name: 'Power Solutions', service: 'DG maintenance, inverters', contact: 'Contact office' }
      ]
    },
    {
      category: 'Carpentry',
      vendors: [
        { name: 'Wood Works', service: 'Furniture repair, doors, windows', contact: 'Contact office' },
        { name: 'Master Carpenters', service: 'Custom work, installations', contact: 'Contact office' }
      ]
    },
    {
      category: 'Painting',
      vendors: [
        { name: 'Color Magic', service: 'Interior & exterior painting', contact: 'Contact office' },
        { name: 'Perfect Painters', service: 'Waterproofing, texture', contact: 'Contact office' }
      ]
    },
    {
      category: 'Pest Control',
      vendors: [
        { name: 'Pest Free Services', service: 'General pest control, termites', contact: 'Contact office' }
      ]
    },
    {
      category: 'Cleaning',
      vendors: [
        { name: 'Clean & Shine', service: 'Deep cleaning, tank cleaning', contact: 'Contact office' }
      ]
    },
    {
      category: 'Lift Maintenance',
      vendors: [
        { name: 'Lift Care India', service: 'AMC, repairs, modernization', contact: 'Contact office' }
      ]
    },
    {
      category: 'Security Systems',
      vendors: [
        { name: 'SecureVision', service: 'CCTV installation & maintenance', contact: 'Contact office' }
      ]
    }
  ];

  return (
    <>
      <PageHeader 
        title="Approved Vendors"
        description="Society-approved service providers for your convenience"
        breadcrumbs={[
          { label: 'Facilities', href: '/facilities' },
          { label: 'Approved Vendors' }
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
              ✅ Verified Service Providers
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--blue-800)',
              margin: '0 0 1rem 0',
              lineHeight: '1.6'
            }}>
              The following vendors have been verified and approved by the Management Committee for 
              providing services within the society premises. For contact details and to schedule services, 
              please contact the society office.
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
                <strong>⚠️ Important:</strong> All vendor work must be coordinated through the society office. 
                Direct contact details are available at the office to prevent unauthorized solicitation.
              </p>
            </div>
          </div>

          {/* Vendors by Category */}
          {vendors.map((category, index) => (
            <div
              key={index}
              style={{
                marginBottom: '2rem',
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--slate-200)',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              {/* Category Header */}
              <div style={{
                padding: '1.25rem 1.5rem',
                backgroundColor: 'var(--slate-100)',
                borderBottom: '2px solid var(--slate-200)'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--slate-900)',
                  margin: '0'
                }}>
                  {category.category}
                </h3>
              </div>

              {/* Vendors Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{
                      backgroundColor: 'var(--slate-50)',
                      borderBottom: '1px solid var(--slate-200)'
                    }}>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        width: '25%'
                      }}>
                        Vendor Name
                      </th>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        width: '50%'
                      }}>
                        Services Offered
                      </th>
                      <th style={{
                        padding: '1rem 1.5rem',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-700)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        width: '25%'
                      }}>
                        Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.vendors.map((vendor, vIndex) => (
                      <tr
                        key={vIndex}
                        style={{
                          borderBottom: vIndex < category.vendors.length - 1 ? '1px solid var(--slate-200)' : 'none',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--slate-50)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        <td style={{
                          padding: '1rem 1.5rem',
                          fontSize: '0.9375rem',
                          fontWeight: '600',
                          color: 'var(--slate-900)'
                        }}>
                          {vendor.name}
                        </td>
                        <td style={{
                          padding: '1rem 1.5rem',
                          fontSize: '0.9375rem',
                          color: 'var(--slate-700)'
                        }}>
                          {vendor.service}
                        </td>
                        <td style={{
                          padding: '1rem 1.5rem',
                          textAlign: 'center'
                        }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            fontSize: '0.8125rem',
                            fontWeight: '600',
                            backgroundColor: 'var(--blue-100)',
                            color: 'var(--blue-700)',
                            borderRadius: 'var(--radius-full)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--blue-200)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--blue-100)';
                            }}
                          >
                            {vendor.contact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Important Guidelines */}
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: 'var(--yellow-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--yellow-200)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--yellow-900)',
              marginBottom: '1rem'
            }}>
              📋 Vendor Guidelines
            </h3>
            <ul style={{
              fontSize: '0.9375rem',
              color: 'var(--yellow-900)',
              lineHeight: '1.8',
              margin: '0',
              paddingLeft: '1.5rem'
            }}>
              <li>All vendor work must be pre-approved by the society office</li>
              <li>Vendor entry requires proper gate pass and identification</li>
              <li>Working hours: 9:00 AM - 6:00 PM (Monday to Saturday)</li>
              <li>Residents are responsible for vendor supervision and clearance</li>
              <li>Society is not liable for any disputes between residents and vendors</li>
              <li>Vendors must follow all society rules and safety protocols</li>
              <li>For emergency services outside working hours, contact the security desk</li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--slate-900)',
              marginBottom: '1rem'
            }}>
              Need Vendor Contact Details?
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--slate-600)',
              marginBottom: '1.5rem'
            }}>
              Visit the society office or contact us to get vendor contact information and schedule services.
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
              Contact Office →
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
