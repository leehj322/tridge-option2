import { useState, useCallback, ReactNode } from "react";
import { ToastContext } from "./toastContext";
import { ToastContainer, Toast } from "./ToastContainer";

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  /**
   * 토스트를 추가하는 함수입니다.
   *
   * @param {string} message - 토스트에 보여질 메세지입니다.
   * @param {number | null} [duration=3000] - 토스트가 auto close 동작을 하는 duration입니다.
   * @param {"top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"} [position="bottom-right"] - Toast가 생성되는 위치입니다. 총 6가지입니다.
   */
  const showToastMessage: (
    message: string,
    position?: Toast["position"],
    duration?: number | null,
  ) => void = useCallback(
    (message, position = "bottom-right", duration = 3000) => {
      const id = Date.now(); // 과제 제한으로 라이브러리 없이 ID 생성 (uuid)
      setToasts((prev) => [...prev, { id, message, duration, position }]);

      // duration이 null인 경우 toast 제거 동작 하지 않고 early return
      if (duration === null) return;

      // duration 후에 auto close 동작 실행
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToastMessage }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
