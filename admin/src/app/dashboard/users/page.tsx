'use client';

import { useState } from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

const USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'client', status: 'active', joined: 'MAR 2025' },
  { id: 2, name: 'Jane Smith', email: 'jane@techcorp.com', role: 'client', status: 'active', joined: 'FEB 2025' },
  { id: 3, name: 'Mike Johnson', email: 'mike@startup.io', role: 'user', status: 'active', joined: 'JAN 2025' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@design.co', role: 'client', status: 'inactive', joined: 'DEC 2024' },
  { id: 5, name: 'Alex Chen', email: 'alex@enterprise.com', role: 'client', status: 'active', joined: 'NOV 2024' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[MANAGEMENT]</p>
          <h1 className="font-display text-3xl text-white">USERS</h1>
        </div>
        <button className="bg-kinetic text-black px-5 py-2.5 font-technical text-[11px] flex items-center gap-2 hover:bg-white transition-colors">
          <Plus size={14} /> ADD USER
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-2 border-white/20 pl-12 pr-4 py-3.5 font-body text-sm text-white placeholder:text-white/20 focus:border-kinetic focus:outline-none transition-colors"
            placeholder="Search users..."
          />
        </div>
      </div>

      <div className="border-2 border-white/10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-white/10">
              {['NAME', 'EMAIL', 'ROLE', 'STATUS', 'JOINED', ''].map((h) => (
                <th key={h} className="text-left px-6 py-3.5 font-technical text-[10px] text-white/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-display text-sm text-white">{user.name}</td>
                <td className="px-6 py-4 text-sm text-white/50">{user.email}</td>
                <td className="px-6 py-4"><span className="font-technical text-[9px] text-kinetic border border-kinetic/30 px-2 py-0.5">{user.role.toUpperCase()}</span></td>
                <td className="px-6 py-4"><span className={`font-technical text-[9px] px-2 py-0.5 border ${user.status === 'active' ? 'text-green-500 border-green-500/30' : 'text-white/30 border-white/10'}`}>{user.status.toUpperCase()}</span></td>
                <td className="px-6 py-4 font-technical text-[10px] text-white/30">{user.joined}</td>
                <td className="px-6 py-4"><button className="text-white/20 hover:text-white"><MoreHorizontal size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
