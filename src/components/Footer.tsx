import { SITE_NAME } from "@/lib/site";
import PracticeNotice from "./PracticeNotice";

const INFO: ReadonlyArray<{ label: string; value: string }> = [
  { label: "주소", value: "서울특별시 ○○구 가상로 12 (가상 주소)" },
  { label: "운영시간", value: "화~일 10:00-18:00, 월요일 휴무 (가상 운영시간)" },
  { label: "문의처", value: "02-0000-0000 (가상 연락처)" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <p className="font-serif text-lg font-bold text-ink">{SITE_NAME}</p>
        <p className="mt-1 text-sm font-bold text-notice-ink">
          아래 정보는 모두 실습용 가상 정보이며 실제 상호, 주소, 번호가 아닙니다.
        </p>
        <dl className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-[6rem_1fr]">
          {INFO.map((item) => (
            <div key={item.label} className="contents">
              <dt className="font-bold text-ink">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <PracticeNotice className="mt-6 rounded" />
      </div>
    </footer>
  );
}
