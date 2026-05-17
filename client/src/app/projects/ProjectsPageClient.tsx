'use client';

import { useEffect, useState } from 'react';
import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

const PROJECTS = [
  {
    title: 'AI AUTOMATION',
    category: 'AI AUTOMATION TOOL',
    year: '2026',
    desc: 'AI-powered automation platform with workflow orchestration and intelligent task execution.',
    tags: ['NEXT.JS', 'AI', 'AUTOMATION', 'WORKFLOW'],
    liveUrl: 'https://ai-automation-tool-topaz.vercel.app/',
  },
  {
    title: 'FINANCIAL DASHBOARD',
    category: 'FINTECH',
    year: '2025',
    desc: 'Modern financial analytics dashboard with responsive UI and real-time insights.',
    tags: ['REACT', 'TAILWIND', 'DASHBOARD', 'CHARTS'],
    liveUrl: 'https://frontend-task-financial-dashboard.vercel.app/',
  },
  {
    title: 'TASK MANAGER APP FLUTTER',
    category: 'MOBILE APP',
    year: '2025',
    desc: 'Cross-platform task management application built using Flutter.',
    tags: ['FLUTTER', 'DART', 'MOBILE', 'FIREBASE'],
    liveUrl: 'https://github.com/Debjitvk18/TASK-MANAGER-Flutter-APP',
  },
  {
    title: 'TASK MANAGER WEB APP',
    category: 'WEB APPLICATION',
    year: '2025',
    desc: 'Task management web application with authentication and productivity features.',
    tags: ['REACT', 'NODE.JS', 'MONGODB', 'EXPRESS'],
    liveUrl: 'https://github.com/Debjitvk18/Task-Manager',
  },
  {
    title: 'BLOG POST WEB APP',
    category: 'BLOG PLATFORM',
    year: '2025',
    desc: 'Frontend blog platform with login functionality and modern UI design.',
    tags: ['NEXT.JS', 'AUTH', 'BLOG', 'TAILWIND'],
    liveUrl: 'https://blog-post-only-frontend.vercel.app/login',
  },
  {
    title: 'FACE EXTRACTION PIPELINE',
    category: 'COMPUTER VISION',
    year: '2025',
    desc: 'AI-based face extraction and processing pipeline for image analysis workflows.',
    tags: ['PYTHON', 'OPENCV', 'AI', 'COMPUTER VISION'],
    liveUrl: 'https://github.com/Debjitvk18/Face-Extraction-Pipeline-',
  },
];

type Project = {
  title: string;
  category: string;
  year: string;
  desc: string;
  tags: string[];
  liveUrl: string;
};

type ApiProject = {
  title?: string;
  service?: { title?: string };
  status?: string;
  createdAt?: string;
  description?: string;
  technologies?: string[];
  liveUrl?: string;
};

export default function ProjectsPageClient() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    api
      .get('/projects/public')
      .then(({ data }) => {
        if (!Array.isArray(data.data) || data.data.length === 0) return;

        setProjects(
          (data.data as ApiProject[]).map((project) => ({
            title: project.title?.toUpperCase() || 'PROJECT',

            category:
              project.service?.title?.toUpperCase() ||
              project.status?.toUpperCase() ||
              'PROJECT',

            year: project.createdAt
              ? new Date(project.createdAt).getFullYear().toString()
              : '',

            desc: project.description || '',

            tags: project.technologies?.length
              ? project.technologies.map((tag: string) =>
                  tag.toUpperCase()
                )
              : ['CUSTOM'],

            liveUrl: project.liveUrl || '#',
          }))
        );
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="ko-page">
      <section className="pb-16 md:pb-24">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[PORTFOLIO]</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h1 className="ko-page-title text-white mb-8 md:mb-10">
              SELECTED <span className="text-kinetic">WORK</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="ko-lead font-technical">
              A curated selection of projects that showcase technical expertise
              and design philosophy.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="ko-container">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.05}>
              <div className="ko-list-row border-t border-white/10 group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-5 mb-6">
                      <span className="font-technical text-[10px] text-kinetic">
                        {project.category}
                      </span>

                      <span className="font-technical text-[10px] text-white/20">
                        {project.year}
                      </span>
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300 mb-6">
                      {project.title}
                    </h2>

                    <p className="font-body text-white/40 max-w-lg leading-relaxed text-[15px]">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2.5 mt-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="ko-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 shrink-0 mt-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-kinetic group-hover:text-kinetic transition-all duration-300"
                    >
                      <ExternalLink size={18} />
                    </a>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-kinetic group-hover:bg-kinetic group-hover:text-black transition-all duration-300"
                    >
                      <ArrowUpRight
                        size={18}
                        className="group-hover:rotate-45 transition-transform duration-300"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="ko-section border-t border-white/10">
        <div className="ko-container text-center">
          <h2 className="ko-cta-title text-white mb-10 md:mb-12 mx-auto">
            HAVE A SIMILAR PROJECT?
          </h2>

          <Link href="/contact" className="ko-button">
            DISCUSS YOUR IDEA <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}