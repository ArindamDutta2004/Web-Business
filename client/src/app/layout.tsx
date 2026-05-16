import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Kinetic Orange — Premium Software Agency",
    template: "%s | Kinetic Orange",
  },
  description: "We build brutal digital solutions. Premium web applications, AI integrations, admin dashboards, and digital platforms for ambitious businesses.",
  keywords: ["software agency", "web development", "AI integration", "admin dashboards", "digital solutions"],
  authors: [{ name: "Kinetic Orange" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kinetic Orange",
    title: "Kinetic Orange — Premium Software Agency",
    description: "We build brutal digital solutions for ambitious businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic Orange — Premium Software Agency",
    description: "We build brutal digital solutions for ambitious businesses.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-black text-white antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              border: '2px solid #FF4D00',
              fontFamily: 'Space Mono, monospace',
              fontSize: '12px',
              textTransform: 'uppercase' as const,
            },
          }}
        />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
