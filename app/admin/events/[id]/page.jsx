'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import PageHeader from '@/components/admin/PageHeader';
import EventForm from '@/components/admin/EventForm';
import LoadingState from '@/components/admin/LoadingState';

export default function EditEventPage({ params }) {
  const resolvedParams = use(params);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [resolvedParams.id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/events/${resolvedParams.id}`);
      
      if (!response.ok) {
        throw new Error('Event not found');
      }

      const data = await response.json();
      setEvent(data.event);
    } catch (error) {
      console.error('Failed to fetch event:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading event..." />;
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
        title="Edit Event"
        description={`Editing: ${event?.title}`}
      />

      <div className="card">
        <div className="card-body">
          <EventForm event={event} />
        </div>
      </div>
    </div>
  );
}
