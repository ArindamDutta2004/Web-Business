import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'View our portfolio of premium web applications, AI integrations, and digital solutions.',
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
