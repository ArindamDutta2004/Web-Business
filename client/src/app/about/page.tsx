import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Kinetic Orange — a premium software agency building brutal digital solutions for ambitious businesses.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
