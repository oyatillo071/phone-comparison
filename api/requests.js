import { API_BASE_URL, API_KEY } from "@env";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  timeout: 10000,
});

export const apiRequest = async ({
  endpoint,
  method = "GET",
  params = {},
  data = {},
}) => {
  try {
    const hasQuery = endpoint.includes("?");
    console.log("FULL URL", axiosInstance.defaults.baseURL + endpoint);

    const response = await axiosInstance.request({
      url: endpoint,
      method,
      ...(hasQuery ? {} : { params }),
      data,
    });

    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.log("API error:", error?.response?.data || error.message);
    throw error;
  }
};
