'use client';

import ResourcePage, { StatusBadge, statusTone } from '@/components/admin/ResourcePage';

type ServiceFeature = { title?: string } | string;

export default function ServicesAdminPage() {
  return (
    <ResourcePage
      title="Services"
      kicker="[MANAGEMENT]"
      description="Control service offerings used across the public services page and homepage."
      listPath="/services/admin/all"
      createPath="/services"
      updatePath={(service) => `/services/${service._id}`}
      deletePath={(service) => `/services/${service._id}`}
      createLabel="Add service"
      getTitle={(service) => service.title}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'shortDescription', label: 'Short description' },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'icon', label: 'Icon key', helper: 'Examples: code, bot, dashboard, palette, cart, zap.' },
        { name: 'tags', label: 'Tags', type: 'tags' },
        { name: 'features', label: 'Features', type: 'tags', helper: 'Comma-separated feature titles.' },
        { name: 'pricing.startingAt', label: 'Starting price', type: 'number' },
        { name: 'order', label: 'Display order', type: 'number' },
        { name: 'isActive', label: 'Active', type: 'checkbox' },
        { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
        { name: 'seo.metaTitle', label: 'SEO title' },
        { name: 'seo.metaDescription', label: 'SEO description', type: 'textarea' },
      ]}
      initialForm={{ icon: 'code', order: 0, isActive: true, isFeatured: false, 'pricing.currency': 'USD' }}
      normalizeItemToForm={(service) => ({
        ...service,
        features: Array.isArray(service.features) ? (service.features as ServiceFeature[]).map((feature) => typeof feature === 'string' ? feature : feature.title).join(', ') : '',
      })}
      mapFormToPayload={(form) => ({
        ...form,
        features: Array.isArray(form.features) ? form.features.map((title: string) => ({ title, description: '' })) : [],
        pricing: { startingAt: form['pricing.startingAt'], currency: 'USD' },
        seo: { metaTitle: form['seo.metaTitle'], metaDescription: form['seo.metaDescription'] },
      })}
      columns={[
        {
          label: 'Service',
          render: (service) => (
            <>
              <span className="admin-table-title">{service.title}</span>
              <span className="admin-table-subtitle">{service.shortDescription || service.slug}</span>
            </>
          ),
        },
        { label: 'Order', render: (service) => `#${service.order || 0}` },
        { label: 'Status', render: (service) => <StatusBadge value={service.isActive ? 'active' : 'inactive'} tone={statusTone(service.isActive ? 'active' : 'inactive')} /> },
        { label: 'Featured', render: (service) => <StatusBadge value={service.isFeatured ? 'featured' : 'standard'} tone={service.isFeatured ? 'accent' : 'neutral'} /> },
        { label: 'Tags', render: (service) => service.tags?.slice(0, 3).join(', ') || '-' },
      ]}
      filterItem={(service, query) => `${service.title} ${service.description} ${service.tags?.join(' ') || ''}`.toLowerCase().includes(query)}
    />
  );
}
