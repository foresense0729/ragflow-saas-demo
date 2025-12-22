CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    trial_started_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 試用期遷移腳本（現有資料庫使用）
-- ALTER TABLE users ADD COLUMN trial_started_at TIMESTAMP;

CREATE TABLE chatrooms (
    id SERIAL PRIMARY KEY,
    room_code VARCHAR(100) UNIQUE NOT NULL,
    ragflow_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 預設 Admin 帳號（bcrypt: Admin123!）
INSERT INTO users (email, password_hash, role)
VALUES (
    'admin@sass.com',
    '$2a$10$7uM9JLnYf1JCeJyb5fQW3eXqfNw2YhL2wuVSKzEY2m5pXL9uBebUa',
    'admin'
);