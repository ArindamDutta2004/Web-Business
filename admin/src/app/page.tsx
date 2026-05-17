'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import { Shield, ArrowRight } from 'lucide-react';

export default function AdminHomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAdminStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-12 h-12 bg-kinetic animate-pulse-subtle" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-kinetic flex items-center justify-center mx-auto mb-6 rounded-lg">
          <Shield className="text-black" size={40} strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-3xl text-white mb-4">
          KO Admin Panel
        </h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          Secure administration portal for Kinetic Orange
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="admin-button w-full"
        >
          Access Dashboard
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
