'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminStore } from '@/store/adminStore';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export default function AdminLoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAdminStore((s) => s.login);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('ADMIN ACCESS GRANTED');
      router.push('/dashboard');
    } catch {
      toast.error('ACCESS DENIED');
    } finally { setLoading(false); }
  };

  const inputClass = 'admin-input';

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-16">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="admin-card w-full max-w-md">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-kinetic flex items-center justify-center">
            <Shield className="text-black" size={28} />
          </div>
          <div>
            <p className="font-technical text-[10px] text-kinetic tracking-widest">KINETIC ORANGE</p>
            <h1 className="font-display text-3xl text-white mt-1">ADMIN PANEL</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="admin-label">ADMIN EMAIL</label>
            <input {...register('email')} className={inputClass} placeholder="admin@kineticorange.com" />
            {errors.email && <p className="font-technical text-[10px] text-kinetic mt-1.5">{errors.email.message as string}</p>}
          </div>
          <div>
            <label className="admin-label">PASSWORD</label>
            <div className="relative">
              <input {...register('password')} type={showPw ? 'text' : 'password'} className={inputClass} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="font-technical text-[10px] text-kinetic mt-1.5">{errors.password.message as string}</p>}
          </div>
          <button type="submit" disabled={loading} className="admin-button w-full disabled:opacity-50">
            {loading ? 'AUTHENTICATING...' : <>ACCESS ADMIN <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="font-technical text-[9px] text-white/20 text-center mt-10">AUTHORIZED PERSONNEL ONLY</p>
      </motion.div>
    </div>
  );
}
