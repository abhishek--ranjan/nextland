'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUploader from './FileUploader';

export default function EventForm({ event }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: event?.title || '',
    category: event?.category || 'cultural',
    description: event?.description || '',
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    featured: event?.featured || false
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Sports' },
    { value: 'festival', label: 'Festival' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'celebration', label: 'Celebration' },
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
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
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
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('category', formData.category);
      formDataObj.append('description', formData.description);
      formDataObj.append('date', formData.date);
      formDataObj.append('time', formData.time);
      formDataObj.append('location', formData.location);
      formDataObj.append('featured', formData.featured.toString());
      formDataObj.append('status', statusOverride || 'active');
      
      if (image) {
        formDataObj.append('image', image);
      }

      const url = event 
        ? `/api/admin/events/${event.id}`
        : '/api/admin/events';
      
      const method = event ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataObj
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save event');
      }

      router.push('/admin/events');
    } catch (error) {
      console.error('Save error:', error);
      setErrors({ submit: error.message || 'Failed to save event. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = (e) => handleSubmit(e, 'active');

  return (
    <form onSubmit={handleSave} className="event-form">
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
          placeholder="Enter event title"
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
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event location"
            disabled={saving}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="date" className="form-label">
            Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            value={formData.date}
            onChange={handleChange}
            disabled={saving}
          />
          {errors.date && (
            <div className="invalid-feedback">{errors.date}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="form-control"
            value={formData.time}
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
          rows="4"
          placeholder="Enter event description"
          disabled={saving}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Event Image
        </label>
        <FileUploader
          accept="image/*"
          maxSize={5}
          onFileSelect={setImage}
          disabled={saving}
        />
        {event?.image && !image && (
          <div className="mt-2">
            <small className="text-muted">Current image: {event.image}</small>
          </div>
        )}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          className="form-check-input"
          checked={formData.featured}
          onChange={handleChange}
          disabled={saving}
        />
        <label htmlFor="featured" className="form-check-label">
          Feature this event on homepage
        </label>
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={saving}
        >
          {saving ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
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
