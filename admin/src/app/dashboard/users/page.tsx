'use client';

import ResourcePage, { formatDate, StatusBadge, statusTone } from '@/components/admin/ResourcePage';

export default function UsersPage() {
  return (
    <ResourcePage
      title="Users"
      kicker="[MANAGEMENT]"
      description="Create, edit, deactivate, and remove client or admin accounts."
      listPath="/users"
      createPath="/users"
      createLabel="Add user"
      getTitle={(user) => `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email}
      fields={[
        { name: 'firstName', label: 'First name', required: true },
        { name: 'lastName', label: 'Last name', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true, createOnly: true, helper: 'Minimum 8 characters.' },
        { name: 'phone', label: 'Phone' },
        { name: 'company', label: 'Company' },
        { name: 'role', label: 'Role', type: 'select', required: true, options: [
          { label: 'User', value: 'user' },
          { label: 'Client', value: 'client' },
          { label: 'Admin', value: 'admin' },
          { label: 'Super Admin', value: 'superadmin' },
        ] },
        { name: 'isActive', label: 'Active account', type: 'checkbox' },
        { name: 'isVerified', label: 'Verified account', type: 'checkbox' },
      ]}
      initialForm={{ role: 'client', isActive: true, isVerified: true }}
      columns={[
        {
          label: 'Name',
          render: (user) => (
            <>
              <span className="admin-table-title">{user.firstName} {user.lastName}</span>
              <span className="admin-table-subtitle">{user.email}</span>
            </>
          ),
        },
        { label: 'Company', render: (user) => user.company || '-' },
        { label: 'Role', render: (user) => <StatusBadge value={user.role} tone={user.role?.includes('admin') ? 'accent' : 'neutral'} /> },
        { label: 'Status', render: (user) => <StatusBadge value={user.isActive ? 'active' : 'inactive'} tone={statusTone(user.isActive ? 'active' : 'inactive')} /> },
        { label: 'Joined', render: (user) => formatDate(user.createdAt) },
      ]}
      filterItem={(user, query) => `${user.firstName} ${user.lastName} ${user.email} ${user.company || ''}`.toLowerCase().includes(query)}
    />
  );
}
