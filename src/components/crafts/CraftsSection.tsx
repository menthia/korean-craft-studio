"use client";

import { useState } from "react";
import type { Craft } from "@/types";
import { crafts } from "@/mocks/crafts";
import CraftCard from "./CraftCard";
import OrderInquiryModal from "./OrderInquiryModal";

interface Selection {
  craftId: string;
  trigger: HTMLElement | null;
}

export default function CraftsSection() {
  const [selected, setSelected] = useState<Selection | null>(null);

  const handleInquire = (craft: Craft, trigger: HTMLElement) =>
    setSelected({ craftId: craft.id, trigger });

  return (
    <section aria-labelledby="crafts-heading">
      <h2
        id="crafts-heading"
        className="font-serif text-2xl font-semibold sm:text-3xl"
      >
        공예품 전시·주문
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
        온결 공방은 도자기, 나전칠기, 보자기, 목공예를 한자리에서 소개하는
        가상의 공방입니다. 손으로 빚고 다듬은 결을 있는 그대로 보여 드리는
        것을 목표로 구성한 실습용 전시 공간입니다.
      </p>

      <div className="mt-5 rounded-sm border border-line bg-paper p-4 sm:p-5">
        <h3 className="font-serif text-lg font-semibold">
          가상 제작·배송 안내
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-soft">
          <li>
            이 페이지의 모든 안내는 실습용 가상 정보이며, 실제 제작과 배송은
            이뤄지지 않습니다.
          </li>
          <li>제작 기간(가상): 주문 문의 접수 후 약 2~4주</li>
          <li>배송(가상): 제작 완료 후 택배 발송, 배송비 3,000원</li>
        </ul>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {crafts.map((craft) => (
          <li key={craft.id}>
            <CraftCard craft={craft} onInquire={handleInquire} />
          </li>
        ))}
      </ul>

      {selected && (
        <OrderInquiryModal
          crafts={crafts}
          initialCraftId={selected.craftId}
          returnFocusTo={selected.trigger}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
