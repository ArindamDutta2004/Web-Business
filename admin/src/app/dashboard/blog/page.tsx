'use client';

import ResourcePage, { formatDate, StatusBadge, statusTone } from '@/components/admin/ResourcePage';

export default function BlogAdminPage() {
  return (
    <ResourcePage
      title="Blog"
      kicker="[CMS]"
      description="Create, edit, publish, archive, and optimize user-facing blog posts."
      listPath="/blog/admin/all"
      createPath="/blog"
      updatePath={(post) => `/blog/${post._id}`}
      deletePath={(post) => `/blog/${post._id}`}
      createLabel="New post"
      getTitle={(post) => post.title}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'category', label: 'Category', required: true },
        { name: 'status', label: 'Status', type: 'select', required: true, options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
          { label: 'Archived', value: 'archived' },
        ] },
        { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { name: 'content', label: 'Content', type: 'textarea', required: true, rows: 10 },
        { name: 'tags', label: 'Tags', type: 'tags' },
        { name: 'thumbnail', label: 'Thumbnail URL' },
        { name: 'isFeatured', label: 'Featured post', type: 'checkbox' },
        { name: 'seo.metaTitle', label: 'SEO title' },
        { name: 'seo.metaDescription', label: 'SEO description', type: 'textarea' },
        { name: 'seo.keywords', label: 'SEO keywords', type: 'tags' },
      ]}
      initialForm={{ status: 'draft', category: 'Engineering', isFeatured: false }}
      mapFormToPayload={(form) => ({
        ...form,
        seo: {
          metaTitle: form['seo.metaTitle'],
          metaDescription: form['seo.metaDescription'],
          keywords: form['seo.keywords'],
        },
      })}
      columns={[
        {
          label: 'Post',
          render: (post) => (
            <>
              <span className="admin-table-title">{post.title}</span>
              <span className="admin-table-subtitle">{post.excerpt || post.slug}</span>
            </>
          ),
        },
        { label: 'Category', render: (post) => post.category },
        { label: 'Status', render: (post) => <StatusBadge value={post.status} tone={statusTone(post.status)} /> },
        { label: 'Views', render: (post) => post.views?.toLocaleString() || '0' },
        { label: 'Updated', render: (post) => formatDate(post.updatedAt) },
      ]}
      filterItem={(post, query) => `${post.title} ${post.category} ${post.excerpt || ''}`.toLowerCase().includes(query)}
    />
  );
}
