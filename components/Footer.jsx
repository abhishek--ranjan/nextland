"use client";

import { useEffect, useState } from "react";

/**
 * Footer Component
 * Global footer with disclaimer, office hours, copyright, and emergency contacts
 */

export default function Footer() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => {
        // Use defaults if fetch fails
      });
  }, []);

  const currentYear = new Date().getFullYear();
  const societyName = config?.societyName || "Nextland Society";
  const officeHours = config?.officeHours || "Monday to Saturday, 10:00 AM - 6:00 PM";
  const email = config?.email || "office@nextland-demo.in";

  return (
    <footer style={{
      backgroundColor: 'var(--slate-900)',
      color: 'white',
      padding: '3rem 0 1.5rem',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ maxWidth: '1140px' }}>
        <div className="row g-4">
          {/* About Section */}
          <div className="col-md-4">
            <h5 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: 'white'
            }}>
              {societyName}
            </h5>
            <p style={{ 
              fontSize: '0.875rem', 
              lineHeight: '1.7', 
              color: 'var(--slate-400)',
              marginBottom: '1rem'
            }}>
              Official website for {societyName}. Transparent governance and quality living for our community.
            </p>
            <p style={{ 
              fontSize: '0.75rem', 
              color: 'var(--slate-500)',
              marginBottom: '0'
            }}>
              © {currentYear} {societyName}. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: 'white'
            }}>
              Quick Links
            </h5>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              {[
                { label: 'Home', href: '/home' },
                { label: 'Notices & Circulars', href: '/notices' },
                { label: 'Events', href: '/events' },
                { label: 'Management Committee', href: '/committee' },
                { label: 'Contact Us', href: '/contact' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <a 
                    href={link.href}
                    style={{ 
                      color: 'var(--slate-400)', 
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'white'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--slate-400)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Hours & Contact */}
          <div className="col-md-4">
            <h5 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: 'white'
            }}>
              Office Hours
            </h5>
            <p style={{ 
              fontSize: '0.875rem', 
              lineHeight: '1.7', 
              color: 'var(--slate-400)',
              marginBottom: '1rem'
            }}>
              {officeHours}
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--slate-400)',
              marginBottom: '0.5rem'
            }}>
              📧 {email}
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ 
                fontSize: '0.75rem', 
                fontWeight: '600',
                color: 'var(--slate-300)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Emergency Contacts
              </p>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--slate-400)',
                marginBottom: '0'
              }}>
                Police: 112 | Fire: 101 | Ambulance: 108
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--slate-800)'
        }}>
          <div className="row">
            <div className="col-12">
              <div style={{
                backgroundColor: 'var(--slate-800)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--slate-700)'
              }}>
                <p style={{ 
                  fontSize: '0.8125rem', 
                  color: 'var(--slate-400)',
                  marginBottom: '0.5rem',
                  lineHeight: '1.6'
                }}>
                  <strong style={{ color: 'var(--slate-300)' }}>Official Society Website</strong>
                </p>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--slate-500)',
                  marginBottom: '0',
                  lineHeight: '1.6'
                }}>
                  This website is the official communication platform of {societyName}. 
                  For emergencies, contact local authorities directly. The society office does not provide 24/7 support. 
                  For urgent maintenance issues outside office hours, contact the security desk at the society premises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
