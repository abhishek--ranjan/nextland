'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import NoticeForm from '@/components/admin/NoticeForm';
import LoadingState from '@/components/admin/LoadingState';

export default function EditNoticePage({ params }) {
  const resolvedParams = use(params);
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotice();
  }, [resolvedParams.id]);

  const fetchNotice = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/notices/${resolvedParams.id}`);
      
      if (!response.ok) {
        throw new Error('Notice not found');
      }

      const data = await response.json();
      setNotice(data.notice);
    } catch (error) {
      console.error('Failed to fetch notice:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading notice..." />;
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
        title="Edit Notice"
        description={`Editing: ${notice?.title}`}
      />

      <div className="card">
        <div className="card-body">
          <NoticeForm notice={notice} />
        </div>
      </div>
    </div>
  );
}
