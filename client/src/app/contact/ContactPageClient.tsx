'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await api.post('/contact', data);
      toast.success('MESSAGE SENT SUCCESSFULLY');
      reset();
    } catch {
      toast.error('FAILED TO SEND MESSAGE');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-transparent border-2 border-white/20 px-4 py-3.5 font-body text-white text-sm placeholder:text-white/20 focus:border-kinetic focus:outline-none transition-colors duration-300';
  const labelClass = 'font-technical text-[10px] text-white/50 tracking-widest mb-2 block';
  const errorClass = 'font-technical text-[10px] text-kinetic mt-1';

  return (
    <div className="pt-32 pb-24">
      <section className="px-6 md:px-8 mb-20">
        <div className="max-w-[1800px] mx-auto">
          <RevealOnScroll>
            <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[GET IN TOUCH]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="font-display text-[10vw] md:text-[7vw] text-white leading-none mb-8">
              LET&apos;S <span className="text-kinetic">TALK</span>
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <RevealOnScroll>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>NAME *</label>
                    <input {...register('name')} className={inputClass} placeholder="Your name" />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>EMAIL *</label>
                    <input {...register('email')} className={inputClass} placeholder="your@email.com" />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>PHONE</label>
                    <input {...register('phone')} className={inputClass} placeholder="+91 XXXX XXXXXX" />
                  </div>
                  <div>
                    <label className={labelClass}>COMPANY</label>
                    <input {...register('company')} className={inputClass} placeholder="Your company" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>SUBJECT *</label>
                  <input {...register('subject')} className={inputClass} placeholder="Project inquiry" />
                  {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>SERVICE</label>
                    <select {...register('service')} className={`${inputClass} appearance-none`}>
                      <option value="">Select a service</option>
                      <option value="web-applications">Web Applications</option>
                      <option value="ai-integration">AI Integration</option>
                      <option value="admin-dashboards">Admin Dashboards</option>
                      <option value="brand-systems">Brand Systems</option>
                      <option value="e-commerce">E-Commerce</option>
                      <option value="automation">Automation</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>BUDGET RANGE</label>
                    <select {...register('budget')} className={`${inputClass} appearance-none`}>
                      <option value="">Select budget</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k-25k">$10,000 – $25,000</option>
                      <option value="25k-50k">$25,000 – $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>MESSAGE *</label>
                  <textarea {...register('message')} rows={6} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
                  {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-kinetic text-black px-10 py-4 font-technical text-sm flex items-center justify-center gap-3 hover:bg-white transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-brutal-pulse">SENDING...</span>
                  ) : (
                    <>SEND MESSAGE <Send size={16} /></>
                  )}
                </button>
              </form>
            </RevealOnScroll>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <RevealOnScroll delay={0.2}>
              <div className="space-y-8">
                <div className="border-2 border-white/10 p-8">
                  <MapPin className="text-kinetic mb-4" size={24} />
                  <h3 className="font-display text-xl text-white mb-2">OFFICE</h3>
                  <p className="font-body text-white/40 text-sm leading-relaxed">
                    Kinetic Orange HQ<br/>
                    Bengaluru, Karnataka<br/>
                    India 560001
                  </p>
                </div>
                <div className="border-2 border-white/10 p-8">
                  <Mail className="text-kinetic mb-4" size={24} />
                  <h3 className="font-display text-xl text-white mb-2">EMAIL</h3>
                  <a href="mailto:hello@kineticorange.com" className="font-technical text-xs text-white/60 hover:text-kinetic transition-colors">
                    HELLO@KINETICORANGE.COM
                  </a>
                </div>
                <div className="border-2 border-white/10 p-8">
                  <Phone className="text-kinetic mb-4" size={24} />
                  <h3 className="font-display text-xl text-white mb-2">PHONE</h3>
                  <a href="tel:+919876543210" className="font-technical text-xs text-white/60 hover:text-kinetic transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
