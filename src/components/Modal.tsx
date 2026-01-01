import { type ReactNode, useEffect, useId, useRef } from "react";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** 初期フォーカスしたい要素がある場合（例: 'input[name="name"]'） */
  initialFocusSelector?: string;
};

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function Modal({
  title,
  isOpen,
  onClose,
  children,
  initialFocusSelector,
}: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 直前にフォーカスされていた要素を覚える（閉じたら戻す）
    lastActiveRef.current = document.activeElement as HTMLElement | null;

    // 背景スクロール停止
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 初期フォーカス（指定があればそこ、なければ閉じるボタン）
    const panel = panelRef.current;
    const initial =
      (initialFocusSelector && panel
        ? panel.querySelector<HTMLElement>(initialFocusSelector)
        : null) ?? closeBtnRef.current;

    // レイアウト後に確実にフォーカス
    queueMicrotask(() => initial?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // フォーカストラップ
      const panelEl = panelRef.current;
      if (!panelEl) return;

      const focusables = Array.from(
        panelEl.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusables.length === 0) {
        e.preventDefault();
        panelEl.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;

      // 閉じたら元の要素にフォーカスを戻す
      queueMicrotask(() => lastActiveRef.current?.focus());
    };
  }, [isOpen, onClose, initialFocusSelector]);

  if (!isOpen) return null;

  return (
    <div
      className="modalOverlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        className="modalPanel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 100%)",
          maxHeight: "85vh",
          overflow: "auto",
          background: "white",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            padding: 16,
            borderBottom: "1px solid rgba(0,0,0,0.12)",
          }}
        >
          <h2 id={titleId} style={{ margin: 0, fontSize: 18, lineHeight: 1.3 }}>
            {title}
          </h2>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            style={{
              border: "1px solid rgba(0,0,0,0.2)",
              background: "white",
              borderRadius: 10,
              width: 40,
              height: 40,
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );
}
