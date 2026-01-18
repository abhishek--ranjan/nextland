"use client";

import { PageHeader, Footer } from '@/components';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  if (!config) return null;

  const societyName = config.societyName || "Nextland Society";
  const yearEstablished = config.yearOfEstablishment || config.yearEstablished || 2015;
  const numberOfTowers = config.numberOfTowers || 6;
  const numberOfUnits = config.numberOfUnits || 240;
  const address = config.address || "Sector 21, Dwarka, New Delhi";

  return (
    <>
      <PageHeader 
        title="About Society"
        description="Learn about our community, history, and commitment to quality living"
        breadcrumbs={[
          { label: 'About', href: '/about' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          
          {/* Introduction */}
          <div className="row mb-5">
            <div className="col-lg-8">
              <h2 className="mb-4" style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--slate-900)',
                letterSpacing: '-0.01em'
              }}>
                Welcome to {societyName}
              </h2>
              <p style={{
                fontSize: '1.0625rem',
                lineHeight: '1.8',
                color: 'var(--slate-600)',
                marginBottom: '1.5rem'
              }}>
                {config.description || `${societyName} is a planned residential community designed to offer a safe, comfortable, and vibrant living environment for residents. The society focuses on transparent governance, sustainable living, and active community participation.`}
              </p>
              <p style={{
                fontSize: '1.0625rem',
                lineHeight: '1.8',
                color: 'var(--slate-600)'
              }}>
                Located in {address}, our society comprises {numberOfTowers} towers with {numberOfUnits} residential units, providing a harmonious living space for families. We are committed to maintaining high standards of cleanliness, security, and community welfare.
              </p>
            </div>
            <div className="col-lg-4">
              <div style={{
                backgroundColor: 'var(--slate-50)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--slate-200)'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--slate-900)',
                  marginBottom: '1.5rem'
                }}>
                  Quick Facts
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    { label: 'Established', value: yearEstablished },
                    { label: 'Towers', value: numberOfTowers },
                    { label: 'Total Units', value: numberOfUnits },
                    { label: 'Location', value: address.split(',')[0] }
                  ].map((fact, index) => (
                    <li key={index} style={{
                      marginBottom: '1rem',
                      paddingBottom: '1rem',
                      borderBottom: index < 3 ? '1px solid var(--slate-200)' : 'none'
                    }}>
                      <div style={{
                        fontSize: '0.8125rem',
                        color: 'var(--slate-500)',
                        marginBottom: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {fact.label}
                      </div>
                      <div style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: 'var(--slate-900)'
                      }}>
                        {fact.value}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="mb-4" style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--slate-900)',
                letterSpacing: '-0.01em'
              }}>
                Our Mission & Values
              </h2>
            </div>
            <div className="col-md-4 mb-4">
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem'
                }}>
                  🏘️
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--slate-900)',
                  marginBottom: '0.75rem'
                }}>
                  Community First
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: '1.7',
                  color: 'var(--slate-600)',
                  marginBottom: '0'
                }}>
                  Building a strong, supportive community where residents feel connected and valued.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem'
                }}>
                  📋
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--slate-900)',
                  marginBottom: '0.75rem'
                }}>
                  Transparent Governance
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: '1.7',
                  color: 'var(--slate-600)',
                  marginBottom: '0'
                }}>
                  Ensuring accountability and transparency in all society operations and decision-making.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1rem'
                }}>
                  🌱
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--slate-900)',
                  marginBottom: '0.75rem'
                }}>
                  Sustainable Living
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: '1.7',
                  color: 'var(--slate-600)',
                  marginBottom: '0'
                }}>
                  Promoting environmentally responsible practices and green initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="row">
            <div className="col-12">
              <h2 className="mb-4" style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--slate-900)',
                letterSpacing: '-0.01em'
              }}>
                What Makes Us Special
              </h2>
            </div>
            <div className="col-12">
              <div className="row g-3">
                {[
                  { icon: '🔒', title: '24/7 Security', desc: 'Round-the-clock security with trained personnel and CCTV surveillance' },
                  { icon: '⚡', title: 'Power Backup', desc: 'Uninterrupted power supply for common areas and lift operations' },
                  { icon: '💧', title: 'Water Management', desc: 'Reliable water supply with storage and rainwater harvesting' },
                  { icon: '🏋️', title: 'Modern Amenities', desc: 'Well-maintained facilities including gym, clubhouse, and play areas' },
                  { icon: '♻️', title: 'Waste Management', desc: 'Systematic waste segregation and eco-friendly disposal practices' },
                  { icon: '🚗', title: 'Ample Parking', desc: 'Covered and open parking spaces for residents and visitors' }
                ].map((feature, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div style={{
                      padding: '1.5rem',
                      backgroundColor: 'var(--slate-50)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--slate-200)',
                      height: '100%'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                        {feature.icon}
                      </div>
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: 'var(--slate-900)',
                        marginBottom: '0.5rem'
                      }}>
                        {feature.title}
                      </h4>
                      <p style={{
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        color: 'var(--slate-600)',
                        marginBottom: '0'
                      }}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
