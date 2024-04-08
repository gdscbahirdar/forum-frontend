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

export async function apiPutCrmCustomer(data) {
  return ApiService.fetchData({
    url: "/entities",
    method: "put",
    data
  });
}

export async function apiDeleteCrmCustomer(id) {
  return ApiService.fetchData({
    url: `/entities/student/${id}`,
    method: "delete"
  });
}
