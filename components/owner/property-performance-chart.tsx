"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Mock data for the chart
const data = [
  { name: "Mortgage", value: 1800, color: "#ef4444" },
  { name: "Property Management", value: 580, color: "#3b82f6" },
  { name: "Insurance", value: 450, color: "#eab308" },
  { name: "Maintenance", value: 350, color: "#22c55e" },
  { name: "Utilities", value: 270, color: "#a855f7" },
]

export function PropertyPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`$${value}`, undefined]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
