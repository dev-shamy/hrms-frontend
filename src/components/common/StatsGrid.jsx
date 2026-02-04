import React from "react";
import Card from "./Card";

const StatItem = ({ title, value, icon: Icon, colorClass, trend }) => (
  <div className="flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass}`}
    >
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
      </div>
    </div>
  </div>
);

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="hover:shadow-md transition-shadow cursor-default"
        >
          <StatItem {...stat} />
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
