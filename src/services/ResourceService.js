import ApiService from "./ApiService";

export async function apiGetResources(data) {
  return ApiService.fetchData({
    url: "/resources/",
    method: "get",
    params: data
  });
}

export async function apiGetMyResources(data) {
  return ApiService.fetchData({
    url: "/resources/myUploads",
    method: "get",
    params: data
  });
}

export async function apiDeleteResource(id) {
  return ApiService.fetchData({
    url: `/resources/${id}`,
    method: "delete"
  });
}

export async function apiGetResource(id) {
  return ApiService.fetchData({
    url: `/resources/${id}`,
    method: "get"
  });
}

export async function apiPutResource(id, data) {
  return ApiService.fetchData({
    url: `/resources/${id}/`,
    method: "put",
    data
  });
}

export async function apiCreateResource(data) {
  return ApiService.fetchData({
    url: "/resources/",
    method: "post",
    data
  });
}

export async function apiCreateVote(data) {
  return ApiService.fetchData({
    url: `/resource/vote/`,
    method: "post",
    data
  });
}

export async function apiGetResourceCategories(params) {
  return ApiService.fetchData({
    url: `/resources/categories`,
    method: "get",
    params
  });
}

export async function apiCreateComment(id, data) {
  return ApiService.fetchData({
    url: `/resource/${id}/comments/`,
    method: "post",
    data
  });
}

export async function apiGetComments(id) {
  return ApiService.fetchData({
    url: `/resource/${id}/comments/`,
    method: "get"
  });
}

export async function apiCreateBookmark(id) {
  return ApiService.fetchData({
    url: `/resource/bookmark/${id}/`,
    method: "post"
  });
}

export async function apiDeleteBookmark(id) {
  return ApiService.fetchData({
    url: `/resource/bookmark/${id}/`,
    method: "delete"
  });
}
