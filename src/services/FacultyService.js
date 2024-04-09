import ApiService from "./ApiService";

export async function apiGetFaculties(data) {
  return ApiService.fetchData({
    url: "/entities/faculty/",
    method: "get",
    data
  });
}
