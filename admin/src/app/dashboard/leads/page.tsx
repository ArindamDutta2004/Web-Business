'use client';

import ResourcePage, { formatDate, StatusBadge, statusTone } from '@/components/admin/ResourcePage';

export default function LeadsPage() {
  return (
    <ResourcePage
      title="Leads"
      kicker="[SALES]"
      description="Review incoming leads, update qualification status, and keep sales follow-up organized."
      listPath="/leads"
      createPath="/leads"
      createLabel="Add lead"
      getTitle={(lead) => lead.name}
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone' },
        { name: 'company', label: 'Company' },
        { name: 'service', label: 'Service' },
        { name: 'budget', label: 'Budget' },
        { name: 'timeline', label: 'Timeline' },
        { name: 'message', label: 'Message', type: 'textarea' },
        { name: 'status', label: 'Status', type: 'select', options: [
          { label: 'New', value: 'new' },
          { label: 'Contacted', value: 'contacted' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'Proposal', value: 'proposal' },
          { label: 'Negotiation', value: 'negotiation' },
          { label: 'Won', value: 'won' },
          { label: 'Lost', value: 'lost' },
        ] },
        { name: 'priority', label: 'Priority', type: 'select', options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ] },
        { name: 'source', label: 'Source', type: 'select', options: [
          { label: 'Website', value: 'website' },
          { label: 'Referral', value: 'referral' },
          { label: 'Social', value: 'social' },
          { label: 'Ads', value: 'ads' },
          { label: 'Email', value: 'email' },
          { label: 'Other', value: 'other' },
        ] },
      ]}
      initialForm={{ status: 'new', priority: 'medium', source: 'website' }}
      columns={[
        {
          label: 'Lead',
          render: (lead) => (
            <>
              <span className="admin-table-title">{lead.name}</span>
              <span className="admin-table-subtitle">{lead.email}</span>
            </>
          ),
        },
        { label: 'Service', render: (lead) => lead.service || '-' },
        { label: 'Budget', render: (lead) => lead.budget || '-' },
        { label: 'Status', render: (lead) => <StatusBadge value={lead.status} tone={statusTone(lead.status)} /> },
        { label: 'Priority', render: (lead) => <StatusBadge value={lead.priority} tone={lead.priority === 'high' ? 'accent' : 'neutral'} /> },
        { label: 'Created', render: (lead) => formatDate(lead.createdAt) },
      ]}
      filterItem={(lead, query) => `${lead.name} ${lead.email} ${lead.company || ''} ${lead.service || ''}`.toLowerCase().includes(query)}
    />
  );
}
