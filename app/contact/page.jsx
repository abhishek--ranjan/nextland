"use client";

import { PageHeader, Footer } from '@/components';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('/api/config');
      const config = await response.json();
      
      // Use config data for contact info
      setContactData({
        officeAddress: config.address || '',
        officeEmail: config.email || '',
        officePhone: config.contactNumber || config.primaryContact || '',
        emergencyContact: 'Security Desk',
        emergencyPhone: config.emergencyContact || '',
        officeHours: config.officeHours || 'Monday to Saturday, 10:00 AM – 5:00 PM',
        mapUrl: config.mapLocation || config.mapUrl || ''
      });
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  return (
    <>
      <PageHeader 
        title="Contact Us"
        description="Official contact details and communication"
        breadcrumbs={[
          { label: 'Contact' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.7',
            color: 'var(--slate-600)',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            For official communication and enquiries related to society matters.
          </p>

          {/* Office Details + Map */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div style={{
                padding: '2rem',
                backgroundColor: 'var(--slate-50)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--slate-200)',
                height: '100%'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--slate-900)',
                  marginBottom: '1.5rem'
                }}>
                  Society Office
                </h2>
                
                {contactData ? (
                  <>
                    <div className="mb-4">
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--slate-500)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        📍 Address
                      </div>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        color: 'var(--slate-700)',
                        marginBottom: '0'
                      }}>
                        {contactData.officeAddress}
                      </p>
                    </div>

                    {contactData.officeEmail && (
                      <div className="mb-4">
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: 'var(--slate-500)',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          📧 Email
                        </div>
                        <p style={{
                          fontSize: '1rem',
                          color: 'var(--slate-700)',
                          marginBottom: '0'
                        }}>
                          <a href={`mailto:${contactData.officeEmail}`} style={{ color: 'var(--blue-600)', textDecoration: 'none' }}>
                            {contactData.officeEmail}
                          </a>
                        </p>
                      </div>
                    )}

                    {contactData.officePhone && (
                      <div className="mb-4">
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: 'var(--slate-500)',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          📞 Phone
                        </div>
                        <p style={{
                          fontSize: '1rem',
                          color: 'var(--slate-700)',
                          marginBottom: '0'
                        }}>
                          <a href={`tel:${contactData.officePhone}`} style={{ color: 'var(--blue-600)', textDecoration: 'none' }}>
                            {contactData.officePhone}
                          </a>
                        </p>
                      </div>
                    )}

                    {contactData.officeHours && (
                      <div>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: 'var(--slate-500)',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          🕐 Office Hours
                        </div>
                        <p style={{
                          fontSize: '1rem',
                          color: 'var(--slate-700)',
                          marginBottom: '0'
                        }}>
                          {contactData.officeHours}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-3">
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div style={{
                height: '100%',
                minHeight: '400px',
                backgroundColor: 'var(--slate-100)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--slate-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {contactData?.mapUrl ? (
                  <iframe
                    src={contactData.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>
                      📍 Location Map<br />
                      <small>(Google Maps integration placeholder)</small>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="mb-5">
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--slate-900)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Emergency Contacts
            </h2>
            
            {/* Society Emergency Contact */}
            {contactData && contactData.emergencyPhone && (
              <div className="row mb-4">
                <div className="col-md-12">
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#DBEAFE',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #3B82F6',
                    textAlign: 'center'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--slate-900)',
                      marginBottom: '0.5rem'
                    }}>
                      🏢 {contactData.emergencyContact || 'Society Emergency'}
                    </h3>
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: 'var(--slate-900)',
                      marginBottom: '0.75rem'
                    }}>
                      {contactData.emergencyPhone}
                    </p>
                    <a 
                      href={`tel:${contactData.emergencyPhone}`}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: 'var(--blue-600)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        textDecoration: 'none'
                      }}
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Emergency Services */}
            <div className="row g-3">
              {[
                { icon: '🚓', service: 'Police', number: '112' },
                { icon: '🚒', service: 'Fire', number: '101' },
                { icon: '🚑', service: 'Ambulance', number: '108' }
              ].map((contact, index) => (
                <div key={index} className="col-md-4">
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#FEF9C3',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #FDE047',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                      {contact.icon}
                    </div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--slate-900)',
                      marginBottom: '0.5rem'
                    }}>
                      {contact.service}
                    </h3>
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: 'var(--slate-900)',
                      marginBottom: '0.75rem'
                    }}>
                      {contact.number}
                    </p>
                    <a 
                      href={`tel:${contact.number}`}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: 'var(--slate-900)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        textDecoration: 'none'
                      }}
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#FEF9C3',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #FDE047'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#713F12',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              ⚠️ IMPORTANT NOTICE
            </p>
            <p style={{
              fontSize: '0.8125rem',
              color: '#854D0E',
              marginBottom: '0',
              lineHeight: '1.6'
            }}>
              This website is the official communication platform of Nextland Society. For emergencies, contact local authorities directly. The society office does not provide 24/7 support. For urgent maintenance issues outside office hours, contact the security desk at the society premises.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
