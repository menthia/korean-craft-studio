"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Craft, MockApiResult } from "@/types";
import { formatPrice, PRACTICE_NOTICE } from "@/lib/site";
import {
  MAX_MESSAGE_LENGTH,
  MAX_ORDER_QUANTITY,
  parseIntegerField,
  validateOrderForm,
} from "@/lib/validation";
import type { FieldErrors, OrderFieldKey, OrderFormValues } from "@/lib/validation";
import { submitOrderInquiry } from "@/lib/mock-api";
import Modal from "@/components/Modal";
import FormField, { fieldClassName } from "@/components/FormField";
import SubmitFeedback from "@/components/SubmitFeedback";
import type { SubmitStatus } from "@/components/SubmitFeedback";

interface OrderInquiryModalProps {
  crafts: Craft[];
  initialCraftId: string;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
}

export default function OrderInquiryModal({
  crafts,
  initialCraftId,
  onClose,
  returnFocusTo,
}: OrderInquiryModalProps) {
  const [values, setValues] = useState<OrderFormValues>({
    name: "",
    phone: "",
    craftId: initialCraftId,
    quantity: "1",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors<OrderFieldKey>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [result, setResult] = useState<MockApiResult | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const doneButtonRef = useRef<HTMLButtonElement>(null);
  const mountedRef = useRef(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (status === "success") doneButtonRef.current?.focus();
  }, [status]);

  const setValue = (key: OrderFieldKey, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const focusField = (key: OrderFieldKey) => {
    const el = formRef.current?.elements.namedItem(key);
    if (el instanceof HTMLElement) el.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validateOrderForm(
      values,
      crafts.map((c) => c.id),
    );
    setErrors(nextErrors);
    const firstError = (
      ["name", "phone", "craftId", "quantity", "message"] as const
    ).find((key) => nextErrors[key]);
    if (firstError) {
      focusField(firstError);
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    setResult(null);
    try {
      const res = await submitOrderInquiry({
        name: values.name.trim(),
        phone: values.phone.trim(),
        craftId: values.craftId,
        quantity: parseIntegerField(values.quantity),
        message: values.message,
      });
      if (!mountedRef.current) return;
      setResult(res);
      setStatus(res.success ? "success" : "error");
    } catch {
      if (!mountedRef.current) return;
      setResult({
        success: false,
        message: "[실습용] 처리 중 문제가 발생했습니다. 다시 시도해 주세요.",
      });
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  const isLoading = status === "loading";
  const isDone = status === "success";

  return (
    <Modal title="주문 문의" onClose={onClose} returnFocusTo={returnFocusTo}>
      {isDone ? (
        <div>
          <SubmitFeedback status={status} result={result} />
          <button
            ref={doneButtonRef}
            type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-sm bg-accent px-4 py-2.5 text-sm font-medium text-on-accent hover:bg-accent-strong"
          >
            닫기
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <p
            role="note"
            className="mb-4 rounded-sm bg-notice px-3 py-2 text-sm text-notice-ink"
          >
            {PRACTICE_NOTICE}
          </p>

          <FormField label="이름(가명)" required error={errors.name}>
            {(control) => (
              <input
                {...control}
                name="name"
                type="text"
                autoComplete="off"
                value={values.name}
                onChange={(e) => setValue("name", e.target.value)}
                className={fieldClassName}
              />
            )}
          </FormField>

          <FormField
            label="연락처"
            required
            hint="010-0000-0000 입력 시 Mock 오류 테스트"
            error={errors.phone}
          >
            {(control) => (
              <input
                {...control}
                name="phone"
                type="tel"
                autoComplete="off"
                placeholder="010-1234-5678"
                value={values.phone}
                onChange={(e) => setValue("phone", e.target.value)}
                className={fieldClassName}
              />
            )}
          </FormField>

          <FormField label="상품" required error={errors.craftId}>
            {(control) => (
              <select
                {...control}
                name="craftId"
                value={values.craftId}
                onChange={(e) => setValue("craftId", e.target.value)}
                className={fieldClassName}
              >
                {crafts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({formatPrice(c.price)})
                  </option>
                ))}
              </select>
            )}
          </FormField>

          <FormField
            label="수량"
            required
            hint={`1~${MAX_ORDER_QUANTITY}개`}
            error={errors.quantity}
          >
            {(control) => (
              <input
                {...control}
                name="quantity"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={values.quantity}
                onChange={(e) => setValue("quantity", e.target.value)}
                className={fieldClassName}
              />
            )}
          </FormField>

          <FormField
            label="요청사항"
            hint={`${values.message.length}/${MAX_MESSAGE_LENGTH}자`}
            error={errors.message}
          >
            {(control) => (
              <textarea
                {...control}
                name="message"
                rows={3}
                value={values.message}
                onChange={(e) => setValue("message", e.target.value)}
                className={fieldClassName}
              />
            )}
          </FormField>

          <SubmitFeedback status={status} result={result} />

          <button
            type="submit"
            aria-disabled={isLoading}
            className="mt-4 w-full rounded-sm bg-accent px-4 py-2.5 text-sm font-medium text-on-accent hover:bg-accent-strong aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
          >
            {isLoading ? "접수 중…" : "문의 보내기"}
          </button>
        </form>
      )}
    </Modal>
  );
}
