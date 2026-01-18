"use client";

import { PageHeader, Footer } from '@/components';

export default function FacilitiesPage() {
  const facilitiesCards = [
    {
      id: 'towers',
      icon: '🏢',
      title: 'Towers & Layout',
      description: 'Explore our modern residential towers, floor plans, and society layout with detailed infrastructure information.',
      path: '/facilities/towers',
      color: 'var(--blue-50)',
      borderColor: 'var(--blue-200)'
    },
    {
      id: 'amenities',
      icon: '🏋️',
      title: 'Amenities',
      description: 'Discover our world-class amenities including gymnasium, clubhouse, swimming pool, and recreational facilities.',
      path: '/facilities/amenities',
      color: 'var(--green-50)',
      borderColor: 'var(--green-200)'
    },
    {
      id: 'utilities',
      icon: '⚡',
      title: 'Utilities',
      description: 'Learn about essential utilities like power backup, water supply, sewage treatment, and waste management systems.',
      path: '/facilities/utilities',
      color: 'var(--orange-50)',
      borderColor: 'var(--orange-200)'
    },
    {
      id: 'vendors',
      icon: '🛒',
      title: 'Approved Vendors',
      description: 'Access our list of society-approved vendors for maintenance, repairs, cleaning, and other essential services.',
      path: '/facilities/vendors',
      color: 'var(--purple-50)',
      borderColor: 'var(--purple-200)'
    },
    {
      id: 'helpdesk',
      icon: '🎧',
      title: 'Helpdesk',
      description: 'Get assistance with complaints, service requests, and general queries. Connect with our dedicated support team.',
      path: '/facilities/helpdesk',
      color: 'var(--pink-50)',
      borderColor: 'var(--pink-200)'
    }
  ];

  return (
    <>
      <PageHeader 
        title="Facilities & Services"
        description="Comprehensive infrastructure and services for comfortable living"
        breadcrumbs={[
          { label: 'Facilities' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          
          {/* Introduction */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--slate-900)',
              marginBottom: '1rem'
            }}>
              🏘️ Welcome to Our Facilities Hub
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'var(--slate-700)',
              marginBottom: '0'
            }}>
              Prateek Stylome offers modern infrastructure and comprehensive services designed for your comfort and convenience. 
              Explore our facilities, amenities, utilities, and support services below.
            </p>
          </div>

          {/* Facilities Cards */}
          <div className="row g-4">
            {facilitiesCards.map((facility) => (
              <div key={facility.id} className="col-md-6 col-lg-4">
                <a 
                  href={facility.path} 
                  style={{
                    display: 'block',
                    padding: '2rem',
                    backgroundColor: facility.color,
                    border: `1px solid ${facility.borderColor}`,
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    height: '100%'
                  }}
                  className="facility-card"
                >
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem'
                  }}>
                    {facility.icon}
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: 'var(--slate-900)',
                    marginBottom: '0.75rem'
                  }}>
                    {facility.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.9375rem',
                    lineHeight: '1.6',
                    color: 'var(--slate-600)',
                    marginBottom: '1rem'
                  }}>
                    {facility.description}
                  </p>
                  
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--blue-600)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    Learn more →
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div style={{
            marginTop: '4rem',
            padding: '2.5rem',
            background: 'linear-gradient(135deg, var(--blue-600) 0%, var(--blue-700) 100%)',
            borderRadius: 'var(--radius-lg)',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Society at a Glance
            </h3>
            
            <div className="row text-center g-4">
              <div className="col-6 col-md-3">
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>
                  4
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.9
                }}>
                  Towers
                </div>
              </div>
              
              <div className="col-6 col-md-3">
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>
                  320
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.9
                }}>
                  Residential Units
                </div>
              </div>
              
              <div className="col-6 col-md-3">
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>
                  24/7
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.9
                }}>
                  Security & Support
                </div>
              </div>
              
              <div className="col-6 col-md-3">
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>
                  100%
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  opacity: 0.9
                }}>
                  Power Backup
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />

      <style jsx>{`
        .facility-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}
