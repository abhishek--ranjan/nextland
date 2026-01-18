'use client';

import { useState, useEffect } from 'react';
import { PageHeader, Footer } from '@/components';
import { getImagePath } from '@/utils';

export default function TowersPage() {
  const [facilities, setFacilities] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await fetch('/api/facilities');
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader 
          title="Towers & Layouts"
          description="Explore our residential towers and society layout"
          breadcrumbs={[
            { label: 'Facilities', href: '/facilities' },
            { label: 'Towers & Layouts' }
          ]}
        />
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader 
        title="Towers & Layouts"
        description="Explore our residential towers and society layout"
        breadcrumbs={[
          { label: 'Facilities', href: '/facilities' },
          { label: 'Towers & Layouts' }
        ]}
      />

      {/* Society Images Strip */}
      <section style={{ padding: '3rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h2 className="text-center mb-4">Society Views</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <img 
                src={getImagePath('general/hero-image.png', 'prod')}
                alt="Society View"
                className="img-fluid rounded shadow-sm"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-3">
              <img 
                src={getImagePath('facilities/club-house.png', 'prod')}
                alt="Clubhouse"
                className="img-fluid rounded shadow-sm"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-3">
              <img 
                src={getImagePath('facilities/children-play.png', 'prod')}
                alt="Play Area"
                className="img-fluid rounded shadow-sm"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Towers Information */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h2 className="mb-4">Our Towers</h2>
          <div className="row g-4">
            {facilities?.towers?.map((tower, index) => (
              <div key={index} className="col-md-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div 
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#0d6efd',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        margin: '0 auto 1rem'
                      }}
                    >
                      {tower.charAt(tower.length - 1)}
                    </div>
                    <h5 className="card-title">{tower}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layout Map */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-4">Society Layout</h2>
              <p className="lead mb-4">
                Our society is thoughtfully designed with multiple towers arranged to maximize open spaces and natural light.
              </p>
              {facilities?.layoutMap && (
                <a 
                  href={facilities.layoutMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <i className="bi bi-download me-2"></i>
                  Download Layout Map
                </a>
              )}
            </div>
            <div className="col-md-6">
              <img 
                src={getImagePath('facilities/tower-layout.png', 'prod')}
                alt="Tower Layout"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Common Facilities */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h2 className="mb-4">Common Facilities</h2>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                {facilities?.commonFacilities?.map((facility, index) => (
                  <li key={index} className="list-group-item d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    {facility}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h4 className="mb-3">Amenities</h4>
              <ul className="list-group list-group-flush">
                {facilities?.amenities?.map((amenity, index) => (
                  <li key={index} className="list-group-item d-flex align-items-center">
                    <i className="bi bi-star-fill text-warning me-3"></i>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
