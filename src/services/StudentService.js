import ApiService from "./ApiService";

export async function apiGetStudentStudents(data) {
  return ApiService.fetchData({
    url: "/entities/student/",
    method: "get",
    params: data
  });
}

export async function apiGetStudentStudentDetails(id) {
  return ApiService.fetchData({
    url: `/entities/student/${id}`,
    method: "get"
  });
}

export async function apiPutStudentStudent(id, data) {
  return ApiService.fetchData({
    url: `/entities/student/${id}/`,
    method: "put",
    data
  });
}

export async function apiCreateStudentStudent(data) {
  return ApiService.fetchData({
    url: "/entities/student/",
    method: "post",
    data
  });
}

export async function apiDeleteStudentStudent(id) {
  return ApiService.fetchData({
    url: `/entities/student/${id}`,
    method: "delete"
  });
}
