"use client";

import { useEffect, useState } from "react";
import { getImagePath, getModeFromConfig } from "@/utils";
import Footer from "@/components/Footer";

export default function SocietyLanding() {
  const [config, setConfig] = useState(null);
  const [events, setEvents] = useState([]);
  const [imageMode, setImageMode] = useState('demo');
  
  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setImageMode(getModeFromConfig(data));
      });
    
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  
  if (!config) return null;
  
  const societyName = config.societyName || "Nextland Society";
  const societyAddress = config.address || "Sector 21, Dwarka, New Delhi";
  const emergencyNumber = config.emergencyContact || config.contactNumber || "+919876543210";
  const contactNumber = config.contactNumber || "+919876543210";
  const officeEmail = config.email || "office@nextland.org";
  const officeHours = config.officeHours || "Mon-Sat 10am-6pm";
  const estYear = config.yearOfEstablishment || 2015;
  const emergencyHref = emergencyNumber.replace(/[^+\d]/g, "");
  const contactHref = contactNumber.replace(/[^+\d]/g, "");
  const currentYear = new Date().getFullYear();
  
  // Get hero image path based on mode
  const heroImagePath = getImagePath('general/hero-image.png', imageMode);

  return (
    <>
      {/* Hero / Welcome Section */}
      <section style={{padding: '6rem 0', backgroundColor: 'white'}}>
        <div className="container" style={{maxWidth: '1140px'}}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div style={{maxWidth: '540px'}}>
                <p className="mb-3" style={{fontSize: '0.9375rem', fontWeight: '500', color: 'var(--blue-600)', letterSpacing: '0.05em', textTransform: 'uppercase'}}>Welcome to</p>
                <h1 className="mb-4" style={{fontSize: '3rem', lineHeight: '1.2', fontWeight: '700', color: 'var(--slate-900)', letterSpacing: '-0.02em'}}>
                  {societyName}
                </h1>
                <p className="mb-2" style={{fontSize: '1.125rem', lineHeight: '1.7', color: 'var(--slate-600)'}}>
                  {societyAddress}
                </p>
                <p className="mb-5" style={{fontSize: '1rem', lineHeight: '1.8', color: 'var(--slate-600)'}}>
                  {config.description || `A harmonious residential community of ${config.numberOfUnits || 240} families, committed to transparent governance and quality living since ${config.yearOfEstablishment || 2015}.`}
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <a href="/notices" className="btn btn-primary" style={{padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: '500', boxShadow: 'var(--shadow-sm)', borderRadius: 'var(--radius-lg)', border: 'none'}}>View latest notices</a>
                  <a href="/contact" className="btn" style={{padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: '500', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '2px solid var(--slate-300)', color: 'var(--slate-700)'}}>Contact office</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <div style={{background: 'var(--slate-50)', padding: '3rem', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--slate-200)'}}>
                  <div className="bg-white position-relative overflow-hidden" style={{boxShadow: 'var(--shadow-sm)', borderRadius: 'var(--radius-xl)', aspectRatio: '2.36/1'}}>
                    <img 
                      src={heroImagePath} 
                      alt={`${societyName} - Community Overview`}
                      style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                    />
                  </div>
                </div>
                <div className="position-absolute bg-white px-4 py-2" style={{top: '1.5rem', right: '1.5rem', fontSize: '0.8125rem', fontWeight: '600', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--slate-100)'}}>
                  <span style={{color: 'var(--slate-600)'}}>•</span> <span style={{color: 'var(--slate-900)'}}>Est. {estYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Notices Section - MOST IMPORTANT */}
      <section style={{padding: '6rem 0', backgroundColor: 'white'}}>
        <div className="container" style={{maxWidth: '1140px'}}>
          <div className="mb-5">
            <h2 className="mb-2" style={{fontSize: '2.25rem', fontWeight: '700', color: 'var(--slate-900)', letterSpacing: '-0.01em'}}>Latest Notices</h2>
            <p className="mb-0" style={{fontSize: '1.0625rem', lineHeight: '1.6', color: 'var(--slate-600)'}}>Official communications from the managing committee</p>
          </div>
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card h-100" style={{borderRadius: 'var(--radius-lg)', border: '1px solid var(--red-200)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--red-50)'}}>
                <div className="card-body" style={{padding: '1.75rem'}}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge" style={{fontSize: '0.75rem', backgroundColor: 'var(--red-600)', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-md)'}}>Emergency</span>
                    <small style={{color: 'var(--slate-500)', fontSize: '0.8125rem'}}>Jan 2, 2026</small>
                  </div>
                  <h5 className="mb-3" style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--slate-900)', lineHeight: '1.4'}}>Water Supply Maintenance</h5>
                  <p className="mb-4" style={{lineHeight: '1.7', fontSize: '0.9375rem', color: 'var(--slate-600)'}}>Water supply will be suspended on Jan 5 from 10 AM to 2 PM for tank cleaning.</p>
                  <a href="/notices/NOT-20260102120000" className="btn btn-sm" style={{borderRadius: 'var(--radius-md)', border: '1px solid var(--red-600)', color: 'var(--red-600)', backgroundColor: 'white', padding: '0.5rem 1rem', fontWeight: '500', fontSize: '0.875rem'}}>Read notice →</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100" style={{borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'white'}}>
                <div className="card-body" style={{padding: '1.75rem'}}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge" style={{fontSize: '0.75rem', backgroundColor: 'var(--blue-600)', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-md)'}}>AGM</span>
                    <small style={{color: 'var(--slate-500)', fontSize: '0.8125rem'}}>Dec 28, 2025</small>
                  </div>
                  <h5 className="mb-3" style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--slate-900)', lineHeight: '1.4'}}>Annual General Meeting 2026</h5>
                  <p className="mb-4" style={{lineHeight: '1.7', fontSize: '0.9375rem', color: 'var(--slate-600)'}}>AGM scheduled for January 15, 2026 at 6:00 PM in the community hall.</p>
                  <a href="/notices/NOT-20251228150000" className="btn btn-sm" style={{borderRadius: 'var(--radius-md)', border: '1px solid var(--blue-600)', color: 'var(--blue-600)', backgroundColor: 'white', padding: '0.5rem 1rem', fontWeight: '500', fontSize: '0.875rem'}}>Read notice →</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100" style={{borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'white'}}>
                <div className="card-body" style={{padding: '1.75rem'}}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge" style={{fontSize: '0.75rem', backgroundColor: 'var(--slate-600)', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-md)'}}>General</span>
                    <small style={{color: 'var(--slate-500)', fontSize: '0.8125rem'}}>Dec 20, 2025</small>
                  </div>
                  <h5 className="mb-3" style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--slate-900)', lineHeight: '1.4'}}>New Parking Guidelines</h5>
                  <p className="mb-4" style={{lineHeight: '1.7', fontSize: '0.9375rem', color: 'var(--slate-600)'}}>Updated parking rules effective from January 1, 2026. Please review.</p>
                  <a href="/notices/NOT-20251220100000" className="btn btn-sm" style={{borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-300)', color: 'var(--slate-700)', backgroundColor: 'white', padding: '0.5rem 1rem', fontWeight: '500', fontSize: '0.875rem'}}>Read notice →</a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a href="/notices" className="btn" style={{borderRadius: 'var(--radius-md)', border: '1px solid var(--blue-600)', color: 'var(--blue-600)', backgroundColor: 'white', padding: '0.75rem 2rem', fontWeight: '500', fontSize: '0.9375rem'}}>View all notices →</a>
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section style={{padding: '6rem 0', backgroundColor: 'var(--slate-50)'}}>
        <div className="container" style={{maxWidth: '1140px'}}>
          <div className="mb-5">
            <h2 className="mb-2" style={{fontSize: '2.25rem', fontWeight: '700', color: 'var(--slate-900)', letterSpacing: '-0.01em'}}>Recent Events</h2>
            <p className="mb-0" style={{fontSize: '1.0625rem', lineHeight: '1.6', color: 'var(--slate-600)'}}>Community activities and celebrations</p>
          </div>
          <div className="row g-4 mb-4">
            {events.map((event) => {
              const eventDate = new Date(event.date);
              const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              const categoryEmoji = {
                'Festival': '🎉',
                'Sports': '🏃',
                'Community Event': '🎊',
                'Cultural': '🎭',
                'Environmental': '🌳'
              }[event.category] || '📅';
              
              return (
                <div key={event.id} className="col-md-6 col-lg-3">
                  <div className="card h-100" style={{borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)', backgroundColor: 'white'}}>
                    <div className="card-body" style={{padding: '1.75rem'}}>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <div style={{fontSize: '2rem'}}>{categoryEmoji}</div>
                        <small style={{color: 'var(--slate-500)', fontSize: '0.8125rem'}}>{formattedDate}</small>
                      </div>
                      <h5 className="mb-3" style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--slate-900)', lineHeight: '1.4'}}>{event.title}</h5>
                      <p className="mb-4" style={{lineHeight: '1.7', fontSize: '0.9375rem', color: 'var(--slate-600)'}}>{event.category}</p>
                      <a href={`/events/${event.id}`} className="btn btn-sm" style={{borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-300)', color: 'var(--slate-700)', backgroundColor: 'white', padding: '0.5rem 1rem', fontWeight: '500', fontSize: '0.875rem'}}>View details →</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-5">
            <a href="/events" className="btn" style={{borderRadius: 'var(--radius-md)', border: '1px solid var(--blue-600)', color: 'var(--blue-600)', backgroundColor: 'white', padding: '0.75rem 2rem', fontWeight: '500', fontSize: '0.875rem'}}>View all events →</a>
          </div>
        </div>
      </section>

      {/* Society Snapshot */}
      <section style={{padding: '6rem 0', backgroundColor: 'white'}}>
        <div className="container" style={{maxWidth: '1140px'}}>
          <div className="text-center mb-5">
            <h2 className="mb-2" style={{fontSize: '2.25rem', fontWeight: '700', color: 'var(--slate-900)', letterSpacing: '-0.01em'}}>Society at a Glance</h2>
            <p className="mb-0" style={{fontSize: '1.0625rem', lineHeight: '1.6', color: 'var(--slate-600)'}}>Key facts and figures</p>
          </div>
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="text-center p-4" style={{borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)'}}>
                <div className="mb-2" style={{fontSize: '3rem', fontWeight: '700', color: 'var(--blue-600)', lineHeight: '1'}}>240</div>
                <div style={{fontSize: '0.9375rem', fontWeight: '500', color: 'var(--slate-600)'}}>Total Flats</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center p-4" style={{borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)'}}>
                <div className="mb-2" style={{fontSize: '3rem', fontWeight: '700', color: 'var(--blue-600)', lineHeight: '1'}}>850+</div>
                <div style={{fontSize: '0.9375rem', fontWeight: '500', color: 'var(--slate-600)'}}>Residents</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center p-4" style={{borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)'}}>
                <div className="mb-2" style={{fontSize: '3rem', fontWeight: '700', color: 'var(--blue-600)', lineHeight: '1'}}>2015</div>
                <div style={{fontSize: '0.9375rem', fontWeight: '500', color: 'var(--slate-600)'}}>Established</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center p-4" style={{borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)'}}>
                <div className="mb-2" style={{fontSize: '3rem', fontWeight: '700', color: 'var(--blue-600)', lineHeight: '1'}}>24/7</div>
                <div style={{fontSize: '0.9375rem', fontWeight: '500', color: 'var(--slate-600)'}}>Security</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Preview */}
      <section style={{padding: '6rem 0', backgroundColor: 'var(--slate-50)'}}>
        <div className="container" style={{maxWidth: '1140px'}}>
          <div className="mb-5">
            <h2 className="mb-2" style={{fontSize: '2.25rem', fontWeight: '700', color: 'var(--slate-900)', letterSpacing: '-0.01em'}}>Facilities & Amenities</h2>
            <p className="mb-0" style={{fontSize: '1.0625rem', lineHeight: '1.6', color: 'var(--slate-600)'}}>Modern infrastructure for comfortable living</p>
          </div>
          <div className="row g-3 text-center mb-5">
            <div className="col-4 col-md-2">
              <div style={{padding: '1.5rem 1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--slate-200)'}}>
                <div style={{fontSize: '2.5rem'}} className="mb-2">🏢</div>
                <div style={{fontSize: '0.875rem', fontWeight: '500', color: 'var(--slate-700)'}}>Lift</div>
              </div>
            </div>
            <div className="col-4 col-md-2">
              <div style={{padding: '1.5rem 1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--slate-200)'}}>
                <div style={{fontSize: '2.5rem'}} className="mb-2">🚗</div>
                <div style={{fontSize: '0.875rem', fontWeight: '500', color: 'var(--slate-700)'}}>Parking</div>
              </div>
            </div>
            <div className="col-4 col-md-2">
              <div style={{padding: '1.5rem 1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--slate-200)'}}>
                <div style={{fontSize: '2.5rem'}} className="mb-2">⚡</div>
                <div style={{fontSize: '0.875rem', fontWeight: '500', color: 'var(--slate-700)'}}>Power Backup</div>
              </div>
            </div>
            <div className="col-4 col-md-2">
              <div style={{padding: '1.5rem 1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--slate-200)'}}>
                <div style={{fontSize: '2.5rem'}} className="mb-2">🛡️</div>
                <div style={{fontSize: '0.875rem', fontWeight: '500', color: 'var(--slate-700)'}}>Security</div>
              </div>
            </div>
            <div className="col-4 col-md-2">
              <div style={{padding: '1.5rem 1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--slate-200)'}}>
                <div style={{fontSize: '2.5rem'}} className="mb-2">🏛️</div>
                <div style={{fontSize: '0.875rem', fontWeight: '500', color: 'var(--slate-700)'}}>Clubhouse</div>
              </div>
            </div>
            <div className="col-4 col-md-2">
              <div style={{padding: '1.5rem 1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--slate-200)'}}>
                <div style={{fontSize: '2.5rem'}} className="mb-2">🌳</div>
                <div style={{fontSize: '0.875rem', fontWeight: '500', color: 'var(--slate-700)'}}>Garden</div>
              </div>
            </div>
          </div>
          <div className="text-center" style={{marginTop: '2.5rem'}}>
            <a href="/facilities" className="btn" style={{borderRadius: 'var(--radius-md)', border: '1px solid var(--blue-600)', color: 'var(--blue-600)', backgroundColor: 'white', padding: '0.75rem 2rem', fontWeight: '500', fontSize: '0.9375rem'}}>View all facilities →</a>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </>
  );
}

