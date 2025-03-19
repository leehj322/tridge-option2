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
  duration?: number;
};

interface ToastProps {
  toast: Toast;
}

function Toast({ toast }: ToastProps) {
  return (
    <div
      className={`rounded-lg bg-gray-950 px-4 py-2 text-sm text-white shadow-lg`}
    >
      {toast.message}
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
}

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-right": "top-5 right-5",
  "top-left": "top-5 left-5",
  "top-center": "top-5 left-1/2 transform -translate-x-1/2",
  "bottom-right": "bottom-5 right-5",
  "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
  "bottom-left": "bottom-5 left-5",
};

export function ToastContainer({ toasts }: ToastContainerProps) {
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
              <Toast key={toast.id} toast={toast} />
            ))}
          </div>
        );
      })}
    </>
  );
}
