import ApiService from "./ApiService";

export async function apiGetStudents(data) {
  return ApiService.fetchData({
    url: "/entities/student/",
    method: "get",
    params: data
  });
}

export async function apiGetStudentDetails(id) {
  return ApiService.fetchData({
    url: `/entities/student/${id}`,
    method: "get"
  });
}

export async function apiPutStudent(id, data) {
  return ApiService.fetchData({
    url: `/entities/student/${id}/`,
    method: "put",
    data
  });
}

export async function apiCreateStudent(data) {
  return ApiService.fetchData({
    url: "/entities/student/",
    method: "post",
    data
  });
}

export async function apiBulkCreateStudents(file) {
  const formData = new FormData();
  formData.append("file", file);

  return ApiService.fetchData({
    url: "/entities/upload_students/",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export async function apiDeleteStudent(id) {
  return ApiService.fetchData({
    url: `/entities/student/${id}`,
    method: "delete"
  });
}
