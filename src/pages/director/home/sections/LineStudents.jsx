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

const LineStudentsChart = () => {
  const yearlyData = {
    2023: [
      { month: "Jan", come: 24, left: 12 },
      { month: "Feb", come: 45, left: 11 },
      { month: "Mar", come: 50, left: 18 },
      { month: "Apr", come: 58, left: 13 },
      { month: "May", come: 62, left: 16 },
      { month: "Jun", come: 65, left: 10 },
      { month: "Jul", come: 60, left: 19 },
      { month: "Aug", come: 52, left: 17 },
      { month: "Sep", come: 57, left: 18 },
      { month: "Oct", come: 66, left: 11 },
      { month: "Nov", come: 70, left: 13 },
      { month: "Dec", come: 72, left: 15 },
    ],
    2024: [
      { month: "Jan", come: 69, left: 12 },
      { month: "Feb", come: 65, left: 14 },
      { month: "Mar", come: 61, left: 16 },
      { month: "Apr", come: 56, left: 15 },
      { month: "May", come: 70, left: 18 },
      { month: "Jun", come: 78, left: 10 },
      { month: "Jul", come: 83, left: 19 },
      { month: "Aug", come: 75, left: 17 },
      { month: "Sep", come: 79, left: 11 },
      { month: "Oct", come: 82, left: 13 },
      { month: "Nov", come: 85, left: 15 },
      { month: "Dec", come: 88, left: 17 },
    ],
    2025: [
      { month: "Jan", come: 80, left: 21 },
      { month: "Feb", come: 95, left: 13 },
      { month: "Mar", come: 87, left: 16 },
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
      title={<p className="dark:text-white">Students Analysis</p>}
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
            <YAxis />
            <Tooltip
              formatter={(i) => Number(i).toLocaleString("uz-Uz")}
              contentStyle={{ background: "black", color: "white" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="come"
              label="aaaa"
              stroke="#52c41a"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="left"
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

export default LineStudentsChart;
