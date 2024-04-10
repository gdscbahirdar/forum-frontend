import ApiService from "./ApiService";

export async function apiGetTeachers(data) {
  return ApiService.fetchData({
    url: "/entities/teacher/",
    method: "get",
    params: data
  });
}

export async function apiGetTeacherDetails(id) {
  return ApiService.fetchData({
    url: `/entities/teacher/${id}`,
    method: "get"
  });
}

export async function apiPutTeacher(id, data) {
  return ApiService.fetchData({
    url: `/entities/teacher/${id}/`,
    method: "put",
    data
  });
}

export async function apiCreateTeacher(data) {
  return ApiService.fetchData({
    url: "/entities/teacher/",
    method: "post",
    data
  });
}

export async function apiDeleteTeacher(id) {
  return ApiService.fetchData({
    url: `/entities/teacher/${id}`,
    method: "delete"
  });
}
