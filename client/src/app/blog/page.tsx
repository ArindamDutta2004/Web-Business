import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on software development, AI, design systems, and digital strategy.',
};

export default function BlogPage() {
  return <BlogPageClient />;
}
