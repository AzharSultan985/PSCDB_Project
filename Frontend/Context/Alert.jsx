import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const AlertContext = createContext(undefined);

const alertStyles = {
  success: {
    icon: "✓",
    title: "Success",
    accent: "border-l-[#68A85B]",
    iconStyle: "bg-[#EAF3D8] text-[#167A62]",
  },
  error: {
    icon: "!",
    title: "Something went wrong",
    accent: "border-l-[#C94B4B]",
    iconStyle: "bg-red-50 text-red-600",
  },
  warning: {
    icon: "!",
    title: "Attention",
    accent: "border-l-[#D8B65A]",
    iconStyle: "bg-[#FBF4DF] text-[#92712A]",
  },
  info: {
    icon: "i",
    title: "Information",
    accent: "border-l-[#167A62]",
    iconStyle: "bg-[#E9F4EF] text-[#167A62]",
  },
};

function AlertIcon({ type }) {
  const style = alertStyles[type] || alertStyles.info;

  return (
    <span
      aria-hidden="true"
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg font-bold ${style.iconStyle}`}
    >
      {style.icon}
    </span>
  );
}

function AlertToast({ alert, onRemove }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  const closeAlert = useCallback(() => {
    if (closing) return;

    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      onRemove(alert.id);
    }, 280);
  }, [alert.id, closing, onRemove]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));

    let autoCloseTimer;

    if (alert.duration > 0) {
      autoCloseTimer = window.setTimeout(closeAlert, alert.duration);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(autoCloseTimer);
      window.clearTimeout(closeTimer.current);
    };
  }, [alert.duration, closeAlert]);

  const style = alertStyles[alert.type] || alertStyles.info;
  const isShown = visible && !closing;

  return (
    <div
      role={alert.type === "error" ? "alert" : "status"}
      aria-live={alert.type === "error" ? "assertive" : "polite"}
      className={`pointer-events-auto w-full overflow-hidden rounded-2xl border border-[#173A30]/10 border-l-4 ${style.accent} bg-white shadow-[0_18px_50px_-20px_rgba(12,45,35,0.3)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
        isShown
          ? "[transform:perspective(900px)_rotateY(0deg)_scale(1)] opacity-100"
          : "[transform:perspective(900px)_rotateY(-10deg)_translateX(18px)_scale(.97)] opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <AlertIcon type={alert.type} />

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-[#123B2B]">
            {alert.title || style.title}
          </p>
          <p className="mt-1 break-words text-sm leading-6 text-[#65756A]">
            {alert.message}
          </p>
        </div>

        <button
          type="button"
          onClick={closeAlert}
          aria-label="Dismiss notification"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-lg leading-none text-[#718077] transition hover:bg-[#F2F5EF] hover:text-[#123B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#167A62]"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const removeAlert = useCallback((id) => {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback((options = {}) => {
    const {
      type = "info",
      title,
      message = "",
      duration = 4500,
    } = options;

    const id =
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const newAlert = {
      id,
      type: alertStyles[type] ? type : "info",
      title,
      message,
      duration,
    };

    setAlerts((current) => [...current, newAlert].slice(-4));
    return id;
  }, []);

  const dismissAlert = useCallback(
    (id) => removeAlert(id),
    [removeAlert],
  );

  const value = useMemo(
    () => ({ showAlert, dismissAlert }),
    [showAlert, dismissAlert],
  );

  const alertLayer = (
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed right-4 top-4 z-[200] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6"
    >
      {alerts.map((alert) => (
        <AlertToast key={alert.id} alert={alert} onRemove={removeAlert} />
      ))}
    </div>
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      {typeof document !== "undefined"
        ? createPortal(alertLayer, document.body)
        : null}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used inside an AlertProvider.");
  }

  return context;
}