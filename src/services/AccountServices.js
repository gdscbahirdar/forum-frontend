import ApiService from "./ApiService";

export async function apiGetProfileData() {
  return ApiService.fetchData({
    url: "/users/user/",
    method: "get"
  });
}

export async function apiUpdateProfile(data) {
  return ApiService.fetchData({
    url: "/users/user/",
    method: "put",
    data
  });
}

export async function apiUpdatePassword(data) {
  return ApiService.fetchData({
    url: "/users/password/change/",
    method: "post",
    data
  });
}
