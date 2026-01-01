import { useEffect, useMemo, useRef, useState } from "react";
import Scene from "./components/Scene";
import FridgeModal from "./components/FridgeModal";
import KitchenModal from "./components/KitchenModal";
import MenuDetailModal from "./components/MenuDetailModal";
import RegisterModal from "./components/RegisterModal";

import {
  mockFridgeItems,
  mockMenuCandidates,
  mockMenuDetails,
} from "./api/mockData";
import type { FridgeItem } from "./types/models";

type ModalKey = "none" | "fridge" | "kitchen" | "detail" | "register";

export default function App() {
  const [modal, setModal] = useState<ModalKey>("none");
  const [items, setItems] = useState<FridgeItem[]>(mockFridgeItems);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);

  // どの要素からモーダルを開いたか記録して、閉じたらフォーカスを戻す
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const detail = useMemo(
    () => (selectedMenuId ? mockMenuDetails[selectedMenuId] ?? null : null),
    [selectedMenuId]
  );

  const openModal = (key: ModalKey) => {
    // 今のフォーカス位置を保存（Scene側が button ならここが効く）
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    setModal(key);
  };

  const closeModal = () => {
    setModal("none");
  };

  // モーダルが閉じたら、元の要素にフォーカスを戻す（キーボード操作が快適になる）
  useEffect(() => {
    if (modal === "none") {
      // detailを閉じたら選択状態も戻しておく（次回の誤表示防止）
      setSelectedMenuId(null);

      // フォーカス復帰
      lastActiveElementRef.current?.focus?.();
    }
  }, [modal]);

  return (
    <>
      <Scene
        onClickFridge={() => openModal("fridge")}
        onClickKitchen={() => openModal("kitchen")}
        onClickBag={() => openModal("register")}
      />

      <FridgeModal
        isOpen={modal === "fridge"}
        onClose={closeModal}
        items={items}
      />

      <KitchenModal
        isOpen={modal === "kitchen"}
        onClose={closeModal}
        candidates={mockMenuCandidates}
        onSelect={(id) => {
          // Kitchenで選んだらDetailへ
          setSelectedMenuId(id);
          // openModalを通して「どこから開いたか」を記録
          openModal("detail");
        }}
      />

      <MenuDetailModal
        isOpen={modal === "detail"}
        onClose={closeModal}
        detail={detail}
      />

      <RegisterModal
        isOpen={modal === "register"}
        onClose={closeModal}
        onAdd={(newItem) => setItems((prev) => [newItem, ...prev])}
      />
    </>
  );
}
