'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import LoadingState from '@/components/admin/LoadingState';

export default function ContactInfoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    officeAddress: '',
    officePhone: '',
    officeEmail: '',
    emergencyContact: '',
    emergencyPhone: '',
    mapUrl: '',
    officeHours: ''
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/contact');
      
      if (!response.ok) {
        throw new Error('Failed to fetch contact information');
      }

      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const response = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update contact information');
      }

      setSuccess(true);
      setFormData(result.data);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading contact information..." />;
  }

  return (
    <div className="container-fluid">
      <PageHeader
        title="Contact Information"
        description="Manage society office contact details and emergency contacts"
      />

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
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
                  Contact information updated successfully!
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccess(false)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Office Information */}
                <h5 className="mb-3">
                  <i className="bi bi-building me-2"></i>
                  Office Information
                </h5>

                <div className="mb-3">
                  <label htmlFor="officeAddress" className="form-label">
                    Office Address <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="officeAddress"
                    name="officeAddress"
                    className="form-control"
                    rows="3"
                    value={formData.officeAddress}
                    onChange={handleChange}
                    required
                    placeholder="Enter complete office address"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="officePhone" className="form-label">
                      Office Phone
                    </label>
                    <input
                      type="tel"
                      id="officePhone"
                      name="officePhone"
                      className="form-control"
                      value={formData.officePhone}
                      onChange={handleChange}
                      placeholder="+91-80-1234-5678"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="officeEmail" className="form-label">
                      Office Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="officeEmail"
                      name="officeEmail"
                      className="form-control"
                      value={formData.officeEmail}
                      onChange={handleChange}
                      required
                      placeholder="office@example.com"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="officeHours" className="form-label">
                    Office Hours
                  </label>
                  <textarea
                    id="officeHours"
                    name="officeHours"
                    className="form-control"
                    rows="2"
                    value={formData.officeHours}
                    onChange={handleChange}
                    placeholder="Monday - Friday: 9:00 AM - 6:00 PM"
                  />
                  <small className="text-muted">
                    Enter office timing details (use line breaks for multiple lines)
                  </small>
                </div>

                <hr className="my-4" />

                {/* Emergency Contact */}
                <h5 className="mb-3">
                  <i className="bi bi-shield-exclamation me-2"></i>
                  Emergency Contact
                </h5>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="emergencyContact" className="form-label">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      className="form-control"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Security Helpdesk"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="emergencyPhone" className="form-label">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      className="form-control"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      placeholder="+91-98765-43210"
                    />
                  </div>
                </div>

                <hr className="my-4" />

                {/* Map Information */}
                <h5 className="mb-3">
                  <i className="bi bi-geo-alt me-2"></i>
                  Location
                </h5>

                <div className="mb-3">
                  <label htmlFor="mapUrl" className="form-label">
                    Map URL
                  </label>
                  <input
                    type="url"
                    id="mapUrl"
                    name="mapUrl"
                    className="form-control"
                    value={formData.mapUrl}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/?q=Your+Society"
                  />
                  <small className="text-muted">
                    Provide Google Maps or any map service URL for directions
                  </small>
                </div>

                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={fetchContactInfo}
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
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card bg-light">
            <div className="card-body">
              <h6 className="card-title">
                <i className="bi bi-info-circle me-2"></i>
                Information
              </h6>
              <p className="card-text small text-muted mb-2">
                This contact information will be displayed on the public Contact Us page.
              </p>
              <ul className="small text-muted mb-0">
                <li>Office address and email are required fields</li>
                <li>Emergency contact will be highlighted for quick access</li>
                <li>Map URL helps residents find directions easily</li>
                <li>Use clear and accurate information</li>
              </ul>
            </div>
          </div>

          {formData.updatedAt && (
            <div className="card mt-3">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="bi bi-clock-history me-2"></i>
                  Last Updated
                </h6>
                <p className="card-text small mb-1">
                  {new Date(formData.updatedAt).toLocaleString()}
                </p>
                {formData.updatedBy && (
                  <p className="card-text small text-muted mb-0">
                    By: {formData.updatedBy}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
