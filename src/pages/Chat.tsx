import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/request";
import ChatFrame from "../components/ChatFrame";

export default function Chat() {
  const params = new URLSearchParams(useLocation().search);
  const code = params.get("room");
  const [url, setUrl] = useState("");

  useEffect(() => {
    api.get("/chatroom/list").then((res) => {
      const found = res.data.data.find((x: any) => x.room_code === code);
      if (found) setUrl(found.ragflow_url);
    });
  }, []);

  if (!url)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        查無聊天室：{code}
      </div>
    );

  return (
    <div className="h-screen p-4 bg-white">
      <div className="h-full border rounded-2xl shadow overflow-hidden">
        <ChatFrame url={url} />
      </div>
    </div>
  );
}