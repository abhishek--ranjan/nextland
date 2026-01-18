'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUploader from './FileUploader';

export default function DocumentForm({ document }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: document?.title || '',
    category: document?.category || 'minutes',
    description: document?.description || '',
    date: document?.date || new Date().toISOString().split('T')[0]
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'minutes', label: 'Meeting Minutes' },
    { value: 'financial', label: 'Financial Reports' },
    { value: 'bylaws', label: 'Bylaws & Rules' },
    { value: 'circular', label: 'Circulars' },
    { value: 'agreement', label: 'Agreements' },
    { value: 'other', label: 'Other' }
  ];

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!document && !file) {
      newErrors.file = 'File is required';
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
      if (document) {
        // Update metadata only
        const response = await fetch(`/api/admin/documents/${document.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Failed to update document');
        }
      } else {
        // Upload new document
        const formDataObj = new FormData();
        formDataObj.append('title', formData.title);
        formDataObj.append('category', formData.category);
        formDataObj.append('description', formData.description);
        formDataObj.append('date', formData.date);
        formDataObj.append('file', file);

        const response = await fetch('/api/admin/documents', {
          method: 'POST',
          body: formDataObj
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to upload document');
        }
      }

      router.push('/admin/documents');
    } catch (error) {
      console.error('Save error:', error);
      setErrors({ submit: error.message || 'Failed to save document. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="document-form">
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
          placeholder="Enter document title"
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
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            disabled={saving}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Enter document description (optional)"
          disabled={saving}
        />
      </div>

      {!document && (
        <div className="mb-3">
          <label className="form-label">
            File <span className="text-danger">*</span>
          </label>
          <FileUploader
            accept=".pdf"
            maxSize={10}
            onFileSelect={setFile}
            disabled={saving}
          />
          {errors.file && (
            <div className="text-danger small mt-1">{errors.file}</div>
          )}
        </div>
      )}

      {document && (
        <div className="alert alert-info">
          <strong>Current file:</strong> {document.filePath}
          <br />
          <small className="text-muted">File replacement is not supported yet.</small>
        </div>
      )}

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? 'Saving...' : document ? 'Update Document' : 'Upload Document'}
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
