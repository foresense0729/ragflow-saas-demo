import { useState } from "react";
import api from "../../utils/request";
import { setTokens } from "../../utils/auth";
import { setRole } from "../../utils/adminAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  async function login() {
    try {
      const res = await api.post("/auth/login", { email, password: pw });
      const { accessToken, refreshToken, role } = res.data.data;

      if (role !== "admin") {
        alert("此帳號沒有管理員權限");
        return;
      }

      setTokens(accessToken, refreshToken);
      setRole(role);

      window.location.href = "/admin/users";
    } catch (err) {
      alert("登入失敗，請確認帳密。");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-6">Admin 後台登入</h1>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-5 rounded"
          placeholder="Password"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          登入
        </button>
      </div>
    </div>
  );
}