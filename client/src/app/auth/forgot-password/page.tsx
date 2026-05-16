'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const schema = z.object({ email: z.string().email('Invalid email') });

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true);
    try {
      await api.post('/auth/forgot-password', data);
      setSent(true);
      toast.success('RESET LINK SENT');
    } catch {
      toast.error('FAILED TO SEND RESET LINK');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-24">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="ko-card w-full max-w-md">
        <div className="mb-10">
          <p className="ko-eyebrow mb-3">[ACCOUNT RECOVERY]</p>
          <h1 className="font-display text-5xl text-white leading-none">RESET PASSWORD</h1>
        </div>

        {sent ? (
          <div className="border border-kinetic p-8 text-center">
            <p className="font-display text-2xl text-white mb-4">CHECK YOUR EMAIL</p>
            <p className="font-body text-white/50 text-sm">We&apos;ve sent a reset link to your email address.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="ko-label">EMAIL ADDRESS</label>
              <input {...register('email')} className="ko-input" placeholder="your@email.com" />
              {errors.email && <p className="ko-error">{errors.email.message as string}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="ko-button w-full disabled:opacity-50">
              {isSubmitting ? 'SENDING...' : 'SEND RESET LINK'}
            </button>
          </form>
        )}

        <Link href="/auth/login" className="flex items-center gap-2 font-technical text-[10px] text-white/40 hover:text-kinetic mt-8 transition-colors">
          <ArrowLeft size={14} /> BACK TO LOGIN
        </Link>
      </motion.div>
    </div>
  );
}
