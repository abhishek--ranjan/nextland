"use client";

import { PageHeader, Footer } from '@/components';

export default function VisionPage() {
  return (
    <>
      <PageHeader 
        title="Vision & Objectives"
        description="Our aspirations and goals for building a thriving community"
        breadcrumbs={[
          { label: 'About', href: '/about' },
          { label: 'Vision & Objectives' }
        ]}
      />

      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Vision Statement */}
          <div className="mb-5">
            <h2 className="mb-4" style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--slate-900)',
              letterSpacing: '-0.01em'
            }}>
              Our Vision
            </h2>
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--blue-50)',
              borderLeft: '4px solid var(--blue-600)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <p style={{
                fontSize: '1.25rem',
                lineHeight: '1.8',
                color: 'var(--slate-700)',
                marginBottom: '0',
                fontStyle: 'italic'
              }}>
                "To create a harmonious, sustainable, and well-governed residential community where every resident feels safe, valued, and connected."
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mb-5">
            <h2 className="mb-4" style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--slate-900)',
              letterSpacing: '-0.01em'
            }}>
              Our Mission
            </h2>
            <p style={{
              fontSize: '1.0625rem',
              lineHeight: '1.8',
              color: 'var(--slate-600)',
              marginBottom: '1.5rem'
            }}>
              We are committed to providing exceptional living standards through transparent governance, active community engagement, and sustainable practices. Our mission is to foster a sense of belonging and ensure the well-being of all residents.
            </p>
          </div>

          {/* Core Objectives */}
          <div className="mb-5">
            <h2 className="mb-4" style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--slate-900)',
              letterSpacing: '-0.01em'
            }}>
              Core Objectives
            </h2>
            
            {[
              {
                num: 1,
                title: 'Transparent Governance',
                desc: 'Maintain open communication with residents through regular updates, accessible financial records, and democratic decision-making processes.'
              },
              {
                num: 2,
                title: 'Safety & Security',
                desc: 'Ensure the safety of all residents through 24/7 security personnel, CCTV surveillance, and strict access control measures.'
              },
              {
                num: 3,
                title: 'Quality Infrastructure',
                desc: 'Maintain and upgrade society infrastructure including roads, lifts, power backup, water supply, and common areas.'
              },
              {
                num: 4,
                title: 'Environmental Sustainability',
                desc: 'Promote green practices including waste segregation, rainwater harvesting, energy conservation, and maintaining green spaces.'
              },
              {
                num: 5,
                title: 'Community Engagement',
                desc: 'Foster community spirit through regular events, cultural celebrations, and platforms for resident interaction and feedback.'
              },
              {
                num: 6,
                title: 'Financial Prudence',
                desc: 'Ensure responsible financial management with regular audits, timely maintenance fund collection, and cost-effective vendor management.'
              }
            ].map((objective, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: index < 5 ? '2rem' : '0'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--blue-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  color: 'var(--blue-700)'
                }}>
                  {objective.num}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: 'var(--slate-900)',
                    marginBottom: '0.5rem'
                  }}>
                    {objective.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: 'var(--slate-600)',
                    marginBottom: '0'
                  }}>
                    {objective.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Commitment Statement */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--slate-900)',
              marginBottom: '1rem'
            }}>
              Our Commitment
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'var(--slate-600)',
              marginBottom: '0'
            }}>
              We are committed to continuously improving our services, listening to resident concerns, and adapting to changing needs. Through collaborative efforts and shared responsibility, we aim to make our society a model residential community.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
