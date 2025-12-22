export function setTokens(access: string, refresh: string) {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  }
  
  export function getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  
  export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  
  export function clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  
  export function isLoggedIn() {
    return !!getAccessToken();
  }