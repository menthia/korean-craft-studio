import type {
  ClassApplication,
  MockApiResult,
  OrderInquiry,
} from "@/types";
import { normalizePhone } from "@/lib/validation";

const MOCK_DELAY_MS = 700;
/** 이 연락처(010-0000-0000)를 입력하면 Mock 오류를 반환한다. */
const MOCK_FAILURE_PHONE = "01000000000";

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const createReceiptNumber = () => {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ONG-${ymd}-${suffix}`;
};

async function mockSubmit(
  phone: string,
  successMessage: string,
): Promise<MockApiResult> {
  await wait(MOCK_DELAY_MS);
  if (normalizePhone(phone) === MOCK_FAILURE_PHONE) {
    return {
      success: false,
      message:
        "[실습용] Mock 오류가 발생했습니다. 연락처를 바꿔 다시 시도해 주세요.",
    };
  }
  return {
    success: true,
    receiptNumber: createReceiptNumber(),
    message: successMessage,
  };
}

export function submitOrderInquiry(
  input: OrderInquiry,
): Promise<MockApiResult> {
  return mockSubmit(
    input.phone,
    "[실습용] 주문 문의가 접수된 것으로 표시됩니다. 실제로는 전송되거나 저장되지 않았습니다.",
  );
}

export function submitClassApplication(
  input: ClassApplication,
): Promise<MockApiResult> {
  return mockSubmit(
    input.phone,
    "[실습용] 클래스 신청이 접수된 것으로 표시됩니다. 실제로는 전송되거나 저장되지 않았습니다.",
  );
}
