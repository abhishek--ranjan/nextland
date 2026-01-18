'use client';

import { useState, useRef } from 'react';

export default function FileUploader({ accept = '.pdf', maxSize = 10, onFileSelect, disabled }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const maxSizeBytes = maxSize * 1024 * 1024; // Convert MB to bytes

  const validateFile = (file) => {
    setError('');

    if (!file) {
      setError('Please select a file');
      return false;
    }

    // Check file type
    if (accept === '.pdf' && file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return false;
    }

    // Check file size
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      if (onFileSelect) {
        onFileSelect(file);
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

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileSelect) {
      onFileSelect(null);
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
    <div className="file-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="d-none"
        disabled={disabled}
      />

      {!selectedFile ? (
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="mb-2">
            <strong>Click to upload</strong> or drag and drop
          </p>
          <p className="text-muted small mb-0">
            {accept === '.pdf' ? 'PDF files only' : accept} (max {maxSize}MB)
          </p>
        </div>
      ) : (
        <div className="selected-file border rounded p-3 d-flex align-items-center justify-content-between bg-light">
          <div className="d-flex align-items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <div>
              <div className="fw-semibold">{selectedFile.name}</div>
              <div className="text-muted small">{formatFileSize(selectedFile.size)}</div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleRemove}
            disabled={disabled}
          >
            Remove
          </button>
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
