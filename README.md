# TRIDGE 과제 Option2 (My React Toast Message App)

## 개발 환경

React + TypeScript + Vite + TailwindCSS

## 사용법

docs로 작성 하지 않고 README.md에 작성합니다.

`showToastMessage` 함수는 토스트 메시지를 화면에 띄우는 역할을 합니다. 다음과 같이 사용할 수 있습니다.

1. `ToastProvider` 설정

```ts
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import App from "./App.tsx";
import ToastProvider from "./components/toast/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);
```

2. 원하는 컴포넌트에서 `useToast` 훅을 사용하여 `showToastMessage` 호출

```ts
import useToast from "./components/toast/useToast";

function App() {
  const { showToastMessage } = useToast();
  ...
}
```

3. `showToastMessage` 사용법

| 파라미터   | 타입                                                                                              | 설명                                 | 기본값           |
| ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------- |
| `message`  | `string`                                                                                          | 토스트에 표시할 텍스트               | 필수             |
| `position` | `"top-right" \| "top-left" \| "top-center" \| "bottom-right" \| "bottom-left" \| "bottom-center"` | 토스트가 나타나는 위치               | `"bottom-right"` |
| `duration` | `number`                                                                                          | 토스트가 자동으로 종료되는 시간 (ms) | `3000`           |
| `status`   | `"success" \| "warning" \| "error" \| "default"`                                                  | 토스트의 디자인                      | `"default"`      |

4. `showToastMessage` 사용 예제

```ts
// 기본 토스트 메시지 (오른쪽 위, 기본 지속 시간)
showToastMessage("This is a toast message.");

// 특정 위치 (왼쪽 위)에 표시
showToastMessage("This is a toast message.", "top-left");

// 5초(5000ms) 동안 표시
showToastMessage("This will disappear in 5 seconds.", "bottom-center", 5000);

// `error` 상태, 자동 닫힘 없음
showToastMessage(
  "An error occurred while processing your request.",
  "top-right",
  null,
  "error",
);
```
