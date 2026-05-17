'use client';

import ResourcePage, { money, StatusBadge, statusTone } from '@/components/admin/ResourcePage';

export default function AdminProjectsPage() {
  return (
    <ResourcePage
      title="Projects"
      kicker="[MANAGEMENT]"
      description="Manage portfolio and client projects. Public completed projects automatically appear on the website."
      listPath="/projects"
      createPath="/projects"
      createLabel="New project"
      getTitle={(project) => project.title}
      fields={[
        { name: 'title', label: 'Project title', required: true },
        { name: 'clientName', label: 'Client name' },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'status', label: 'Status', type: 'select', required: true, options: [
          { label: 'Inquiry', value: 'inquiry' },
          { label: 'Proposal', value: 'proposal' },
          { label: 'In progress', value: 'in-progress' },
          { label: 'Review', value: 'review' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
        ] },
        { name: 'priority', label: 'Priority', type: 'select', options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          { label: 'Urgent', value: 'urgent' },
        ] },
        { name: 'budget', label: 'Budget', type: 'number' },
        { name: 'progress', label: 'Progress %', type: 'number' },
        { name: 'technologies', label: 'Technologies', type: 'tags', helper: 'Comma-separated stack tags.' },
        { name: 'liveUrl', label: 'Live URL' },
        { name: 'repositoryUrl', label: 'Repository URL' },
        { name: 'isPublic', label: 'Show on public website', type: 'checkbox' },
        { name: 'isFeatured', label: 'Featured project', type: 'checkbox' },
        { name: 'seo.metaTitle', label: 'SEO title' },
        { name: 'seo.metaDescription', label: 'SEO description', type: 'textarea' },
      ]}
      initialForm={{ status: 'inquiry', priority: 'medium', progress: 0, isPublic: false, isFeatured: false, currency: 'USD' }}
      mapFormToPayload={(form) => ({
        ...form,
        seo: { metaTitle: form['seo.metaTitle'], metaDescription: form['seo.metaDescription'] },
        currency: 'USD',
      })}
      columns={[
        {
          label: 'Project',
          render: (project) => (
            <>
              <span className="admin-table-title">{project.title}</span>
              <span className="admin-table-subtitle">{project.clientName || project.client?.email || 'No client assigned'}</span>
            </>
          ),
        },
        { label: 'Status', render: (project) => <StatusBadge value={project.status} tone={statusTone(project.status)} /> },
        { label: 'Priority', render: (project) => <StatusBadge value={project.priority} tone={statusTone(project.priority)} /> },
        { label: 'Progress', render: (project) => `${project.progress || 0}%` },
        { label: 'Budget', render: (project) => money(project.budget, project.currency || 'USD') },
        { label: 'Public', render: (project) => <StatusBadge value={project.isPublic ? 'public' : 'private'} tone={project.isPublic ? 'success' : 'neutral'} /> },
      ]}
      filterItem={(project, query) => `${project.title} ${project.clientName || ''} ${project.status}`.toLowerCase().includes(query)}
    />
  );
}
