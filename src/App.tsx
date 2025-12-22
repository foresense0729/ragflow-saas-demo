import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";
import Chatrooms from "./pages/Chatrooms";
import Chat from "./pages/Chat";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminChatrooms from "./pages/admin/AdminChatrooms";

import NotFound from "./pages/NotFound";

import { isLoggedIn } from "./utils/auth";
import { isAdmin } from "./utils/adminAuth";

interface RouteGuardProps {
  children: ReactNode;
}

function PrivateRoute({ children }: RouteGuardProps) {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: RouteGuardProps) {
  return isLoggedIn() && isAdmin() ? <>{children}</> : <Navigate to="/admin/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 首頁導向 */}
        <Route path="/" element={<Navigate to="/chatrooms" replace />} />

        {/* User Login */}
        <Route path="/login" element={<Login />} />

        {/* User Pages */}
        <Route element={<UserLayout />}>
          <Route
            path="/chatrooms"
            element={
              <PrivateRoute>
                <Chatrooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="chatrooms" element={<AdminChatrooms />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}