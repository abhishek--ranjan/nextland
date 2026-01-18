'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import DocumentForm from '@/components/admin/DocumentForm';
import LoadingState from '@/components/admin/LoadingState';

export default function EditDocumentPage({ params }) {
  const resolvedParams = use(params);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocument();
  }, [resolvedParams.id]);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/documents/${resolvedParams.id}`);
      
      if (!response.ok) {
        throw new Error('Document not found');
      }

      const data = await response.json();
      setDocument(data.document);
    } catch (error) {
      console.error('Failed to fetch document:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading document..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Document"
        description={`Editing: ${document?.title}`}
      />

      <div className="card">
        <div className="card-body">
          <DocumentForm document={document} />
        </div>
      </div>
    </div>
  );
}
