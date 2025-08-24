import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

function Row({ tx, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    amount: tx.amount,
    type: tx.type,
    category: tx.category,
    date: tx.date.slice(0,10),
    note: tx.note || ''
  });
  const set = (k)=> (e)=> setForm(p=>({...p,[k]: e.target.value}));
  const save = async ()=>{
    await onUpdate(tx._id, { ...form, amount: Number(form.amount), date: new Date(form.date) });
    setEditing(false);
    toast.success('Saved');
  };

  if (editing) {
    return (
      <tr className="border-b border-slate-800">
        <td className="p-3"><input className="input" type="date" value={form.date} onChange={set('date')} /></td>
        <td className="p-3">
          <select className="select" value={form.type} onChange={set('type')}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </td>
        <td className="p-3"><input className="input" value={form.category} onChange={set('category')} /></td>
        <td className="p-3"><input className="input" value={form.note} onChange={set('note')} /></td>
        <td className="p-3"><input className="input" type="number" step="0.01" value={form.amount} onChange={set('amount')} /></td>
        <td className="p-3 whitespace-nowrap">
          <button className="btn-primary mr-2" onClick={save}>Save</button>
          <button className="btn-ghost" onClick={()=> setEditing(false)}>Cancel</button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-900/40">
      <td className="p-3">{new Date(tx.date).toLocaleDateString()}</td>
      <td className="p-3"><span className={`badge ${tx.type === 'income' ? 'badge-income':'badge-expense'}`}>{tx.type.toUpperCase()}</span></td>
      <td className="p-3">{tx.category}</td>
      <td className="p-3">{tx.note}</td>
      <td className="p-3">₹{tx.amount.toFixed(2)}</td>
      <td className="p-3 whitespace-nowrap">
        <button className="btn-primary mr-2" onClick={()=> setEditing(true)}>Edit</button>
        <button className="btn-ghost" onClick={()=> onDelete(tx._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default function TransactionList({ items, onDelete, onUpdate }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-slate-400 text-xs uppercase tracking-wider">
            <th className="p-3">Date</th>
            <th className="p-3">Type</th>
            <th className="p-3">Category</th>
            <th className="p-3">Note</th>
            <th className="p-3">Amount (₹)</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(tx => <Row key={tx._id} tx={tx} onDelete={onDelete} onUpdate={onUpdate} />)}
        </tbody>
      </table>
    </div>
  );
}
