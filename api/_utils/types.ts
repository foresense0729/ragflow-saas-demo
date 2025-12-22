/**
 * 共用類型定義
 */

export interface User {
    id: number;
    email: string;
    password_hash: string;
    role: "user" | "admin";
    trial_started_at: string | null;
    created_at: string;
}

export interface Chatroom {
    id: number;
    room_code: string;
    ragflow_url: string;
    created_at: string;
}

export interface ChatLog {
    id: number;
    user_id: number;
    message: string;
    created_at: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
}
