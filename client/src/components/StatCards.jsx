import React from 'react';
import { FaArrowDown, FaArrowUp, FaWallet } from 'react-icons/fa';

export default function StatCards({ totals }) {
  const balance = (totals?.income || 0) - (totals?.expense || 0);
  const Stat = ({icon, label, value, accent}) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-slate-400 text-xs">{label}</div>
          <div className="text-2xl font-bold mt-1">₹{value.toFixed(2)}</div>
        </div>
        <div className={`p-3 rounded-2xl ${accent}`}>
          {icon}
        </div>
      </div>
    </div>
  );
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Stat icon={<FaArrowUp />} label="Total Income" value={totals?.income||0} accent="bg-emerald-700/60" />
      <Stat icon={<FaArrowDown />} label="Total Expense" value={totals?.expense||0} accent="bg-rose-700/60" />
      <Stat icon={<FaWallet />} label="Balance" value={balance} accent="bg-indigo-700/60" />
    </div>
  );
}
