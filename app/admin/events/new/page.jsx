'use client';

import PageHeader from '@/components/admin/PageHeader';
import EventForm from '@/components/admin/EventForm';

export default function NewEventPage() {
  return (
    <div>
      <PageHeader
        title="Create Event"
        description="Create a new event or activity"
      />

      <div className="card">
        <div className="card-body">
          <EventForm />
        </div>
      </div>
    </div>
  );
}
