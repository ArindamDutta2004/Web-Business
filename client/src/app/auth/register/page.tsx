'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  company: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.register);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await registerUser(data);
      toast.success('ACCOUNT CREATED');
      router.push('/dashboard');
    } catch {
      toast.error('REGISTRATION FAILED');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'ko-input';

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-24">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="ko-card w-full max-w-lg">
        <div className="mb-8">
          <p className="ko-eyebrow mb-2">[CREATE ACCOUNT]</p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-none">REGISTER</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="ko-label">FIRST NAME</label>
              <input {...register('firstName')} className={inputClass} placeholder="John" />
              {errors.firstName && <p className="ko-error">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="ko-label">LAST NAME</label>
              <input {...register('lastName')} className={inputClass} placeholder="Doe" />
              {errors.lastName && <p className="ko-error">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="ko-label">EMAIL</label>
            <input {...register('email')} className={inputClass} placeholder="your@email.com" />
            {errors.email && <p className="ko-error">{errors.email.message}</p>}
          </div>

          <div>
            <label className="ko-label">PASSWORD</label>
            <div className="relative">
              <input {...register('password')} type={showPassword ? 'text' : 'password'} className={inputClass} placeholder="Min. 8 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="ko-error">{errors.password.message}</p>}
          </div>

          <div>
            <label className="ko-label">COMPANY (OPTIONAL)</label>
            <input {...register('company')} className={inputClass} placeholder="Your company" />
          </div>

          <button type="submit" disabled={isSubmitting} className="ko-button w-full disabled:opacity-50">
            {isSubmitting ? 'CREATING ACCOUNT...' : <>CREATE ACCOUNT <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="font-body text-white/30 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-kinetic hover:text-white transition-colors font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
