"use client";

import { useState } from "react";
import type { CraftClass } from "@/types";
import { classes } from "@/mocks/classes";
import ClassCard from "./ClassCard";
import ClassApplicationModal from "./ClassApplicationModal";

interface Selection {
  classId: string;
  trigger: HTMLElement;
}

export default function ClassesSection() {
  const [selected, setSelected] = useState<Selection | null>(null);

  const handleApply = (craftClass: CraftClass, trigger: HTMLElement) =>
    setSelected({ classId: craftClass.id, trigger });

  return (
    <section aria-labelledby="classes-heading">
      <h2 id="classes-heading" className="font-serif text-2xl font-semibold">
        공방 클래스
      </h2>
      <p className="mt-2 text-ink-soft">
        흙, 천, 자개처럼 손에 닿는 재료로 하루를 천천히 보내 보세요. 마음에
        드는 클래스를 골라 신청서를 작성해 볼 수 있습니다.
      </p>

      <div className="mt-5 rounded-sm border border-line bg-notice p-4 text-notice-ink">
        <h3 className="font-serif text-base font-semibold">
          준비물·취소 안내 (실습용 가상 안내)
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>준비물: 편한 복장과 앞치마를 준비해 주세요. 재료는 공방이 제공합니다.</li>
          <li>취소·변경은 수업 전일까지 가능합니다.</li>
          <li>위 내용은 모두 실습용 가상 안내이며 실제 공방 정책이 아닙니다.</li>
        </ul>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <ClassCard key={c.id} craftClass={c} onApply={handleApply} />
        ))}
      </div>

      {selected && (
        <ClassApplicationModal
          classes={classes}
          initialClassId={selected.classId}
          returnFocusTo={selected.trigger}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
