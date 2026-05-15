import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for premium software development services.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
