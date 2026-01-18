'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import LoadingState from '@/components/admin/LoadingState';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('society');
  
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    society: {},
    branding: {},
    features: {}
  });

  // Reset demo confirmation
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [resetting, setResetting] = useState(false);
  const [resetStats, setResetStats] = useState(null);

  useEffect(() => {
    fetchSettings();
    fetchResetStats();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings/society');
      
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const data = await response.json();
      setSettings(data);
      setFormData({
        society: data.society || {},
        branding: data.branding || {},
        features: data.features || {}
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchResetStats = async () => {
    try {
      const response = await fetch('/api/admin/settings/reset-demo');
      if (response.ok) {
        const data = await response.json();
        setResetStats(data.stats);
      }
    } catch (err) {
      // Ignore errors, user might not be super admin
      console.log('Not authorized for reset stats');
    }
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const response = await fetch('/api/admin/settings/society', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update settings');
      }

      setSuccess(true);
      setSettings(result.data);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDemo = async () => {
    if (resetConfirmText !== 'RESET ALL DATA') {
      setError('Please type "RESET ALL DATA" to confirm');
      return;
    }

    try {
      setResetting(true);
      setError(null);

      const response = await fetch('/api/admin/settings/reset-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          confirm: true,
          confirmText: resetConfirmText
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to reset demo data');
      }

      setShowResetDialog(false);
      setResetConfirmText('');
      setSuccess(true);
      await fetchResetStats();
      
      alert('Demo data has been reset successfully! All content has been removed.');
    } catch (err) {
      setError(err.message);
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading settings..." />;
  }

  return (
    <div className="container-fluid">
      <PageHeader
        title="Settings"
        description="Manage system configuration and preferences"
      />

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          Settings updated successfully!
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess(false)}
          ></button>
        </div>
      )}

      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="list-group list-group-flush">
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'society' ? 'active' : ''}`}
                onClick={() => setActiveTab('society')}
              >
                <i className="bi bi-building me-2"></i>
                Society Details
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'branding' ? 'active' : ''}`}
                onClick={() => setActiveTab('branding')}
              >
                <i className="bi bi-palette me-2"></i>
                Branding
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                <i className="bi bi-toggles me-2"></i>
                Features
              </button>
              {resetStats && (
                <button
                  className={`list-group-item list-group-item-action ${activeTab === 'demo' ? 'active' : ''}`}
                  onClick={() => setActiveTab('demo')}
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i>
                  Demo Data
                </button>
              )}
            </div>
          </div>

          {settings?.system && (
            <div className="card mt-3">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="bi bi-info-circle me-2"></i>
                  System Info
                </h6>
                <p className="card-text small mb-1">
                  <strong>Mode:</strong> <span className="badge bg-info">{settings.system.mode}</span>
                </p>
                <p className="card-text small mb-1">
                  <strong>Version:</strong> {settings.system.version}
                </p>
                {settings.updatedAt && (
                  <p className="card-text small text-muted mb-0">
                    <strong>Updated:</strong><br />
                    {new Date(settings.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-9">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Society Details Tab */}
                {activeTab === 'society' && (
                  <>
                    <h5 className="mb-3">Society Details</h5>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Society Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.society.name || ''}
                          onChange={(e) => handleChange('society', 'name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Short Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.society.shortName || ''}
                          onChange={(e) => handleChange('society', 'shortName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.society.address || ''}
                        onChange={(e) => handleChange('society', 'address', e.target.value)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.society.city || ''}
                          onChange={(e) => handleChange('society', 'city', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.society.state || ''}
                          onChange={(e) => handleChange('society', 'state', e.target.value)}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.society.pincode || ''}
                          onChange={(e) => handleChange('society', 'pincode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Registration Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.society.registrationNumber || ''}
                          onChange={(e) => handleChange('society', 'registrationNumber', e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Established Year</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.society.establishedYear || ''}
                          onChange={(e) => handleChange('society', 'establishedYear', e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Branding Tab */}
                {activeTab === 'branding' && (
                  <>
                    <h5 className="mb-3">Branding Settings</h5>
                    
                    <div className="mb-3">
                      <label className="form-label">Tagline</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.branding.tagline || ''}
                        onChange={(e) => handleChange('branding', 'tagline', e.target.value)}
                        placeholder="Building Communities, Creating Homes"
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Primary Color</label>
                        <div className="input-group">
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={formData.branding.primaryColor || '#0d6efd'}
                            onChange={(e) => handleChange('branding', 'primaryColor', e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-control"
                            value={formData.branding.primaryColor || '#0d6efd'}
                            onChange={(e) => handleChange('branding', 'primaryColor', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Secondary Color</label>
                        <div className="input-group">
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={formData.branding.secondaryColor || '#6c757d'}
                            onChange={(e) => handleChange('branding', 'secondaryColor', e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-control"
                            value={formData.branding.secondaryColor || '#6c757d'}
                            onChange={(e) => handleChange('branding', 'secondaryColor', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Accent Color</label>
                        <div className="input-group">
                          <input
                            type="color"
                            className="form-control form-control-color"
                            value={formData.branding.accentColor || '#198754'}
                            onChange={(e) => handleChange('branding', 'accentColor', e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-control"
                            value={formData.branding.accentColor || '#198754'}
                            onChange={(e) => handleChange('branding', 'accentColor', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      Logo and favicon management will be available in a future update.
                    </div>
                  </>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <>
                    <h5 className="mb-3">Feature Toggles</h5>
                    <p className="text-muted mb-4">Enable or disable specific features on the website</p>
                    
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="enableNotices"
                        checked={formData.features.enableNotices || false}
                        onChange={(e) => handleChange('features', 'enableNotices', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="enableNotices">
                        <strong>Notices</strong>
                        <div className="text-muted small">Display notices and announcements</div>
                      </label>
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="enableDocuments"
                        checked={formData.features.enableDocuments || false}
                        onChange={(e) => handleChange('features', 'enableDocuments', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="enableDocuments">
                        <strong>Documents</strong>
                        <div className="text-muted small">Show documents and downloads section</div>
                      </label>
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="enableEvents"
                        checked={formData.features.enableEvents || false}
                        onChange={(e) => handleChange('features', 'enableEvents', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="enableEvents">
                        <strong>Events</strong>
                        <div className="text-muted small">Display upcoming and past events</div>
                      </label>
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="enableGallery"
                        checked={formData.features.enableGallery || false}
                        onChange={(e) => handleChange('features', 'enableGallery', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="enableGallery">
                        <strong>Gallery</strong>
                        <div className="text-muted small">Show photo gallery and albums</div>
                      </label>
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="enableCommittee"
                        checked={formData.features.enableCommittee || false}
                        onChange={(e) => handleChange('features', 'enableCommittee', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="enableCommittee">
                        <strong>Committee</strong>
                        <div className="text-muted small">Display committee members and structure</div>
                      </label>
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="enableContact"
                        checked={formData.features.enableContact || false}
                        onChange={(e) => handleChange('features', 'enableContact', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="enableContact">
                        <strong>Contact</strong>
                        <div className="text-muted small">Show contact information page</div>
                      </label>
                    </div>
                  </>
                )}

                {/* Demo Data Reset Tab */}
                {activeTab === 'demo' && resetStats && (
                  <>
                    <h5 className="mb-3">
                      <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                      Demo Data Management
                    </h5>
                    
                    <div className="alert alert-warning">
                      <h6 className="alert-heading">⚠️ Warning: Destructive Operation</h6>
                      <p className="mb-0">
                        This will permanently delete ALL content and reset the system to default demo data.
                        This action cannot be undone!
                      </p>
                    </div>

                    <div className="card mb-4">
                      <div className="card-header">
                        <h6 className="mb-0">Current Data Statistics</h6>
                      </div>
                      <div className="card-body">
                        <div className="row text-center">
                          <div className="col">
                            <div className="display-6">{resetStats.notices}</div>
                            <small className="text-muted">Notices</small>
                          </div>
                          <div className="col">
                            <div className="display-6">{resetStats.documents}</div>
                            <small className="text-muted">Documents</small>
                          </div>
                          <div className="col">
                            <div className="display-6">{resetStats.events}</div>
                            <small className="text-muted">Events</small>
                          </div>
                          <div className="col">
                            <div className="display-6">{resetStats.gallery}</div>
                            <small className="text-muted">Albums</small>
                          </div>
                          <div className="col">
                            <div className="display-6">{resetStats.committee}</div>
                            <small className="text-muted">Members</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-danger btn-lg"
                      onClick={() => setShowResetDialog(true)}
                    >
                      <i className="bi bi-arrow-counterclockwise me-2"></i>
                      Reset All Demo Data
                    </button>

                    <p className="text-muted mt-3 small">
                      <strong>Super Admin Only:</strong> This feature is only accessible to users with super admin privileges.
                    </p>
                  </>
                )}

                {/* Save button (not shown on demo tab) */}
                {activeTab !== 'demo' && (
                  <div className="d-flex gap-2 justify-content-end mt-4 pt-3 border-top">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={fetchSettings}
                      disabled={saving}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-lg me-2"></i>
                          Save Settings
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <ConfirmDialog
          show={showResetDialog}
          title="Reset All Demo Data"
          message={
            <>
              <p className="text-danger fw-bold">
                This will delete ALL content including notices, documents, events, gallery albums, and committee members!
              </p>
              <p>Type <strong>RESET ALL DATA</strong> to confirm:</p>
              <input
                type="text"
                className="form-control"
                value={resetConfirmText}
                onChange={(e) => setResetConfirmText(e.target.value)}
                placeholder="Type: RESET ALL DATA"
                autoFocus
              />
            </>
          }
          confirmText="Reset Everything"
          confirmVariant="danger"
          onConfirm={handleResetDemo}
          onCancel={() => {
            setShowResetDialog(false);
            setResetConfirmText('');
          }}
          loading={resetting}
        />
      )}
    </div>
  );
}
