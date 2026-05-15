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

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success('LOGGED IN SUCCESSFULLY');
      router.push('/dashboard');
    } catch {
      toast.error('INVALID CREDENTIALS');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-transparent border-2 border-white/20 px-4 py-3.5 font-body text-white text-sm placeholder:text-white/20 focus:border-kinetic focus:outline-none transition-colors';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-10">
          <p className="font-technical text-xs text-kinetic mb-3 tracking-widest">[AUTHENTICATION]</p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-none">LOGIN</h1>
          <p className="font-body text-white/40 text-sm mt-3">Access your dashboard and projects.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">EMAIL</label>
            <input {...register('email')} className={inputClass} placeholder="your@email.com" />
            {errors.email && <p className="font-technical text-[10px] text-kinetic mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">PASSWORD</label>
            <div className="relative">
              <input {...register('password')} type={showPassword ? 'text' : 'password'} className={inputClass} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="font-technical text-[10px] text-kinetic mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="font-technical text-[10px] text-white/40 hover:text-kinetic transition-colors">
              FORGOT PASSWORD?
            </Link>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-kinetic text-black py-4 font-technical text-sm flex items-center justify-center gap-3 hover:bg-white transition-colors disabled:opacity-50">
            {isSubmitting ? 'AUTHENTICATING...' : <>SIGN IN <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="font-body text-white/30 text-sm text-center mt-8">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-kinetic hover:text-white transition-colors font-medium">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
