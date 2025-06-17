// src/api/request.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zylalabs.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 8722|eDDvUAXrOcRUXpEm0bpY2NcVZYrQ4NUiIBQ9Eohq",
  },
  timeout: 10000,
});

export const apiRequest = async ({
  endpoint,
  method = "GET",
  params = {},
  data = {},
}: {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, any>;
  data?: Record<string, any>;
}) => {
  const response = await axiosInstance.request({
    url: endpoint,
    method,
    params,
    data,
  });

  return response.data;
};
