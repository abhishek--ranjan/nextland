"use client";

import { useEffect, useState } from 'react';
import { getActionLabel } from '@/utils/auditLogClient';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    Promise.all([
      fetch('/api/admin/dashboard/stats').then(res => res.json()),
      fetch('/api/admin/dashboard/activity').then(res => res.json())
    ]).then(([statsData, activityData]) => {
      setStats(statsData);
      setActivity(activityData.logs || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--slate-600)' }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4">
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: 'var(--slate-900)',
          marginBottom: '0.5rem'
        }}>
          Dashboard
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'var(--slate-600)',
          margin: 0
        }}>
          Welcome to Nextland Society Admin Panel
        </p>
      </div>

      {/* Quick Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-lg-3">
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--blue-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📢
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--slate-600)',
                  marginBottom: '0.25rem'
                }}>
                  Notices
                </div>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'var(--slate-900)'
                }}>
                  {stats?.notices?.active || 0}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--slate-500)'
                }}>
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--green-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📅
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--slate-600)',
                  marginBottom: '0.25rem'
                }}>
                  Events
                </div>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'var(--slate-900)'
                }}>
                  {stats?.events?.upcoming || 0}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--slate-500)'
                }}>
                  Upcoming
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--purple-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📄
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--slate-600)',
                  marginBottom: '0.25rem'
                }}>
                  Documents
                </div>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'var(--slate-900)'
                }}>
                  {stats?.documents?.total || 0}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--slate-500)'
                }}>
                  Total
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--yellow-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🖼️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--slate-600)',
                  marginBottom: '0.25rem'
                }}>
                  Gallery
                </div>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'var(--slate-900)'
                }}>
                  {stats?.gallery?.albums || 0}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--slate-500)'
                }}>
                  Albums
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--slate-200)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--slate-200)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--slate-900)',
            margin: 0
          }}>
            Recent Activity
          </h2>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {activity.length === 0 ? (
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--slate-500)',
              textAlign: 'center',
              padding: '2rem',
              margin: 0
            }}>
              No recent activity to display
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {activity.map((log, index) => (
                <li
                  key={log.id}
                  style={{
                    padding: '1rem 0',
                    borderBottom: index < activity.length - 1 ? '1px solid var(--slate-100)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--blue-500)',
                      marginTop: '0.5rem',
                      flexShrink: 0
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.9375rem',
                        fontWeight: '500',
                        color: 'var(--slate-900)',
                        marginBottom: '0.25rem'
                      }}>
                        {getActionLabel(log.action)}
                      </div>
                      <div style={{
                        fontSize: '0.8125rem',
                        color: 'var(--slate-600)'
                      }}>
                        {log.user.name} • {new Date(log.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
