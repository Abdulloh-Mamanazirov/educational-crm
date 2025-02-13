import React from "react";

const StatsCard = ({ title, icon, value }) => {
  return (
    <div className="flex-1 flex items-start justify-between p-3 border rounded-xl shadow-md dark:bg-gradient-to-br from-dark-m to-dark-l">
      <div className="flex flex-col">
        <span className={`fa-solid ${icon} text-3xl`} />
        <p className="text-2xl font-medium">{title}</p>
      </div>
      <p className="text-5xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
