import React, { useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, Select } from "antd";

const LineFinanceChart = () => {
  const yearlyData = {
    2023: [
      { month: "Jan", income: 5000, expense: 3200 },
      { month: "Feb", income: 5500, expense: 3100 },
      { month: "Mar", income: 6000, expense: 3800 },
      { month: "Apr", income: 5800, expense: 3300 },
      { month: "May", income: 6200, expense: 3600 },
      { month: "Jun", income: 6500, expense: 4000 },
      { month: "Jul", income: 6300, expense: 3900 },
      { month: "Aug", income: 6100, expense: 3700 },
      { month: "Sep", income: 6400, expense: 3800 },
      { month: "Oct", income: 6700, expense: 4100 },
      { month: "Nov", income: 6900, expense: 3300 },
      { month: "Dec", income: 7200, expense: 3500 },
    ],
    2024: [
      { month: "Jan", income: 7000, expense: 4200 },
      { month: "Feb", income: 7200, expense: 4400 },
      { month: "Mar", income: 7500, expense: 4600 },
      { month: "Apr", income: 7300, expense: 4500 },
      { month: "May", income: 7600, expense: 4800 },
      { month: "Jun", income: 7800, expense: 5000 },
      { month: "Jul", income: 7700, expense: 4900 },
      { month: "Aug", income: 7500, expense: 4700 },
      { month: "Sep", income: 7900, expense: 5100 },
      { month: "Oct", income: 8200, expense: 5300 },
      { month: "Nov", income: 8500, expense: 5500 },
      { month: "Dec", income: 8800, expense: 5700 },
    ],
    2025: [
      { month: "Jan", income: 8500, expense: 5200 },
      { month: "Feb", income: 8700, expense: 5400 },
      { month: "Mar", income: 9000, expense: 5600 },
    ],
  };

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const yearOptions = [
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
  ];

  return (
    <Card
      title={<p className="dark:text-white">Income & Expense Analysis</p>}
      extra={
        <Select
          defaultValue={selectedYear}
          style={{ width: 120 }}
          onChange={setSelectedYear}
          options={yearOptions}
        />
      }
      style={{ width: "100%", maxWidth: 900 }}
      className="dark:bg-gradient-to-br from-dark-m/95 to-dark-l shadow-md"
    >
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={800}
            height={400}
            data={yearlyData[selectedYear]}
            margin={{
              top: 5,
              right: 10,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis color={"red"} />
            <Tooltip
              formatter={(i) => Number(i).toLocaleString("uz-Uz")}
              contentStyle={{ background: "black", color: "white" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#52c41a"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#f5222d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default LineFinanceChart;
