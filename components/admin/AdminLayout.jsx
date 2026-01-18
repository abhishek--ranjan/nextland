"use client";

import { useState } from 'react';
import AdminNav from './AdminNav';
import AdminTopBar from './AdminTopBar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Top Bar */}
      <AdminTopBar onToggleSidebar={toggleSidebar} />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="d-lg-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1040
          }}
          onClick={closeSidebar}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              closeSidebar();
            }
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <AdminNav isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <main
        style={{
          marginTop: '60px',
          minHeight: 'calc(100vh - 60px)'
        }}
        className="admin-main-content"
      >
        <div className="container-fluid p-3 p-md-4">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .admin-main-content {
          margin-left: 0;
          transition: margin-left 0.3s ease;
        }

        @media (min-width: 992px) {
          .admin-main-content {
            margin-left: 240px;
          }
        }
      `}</style>
    </div>
  );
}
