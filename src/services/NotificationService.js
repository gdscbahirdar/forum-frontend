import ApiService from "./ApiService";

export async function apiGetUnreadNotificationCount() {
  return ApiService.fetchData({
    url: "/notifications/unread_count/",
    method: "get"
  });
}

export async function apiGetNotificationList(params, size) {
  let url = "/notifications/";
  if (size) {
    url += `?size=${size}`;
  }
  return ApiService.fetchData({
    url: url,
    method: "get",
    params: params
  });
}
export async function apiPostNotificationAction(action, data) {
  return ApiService.fetchData({
    url: `/notification_actions/${action}/`,
    method: "post",
    data: data
  });
}

export async function apiCreateSubscription(data) {
  return ApiService.fetchData({
    url: "/subscriptions/",
    method: "post",
    data: data
  });
}

export async function apiDeleteSubscription(targetId) {
  return ApiService.fetchData({
    url: `/subscriptions/${targetId}/`,
    method: "delete"
  });
}

export async function apiBulkDeleteSubscription(data) {
  return ApiService.fetchData({
    url: "subscriptions/bulk_delete/",
    method: "delete",
    data: data
  });
}
