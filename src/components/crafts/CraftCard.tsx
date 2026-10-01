import Image from "next/image";
import type { Craft } from "@/types";
import { formatPrice } from "@/lib/site";

interface CraftCardProps {
  craft: Craft;
  onInquire: (craft: Craft, trigger: HTMLElement) => void;
}

export default function CraftCard({ craft, onInquire }: CraftCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-line bg-paper">
      <div className="relative aspect-[4/3] w-full bg-beige">
        <Image
          src={craft.imageSrc}
          alt={craft.imageAlt}
          width={640}
          height={480}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="self-start rounded-sm bg-beige px-2 py-0.5 text-xs font-medium text-ink">
          {craft.category}
        </span>
        <h3 className="mt-2 font-serif text-lg font-semibold">{craft.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {craft.description}
        </p>
        <p className="mt-3 text-base font-semibold">
          {formatPrice(craft.price)}
        </p>
        <button
          type="button"
          aria-label={`${craft.name} 주문 문의하기`}
          onClick={(e) => onInquire(craft, e.currentTarget)}
          className="mt-3 w-full rounded-sm bg-accent px-4 py-2.5 text-sm font-medium text-on-accent hover:bg-accent-strong"
        >
          주문 문의하기
        </button>
      </div>
    </article>
  );
}
