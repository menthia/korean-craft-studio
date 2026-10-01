import type { SiteTabId } from "@/types";

export const SITE_NAME = "온결 공방";

export const PRACTICE_NOTICE =
  "이 사이트는 실습용 프로토타입입니다. 입력한 정보는 저장되거나 전송되지 않으므로 실제 개인정보를 입력하지 마세요.";

export const TAB_ITEMS: ReadonlyArray<{ id: SiteTabId; label: string }> = [
  { id: "crafts", label: "공예품 전시·주문" },
  { id: "classes", label: "공방 클래스" },
];

export const tabElementId = (id: SiteTabId) => `tab-${id}`;
export const panelElementId = (id: SiteTabId) => `panel-${id}`;

export const formatPrice = (price: number) =>
  `${price.toLocaleString("ko-KR")}원`;

export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분`;
  return m === 0 ? `${h}시간` : `${h}시간 ${m}분`;
};
