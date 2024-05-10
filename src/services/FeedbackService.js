import ApiService from "./ApiService";

export async function apiGetFeedbackList() {
  return ApiService.fetchData({
    url: "/feedback/",
    method: "get"
  });
}

export async function apiGetFeedback(id) {
  return ApiService.fetchData({
    url: `/feedback/${id}/`,
    method: "get"
  });
}

export async function apiAddFeedback(data) {
  return ApiService.fetchData({
    url: "/feedback/",
    method: "post",
    data
  });
}

export async function apiUpdateFeedback(id, data) {
  return ApiService.fetchData({
    url: `/feedback/${id}/`,
    method: "put",
    data
  });
}

export async function apiDeleteFeedback(id) {
  return ApiService.fetchData({
    url: `/feedback/${id}/`,
    method: "delete"
  });
}
