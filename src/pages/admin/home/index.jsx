import React from "react";
import { LineChart } from "../../../components";
import { StatsCards } from "./sections";

const Home = () => {
  const initialData = {
    stats: {
      total_groups: 25,
      total_students: 220,
      total_teachers: 41,
      total_employees: 12,
    },
  };

  const studentsMonthlyData = [
    { month: "Jan", value: 30, type: "joined" },
    { month: "Feb", value: 41, type: "joined" },
    { month: "Mar", value: 35, type: "joined" },
    { month: "Apr", value: 53, type: "joined" },
    { month: "May", value: 49, type: "joined" },
    { month: "Jun", value: 63, type: "joined" },
    { month: "Jul", value: 55, type: "joined" },
    { month: "Aug", value: 22, type: "joined" },
    { month: "Sept", value: 18, type: "joined" },
    { month: "Oct", value: 28, type: "joined" },
    { month: "Nov", value: 22, type: "joined" },
    { month: "Dec", value: 25, type: "joined" },
    { month: "Jan", value: 12, type: "left" },
    { month: "Feb", value: 6, type: "left" },
    { month: "Mar", value: 9, type: "left" },
    { month: "Apr", value: 11, type: "left" },
    { month: "May", value: 5, type: "left" },
    { month: "Jun", value: 10, type: "left" },
    { month: "Jul", value: 7, type: "left" },
    { month: "Aug", value: 9, type: "left" },
    { month: "Sept", value: 13, type: "left" },
    { month: "Oct", value: 15, type: "left" },
    { month: "Nov", value: 12, type: "left" },
    { month: "Dec", value: 10, type: "left" },
  ];

  const financeMonthlyData = [
    { month: "Jan", value: 4500000, type: "income" },
    { month: "Feb", value: 3900000, type: "income" },
    { month: "Mar", value: 3000000, type: "income" },
    { month: "Apr", value: 5000000, type: "income" },
    { month: "May", value: 4400000, type: "income" },
    { month: "Jun", value: 3900000, type: "income" },
    { month: "Jul", value: 5500000, type: "income" },
    { month: "Aug", value: 4200000, type: "income" },
    { month: "Sept", value: 2600000, type: "income" },
    { month: "Oct", value: 2500000, type: "income" },
    { month: "Nov", value: 3200000, type: "income" },
    { month: "Dec", value: 2500000, type: "income" },
    { month: "Jan", value: 1200000, type: "expense" },
    { month: "Feb", value: 600000, type: "expense" },
    { month: "Mar", value: 900000, type: "expense" },
    { month: "Apr", value: 1100000, type: "expense" },
    { month: "May", value: 500000, type: "expense" },
    { month: "Jun", value: 1000000, type: "expense" },
    { month: "Jul", value: 700000, type: "expense" },
    { month: "Aug", value: 900000, type: "expense" },
    { month: "Sept", value: 300000, type: "expense" },
    { month: "Oct", value: 500000, type: "expense" },
    { month: "Nov", value: 200000, type: "expense" },
    { month: "Dec", value: 1000000, type: "expense" },
  ];

  

  return (
    <div>
      <>
        <StatsCards data={initialData.stats} />
      </>

      <div className="grid grid-cols-1F md:grid-cols-2">
        <div>
          <LineChart
            data={studentsMonthlyData}
            xField={"month"}
            yField={"value"}
            colorField={"type"}
            title={"Students Monthly stats"}
          />
        </div>
        <div>
          <LineChart
            data={financeMonthlyData}
            xField={"month"}
            yField={"value"}
            colorField={"type"}
            title={"Finance Monthly stats"}
          />
        </div>
      </div>
      <p>Admin Home page.</p>
    </div>
  );
};

export default Home;
