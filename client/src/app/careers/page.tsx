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
    <div className="pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-[1800px] mx-auto">
        <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[CAREERS]</p>
        <h1 className="font-display text-[10vw] md:text-[7vw] text-white leading-none mb-8">JOIN THE <span className="text-kinetic">TEAM</span></h1>
        <p className="font-body text-white/50 text-lg max-w-2xl mb-20">We&apos;re looking for relentless builders who refuse to settle for average.</p>

        <div className="border-t-2 border-white/10">
          {POSITIONS.map((pos) => (
            <div key={pos.title} className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b-2 border-white/10 hover:bg-white/[0.02] px-4 gap-4 group cursor-pointer transition-all">
              <div>
                <h3 className="font-display text-xl md:text-2xl text-white group-hover:translate-x-4 transition-transform duration-300">{pos.title}</h3>
                <p className="font-technical text-[10px] text-kinetic mt-1">{pos.dept}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-technical text-[10px] text-white/30 border border-white/10 px-3 py-1">{pos.type}</span>
                <span className="font-technical text-[10px] text-white/30 border border-white/10 px-3 py-1">{pos.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
