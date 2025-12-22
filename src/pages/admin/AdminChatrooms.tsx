import { useEffect, useState } from "react";
import api from "../../utils/request";
import Modal from "../../components/Modal";

interface Room {
  id: number;
  room_code: string;
  ragflow_url: string;
}

export default function AdminChatrooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [open, setOpen] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [roomCode, setRoomCode] = useState("");
  const [url, setUrl] = useState("");

  async function load() {
    const res = await api.get("/admin/chatrooms");
    setRooms(res.data.data);
  }

  function openCreate() {
    setEditId(null);
    setRoomCode("");
    setUrl("");
    setOpen(true);
  }

  function openEdit(r: Room) {
    setEditId(r.id);
    setRoomCode(r.room_code);
    setUrl(r.ragflow_url);
    setOpen(true);
  }

  async function save() {
    if (editId) {
      await api.post("/admin/chatrooms/update", {
        id: editId,
        room_code: roomCode,
        ragflow_url: url,
      });
    } else {
      await api.post("/admin/chatrooms/create", {
        room_code: roomCode,
        ragflow_url: url,
      });
    }
    setOpen(false);
    load();
  }

  async function remove(id: number) {
    if (!confirm("確定要刪除？")) return;

    await api.post("/admin/chatrooms/delete", { id });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">聊天室管理</h1>

        <button
          onClick={openCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + 新增聊天室
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 text-left">Room Code</th>
            <th className="p-3 text-left">Ragflow URL</th>
            <th className="p-3 text-left w-36">操作</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-3">{r.room_code}</td>
              <td className="p-3 truncate max-w-xs">{r.ragflow_url}</td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => openEdit(r)}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  編輯
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editId ? "編輯聊天室" : "新增聊天室"}
      >
        <div className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />

          <textarea
            className="border p-2 w-full rounded h-24"
            placeholder="Ragflow URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={save}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            儲存
          </button>
        </div>
      </Modal>
    </div>
  );
}