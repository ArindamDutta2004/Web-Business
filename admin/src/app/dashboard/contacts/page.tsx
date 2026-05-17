'use client';

import toast from 'react-hot-toast';
import ResourcePage, { formatDate, StatusBadge, statusTone } from '@/components/admin/ResourcePage';
import api from '@/lib/api';

function messageFromError(error: unknown) {
  if (typeof error === 'object' && error && 'response' in error) {
    return (error as { response?: { data?: { message?: string } } }).response?.data?.message;
  }
  return undefined;
}

const setStatus = async (id: string, status: string, refresh: () => void) => {
  try {
    await api.put(`/contact/${id}/status`, { status });
    toast.success(`Contact marked ${status}`);
    refresh();
  } catch (error: unknown) {
    toast.error(messageFromError(error) || 'Could not update contact');
  }
};

export default function ContactsPage() {
  return (
    <ResourcePage
      title="Contact Submissions"
      kicker="[INBOX]"
      description="View inbound contact messages and manage their lifecycle from new to resolved."
      listPath="/contact"
      createLabel="Contact"
      allowCreate={false}
      allowEdit={false}
      getTitle={(contact) => contact.subject}
      fields={[]}
      columns={[
        {
          label: 'Contact',
          render: (contact) => (
            <>
              <span className="admin-table-title">{contact.name}</span>
              <span className="admin-table-subtitle">{contact.email} {contact.company ? `- ${contact.company}` : ''}</span>
            </>
          ),
        },
        {
          label: 'Message',
          render: (contact) => (
            <>
              <span className="admin-table-title">{contact.subject}</span>
              <span className="admin-table-subtitle">{contact.message}</span>
            </>
          ),
        },
        { label: 'Service', render: (contact) => contact.service || '-' },
        { label: 'Status', render: (contact) => <StatusBadge value={contact.status} tone={statusTone(contact.status)} /> },
        { label: 'Received', render: (contact) => formatDate(contact.createdAt) },
      ]}
      rowActions={(contact, refresh) => (
        <>
          {['read', 'resolved', 'archived'].map((status) => (
            <button key={status} type="button" className="admin-mini-button" onClick={() => setStatus(contact._id, status, refresh)}>
              {status}
            </button>
          ))}
        </>
      )}
      deletePath={(contact) => `/contact/${contact._id}`}
      filterItem={(contact, query) => `${contact.name} ${contact.email} ${contact.subject} ${contact.message}`.toLowerCase().includes(query)}
    />
  );
}
