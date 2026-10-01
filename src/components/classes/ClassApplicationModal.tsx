"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { CraftClass, MockApiResult } from "@/types";
import { PRACTICE_NOTICE, formatPrice } from "@/lib/site";
import {
  MAX_MESSAGE_LENGTH,
  getTodayDateString,
  parseIntegerField,
  validateClassForm,
} from "@/lib/validation";
import type {
  ClassFieldKey,
  ClassFormValues,
  FieldErrors,
} from "@/lib/validation";
import { submitClassApplication } from "@/lib/mock-api";
import Modal from "@/components/Modal";
import FormField, { fieldClassName } from "@/components/FormField";
import SubmitFeedback from "@/components/SubmitFeedback";
import type { SubmitStatus } from "@/components/SubmitFeedback";

interface ClassApplicationModalProps {
  classes: CraftClass[];
  initialClassId: string;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
}

const FIELD_ORDER: ClassFieldKey[] = [
  "name",
  "phone",
  "classId",
  "desiredDate",
  "participants",
  "message",
];

export default function ClassApplicationModal({
  classes,
  initialClassId,
  onClose,
  returnFocusTo,
}: ClassApplicationModalProps) {
  const [values, setValues] = useState<ClassFormValues>({
    name: "",
    phone: "",
    classId: initialClassId,
    desiredDate: "",
    participants: "1",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors<ClassFieldKey>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [result, setResult] = useState<MockApiResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneButtonRef = useRef<HTMLButtonElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (status === "success") doneButtonRef.current?.focus();
  }, [status]);

  const selectedClass = classes.find((c) => c.id === values.classId);
  const maxParticipants = selectedClass?.maxParticipants ?? 1;

  const setField = (key: ClassFieldKey, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // 이미 오류가 표시된 필드는 입력 즉시 다시 검증한다(클래스 변경 시 인원도 함께).
    const keys: ClassFieldKey[] = key === "classId" ? [key, "participants"] : [key];
    if (keys.some((k) => errors[k])) {
      const fresh = validateClassForm(next, classes);
      setErrors((prev) => {
        const updated = { ...prev };
        for (const k of keys) {
          if (!prev[k]) continue;
          if (fresh[k]) updated[k] = fresh[k];
          else delete updated[k];
        }
        return updated;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const found = validateClassForm(values, classes);
    setErrors(found);
    const firstKey = FIELD_ORDER.find((k) => found[k]);
    if (firstKey) {
      const el = formRef.current?.elements.namedItem(firstKey);
      if (el instanceof HTMLElement) el.focus();
      return;
    }

    setStatus("loading");
    setResult(null);
    const res = await submitClassApplication({
      name: values.name.trim(),
      phone: values.phone.trim(),
      classId: values.classId,
      desiredDate: values.desiredDate,
      participants: parseIntegerField(values.participants),
      message: values.message,
    });
    if (!mountedRef.current) return;
    setResult(res);
    setStatus(res.success ? "success" : "error");
  };

  const done = status === "success";

  return (
    <Modal
      title="클래스 신청"
      onClose={onClose}
      returnFocusTo={returnFocusTo}
    >
      <p
        role="note"
        className="mb-4 rounded-sm bg-notice px-3 py-2 text-sm text-notice-ink"
      >
        {PRACTICE_NOTICE}
      </p>

      {!done && (
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <FormField label="이름(가명)" required error={errors.name}>
            {(control) => (
              <input
                {...control}
                name="name"
                type="text"
                autoComplete="off"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
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
                onChange={(e) => setField("phone", e.target.value)}
                className={fieldClassName}
              />
            )}
          </FormField>

          <FormField label="클래스" required error={errors.classId}>
            {(control) => (
              <select
                {...control}
                name="classId"
                value={values.classId}
                onChange={(e) => setField("classId", e.target.value)}
                className={fieldClassName}
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({formatPrice(c.price)})
                  </option>
                ))}
              </select>
            )}
          </FormField>

          <FormField label="희망 날짜" required error={errors.desiredDate}>
            {(control) => (
              <input
                {...control}
                name="desiredDate"
                type="date"
                min={getTodayDateString()}
                value={values.desiredDate}
                onChange={(e) => setField("desiredDate", e.target.value)}
                className={fieldClassName}
              />
            )}
          </FormField>

          <FormField
            label="인원"
            required
            hint={`최대 ${maxParticipants}명`}
            error={errors.participants}
          >
            {(control) => (
              <input
                {...control}
                name="participants"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={values.participants}
                onChange={(e) => setField("participants", e.target.value)}
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
                onChange={(e) => setField("message", e.target.value)}
                className={fieldClassName}
              />
            )}
          </FormField>

          <button
            type="submit"
            aria-disabled={status === "loading"}
            className="w-full rounded-sm bg-accent px-4 py-2 font-medium text-on-accent hover:bg-accent-strong aria-disabled:cursor-wait aria-disabled:opacity-60"
          >
            {status === "loading" ? "접수 중…" : "신청하기"}
          </button>
        </form>
      )}

      <div className="mt-4">
        <SubmitFeedback status={status} result={result} />
      </div>

      {done && (
        <button
          ref={doneButtonRef}
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-sm bg-accent px-4 py-2 font-medium text-on-accent hover:bg-accent-strong"
        >
          닫기
        </button>
      )}
    </Modal>
  );
}
