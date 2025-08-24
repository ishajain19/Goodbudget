import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const empty = { amount:'', type:'expense', category:'', date: new Date().toISOString().slice(0,10), note:'' };

export default function TransactionForm({ onCreate }) {
  const [form, setForm] = useState(empty);
  const set = (k)=> (e)=> setForm(p=>({...p,[k]: e.target.value}));
  const submit = async (e)=>{
    e.preventDefault();
    if(!form.amount || !form.category){ toast.error('Amount & Category required'); return; }
    await onCreate({ ...form, amount: Number(form.amount) });
    setForm(empty);
    toast.success('Transaction added');
  };

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="label">Amount (₹)</label>
        <input className="input" type="number" min="0" step="0.01" value={form.amount} onChange={set('amount')} placeholder="0.00" />
      </div>
      <div>
        <label className="label">Type</label>
        <select className="select" value={form.type} onChange={set('type')}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <label className="label">Category</label>
        <input className="input" value={form.category} onChange={set('category')} placeholder="e.g., Food, Salary" />
      </div>
      <div>
        <label className="label">Date</label>
        <input className="input" type="date" value={form.date} onChange={set('date')} />
      </div>
      <div className="md:col-span-2">
        <label className="label">Note</label>
        <textarea className="input" rows="2" value={form.note} onChange={set('note')} placeholder="Optional note..." />
      </div>
      <div className="md:col-span-2">
        <button className="btn-primary">Save Transaction</button>
      </div>
    </form>
  );
}
