import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://localhost:5000",
  // withCredentials: true
});

baseApi.interceptors.response.use((res) => res, async (err) => {
  if (err.response.status === 401) {
  }
})
