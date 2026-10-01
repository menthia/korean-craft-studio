"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** 닫은 뒤 포커스를 돌려줄 요소(보통 모달을 연 버튼). 없으면 열릴 때의 activeElement */
  returnFocusTo?: HTMLElement | null;
}

/**
 * 네이티브 <dialog> 기반 모달.
 * - 호출하는 쪽에서 `{selected && <Modal ... />}` 형태로 "선택 시 mount" 한다.
 * - mount 시 showModal() 후 첫 입력칸으로 포커스를 이동한다.
 * - Esc는 브라우저가 처리하고 close 이벤트로 onClose를 부른다.
 * - 배경 클릭으로는 닫히지 않는다(입력 유실 방지).
 */
export default function Modal({
  title,
  onClose,
  children,
  returnFocusTo,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const fallback =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const restoreTarget = returnFocusTo ?? fallback;

    if (!dialog.open) dialog.showModal();
    const firstField = dialog.querySelector<HTMLElement>(
      "input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled])",
    );
    firstField?.focus();

    const handleClose = () => onCloseRef.current();
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
      if (dialog.open) dialog.close();
      restoreTarget?.focus();
    };
  }, [returnFocusTo]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="m-auto w-[min(92vw,34rem)] max-h-[92vh] overflow-y-auto rounded-sm border border-line bg-paper p-0 text-ink shadow-xl"
    >
      <div className="p-5 sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-serif text-xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="shrink-0 rounded-sm border border-line px-3 py-1 text-sm text-ink-soft hover:bg-beige"
          >
            닫기
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
