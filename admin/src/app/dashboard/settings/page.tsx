'use client';

import ResourcePage, { formatDate, StatusBadge } from '@/components/admin/ResourcePage';

export default function SettingsAdminPage() {
  return (
    <ResourcePage
      title="Settings"
      kicker="[CONFIGURATION]"
      description="Manage global content and application settings. Public settings are available to the user-facing app without redeploying."
      listPath="/settings"
      createPath="/settings"
      updatePath={() => '/settings'}
      deletePath={(setting) => `/settings/${setting._id}`}
      createLabel="Save setting"
      getTitle={(setting) => setting.key}
      fields={[
        { name: 'key', label: 'Key', required: true, helper: 'Examples: siteName, siteTagline, about.primaryCopy, homepage.heroTitle' },
        { name: 'category', label: 'Category', type: 'select', options: [
          { label: 'General', value: 'general' },
          { label: 'SEO', value: 'seo' },
          { label: 'Email', value: 'email' },
          { label: 'Social', value: 'social' },
          { label: 'Pricing', value: 'pricing' },
          { label: 'Appearance', value: 'appearance' },
        ] },
        { name: 'value', label: 'Value', type: 'textarea', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'isPublic', label: 'Expose publicly', type: 'checkbox' },
      ]}
      initialForm={{ category: 'general', isPublic: true }}
      columns={[
        {
          label: 'Setting',
          render: (setting) => (
            <>
              <span className="admin-table-title">{setting.key}</span>
              <span className="admin-table-subtitle">{setting.description || String(setting.value).slice(0, 90)}</span>
            </>
          ),
        },
        { label: 'Category', render: (setting) => <StatusBadge value={setting.category} tone="neutral" /> },
        { label: 'Public', render: (setting) => <StatusBadge value={setting.isPublic ? 'public' : 'private'} tone={setting.isPublic ? 'success' : 'neutral'} /> },
        { label: 'Updated', render: (setting) => formatDate(setting.updatedAt) },
      ]}
      filterItem={(setting, query) => `${setting.key} ${setting.category} ${setting.description || ''} ${String(setting.value)}`.toLowerCase().includes(query)}
    />
  );
}
