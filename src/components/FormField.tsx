import { useId } from "react";
import type { ReactNode } from "react";

export interface FieldControlProps {
  id: string;
  "aria-describedby": string | undefined;
  "aria-invalid": boolean;
  "aria-required": boolean;
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  /** label과 연결된 id 및 aria 속성을 받아 input/select/textarea에 펼쳐서 쓴다 */
  children: (control: FieldControlProps) => ReactNode;
}

export const fieldClassName =
  "mt-1 block w-full rounded-sm border border-line bg-white px-3 py-2 text-base text-ink placeholder:text-ink-soft aria-[invalid=true]:border-danger";

export default function FormField({
  label,
  required = false,
  hint,
  error,
  children,
}: FormFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-ink-soft">(선택)</span>
        )}
      </label>
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": Boolean(error),
        "aria-required": required,
      })}
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
