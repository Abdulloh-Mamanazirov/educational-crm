import React from "react";
import {
  LineFinanceChart,
  LineStudentsChart,
  StatsCards,
  WeeklySchedule,
} from "./sections";

const Home = () => {
  const initialData = {
    stats: {
      total_groups: 25,
      total_students: 220,
      total_teachers: 41,
      total_employees: 12,
    },
  };

  return (
    <div>
      <>
        <StatsCards data={initialData.stats} />
      </>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
        <div>
          <LineStudentsChart />
        </div>
        <div>
          <LineFinanceChart />
        </div>
      </div>
      <div>
        <WeeklySchedule />
      </div>
    </div>
  );
};

export default Home;
