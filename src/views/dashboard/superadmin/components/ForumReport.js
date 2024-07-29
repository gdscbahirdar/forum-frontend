import React from "react";
import { Card, Button } from "components/ui";
import { Chart } from "components/shared";
import { apiDownloadReport } from "services/DashboardService";

const ForumReport = ({ className, data = {} }) => {
  async function downloadExcelFile() {
    try {
      const response = await apiDownloadReport();
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading the file:", error);
    }
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <h4>Forum Report</h4>
        <Button size="sm" onClick={downloadExcelFile}>
          Export Report
        </Button>
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
