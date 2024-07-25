import ApiService from "./ApiService";

export async function apiGetForumDashboardData(data) {
  return ApiService.fetchData({
    url: "/analytics/stats/",
    method: "get",
    data
  });
}
