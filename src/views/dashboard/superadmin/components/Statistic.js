import React from "react";
import { Card } from "components/ui";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";

const StatisticCard = ({ data, label }) => {
  return (
    <Card>
      <h6 className="font-semibold mb-4 text-sm">{label}</h6>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">
            <NumberFormat displayType="text" value={data} thousandSeparator />
          </h3>
        </div>
      </div>
    </Card>
  );
};

const Statistic = ({ data = {} }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <StatisticCard data={data.total_students} label="Total Students" />
      <StatisticCard data={data.total_teachers} label="Total Teachers" />
      <StatisticCard data={data.total_questions} label="Total Questions" />
    </div>
  );
};

export default Statistic;
