export type CraftCategory = "도자기" | "나전칠기" | "보자기" | "목공예";

export interface Craft {
  id: string;
  name: string;
  category: CraftCategory;
  description: string;
  /** 원 단위 정수 */
  price: number;
  /** public/ 기준 경로 (예: /images/crafts/moon-jar.svg) */
  imageSrc: string;
  imageAlt: string;
}

export interface CraftClass {
  id: string;
  name: string;
  description: string;
  /** 1인 기준, 원 단위 정수 */
  price: number;
  durationMinutes: number;
  maxParticipants: number;
  imageSrc: string;
  imageAlt: string;
}

export interface OrderInquiry {
  name: string;
  phone: string;
  craftId: string;
  quantity: number;
  message: string;
}

export interface ClassApplication {
  name: string;
  phone: string;
  classId: string;
  /** YYYY-MM-DD */
  desiredDate: string;
  participants: number;
  message: string;
}

export type MockApiResult =
  | { success: true; receiptNumber: string; message: string }
  | { success: false; message: string };

export type SiteTabId = "crafts" | "classes";
