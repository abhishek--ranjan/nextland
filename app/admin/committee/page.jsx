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

export default function CommitteePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [deleteDialog, setDeleteDialog] = useState({ show: false, member: null });

  useEffect(() => {
    fetchMembers();
  }, [statusFilter, searchTerm]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/committee?${params}`);
      const data = await response.json();
      
      // Filter out null/undefined members and ensure all required fields
      const validMembers = (data.members || [])
        .filter(member => member && member.id)
        .map(member => ({
          ...member,
          status: member.status || 'active',
          email: member.email || '',
          phone: member.phone || '',
          designation: member.designation || 'member'
        }));
      setMembers(validMembers);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMembers();
  };

  const handleArchive = async () => {
    if (!deleteDialog.member) return;

    try {
      const response = await fetch(`/api/admin/committee/${deleteDialog.member.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchMembers();
        setDeleteDialog({ show: false, member: null });
      }
    } catch (error) {
      console.error('Failed to archive member:', error);
    }
  };

  const getDesignationLabel = (designation) => {
    const labels = {
      'president': 'President',
      'vice-president': 'Vice President',
      'secretary': 'Secretary',
      'treasurer': 'Treasurer',
      'member': 'Member'
    };
    return labels[designation] || designation;
  };

  const columns = [
    {
      key: 'displayOrder',
      label: '#',
      render: (member) => member.displayOrder || '-'
    },
    {
      key: 'name',
      label: 'Name',
      render: (member) => (
        <Link 
          href={`/admin/committee/${member.id}`}
          className="text-decoration-none fw-semibold"
        >
          {member.name}
        </Link>
      )
    },
    {
      key: 'designation',
      label: 'Designation',
      render: (member) => getDesignationLabel(member.designation)
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (member) => {
        const email = member?.email || '';
        const phone = member?.phone || '';
        return (
          <div>
            {email && <div className="small">{email}</div>}
            {phone && <div className="small text-muted">{phone}</div>}
            {!email && !phone && <span className="text-muted">-</span>}
          </div>
        );
      }
    },
    {
      key: 'term',
      label: 'Term',
      render: (member) => {
        if (!member?.termStart && !member?.termEnd) return '-';
        return (
          <div className="small">
            {member.termStart && new Date(member.termStart).toLocaleDateString()}
            {member.termStart && member.termEnd && ' - '}
            {member.termEnd && new Date(member.termEnd).toLocaleDateString()}
          </div>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      render: (member) => <StatusBadge status={member?.status || 'active'} />
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (member) => {
        if (!member) return null;
        const memberStatus = member.status || 'active';
        return (
          <div className="d-flex gap-2">
            <Link
              href={`/admin/committee/${member.id}`}
              className="btn btn-sm btn-outline-primary"
            >
              Edit
            </Link>
            {memberStatus !== 'archived' && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setDeleteDialog({ show: true, member })}
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
        title="Committee Members"
        description="Manage managing committee members"
        action={{
          label: 'Add Member',
          onClick: () => router.push('/admin/committee/new')
        }}
      />

      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="col-md-4">
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
            
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading members..." />
      ) : members.length === 0 ? (
        <EmptyState
          icon="👥"
          title="No members found"
          description={
            searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Add your first committee member to get started'
          }
          action={
            searchTerm || statusFilter !== 'all'
              ? undefined
              : (
                  <button
                    className="btn btn-primary"
                    onClick={() => router.push('/admin/committee/new')}
                  >
                    Add Member
                  </button>
                )
          }
        />
      ) : (
        <div className="card">
          <div className="card-body">
            <DataTable columns={columns} data={members} />
          </div>
        </div>
      )}

      <ConfirmDialog
        show={deleteDialog.show}
        title="Archive Member"
        message={`Are you sure you want to archive "${deleteDialog.member?.name}"?`}
        variant="warning"
        confirmLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setDeleteDialog({ show: false, member: null })}
      />
    </div>
  );
}
