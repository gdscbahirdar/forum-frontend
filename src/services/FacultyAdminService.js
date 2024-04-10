import ApiService from "./ApiService";

export async function apiGetFacultyAdmins(data) {
  return ApiService.fetchData({
    url: "/entities/faculty_admin/",
    method: "get",
    params: data
  });
}

export async function apiGetFacultyAdminDetails(id) {
  return ApiService.fetchData({
    url: `/entities/faculty_admin/${id}`,
    method: "get"
  });
}

export async function apiPutFacultyAdmin(id, data) {
  return ApiService.fetchData({
    url: `/entities/faculty_admin/${id}/`,
    method: "put",
    data
  });
}

export async function apiCreateFacultyAdmin(data) {
  return ApiService.fetchData({
    url: "/entities/faculty_admin/",
    method: "post",
    data
  });
}

export async function apiDeleteFacultyAdmin(id) {
  return ApiService.fetchData({
    url: `/entities/faculty_admin/${id}`,
    method: "delete"
  });
}
