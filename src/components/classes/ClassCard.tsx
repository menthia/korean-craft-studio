import Image from "next/image";
import type { CraftClass } from "@/types";
import { formatDuration, formatPrice } from "@/lib/site";

interface ClassCardProps {
  craftClass: CraftClass;
  onApply: (craftClass: CraftClass, trigger: HTMLElement) => void;
}

export default function ClassCard({ craftClass, onApply }: ClassCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-sm border border-line bg-paper">
      <Image
        src={craftClass.imageSrc}
        alt={craftClass.imageAlt}
        width={640}
        height={480}
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-semibold">{craftClass.name}</h3>
        <p className="mt-1 flex-1 text-sm text-ink-soft">
          {craftClass.description}
        </p>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="sr-only">가격</dt>
            <dd className="font-semibold">
              {formatPrice(craftClass.price)}{" "}
              <span className="font-normal text-ink-soft">(1인 기준)</span>
            </dd>
          </div>
          <div className="flex gap-2 text-ink-soft">
            <dt className="sr-only">소요시간</dt>
            <dd>소요시간 {formatDuration(craftClass.durationMinutes)}</dd>
            <dt className="sr-only">정원</dt>
            <dd>· 정원 {craftClass.maxParticipants}명</dd>
          </div>
        </dl>
        <button
          type="button"
          aria-label={`${craftClass.name} 클래스 신청하기`}
          onClick={(e) => onApply(craftClass, e.currentTarget)}
          className="mt-4 rounded-sm bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong"
        >
          신청하기
        </button>
      </div>
    </article>
  );
}
