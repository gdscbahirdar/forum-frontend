import ApiService from "./ApiService";

export async function apiGetQuestions(data) {
  return ApiService.fetchData({
    url: "/forum/questions/",
    method: "get",
    params: data
  });
}

export async function apiGetOthersQuestionList(id) {
  return ApiService.fetchData({
    url: `/forum/questions/${id}/others/`,
    method: "get"
  });
}

export async function apiGetTags(params) {
  return ApiService.fetchData({
    url: "/forum/tags/",
    method: "get",
    params: params
  });
}

export async function apiGetQuestionsByTag(tag) {
  return ApiService.fetchData({
    url: `/forum/tags/${tag}/questions/`,
    method: "get"
  });
}

export async function apiGetQuestionDetails(id) {
  return ApiService.fetchData({
    url: `/forum/questions/${id}`,
    method: "get"
  });
}

export async function apiPutQuestion(id, data) {
  return ApiService.fetchData({
    url: `/forum/questions/${id}/`,
    method: "put",
    data
  });
}

export async function apiCreateQuestion(data) {
  return ApiService.fetchData({
    url: "/forum/questions/",
    method: "post",
    data
  });
}

export async function apiDeleteQuestion(id) {
  return ApiService.fetchData({
    url: `/entities/question/${id}`,
    method: "delete"
  });
}
