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

  const inputClass = 'ko-input';

  return (
    <div>
      <div className="mb-8">
        <p className="ko-eyebrow mb-2">[PROFILE]</p>
        <h1 className="font-display text-3xl text-white">ACCOUNT SETTINGS</h1>
      </div>

      <div className="ko-card max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="ko-label">FIRST NAME</label>
              <input {...register('firstName')} className={inputClass} />
              {errors.firstName && <p className="ko-error">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="ko-label">LAST NAME</label>
              <input {...register('lastName')} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="ko-label">EMAIL</label>
            <input value={user?.email || ''} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
          </div>
          <div>
            <label className="ko-label">PHONE</label>
            <input {...register('phone')} className={inputClass} />
          </div>
          <div>
            <label className="ko-label">COMPANY</label>
            <input {...register('company')} className={inputClass} />
          </div>
          <button type="submit" disabled={saving} className="ko-button disabled:opacity-50">
            {saving ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </form>
      </div>
    </div>
  );
}
