type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export type Toast = {
  id: number;
  message: string;
  position?: ToastPosition;
  duration?: number | null;
};

interface ToastProps {
  toast: Toast;
  removeToast: (id: number) => void;
}

function Toast({ toast, removeToast }: ToastProps) {
  return (
    <div
      className={`flex w-95 items-center justify-between gap-2 bg-gray-950 p-5 text-white shadow-lg`}
    >
      <span>{toast.message}</span>
      <button
        className="shrink-0 self-start opacity-50 hover:cursor-pointer hover:opacity-70"
        onClick={() => removeToast(toast.id)}
      >
        <img
          src="/src/assets/icons/cross-white-small.svg"
          alt="toast close icon"
        />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: number) => void;
}

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-right": "top-5 right-5",
  "top-left": "top-5 left-5",
  "top-center": "top-5 left-1/2 transform -translate-x-1/2",
  "bottom-right": "bottom-5 right-5",
  "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
  "bottom-left": "bottom-5 left-5",
};

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <>
      {Object.keys(POSITION_CLASSES).map((position) => {
        const filteredToasts = toasts.filter(
          (toast) => toast.position === position,
        );
        return (
          <div
            key={position}
            className={`fixed z-50 flex flex-col gap-2 ${POSITION_CLASSES[position as ToastPosition]}`}
          >
            {filteredToasts.map((toast) => (
              <Toast key={toast.id} toast={toast} removeToast={removeToast} />
            ))}
          </div>
        );
      })}
    </>
  );
}
