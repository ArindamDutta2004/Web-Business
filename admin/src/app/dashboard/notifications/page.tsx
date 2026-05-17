'use client';

import ResourcePage, { formatDate, StatusBadge, statusTone } from '@/components/admin/ResourcePage';

export default function NotificationsAdminPage() {
  return (
    <ResourcePage
      title="Notifications"
      kicker="[SYSTEM]"
      description="Send announcements and review notification delivery across active users."
      listPath="/notifications/admin/all"
      createPath="/notifications/admin"
      deletePath={(notification) => `/notifications/${notification._id}`}
      createLabel="Send notification"
      allowEdit={false}
      getTitle={(notification) => notification.title}
      fields={[
        { name: 'audience', label: 'Audience', type: 'select', options: [
          { label: 'All active users', value: 'all' },
          { label: 'Admins only', value: 'admins' },
        ] },
        { name: 'type', label: 'Type', type: 'select', options: [
          { label: 'Info', value: 'info' },
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' },
          { label: 'Error', value: 'error' },
          { label: 'Project', value: 'project' },
          { label: 'Invoice', value: 'invoice' },
          { label: 'System', value: 'system' },
        ] },
        { name: 'title', label: 'Title', required: true },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
        { name: 'link', label: 'Link' },
      ]}
      initialForm={{ audience: 'all', type: 'info' }}
      columns={[
        {
          label: 'Notification',
          render: (notification) => (
            <>
              <span className="admin-table-title">{notification.title}</span>
              <span className="admin-table-subtitle">{notification.message}</span>
            </>
          ),
        },
        { label: 'Recipient', render: (notification) => notification.user?.email || '-' },
        { label: 'Type', render: (notification) => <StatusBadge value={notification.type} tone={statusTone(notification.type)} /> },
        { label: 'Read', render: (notification) => <StatusBadge value={notification.isRead ? 'read' : 'unread'} tone={notification.isRead ? 'success' : 'warning'} /> },
        { label: 'Sent', render: (notification) => formatDate(notification.createdAt) },
      ]}
      filterItem={(notification, query) => `${notification.title} ${notification.message} ${notification.user?.email || ''}`.toLowerCase().includes(query)}
    />
  );
}
