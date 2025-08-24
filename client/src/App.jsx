import React, { useEffect, useMemo, useState } from 'react';
import api from './services/api';
import Navbar from './components/Navbar';
import StatCards from './components/StatCards';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Toaster, toast } from 'react-hot-toast';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('monthly');
  const [summary, setSummary] = useState({ data: [], totals: { income: 0, expense: 0 } });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [listRes, sumRes] = await Promise.all([
        api.get('/transactions'),
        api.get('/transactions/summary', { params: { period } })
      ]);
      setTransactions(listRes.data);
      setSummary(sumRes.data);
    } catch (e) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{ fetchAll(); }, [period]);

  const addTx = async (payload)=>{ await api.post('/transactions', payload); await fetchAll(); };
  const updateTx = async (id, payload)=>{ await api.put(`/transactions/${id}`, payload); await fetchAll(); };
  const removeTx = async (id)=>{ await api.delete(`/transactions/${id}`); await fetchAll(); };

  const balance = useMemo(()=> summary.totals.income - summary.totals.expense, [summary]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Personal Finance Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 24);
    doc.text(`Period: ${period}`, 14, 30);
    doc.text(`Total Income: ₹${summary.totals.income.toFixed(2)}`, 14, 36);
    doc.text(`Total Expense: ₹${summary.totals.expense.toFixed(2)}`, 14, 42);
    doc.text(`Balance: ₹${balance.toFixed(2)}`, 14, 48);
    const rows = transactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.type.toUpperCase(),
      t.category,
      t.note || '',
      t.amount.toFixed(2)
    ]);
    doc.autoTable({ head: [['Date','Type','Category','Note','Amount (₹)']], body: rows, startY: 56, styles:{ fontSize: 9 } });
    doc.save('finance-report.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <Navbar />
      <Toaster position="top-right" />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-2xl font-extrabold">Track your money smarter 💸</h1>
          <div className="flex items-center gap-2">
            <select className="select" value={period} onChange={(e)=> setPeriod(e.target.value)}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button className="btn-primary" onClick={exportPDF}>Export PDF</button>
          </div>
        </div>

        <StatCards totals={summary.totals} />

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="card lg:col-span-1">
            <h2 className="font-semibold mb-3">Add / Edit Transaction</h2>
            <TransactionForm onCreate={addTx} />
          </div>
          <div className="lg:col-span-2">
            <Dashboard summary={summary} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Transactions</h2>
            {loading && <span className="text-xs text-slate-400">Loading…</span>}
          </div>
          <TransactionList items={transactions} onDelete={removeTx} onUpdate={updateTx} />
        </div>

        <p className="text-center text-xs text-slate-500">Built with React, Tailwind, Recharts, Node, Express & MongoDB.</p>
      </main>
    </div>
  );
}
