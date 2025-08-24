import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';

export default function Dashboard({ summary }) {
  const data = summary?.data || [];
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="card h-72">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Income vs Expense (Line)</h3>
        </div>
        <div className="w-full h-56">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" name="Income" />
              <Line type="monotone" dataKey="expense" name="Expense" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card h-72">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Income vs Expense (Bar)</h3>
        </div>
        <div className="w-full h-56">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Income" />
              <Bar dataKey="expense" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
