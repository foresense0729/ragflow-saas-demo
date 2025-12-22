export function isAdmin() {
    const role = localStorage.getItem("role");
    return role === "admin";
  }
  
  export function setRole(role: string) {
    localStorage.setItem("role", role);
  }
  
  export function clearRole() {
    localStorage.removeItem("role");
  }