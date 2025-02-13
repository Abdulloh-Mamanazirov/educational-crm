import React from "react";
import { StatsCard } from "../../../../components";

const StatsCards = ({ data }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <StatsCard
        title={"Groups"}
        icon={"fa-people-group"}
        value={data.total_groups}
      />
      <StatsCard
        title={"Students"}
        icon={"fa-user-graduate"}
        value={data.total_students}
      />
      <StatsCard
        title={"Teachers"}
        icon={"fa-chalkboard-user"}
        value={data.total_teachers}
      />
      <StatsCard
        title={"Employees"}
        icon={"fa-user-tie"}
        value={data.total_employees}
      />
    </div>
  );
};

export default StatsCards;
