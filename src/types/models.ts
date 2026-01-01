export type Category = "肉" | "魚" | "野菜" | "その他";

export type FridgeItem = {
  id: string;
  category: Category;
  name: string;
  quantity: number;
  unit: string; // "個" "g" など
  memo?: string;
};

export type MenuCandidate = {
  id: string;
  title: string;
  timeMinutes: number;
};

export type MenuDetail = {
  id: string;
  title: string;
  timeMinutes: number;
  ingredientsUsed: { name: string; amount: string; note?: string }[];
  steps: string[];
  tips?: string;
};
