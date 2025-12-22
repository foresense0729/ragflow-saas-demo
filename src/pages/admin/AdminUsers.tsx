import { useEffect, useState } from "react";
import api from "../../utils/request";
import Modal from "../../components/Modal";

interface User {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [role, setRole] = useState("user");

  async function load() {
    const res = await api.get("/admin/users");
    setUsers(res.data.data);
  }

  async function createUser() {
    await api.post("/admin/users/create", {
      email,
      password: pw,
      role,
    });
    setOpen(false);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">使用者管理</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + 新增使用者
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">角色</th>
            <th className="p-3 text-left">建立時間</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3 text-gray-500 text-sm">
                {new Date(u.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={() => setOpen(false)} title="新增使用者">
        <div className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Password"
            type="password"
            onChange={(e) => setPw(e.target.value)}
          />

          <select
            className="border p-2 w-full rounded"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">一般使用者</option>
            <option value="admin">管理員</option>
          </select>

          <button
            onClick={createUser}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            建立
          </button>
        </div>
      </Modal>
    </div>
  );
}