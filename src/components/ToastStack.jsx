import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useApp } from "../context/AppContext";

const ICONS = {
  success: "✓",
  warning: "!",
  danger: "✕",
  secondary: "•",
};

export default function ToastStack() {
  const { toasts, dismissToast } = useApp();

  return (
    <ToastContainer position="bottom-end" className="p-3" style={{ position: "fixed", zIndex: 1080 }}>
      {toasts.map((t) => (
        <Toast key={t.id} onClose={() => dismissToast(t.id)} bg={t.variant === "success" ? undefined : undefined}>
          <div className="d-flex align-items-center gap-2 px-3 py-2">
            <span
              className={`d-flex align-items-center justify-content-center rounded-circle text-white fw-bold ${
                t.variant === "success"
                  ? "bg-success"
                  : t.variant === "warning"
                  ? "bg-warning"
                  : t.variant === "danger"
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
              style={{ width: 22, height: 22, fontSize: 12, flexShrink: 0 }}
            >
              {ICONS[t.variant] || "•"}
            </span>
            <span className="small">{t.message}</span>
            <button
              type="button"
              className="btn-close ms-auto"
              aria-label="Close"
              onClick={() => dismissToast(t.id)}
            ></button>
          </div>
        </Toast>
      ))}
    </ToastContainer>
  );
}
