"use client";

import { useEffect, useState } from 'react';

export default function UtilityBar() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => {
        // Use defaults if fetch fails
      });
  }, []);

  if (!config) return null;

  const emergencyNumber = config.emergencyContact || config.contactNumber || "+91-12345-67890";
  const officeHours = config.officeHours || "10am to 6pm";
  const emergencyHref = emergencyNumber.replace(/[^+\d]/g, "");

  return (
    <div className="text-white" style={{backgroundColor: 'var(--slate-900)', fontSize: '0.875rem', padding: '0.625rem 0', position: 'sticky', top: 0, zIndex: 1030}}>
      <div className="container" style={{maxWidth: '1140px'}}>
        <div className="row align-items-center">
          <div className="col-md-8">
            <a href="/notices" className="text-white text-decoration-none me-4" style={{opacity: 0.95}}>
              <span style={{fontSize: '0.875rem', marginRight: '0.25rem'}}>📢</span> <strong>Latest:</strong> <span style={{fontWeight: 400}}>AGM Meeting on Jan 15, 2026</span>
            </a>
            <a href={`tel:${emergencyHref}`} className="text-white text-decoration-none" style={{opacity: 0.95}}>
              <span style={{fontSize: '0.875rem', marginRight: '0.25rem'}}>🚨</span> <strong style={{color: 'var(--red-300)'}}>Emergency:</strong> <span style={{fontWeight: 400}}>{emergencyNumber}</span>
            </a>
          </div>
          <div className="col-md-4 text-md-end mt-2 mt-md-0">
            <span style={{opacity: 0.9}}><span style={{fontSize: '0.875rem', marginRight: '0.25rem'}}>🕒</span> Office: {officeHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
