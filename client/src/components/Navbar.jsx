import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-950 to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-500 text-slate-900">
            <FaMoneyBillWave size={20} />
          </div>
          <span className="font-extrabold text-lg">Expense Tracker</span>
        </div>
        <a href="https://localhost" className="btn-ghost">Docs</a>
      </div>
    </div>
  );
}
