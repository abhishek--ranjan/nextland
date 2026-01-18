"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import adminNavData from '@/data/admin-navigation.json';

export default function AdminNav({ isOpen, onClose }) {
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav
      className={`admin-sidebar ${isOpen ? 'open' : ''}`}
      style={{
        width: '240px',
        height: 'calc(100vh - 60px)',
        position: 'fixed',
        left: isOpen ? 0 : '-240px',
        top: '60px',
        backgroundColor: 'white',
        borderRight: '1px solid #e2e8f0',
        overflowY: 'auto',
        padding: '1.5rem 0',
        transition: 'left 0.3s ease',
        zIndex: 1041
      }}
      role="navigation"
      aria-label="Admin navigation"
    >
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {adminNavData.adminNavigation.filter(item => item.enabled).map((item) => {
          const active = isActive(item.path);
          
          return (
            <li key={item.id} style={{ marginBottom: '0.25rem' }}>
              <a
                href={item.path}
                className={`nav-link ${active ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: active ? '600' : '500',
                  color: active ? '#2563eb' : '#334155',
                  backgroundColor: active ? '#eff6ff' : 'transparent',
                  borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                aria-current={active ? 'page' : undefined}
              >
                <span style={{ fontSize: '1.25rem' }} aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        @media (min-width: 992px) {
          .admin-sidebar {
            left: 0 !important;
          }
        }
      `}</style>
    </nav>
  );
}
