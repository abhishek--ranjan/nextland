"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminTopBar({ onToggleSidebar }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [societyName, setSocietyName] = useState('Nextland Society');

  useEffect(() => {
    // Fetch session data
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
      });

    // Fetch society name
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.societyName) {
          setSocietyName(data.societyName);
        }
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-dark text-white" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      zIndex: 1030,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="d-flex align-items-center justify-content-between h-100 px-3 px-md-4">
        {/* Left: Hamburger + Brand */}
        <div className="d-flex align-items-center gap-3">
          {/* Hamburger Menu - Mobile Only */}
          <button
            className="btn btn-link text-white p-0 d-lg-none"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar navigation"
            style={{ fontSize: '1.5rem', textDecoration: 'none' }}
          >
            <i className="bi bi-list"></i>
          </button>

          <h1 className="mb-0 fs-5 fw-bold text-white">
            Nextland Admin
          </h1>
          <span className="d-none d-md-inline small text-muted border-start border-secondary ps-3">
            {societyName}
          </span>
        </div>

        {/* Right: User & Logout */}
        <div className="d-flex align-items-center gap-2 gap-md-3">
          {user && (
            <div className="d-none d-md-flex align-items-center gap-2">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                {user.name?.charAt(0) || 'A'}
              </div>
              <div className="d-none d-lg-block">
                <div className="small fw-semibold">{user.name}</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {user.role === 'admin' ? 'Administrator' : 'Editor'}
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="btn btn-outline-light btn-sm"
            aria-label="Logout from admin panel"
          >
            <i className="bi bi-box-arrow-right me-1 d-none d-sm-inline"></i>
            <span className="d-none d-sm-inline">Logout</span>
            <i className="bi bi-box-arrow-right d-sm-none"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
