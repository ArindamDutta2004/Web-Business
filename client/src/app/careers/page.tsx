import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Careers', description: 'Join the Kinetic Orange team. Open positions for engineers, designers, and strategists.' };

const POSITIONS = [
  { title: 'SENIOR FULL-STACK ENGINEER', type: 'FULL-TIME', location: 'REMOTE', dept: 'ENGINEERING' },
  { title: 'UI/UX DESIGNER', type: 'FULL-TIME', location: 'BANGALORE', dept: 'DESIGN' },
  { title: 'AI/ML ENGINEER', type: 'FULL-TIME', location: 'REMOTE', dept: 'ENGINEERING' },
  { title: 'PROJECT MANAGER', type: 'FULL-TIME', location: 'BANGALORE', dept: 'OPERATIONS' },
  { title: 'DEVOPS ENGINEER', type: 'CONTRACT', location: 'REMOTE', dept: 'ENGINEERING' },
];

export default function CareersPage() {
  return (
    <div className="ko-page pb-20 md:pb-28">
      <div className="ko-container">
        <p className="ko-eyebrow">[CAREERS]</p>
        <h1 className="ko-page-title text-white mb-8 md:mb-10">JOIN THE <span className="text-kinetic">TEAM</span></h1>
        <p className="ko-lead mb-14 md:mb-20">We&apos;re looking for relentless builders who refuse to settle for average.</p>

        <div className="ko-list">
          {POSITIONS.map((pos) => (
            <div key={pos.title} className="ko-list-row flex flex-col md:flex-row md:items-center justify-between gap-5 group cursor-pointer">
              <div>
                <h3 className="font-display text-xl md:text-2xl text-white group-hover:translate-x-4 transition-transform duration-300">{pos.title}</h3>
                <p className="font-technical text-[10px] text-kinetic mt-2">{pos.dept}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="ko-chip">{pos.type}</span>
                <span className="ko-chip">{pos.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
