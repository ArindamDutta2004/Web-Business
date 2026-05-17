'use client';

import ResourcePage, { StatusBadge } from '@/components/admin/ResourcePage';

export default function SEOAdminPage() {
  return (
    <ResourcePage
      title="SEO Management"
      kicker="[SEO]"
      description="Edit metadata records for pages, posts, services, and projects. Use public settings so the frontend can consume them dynamically."
      listPath="/settings"
      createPath="/settings"
      updatePath={() => '/settings'}
      deletePath={(setting) => `/settings/${setting._id}`}
      createLabel="Save metadata"
      getTitle={(setting) => setting.key}
      baseFilter={(setting) => setting.category === 'seo'}
      fields={[
        { name: 'key', label: 'SEO key', required: true, helper: 'Examples: seo.home, seo.about, seo.services, seo.project.my-slug' },
        { name: 'value', label: 'Metadata JSON', type: 'json', required: true, helper: 'Example: {"title":"Services","description":"Premium software services","keywords":["software","AI"]}' },
        { name: 'description', label: 'Internal notes', type: 'textarea' },
        { name: 'isPublic', label: 'Expose publicly', type: 'checkbox' },
      ]}
      initialForm={{ category: 'seo', isPublic: true, value: JSON.stringify({ title: '', description: '', keywords: [] }, null, 2) }}
      mapFormToPayload={(form) => ({ ...form, category: 'seo' })}
      columns={[
        {
          label: 'Page / Entity',
          render: (setting) => (
            <>
              <span className="admin-table-title">{setting.key}</span>
              <span className="admin-table-subtitle">{setting.description || setting.value?.description || 'Metadata record'}</span>
            </>
          ),
        },
        { label: 'Title', render: (setting) => setting.value?.title || '-' },
        { label: 'Public', render: (setting) => <StatusBadge value={setting.isPublic ? 'public' : 'private'} tone={setting.isPublic ? 'success' : 'neutral'} /> },
      ]}
      filterItem={(setting, query) => `${setting.key} ${JSON.stringify(setting.value)} ${setting.description || ''}`.toLowerCase().includes(query)}
    />
  );
}
