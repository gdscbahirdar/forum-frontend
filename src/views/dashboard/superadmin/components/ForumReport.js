import React from "react";
import { Card, Button } from "components/ui";
import { Chart } from "components/shared";

const ForumReport = ({ className, data = {} }) => {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <h4>Forum Report</h4>
        <Button size="sm">Export Report</Button>
      </div>
      <Chart
        series={data.series}
        xAxis={data.dates}
        height="380px"
        customOptions={{ legend: { show: false } }}
      />
    </Card>
  );
};

export default ForumReport;
