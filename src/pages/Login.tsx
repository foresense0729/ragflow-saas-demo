import { useState } from "react";
import api from "../utils/request";
import { setTokens } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  async function login() {
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password: pw });
      const { accessToken, refreshToken, role, daysRemaining } = res.data.data;

      setTokens(accessToken, refreshToken);
      localStorage.setItem("role", role);
      localStorage.setItem("daysRemaining", String(daysRemaining));

      window.location.href = "/chatrooms";
    } catch (err: any) {
      const message = err.response?.data?.message || "登入失敗，請確認帳密。";
      setError(message);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-6">使用者登入</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          登入
        </button>
      </div>
    </div>
  );
}