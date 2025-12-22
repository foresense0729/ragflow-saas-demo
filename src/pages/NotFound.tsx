export default function NotFound() {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-400">404</h1>
          <p className="text-gray-700 mt-4 text-lg">找不到此頁面</p>
          <a
            href="/"
            className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded"
          >
            回首頁
          </a>
        </div>
      </div>
    );
  }