"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (!data.authenticated) {
          router.push('/login');
          return;
        }

        // Check role if required
        if (requiredRole && data.user.role !== requiredRole && data.user.role !== 'admin') {
          router.push('/admin');
          return;
        }

        setAuthenticated(true);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--slate-50)'
      }}>
        <div style={{
          fontSize: '1.125rem',
          color: 'var(--slate-600)'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
