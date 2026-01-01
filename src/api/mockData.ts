import type { FridgeItem, MenuCandidate, MenuDetail } from "../types/models";

export const mockFridgeItems: FridgeItem[] = [
  { id: "1", category: "野菜", name: "玉ねぎ", quantity: 2, unit: "個" },
  { id: "2", category: "肉", name: "鶏もも", quantity: 300, unit: "g" },
];

export const mockMenuCandidates: MenuCandidate[] = [
  { id: "m1", title: "鶏ももと玉ねぎの照り焼き", timeMinutes: 15 },
  { id: "m2", title: "玉ねぎたっぷりコンソメスープ", timeMinutes: 10 },
  { id: "m3", title: "鶏もも塩焼き（ワンパン）", timeMinutes: 12 },
];

export const mockMenuDetails: Record<string, MenuDetail> = {
  m1: {
    id: "m1",
    title: "鶏ももと玉ねぎの照り焼き",
    timeMinutes: 15,
    ingredientsUsed: [
      { name: "鶏もも", amount: "300g" },
      { name: "玉ねぎ", amount: "1個", note: "薄切り" },
      { name: "醤油", amount: "大さじ1" },
      { name: "みりん", amount: "大さじ1" },
    ],
    steps: [
      "フライパンで鶏ももを皮目から焼く。",
      "玉ねぎを加えて炒める。",
      "調味料を入れて照りが出るまで絡める。",
    ],
    tips: "皮目をしっかり焼くと香ばしい。",
  },
  m2: {
    id: "m2",
    title: "玉ねぎたっぷりコンソメスープ",
    timeMinutes: 10,
    ingredientsUsed: [
      { name: "玉ねぎ", amount: "1個", note: "薄切り" },
      { name: "コンソメ", amount: "小さじ2" },
      { name: "水", amount: "400ml" },
    ],
    steps: ["玉ねぎを軽く炒める。", "水とコンソメを入れて5分煮る。"],
  },
  m3: {
    id: "m3",
    title: "鶏もも塩焼き（ワンパン）",
    timeMinutes: 12,
    ingredientsUsed: [
      { name: "鶏もも", amount: "300g" },
      { name: "塩", amount: "適量" },
    ],
    steps: ["鶏ももに塩をふる。", "フライパンで両面焼く。"],
  },
};
