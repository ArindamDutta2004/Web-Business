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

  const inputClass = 'ko-input';
  const labelClass = 'ko-label';
  const errorClass = 'ko-error';

  return (
    <div className="ko-page pb-20 md:pb-28">
      <section className="pb-16 md:pb-24">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[GET IN TOUCH]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="ko-page-title text-white mb-8">
              LET&apos;S <span className="text-kinetic">TALK</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="ko-lead max-w-xl">
              Have a project in mind? Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section>
        <div className="ko-container grid lg:grid-cols-5 gap-12 xl:gap-20">
          {/* Form */}
          <div className="lg:col-span-3">
            <RevealOnScroll>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
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

                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
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

                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
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
                  className="ko-button disabled:opacity-50 mt-2"
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
              <div className="space-y-5 md:space-y-6">
                <div className="ko-card">
                  <MapPin className="text-kinetic mb-5" size={24} />
                  <h3 className="font-display text-xl text-white mb-4">OFFICE</h3>
                  <p className="font-body text-white/40 text-sm leading-relaxed">
                    Kinetic Orange HQ<br/>
                    Bengaluru, Karnataka<br/>
                    India 560001
                  </p>
                </div>
                <div className="ko-card">
                  <Mail className="text-kinetic mb-5" size={22} />
                  <h3 className="font-display text-xl text-white mb-4">EMAIL</h3>
                  <a href="mailto:hello@kineticorange.com" className="font-technical text-xs text-white/60 hover:text-kinetic transition-colors">
                    HELLO@KINETICORANGE.COM
                  </a>
                </div>
                <div className="ko-card">
                  <Phone className="text-kinetic mb-5" size={22} />
                  <h3 className="font-display text-xl text-white mb-4">PHONE</h3>
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
