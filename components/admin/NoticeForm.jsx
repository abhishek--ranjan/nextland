'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NoticeForm({ notice, onSave }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: notice?.title || '',
    category: notice?.category || 'general',
    content: notice?.content || '',
    priority: notice?.priority || 'normal',
    status: notice?.status || 'draft'
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'event', label: 'Event' },
    { value: 'security', label: 'Security' },
    { value: 'financial', label: 'Financial' },
    { value: 'meeting', label: 'Meeting' }
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
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
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e, statusOverride) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setSaving(true);
    
    try {
      const submitData = {
        ...formData,
        status: statusOverride || formData.status
      };

      const url = notice 
        ? `/api/admin/notices/${notice.id}`
        : '/api/admin/notices';
      
      const method = notice ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error('Failed to save notice');
      }

      const data = await response.json();
      
      if (onSave) {
        onSave(data.notice);
      } else {
        router.push('/admin/notices');
      }
    } catch (error) {
      console.error('Save error:', error);
      setErrors({ submit: 'Failed to save notice. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = (e) => handleSubmit(e, 'draft');
  const handlePublish = (e) => handleSubmit(e, 'active');

  return (
    <form onSubmit={handleSaveDraft} className="notice-form">
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          {errors.submit}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter notice title"
          disabled={saving}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title}</div>
        )}
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="category" className="form-label">
            Category <span className="text-danger">*</span>
          </label>
          <select
            id="category"
            name="category"
            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
            value={formData.category}
            onChange={handleChange}
            disabled={saving}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleChange}
            disabled={saving}
          >
            {priorities.map(pri => (
              <option key={pri.value} value={pri.value}>
                {pri.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content <span className="text-danger">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          className={`form-control ${errors.content ? 'is-invalid' : ''}`}
          value={formData.content}
          onChange={handleChange}
          rows="8"
          placeholder="Enter notice content"
          disabled={saving}
        />
        {errors.content && (
          <div className="invalid-feedback">{errors.content}</div>
        )}
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-secondary"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save as Draft'}
        </button>
        
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePublish}
          disabled={saving}
        >
          {saving ? 'Publishing...' : 'Publish'}
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
