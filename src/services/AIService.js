import ApiService from "./ApiService";

export async function apiGetAIResponse(data) {
  return ApiService.fetchData({
    url: "/ai/generate_text/",
    method: "post",
    data
  });
}
