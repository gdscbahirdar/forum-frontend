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

export async function apiGetUserBadges(username) {
  return ApiService.fetchData({
    url: `/user/${username}/badges/`,
    method: "get"
  });
}

export async function apiGetUsers() {
  return ApiService.fetchData({
    url: "/users/",
    method: "get"
  });
}

export async function apiGetUser(username) {
  return ApiService.fetchData({
    url: `/user/${username}/`,
    method: "get"
  });
}
