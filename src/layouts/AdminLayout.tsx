import { Outlet, Link } from "react-router-dom";
import { clearTokens } from "../utils/auth";
import { clearRole } from "../utils/adminAuth";

export default function AdminLayout() {
  function logout() {
    clearTokens();
    clearRole();
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md border-r flex flex-col">
        <div className="p-4 text-xl font-bold border-b">
          Admin 後台
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <Link to="/admin/users" className="block text-blue-600 hover:font-semibold">
            使用者管理
          </Link>
          <Link to="/admin/chatrooms" className="block text-blue-600 hover:font-semibold">
            聊天室管理
          </Link>
        </nav>

        <button
          onClick={logout}
          className="m-4 text-red-600 py-2 rounded border border-red-400 hover:bg-red-50"
        >
          登出
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}