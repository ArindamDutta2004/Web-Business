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
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[MANAGEMENT]</p>
          <h1 className="admin-title">USERS</h1>
        </div>
        <button className="admin-button">
          <Plus size={14} /> ADD USER
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-14"
            placeholder="Search users..."
          />
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {['NAME', 'EMAIL', 'ROLE', 'STATUS', 'JOINED', ''].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
              <tr key={user.id}>
                <td className="font-display text-sm text-white">{user.name}</td>
                <td className="text-sm text-white/50">{user.email}</td>
                <td><span className="admin-badge text-kinetic border-kinetic/30">{user.role.toUpperCase()}</span></td>
                <td><span className={`admin-badge ${user.status === 'active' ? 'text-green-500 border-green-500/30' : 'text-white/30 border-white/10'}`}>{user.status.toUpperCase()}</span></td>
                <td className="font-technical text-[10px] text-white/30">{user.joined}</td>
                <td><button className="text-white/20 hover:text-white p-1"><MoreHorizontal size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
