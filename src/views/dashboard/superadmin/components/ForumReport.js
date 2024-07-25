import React from "react";
import { Card, Button } from "components/ui";
import { Chart } from "components/shared";

const ForumReport = ({ className, data = {} }) => {
  function downloadExcelFile() {
    fetch("/api/analytics/export_excel/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => console.error("Error downloading the file:", error));
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
