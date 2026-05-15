'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: user?.firstName || '', lastName: user?.lastName || '', phone: user?.phone || '', company: user?.company || '' },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    setSaving(true);
    try {
      const res = await api.put('/users/profile', data);
      setUser(res.data.data);
      toast.success('PROFILE UPDATED');
    } catch { toast.error('UPDATE FAILED'); }
    finally { setSaving(false); }
  };

  const inputClass = 'w-full bg-transparent border-2 border-white/20 px-4 py-3.5 font-body text-white text-sm placeholder:text-white/20 focus:border-kinetic focus:outline-none transition-colors';

  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[PROFILE]</p>
        <h1 className="font-display text-3xl text-white">ACCOUNT SETTINGS</h1>
      </div>

      <div className="max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">FIRST NAME</label>
              <input {...register('firstName')} className={inputClass} />
              {errors.firstName && <p className="font-technical text-[10px] text-kinetic mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">LAST NAME</label>
              <input {...register('lastName')} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">EMAIL</label>
            <input value={user?.email || ''} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
          </div>
          <div>
            <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">PHONE</label>
            <input {...register('phone')} className={inputClass} />
          </div>
          <div>
            <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">COMPANY</label>
            <input {...register('company')} className={inputClass} />
          </div>
          <button type="submit" disabled={saving} className="bg-kinetic text-black px-8 py-3.5 font-technical text-sm hover:bg-white transition-colors disabled:opacity-50">
            {saving ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </form>
      </div>
    </div>
  );
}
