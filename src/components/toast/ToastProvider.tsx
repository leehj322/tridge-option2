import { useState, useCallback, ReactNode } from "react";
import { ToastContext } from "./toastContext";
import { ToastContainer, Toast } from "./ToastContainer";

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * 토스트를 추가하는 함수입니다.
   *
   * @param {string} message - 토스트에 보여질 메세지입니다.
   * @param {number} [duration=3000] - 토스트가 auto close 동작을 하는 duration입니다.
   * @param {"top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"} [position="bottom-right"] - Toast가 생성되는 위치입니다. 총 6가지입니다.
   */
  const showToastMessage: (
    message: string,
    position?: Toast["position"],
    duration?: number,
  ) => void = useCallback(
    (message, position = "bottom-right", duration = 3000) => {
      const id = Date.now(); // 과제 제한으로 라이브러리 없이 ID 생성 (uuid)
      setToasts((prev) => [...prev, { id, message, duration, position }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToastMessage }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}
