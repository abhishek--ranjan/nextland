'use client';

import PageHeader from '@/components/admin/PageHeader';
import DocumentForm from '@/components/admin/DocumentForm';

export default function NewDocumentPage() {
  return (
    <div>
      <PageHeader
        title="Upload Document"
        description="Upload a new document to the society library"
      />

      <div className="card">
        <div className="card-body">
          <DocumentForm />
        </div>
      </div>
    </div>
  );
}
