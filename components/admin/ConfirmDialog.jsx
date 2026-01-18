"use client";

import { useState } from 'react';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger" // danger, warning, info
}) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  const variantConfig = {
    danger: {
      bg: 'var(--red-600)',
      bgHover: 'var(--red-700)',
      text: 'white'
    },
    warning: {
      bg: 'var(--yellow-600)',
      bgHover: 'var(--yellow-700)',
      text: 'white'
    },
    info: {
      bg: 'var(--blue-600)',
      bgHover: 'var(--blue-700)',
      text: 'white'
    }
  };

  const config = variantConfig[variant];

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          animation: 'fadeIn 0.2s'
        }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '480px',
          backgroundColor: 'white',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 9999,
          animation: 'slideIn 0.3s'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--slate-200)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--slate-900)',
            margin: 0
          }}>
            {title}
          </h3>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          <p style={{
            fontSize: '0.9375rem',
            lineHeight: '1.6',
            color: 'var(--slate-600)',
            margin: 0
          }}>
            {message}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid var(--slate-200)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem'
        }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '0.625rem 1.25rem',
              fontSize: '0.9375rem',
              fontWeight: '500',
              color: 'var(--slate-700)',
              backgroundColor: 'white',
              border: '1px solid var(--slate-300)',
              borderRadius: 'var(--radius-md)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            style={{
              padding: '0.625rem 1.25rem',
              fontSize: '0.9375rem',
              fontWeight: '500',
              color: config.text,
              backgroundColor: config.bg,
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}
