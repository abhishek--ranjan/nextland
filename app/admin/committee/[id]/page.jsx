'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import CommitteeMemberForm from '@/components/admin/CommitteeMemberForm';
import LoadingState from '@/components/admin/LoadingState';

export default function EditCommitteeMemberPage({ params }) {
  const resolvedParams = use(params);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMember();
  }, [resolvedParams.id]);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/committee/${resolvedParams.id}`);
      
      if (!response.ok) {
        throw new Error('Member not found');
      }

      const data = await response.json();
      setMember(data.member);
    } catch (error) {
      console.error('Failed to fetch member:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading member..." />;
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
        title="Edit Committee Member"
        description={`Editing: ${member?.name}`}
      />

      <div className="card">
        <div className="card-body">
          <CommitteeMemberForm member={member} />
        </div>
      </div>
    </div>
  );
}
