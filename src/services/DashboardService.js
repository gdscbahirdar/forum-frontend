import ApiService from "./ApiService";

export async function apiGetForumDashboardData(data) {
  return ApiService.fetchData({
    url: "/analytics/stats/",
    method: "get",
    data
  });
}

export async function apiDownloadReport() {
  return ApiService.fetchData({
    url: "/analytics/export_excel/",
    method: "get",
    responseType: "blob"
  });
}
