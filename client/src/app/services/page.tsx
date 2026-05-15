import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Premium web applications, AI integration, admin dashboards, e-commerce, brand systems, and automation solutions.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
