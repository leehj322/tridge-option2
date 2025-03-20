import { useEffect, useState, useRef } from "react";

type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

type ToastStatus = "success" | "warning" | "error" | "default";

export type Toast = {
  id: number;
  message: string;
  position?: ToastPosition;
  duration?: number | null;
  status?: ToastStatus;
};

interface ToastProps {
  toast: Toast;
  removeToast: (id: number) => void;
}

const STATUS_COLOR_CLASSES: Record<ToastStatus, string> = {
  success: "bg-green-600",
  warning: "bg-yellow-600",
  error: "bg-red-700",
  default: "bg-gray-950",
};

function Toast({ toast, removeToast }: ToastProps) {
  const timerRef = useRef<number | null>(null);
  const [startAt, setStartAt] = useState<number>(Date.now());
  const [remainingTime, setRemainingTime] = useState(
    toast.duration as number | null, // showToastMessage에서 기본값을 제공하므로 undefined가 아님
  );
  const [isProgressing, setIsProgressing] = useState<boolean>(false);

  // auto-close 타이머, 마운트 및 Mouse Leave (resume) 시에 실행
  const startCloseTimer = () => {
    if (remainingTime === null) return; // remainingTime can be 0

    const closeTimer = setTimeout(() => {
      removeToast(toast.id);
    }, remainingTime);

    timerRef.current = closeTimer;
    setStartAt(Date.now());
    setIsProgressing(true);
  };

  // Mouse Enter 시 타이머 일시정지 (pause)
  const pauseCloseTimer = () => {
    if (remainingTime === null || !timerRef.current) return;
    setIsProgressing(false);

    clearTimeout(timerRef.current);
    timerRef.current = null;

    const elapsedTime = Date.now() - startAt;
    setRemainingTime((prev) => (prev as number) - elapsedTime);
  };

  // 닫기 버튼 누를 시 타이머 해제 후 토스트 제거
  const handleCloseButtonClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    removeToast(toast.id);
  };

  // 최초 마운트 시 auto-close 타이머 시작, 언마운트시 타이머 해제
  useEffect(() => {
    startCloseTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
    // 마운트 이후 동작은 div의 onMouseLeave에서 실행하기 때문에 no deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onMouseEnter={pauseCloseTimer}
      onMouseLeave={startCloseTimer}
      className={`relative flex w-95 items-center justify-between gap-2 ${STATUS_COLOR_CLASSES[toast.status ?? "default"]} p-5 text-white shadow-lg`}
    >
      <span>
        {toast.status === "success" && <span>✅ </span>}
        {toast.status === "warning" && <span>⚠️ </span>}
        {toast.status === "error" && <span>❗ </span>}
        {toast.message}
      </span>
      <button
        className="shrink-0 self-start opacity-50 hover:cursor-pointer hover:opacity-70"
        onClick={handleCloseButtonClick}
      >
        <img
          src="/src/assets/icons/cross-white-small.svg"
          alt="toast close icon"
        />
      </button>

      {/* Progress Bar */}
      {toast.duration && (
        <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden bg-gray-700">
          <div
            className={`animate-progress h-full bg-green-500`}
            style={{
              animationDuration: `${toast.duration}ms`,
              animationPlayState: isProgressing ? "running" : "paused",
            }}
          />
        </div>
      )}
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

        // 내부에 Toast가 없으면 Container 생성 X
        if (filteredToasts.length === 0) return null;

        const isTop = position.startsWith("top");
        const showClearAllButton = filteredToasts.length > 1;

        return (
          <div
            key={position}
            className={`fixed z-50 flex flex-col gap-2 ${POSITION_CLASSES[position as ToastPosition]}`}
          >
            {/* Clear all button (upper toast messages)*/}
            {showClearAllButton && !isTop && (
              <button
                className="rounded border border-gray-400 bg-white px-3 py-1 text-gray-800 hover:cursor-pointer hover:bg-gray-200"
                onClick={() =>
                  filteredToasts.forEach((toast) => removeToast(toast.id))
                }
              >
                Clear All
              </button>
            )}

            {/* Toast messages */}
            {filteredToasts.map((toast) => (
              <Toast key={toast.id} toast={toast} removeToast={removeToast} />
            ))}

            {/* Clear all button (under toast messages)*/}
            {showClearAllButton && isTop && (
              <button
                className="rounded border border-gray-400 bg-white px-3 py-1 text-gray-800 hover:cursor-pointer hover:bg-gray-200"
                onClick={() =>
                  filteredToasts.forEach((toast) => removeToast(toast.id))
                }
              >
                Clear All
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}
