import type { CraftClass } from "@/types";

export const MAX_ORDER_QUANTITY = 10;
export const MAX_MESSAGE_LENGTH = 300;

/** 숫자만 남긴 연락처 */
export const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

/** 010 / 011 / 016 / 017 / 018 / 019 휴대전화, 하이픈 유무 모두 허용 */
export const isValidPhone = (phone: string) =>
  /^01[016789]-?\d{3,4}-?\d{4}$/.test(phone.trim());

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

/** 입력이 비었거나 정수가 아니면 NaN */
export const parseIntegerField = (value: string) =>
  /^\d+$/.test(value.trim()) ? Number(value.trim()) : Number.NaN;

const todayLocal = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

/** <input type="date" min> 에 쓰는 오늘 날짜 (로컬 기준) */
export const getTodayDateString = todayLocal;

export interface OrderFormValues {
  name: string;
  phone: string;
  craftId: string;
  quantity: string;
  message: string;
}

export type OrderFieldKey = keyof OrderFormValues;

export function validateOrderForm(
  values: OrderFormValues,
  validCraftIds: readonly string[],
): FieldErrors<OrderFieldKey> {
  const errors: FieldErrors<OrderFieldKey> = {};
  if (!values.name.trim()) errors.name = "이름(가명)을 입력해 주세요.";
  if (!values.phone.trim()) errors.phone = "연락처를 입력해 주세요.";
  else if (!isValidPhone(values.phone))
    errors.phone = "연락처 형식이 올바르지 않습니다. 예: 010-1234-5678";
  if (!validCraftIds.includes(values.craftId))
    errors.craftId = "상품을 선택해 주세요.";
  const qty = parseIntegerField(values.quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > MAX_ORDER_QUANTITY)
    errors.quantity = `수량은 1~${MAX_ORDER_QUANTITY} 사이의 숫자로 입력해 주세요.`;
  if (values.message.length > MAX_MESSAGE_LENGTH)
    errors.message = `요청사항은 ${MAX_MESSAGE_LENGTH}자 이하로 입력해 주세요.`;
  return errors;
}

export interface ClassFormValues {
  name: string;
  phone: string;
  classId: string;
  desiredDate: string;
  participants: string;
  message: string;
}

export type ClassFieldKey = keyof ClassFormValues;

export function validateClassForm(
  values: ClassFormValues,
  classes: readonly CraftClass[],
): FieldErrors<ClassFieldKey> {
  const errors: FieldErrors<ClassFieldKey> = {};
  const selected = classes.find((c) => c.id === values.classId);
  if (!values.name.trim()) errors.name = "이름(가명)을 입력해 주세요.";
  if (!values.phone.trim()) errors.phone = "연락처를 입력해 주세요.";
  else if (!isValidPhone(values.phone))
    errors.phone = "연락처 형식이 올바르지 않습니다. 예: 010-1234-5678";
  if (!selected) errors.classId = "클래스를 선택해 주세요.";
  if (!values.desiredDate) errors.desiredDate = "희망 날짜를 선택해 주세요.";
  else if (values.desiredDate < todayLocal())
    errors.desiredDate = "오늘 이전 날짜는 선택할 수 없습니다.";
  const count = parseIntegerField(values.participants);
  const max = selected?.maxParticipants ?? 1;
  if (!Number.isInteger(count) || count < 1 || count > max)
    errors.participants = `인원은 1~${max}명 사이의 숫자로 입력해 주세요.`;
  if (values.message.length > MAX_MESSAGE_LENGTH)
    errors.message = `요청사항은 ${MAX_MESSAGE_LENGTH}자 이하로 입력해 주세요.`;
  return errors;
}
