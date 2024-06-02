import ApiService from "./ApiService";

export async function apiGetUserBookmarkedPosts() {
  return ApiService.fetchData({
    url: `/users/user/bookmarks/post`,
    method: "get"
  });
}

export async function apiGetUserBookmarkedResources() {
  return ApiService.fetchData({
    url: `/users/user/bookmarks/resource`,
    method: "get"
  });
}
