import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.post('/', async (req,res)=>{
  try {
    const tx = await Transaction.create(req.body);
    res.status(201).json(tx);
  } catch(e){ res.status(400).json({error:'Invalid payload'}); }
});

router.get('/', async (req,res)=>{
  try {
    const { from, to } = req.query;
    const filter = {};
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }
    const list = await Transaction.find(filter).sort({ date:-1, createdAt:-1 });
    res.json(list);
  } catch(e){ res.status(500).json({error:'Server error'}); }
});

router.put('/:id', async (req,res)=>{
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new:true });
    res.json(updated);
  } catch(e){ res.status(400).json({error:'Invalid id/payload'}); }
});

router.delete('/:id', async (req,res)=>{
  try { await Transaction.findByIdAndDelete(req.params.id); res.json({ok:true}); }
  catch(e){ res.status(400).json({error:'Invalid id'}); }
});

router.get('/summary', async (req,res)=>{
  try {
    const { period='monthly' } = req.query;
    const now = new Date();
    let dateFrom, group;
    if (period === 'weekly') {
      dateFrom = new Date(now); dateFrom.setDate(now.getDate()-7*11);
      group = { y: { $year:'$date' }, w: { $isoWeek:'$date' }, t:'$type' };
    } else {
      dateFrom = new Date(now); dateFrom.setMonth(now.getMonth()-11);
      group = { y: { $year:'$date' }, m: { $month:'$date' }, t:'$type' };
    }
    const raw = await Transaction.aggregate([
      { $match: { date: { $gte: dateFrom, $lte: now } } },
      { $group: { _id: group, total: { $sum: '$amount' } } }
    ]);
    const toLabel = (_id)=> period==='weekly' ? `${_id.w}/${_id.y}` : `${_id.m}/${_id.y}`;
    const map = new Map();
    raw.forEach(({_id,total})=>{
      const label = toLabel(_id);
      if(!map.has(label)) map.set(label, { label, income:0, expense:0 });
      map.get(label)[_id.t] = total;
    });
    const data = Array.from(map.values()).sort((a,b)=>{
      const na = a.label.split('/').map(Number), nb = b.label.split('/').map(Number);
      return na[1]*100+na[0] - (nb[1]*100+nb[0]);
    });
    const totals = data.reduce((acc,d)=>({income:acc.income+(d.income||0), expense:acc.expense+(d.expense||0)}),{income:0,expense:0});
    res.json({ period, data, totals });
  } catch(e){ res.status(500).json({error:'Summary failed'}); }
});

export default router;
