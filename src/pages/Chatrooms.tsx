import { useEffect, useState } from "react";
import api from "../utils/request";

interface Room {
  id: number;
  room_code: string;
  ragflow_url: string;
}

export default function Chatrooms() {
  const [list, setList] = useState<Room[]>([]);

  useEffect(() => {
    api.get("/chatroom/list").then((res) => {
      setList(res.data.data);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">選擇聊天室</h1>

      <div className="space-y-4">
        {list.length === 0 ? (
          <p className="text-center text-gray-500">尚無可用聊天室</p>
        ) : (
          list.map((r) => (
            <a
              key={r.id}
              href={`/chat?room=${r.room_code}`}
              className="block p-4 border rounded-lg shadow hover:bg-gray-50 transition"
            >
              <div className="font-bold">{r.room_code}</div>
              <div className="text-gray-500 text-sm truncate">
                {r.ragflow_url}
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}