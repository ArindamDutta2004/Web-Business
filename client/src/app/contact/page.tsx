import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Kinetic Orange. Start your next project with our premium software agency.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
