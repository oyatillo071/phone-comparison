import axios from "axios";
import { Alert } from "react-native";

const axiosInstance = axios.create({
  baseURL: "https://zylalabs.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 8722|eDDvUAXrOcRUXpEm0bpY2NcVZYrQ4NUiIBQ9Eohq",
  },
  timeout: 10000,
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      Alert.alert("API Error:", error.response.data);
    } else if (error.request) {
      Alert.alert("No response received:", error.request);
    } else {
      Alert.alert("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);
