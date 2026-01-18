'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommitteeMemberForm({ member }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: member?.name || '',
    designation: member?.designation || 'president',
    email: member?.email || '',
    phone: member?.phone || '',
    termStart: member?.termStart || '',
    termEnd: member?.termEnd || '',
    displayOrder: member?.displayOrder || 1
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const designations = [
    { value: 'president', label: 'President' },
    { value: 'vice-president', label: 'Vice President' },
    { value: 'secretary', label: 'Secretary' },
    { value: 'treasurer', label: 'Treasurer' },
    { value: 'member', label: 'Member' }
  ];

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.designation) {
      newErrors.designation = 'Designation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setSaving(true);
    
    try {
      const url = member 
        ? `/api/admin/committee/${member.id}`
        : '/api/admin/committee';
      
      const method = member ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to save member');
      }

      router.push('/admin/committee');
    } catch (error) {
      console.error('Save error:', error);
      setErrors({ submit: 'Failed to save member. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="committee-form">
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          {errors.submit}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter member name"
          disabled={saving}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name}</div>
        )}
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="designation" className="form-label">
            Designation <span className="text-danger">*</span>
          </label>
          <select
            id="designation"
            name="designation"
            className={`form-select ${errors.designation ? 'is-invalid' : ''}`}
            value={formData.designation}
            onChange={handleChange}
            disabled={saving}
          >
            <option value="">Select designation</option>
            {designations.map(des => (
              <option key={des.value} value={des.value}>
                {des.label}
              </option>
            ))}
          </select>
          {errors.designation && (
            <div className="invalid-feedback">{errors.designation}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="displayOrder" className="form-label">
            Display Order
          </label>
          <input
            type="number"
            id="displayOrder"
            name="displayOrder"
            className="form-control"
            value={formData.displayOrder}
            onChange={handleChange}
            min="1"
            disabled={saving}
          />
          <small className="text-muted">Lower numbers appear first</small>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            disabled={saving}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 12345 67890"
            disabled={saving}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="termStart" className="form-label">
            Term Start Date
          </label>
          <input
            type="date"
            id="termStart"
            name="termStart"
            className="form-control"
            value={formData.termStart}
            onChange={handleChange}
            disabled={saving}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="termEnd" className="form-label">
            Term End Date
          </label>
          <input
            type="date"
            id="termEnd"
            name="termEnd"
            className="form-control"
            value={formData.termEnd}
            onChange={handleChange}
            disabled={saving}
          />
        </div>
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? 'Saving...' : member ? 'Update Member' : 'Add Member'}
        </button>
        
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
