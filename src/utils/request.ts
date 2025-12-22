import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "./auth";

const api = axios.create({
  baseURL: "/api",
});

// 自動加上 Access Token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 自動 refresh token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err.response?.status;

    // 試用期過期
    if (status === 403) {
      clearTokens();
      localStorage.removeItem("role");
      localStorage.removeItem("daysRemaining");
      window.location.href = "/login";
      return Promise.reject(err);
    }

    if (status === 401) {
      const refresh = getRefreshToken();
      if (!refresh) {
        clearTokens();
        window.location.href = "/login";
        return;
      }

      try {
        const res = await axios.post("/api/auth/refresh", {
          refreshToken: refresh,
        });

        const { accessToken, daysRemaining } = res.data.data;
        setTokens(accessToken, refresh);
        if (daysRemaining !== undefined) {
          localStorage.setItem("daysRemaining", String(daysRemaining));
        }

        err.config.headers.Authorization = `Bearer ${accessToken}`;
        return axios(err.config);
      } catch (refreshErr: any) {
        clearTokens();
        localStorage.removeItem("role");
        localStorage.removeItem("daysRemaining");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;