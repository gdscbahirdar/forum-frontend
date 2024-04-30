import ApiService from "./ApiService";

export async function apiGetUserBookmarks(data) {
  return ApiService.fetchData({
    url: "/users/user/bookmarks/",
    method: "get",
    params: data
  });
}
