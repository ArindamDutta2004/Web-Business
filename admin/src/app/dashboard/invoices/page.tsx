'use client';

import { useEffect, useState } from 'react';
import ResourcePage, { formatDate, money, StatusBadge, statusTone } from '@/components/admin/ResourcePage';
import api from '@/lib/api';

type Option = { label: string; value: string };
type UserOptionRecord = { _id: string; firstName?: string; lastName?: string; email: string };
type ProjectOptionRecord = { _id: string; title: string };

const DEFAULT_DUE_DATE = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

export default function InvoicesAdminPage() {
  const [clients, setClients] = useState<Option[]>([]);
  const [projects, setProjects] = useState<Option[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const [usersRes, projectsRes] = await Promise.all([
        api.get('/users?limit=100'),
        api.get('/projects?limit=100'),
      ]);
      setClients(((usersRes.data.data || []) as UserOptionRecord[]).map((user) => ({
        label: `${user.firstName} ${user.lastName} (${user.email})`,
        value: user._id,
      })));
      setProjects(((projectsRes.data.data || []) as ProjectOptionRecord[]).map((project) => ({
        label: project.title,
        value: project._id,
      })));
    };
    loadOptions().catch(() => undefined);
  }, []);

  return (
    <ResourcePage
      title="Invoices"
      kicker="[BILLING]"
      description="Create readable invoices for clients. Totals are calculated from line items on the server."
      listPath="/invoices"
      createPath="/invoices"
      createLabel="Create invoice"
      getTitle={(invoice) => invoice.invoiceNumber}
      fields={[
        { name: 'client', label: 'Client', type: 'select', required: true, options: clients },
        { name: 'project', label: 'Project', type: 'select', options: projects },
        { name: 'status', label: 'Status', type: 'select', options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Sent', value: 'sent' },
          { label: 'Viewed', value: 'viewed' },
          { label: 'Paid', value: 'paid' },
          { label: 'Overdue', value: 'overdue' },
          { label: 'Cancelled', value: 'cancelled' },
        ] },
        { name: 'dueDate', label: 'Due date', type: 'date', required: true },
        { name: 'items', label: 'Line items JSON', type: 'json', required: true, helper: 'Example: [{"description":"Design sprint","quantity":1,"rate":2500}]' },
        { name: 'taxRate', label: 'Tax rate %', type: 'number' },
        { name: 'discount', label: 'Discount', type: 'number' },
        { name: 'notes', label: 'Notes', type: 'textarea' },
        { name: 'terms', label: 'Terms', type: 'textarea' },
      ]}
      initialForm={{
        status: 'draft',
        currency: 'USD',
        taxRate: 0,
        discount: 0,
        dueDate: DEFAULT_DUE_DATE,
        items: JSON.stringify([{ description: 'Project work', quantity: 1, rate: 1000 }], null, 2),
      }}
      normalizeItemToForm={(invoice) => ({
        ...invoice,
        client: invoice.client?._id || invoice.client,
        project: invoice.project?._id || invoice.project || '',
        items: JSON.stringify(invoice.items || [], null, 2),
      })}
      mapFormToPayload={(form) => ({
        ...form,
        project: form.project || undefined,
        currency: 'USD',
      })}
      columns={[
        {
          label: 'Invoice',
          render: (invoice) => (
            <>
              <span className="admin-table-title">{invoice.invoiceNumber}</span>
              <span className="admin-table-subtitle">{invoice.client?.email || 'No client'}</span>
            </>
          ),
        },
        { label: 'Client', render: (invoice) => invoice.client ? `${invoice.client.firstName || ''} ${invoice.client.lastName || ''}`.trim() : '-' },
        { label: 'Status', render: (invoice) => <StatusBadge value={invoice.status} tone={statusTone(invoice.status)} /> },
        { label: 'Total', render: (invoice) => money(invoice.total, invoice.currency || 'USD') },
        { label: 'Due', render: (invoice) => formatDate(invoice.dueDate) },
      ]}
      filterItem={(invoice, query) => `${invoice.invoiceNumber} ${invoice.client?.email || ''} ${invoice.status}`.toLowerCase().includes(query)}
    />
  );
}
