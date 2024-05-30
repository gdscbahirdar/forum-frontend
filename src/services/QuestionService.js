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
    url: `/forum/questions/${id}`,
    method: "delete"
  });
}

export async function apiCreateAnswer(id, data) {
  return ApiService.fetchData({
    url: `/forum/questions/${id}/answers/`,
    method: "post",
    data
  });
}

export async function apiGetAnswers(id, data) {
  return ApiService.fetchData({
    url: `/forum/questions/${id}/answers/`,
    method: "get",
    params: data
  });
}

export async function apiGetAnswerDetails(questionId, answerId) {
  return ApiService.fetchData({
    url: `/forum/questions/${questionId}/answers/${answerId}/`,
    method: "get"
  });
}

export async function apiPutAnswer(questionId, answerId, data) {
  return ApiService.fetchData({
    url: `/forum/questions/${questionId}/answers/${answerId}/`,
    method: "put",
    data
  });
}

export async function apiDeleteAnswer(questionId, answerId) {
  return ApiService.fetchData({
    url: `/forum/questions/${questionId}/answers/${answerId}/`,
    method: "delete"
  });
}

export async function apiCreateComment(id, data) {
  return ApiService.fetchData({
    url: `/post/${id}/comments/`,
    method: "post",
    data
  });
}

export async function apiGetComments(id) {
  return ApiService.fetchData({
    url: `/post/${id}/comments/`,
    method: "get"
  });
}

export async function apiCreateVote(data) {
  return ApiService.fetchData({
    url: `/post/vote/`,
    method: "post",
    data
  });
}

export async function apiAcceptAnswer(id, data) {
  return ApiService.fetchData({
    url: `/forum/questions/${id}/accept_answer/`,
    method: "post",
    data
  });
}

export async function apiCreateBookmark(id) {
  return ApiService.fetchData({
    url: `/post/bookmark/${id}/`,
    method: "post"
  });
}

export async function apiDeleteBookmark(id) {
  return ApiService.fetchData({
    url: `/post/bookmark/${id}/`,
    method: "delete"
  });
}
