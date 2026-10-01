import { SITE_NAME } from "@/lib/site";

const CRAFTS = ["도자기", "나전칠기", "보자기", "목공예"];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="border-b border-line bg-beige"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <h1
          id="hero-title"
          className="font-serif text-3xl font-bold leading-snug text-ink sm:text-5xl"
        >
          {SITE_NAME}, 손끝으로 이어 온 결
        </h1>
        <p className="mt-6 max-w-xl text-base text-ink-soft sm:text-lg">
          흙을 빚고, 칠을 올리고, 천을 접고, 나무를 다듬는 일. 한국 전통 공예의
          느린 시간을 일상의 물건과 배움의 자리로 옮겨 놓았습니다.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="다루는 공예 분야">
          {CRAFTS.map((craft) => (
            <li
              key={craft}
              className="rounded-full border border-line bg-paper px-4 py-1 text-sm text-ink"
            >
              {craft}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
