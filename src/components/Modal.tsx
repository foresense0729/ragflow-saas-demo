interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: any;
  }
  
  export default function Modal({ open, onClose, title, children }: Props) {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-96 p-6 relative animate-fade-in">
          <div className="text-lg font-bold mb-4">{title}</div>
  
          {children}
  
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }