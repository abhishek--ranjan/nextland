'use client';

import { useState, useRef } from 'react';

export default function PhotoUploader({ onPhotosSelect, disabled }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const maxSize = 5 * 1024 * 1024; // 5MB
  const maxFiles = 20;

  const validateFiles = (files) => {
    setError('');

    if (files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return false;
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return false;
      }

      if (file.size > maxSize) {
        setError(`Each file must be less than 5MB`);
        return false;
      }
    }

    return true;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && validateFiles(files)) {
      setSelectedFiles(files);
      if (onPhotosSelect) {
        onPhotosSelect(files);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && validateFiles(files)) {
      setSelectedFiles(files);
      if (onPhotosSelect) {
        onPhotosSelect(files);
      }
    }
  };

  const handleRemove = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    if (onPhotosSelect) {
      onPhotosSelect(newFiles);
    }
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onPhotosSelect) {
      onPhotosSelect([]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="photo-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="d-none"
        disabled={disabled}
      />

      {selectedFiles.length === 0 ? (
        <div
          className={`upload-area border-2 border-dashed rounded p-4 text-center ${
            dragActive ? 'border-primary bg-light' : 'border-secondary'
          } ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          <div className="mb-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="mx-auto text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="mb-2">
            <strong>Click to upload</strong> or drag and drop
          </p>
          <p className="text-muted small mb-0">
            Images only (max 5MB each, up to {maxFiles} files)
          </p>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">{selectedFiles.length} file(s) selected</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleClearAll}
              disabled={disabled}
            >
              Clear All
            </button>
          </div>
          <div className="selected-files border rounded p-3 bg-light" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {selectedFiles.map((file, index) => (
              <div key={index} className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="small fw-semibold">{file.name}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-2 mb-0" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
