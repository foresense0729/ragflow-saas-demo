import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/request";

export default function UserLayout() {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    // 從 API 獲取最新的試用期狀態
    api.get("/auth/me").then((res) => {
      const days = res.data.data.daysRemaining;
      if (days !== undefined && days >= 0) {
        setDaysRemaining(days);
        localStorage.setItem("daysRemaining", String(days));
      }
    }).catch(() => {
      // 如果請求失敗，嘗試從 localStorage 讀取
      const stored = localStorage.getItem("daysRemaining");
      if (stored) setDaysRemaining(parseInt(stored, 10));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* 試用期提示 */}
      {daysRemaining !== null && daysRemaining >= 0 && (
        <div
          className={`text-center py-2 text-sm ${daysRemaining <= 7
              ? "bg-red-500 text-white"
              : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {daysRemaining === 0 ? (
            "⚠️ 試用期今天到期"
          ) : daysRemaining <= 7 ? (
            `⚠️ 試用期剩餘 ${daysRemaining} 天`
          ) : (
            `試用期剩餘 ${daysRemaining} 天`
          )}
        </div>
      )}
      <Outlet />
    </div>
  );
}