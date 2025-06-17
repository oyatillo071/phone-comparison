import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY || ""}`,
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
