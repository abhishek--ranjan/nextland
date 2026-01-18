'use client';

import PageHeader from '@/components/admin/PageHeader';
import NoticeForm from '@/components/admin/NoticeForm';

export default function NewNoticePage() {
  return (
    <div>
      <PageHeader
        title="Create Notice"
        description="Create a new notice or announcement"
      />

      <div className="card">
        <div className="card-body">
          <NoticeForm />
        </div>
      </div>
    </div>
  );
}
