import type { MockApiResult } from "@/types";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

interface SubmitFeedbackProps {
  status: SubmitStatus;
  result: MockApiResult | null;
}

/**
 * Loading / Success / Error 표시.
 * 컨테이너는 항상 렌더링하고 내용만 바꿔서 스크린리더가 변경을 읽도록 한다.
 */
export default function SubmitFeedback({
  status,
  result,
}: SubmitFeedbackProps) {
  return (
    <div role="status" aria-live="polite" className="min-h-6">
      {status === "loading" ? (
        <p className="rounded-sm bg-beige px-3 py-2 text-sm text-ink">
          Mock 접수 처리 중입니다… (약 0.7초)
        </p>
      ) : null}
      {status === "success" && result?.success ? (
        <div className="rounded-sm bg-success-bg px-3 py-3 text-sm text-success">
          <p className="font-semibold">접수 완료 (실습용)</p>
          <p className="mt-1">
            접수번호:{" "}
            <span className="font-mono font-semibold">
              {result.receiptNumber}
            </span>
          </p>
          <p className="mt-1">{result.message}</p>
        </div>
      ) : null}
      {status === "error" && result && !result.success ? (
        <p
          role="alert"
          className="rounded-sm bg-danger-bg px-3 py-2 text-sm font-medium text-danger"
        >
          {result.message}
        </p>
      ) : null}
    </div>
  );
}
