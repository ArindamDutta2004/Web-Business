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

  const inputClass = 'w-full bg-transparent border-2 border-white/20 px-4 py-3.5 font-body text-white text-sm placeholder:text-white/20 focus:border-kinetic focus:outline-none transition-colors';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <div className="mb-10">
          <p className="font-technical text-xs text-kinetic mb-3 tracking-widest">[CREATE ACCOUNT]</p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-none">REGISTER</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">FIRST NAME</label>
              <input {...register('firstName')} className={inputClass} placeholder="John" />
              {errors.firstName && <p className="font-technical text-[10px] text-kinetic mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">LAST NAME</label>
              <input {...register('lastName')} className={inputClass} placeholder="Doe" />
              {errors.lastName && <p className="font-technical text-[10px] text-kinetic mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">EMAIL</label>
            <input {...register('email')} className={inputClass} placeholder="your@email.com" />
            {errors.email && <p className="font-technical text-[10px] text-kinetic mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">PASSWORD</label>
            <div className="relative">
              <input {...register('password')} type={showPassword ? 'text' : 'password'} className={inputClass} placeholder="Min. 8 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="font-technical text-[10px] text-kinetic mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">COMPANY (OPTIONAL)</label>
            <input {...register('company')} className={inputClass} placeholder="Your company" />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-kinetic text-black py-4 font-technical text-sm flex items-center justify-center gap-3 hover:bg-white transition-colors disabled:opacity-50">
            {isSubmitting ? 'CREATING ACCOUNT...' : <>CREATE ACCOUNT <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="font-body text-white/30 text-sm text-center mt-8">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-kinetic hover:text-white transition-colors font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
