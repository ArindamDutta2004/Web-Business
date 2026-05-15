import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: { default: "Kinetic Orange — Admin Panel", template: "%s | KO Admin" },
  description: "Kinetic Orange Administration Panel",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">
        <Toaster position="top-right" toastOptions={{
          style: { background: '#000', color: '#fff', border: '2px solid #FF4D00', fontFamily: 'Space Mono, monospace', fontSize: '11px', textTransform: 'uppercase' as const },
        }} />
        {children}
      </body>
    </html>
  );
}
