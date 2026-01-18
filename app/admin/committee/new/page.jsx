'use client';

import PageHeader from '@/components/admin/PageHeader';
import CommitteeMemberForm from '@/components/admin/CommitteeMemberForm';

export default function NewCommitteeMemberPage() {
  return (
    <div>
      <PageHeader
        title="Add Committee Member"
        description="Add a new managing committee member"
      />

      <div className="card">
        <div className="card-body">
          <CommitteeMemberForm />
        </div>
      </div>
    </div>
  );
}
