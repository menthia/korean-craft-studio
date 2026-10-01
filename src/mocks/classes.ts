import type { CraftClass } from "@/types";

export const classes: CraftClass[] = [
  {
    id: "pottery-wheel",
    name: "도자기 만들기",
    description:
      "물레 위에서 흙을 올려 나만의 그릇을 빚어 봅니다. 초벌과 시유는 공방에서 도와 드립니다.",
    price: 65000,
    durationMinutes: 150,
    maxParticipants: 6,
    imageSrc: "/images/classes/pottery-wheel.svg",
    imageAlt: "물레 위에서 쪽빛 도자기를 빚고 있는 공방 작업 장면 일러스트",
  },
  {
    id: "bojagi-making",
    name: "보자기 만들기",
    description:
      "자투리 천을 이어 조각보를 만들고 매듭으로 마무리합니다. 바느질이 처음이어도 괜찮습니다.",
    price: 45000,
    durationMinutes: 120,
    maxParticipants: 10,
    imageSrc: "/images/classes/bojagi-making.svg",
    imageAlt: "여러 색 천을 이어 붙인 조각보와 매듭이 놓인 작업대 일러스트",
  },
  {
    id: "mother-of-pearl-craft",
    name: "나전 소품 만들기",
    description:
      "자개 조각을 골라 작은 함 위에 붙여 나만의 무늬를 완성합니다. 소품은 가져가실 수 있습니다.",
    price: 90000,
    durationMinutes: 180,
    maxParticipants: 8,
    imageSrc: "/images/classes/mother-of-pearl-craft.svg",
    imageAlt: "자개 조각이 붙은 검은 소품 함과 작업 도구가 놓인 작업대 일러스트",
  },
];
