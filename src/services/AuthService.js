import ApiService from "./ApiService";

export async function apiSignIn(data) {
  return ApiService.fetchData({
    url: "/users/login/",
    method: "post",
    data
  });
}

export async function apiSignOut(data) {
  return ApiService.fetchData({
    url: "/users/logout/",
    method: "post",
    data
  });
}

export async function apiResetPassword(data) {
  return ApiService.fetchData({
    url: "/users/password/change/",
    method: "post",
    data
  });
}
