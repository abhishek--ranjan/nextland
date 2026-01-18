'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingState from '@/components/admin/LoadingState';
import EmptyState from '@/components/admin/EmptyState';

export default function EventsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [timeFilter, setTimeFilter] = useState(searchParams.get('time') || 'all');
  const [deleteDialog, setDeleteDialog] = useState({ show: false, event: null });

  useEffect(() => {
    fetchEvents();
  }, [statusFilter, categoryFilter, timeFilter, searchTerm]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (timeFilter !== 'all') params.append('time', timeFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/events?${params}`);
      const data = await response.json();
      
      // Filter out null/undefined events and ensure all required fields
      const validEvents = (data.events || [])
        .filter(event => event && event.id)
        .map(event => ({
          ...event,
          status: event.status || 'published',
          date: event.date || event.createdAt,
          category: event.category || 'general'
        }));
      setEvents(validEvents);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const handleArchive = async () => {
    if (!deleteDialog.event) return;

    try {
      const response = await fetch(`/api/admin/events/${deleteDialog.event.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchEvents();
        setDeleteDialog({ show: false, event: null });
      }
    } catch (error) {
      console.error('Failed to archive event:', error);
    }
  };

  const handleRestore = async (eventId) => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}/restore`, {
        method: 'POST'
      });

      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Failed to restore event:', error);
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (event) => (
        <div>
          <Link 
            href={`/admin/events/${event.id}`}
            className="text-decoration-none fw-semibold"
          >
            {event.title}
          </Link>
          {event.featured && (
            <span className="badge bg-warning text-dark ms-2">Featured</span>
          )}
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (event) => (
        <span className="text-capitalize">{event.category}</span>
      )
    },
    {
      key: 'date',
      label: 'Date & Time',
      render: (event) => {
        const dateValue = event?.date || event?.createdAt;
        return (
          <div>
            <div>{dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A'}</div>
            {event?.time && <small className="text-muted">{event.time}</small>}
          </div>
        );
      }
    },
    {
      key: 'location',
      label: 'Location',
      render: (event) => event?.location || '-'
    },
    {
      key: 'status',
      label: 'Status',
      render: (event) => <StatusBadge status={event?.status || 'published'} />
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (event) => {
        if (!event) return null;
        const eventStatus = event.status || 'published';
        return (
          <div className="d-flex gap-2">
            <Link
              href={`/admin/events/${event.id}`}
              className="btn btn-sm btn-outline-primary"
            >
              Edit
            </Link>
            {eventStatus === 'archived' ? (
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => handleRestore(event.id)}
              >
                Restore
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setDeleteDialog({ show: true, event })}
              >
                Archive
              </button>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <PageHeader
        title="Events"
        description="Manage society events and activities"
        action={{
          label: 'Create Event',
          onClick: () => router.push('/admin/events/new')
        }}
      />

      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="col-md-2">
              <select
                className="form-select"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
                <option value="festival">Festival</option>
                <option value="meeting">Meeting</option>
                <option value="workshop">Workshop</option>
                <option value="celebration">Celebration</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading events..." />
      ) : events.length === 0 ? (
        <EmptyState
          icon="🎉"
          title="No events found"
          description={
            searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || timeFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first event to get started'
          }
          action={
            searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || timeFilter !== 'all'
              ? undefined
              : (
                  <button
                    className="btn btn-primary"
                    onClick={() => router.push('/admin/events/new')}
                  >
                    Create Event
                  </button>
                )
          }
        />
      ) : (
        <div className="card">
          <div className="card-body">
            <DataTable columns={columns} data={events} />
          </div>
        </div>
      )}

      <ConfirmDialog
        show={deleteDialog.show}
        title="Archive Event"
        message={`Are you sure you want to archive "${deleteDialog.event?.title}"?`}
        variant="warning"
        confirmLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setDeleteDialog({ show: false, event: null })}
      />
    </div>
  );
}
