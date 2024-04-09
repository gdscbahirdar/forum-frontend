import ApiService from "./ApiService";

export async function apiGetCrmCustomers(data) {
  return ApiService.fetchData({
    url: "/entities/student/",
    method: "get",
    data
  });
}

export async function apiGetCrmCustomerDetails(id) {
  return ApiService.fetchData({
    url: `/entities/student/${id}`,
    method: "get"
  });
}

export async function apiPutCrmCustomer(id, data) {
  return ApiService.fetchData({
    url: `/entities/student/${id}/`,
    method: "put",
    data
  });
}

export async function apiCreateCrmCustomer(data) {
  return ApiService.fetchData({
    url: "/entities/student/",
    method: "post",
    data
  });
}

export async function apiDeleteCrmCustomer(id) {
  return ApiService.fetchData({
    url: `/entities/student/${id}`,
    method: "delete"
  });
}
