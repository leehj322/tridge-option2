import { createContext } from "react";
import { Toast } from "./ToastContainer";

type ToastContext = {
  showToastMessage: (
    message: string,
    position?: Toast["position"],
    duration?: number | null,
    status?: Toast["status"],
  ) => void;
};

export const ToastContext = createContext<ToastContext | null>(null);
