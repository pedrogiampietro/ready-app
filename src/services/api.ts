import axios from "axios";

let isRefreshing = false;
let failedRequestQueue = [];

const limit = 20;

export function apiClient() {
  //   const token = getStorageModel(auth.TOKEN);
  //   const restoreUser = getStorageModel(auth.USER);
  //   const user = JSON.parse(restoreUser);

  const api = axios.create({
    baseURL: "http://192.168.1.4:3333",
    headers: {
      //   Authorization: `Bearer ${token}`,
      //   userId: user.userId,
      ContentType: "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  api.interceptors.request.use(
    (request: any) => {
      if (request.method?.toLowerCase() === "get") {
        request.headers.limit = request.headers.limit ?? String(limit);
      }

      return request;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("Error message:", error.message);
      console.log("Error config:", error.config);
      console.log("Error response:", error.response);
      return Promise.reject(error);
    }
  );

  return api;
}
