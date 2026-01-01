import { useId, useMemo, useState } from "react";
import Modal from "./Modal";
import type { Category, FridgeItem } from "../types/models";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: FridgeItem) => void;
};

export default function RegisterModal({ isOpen, onClose, onAdd }: Props) {
  const uid = useId();

  const categoryId = `${uid}-category`;
  const nameId = `${uid}-name`;
  const qtyId = `${uid}-qty`;
  const unitId = `${uid}-unit`;
  const hintId = `${uid}-hint`;

  const [category, setCategory] = useState<Category>("野菜");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState("個");
  const [touched, setTouched] = useState(false);

  const nameValid = name.trim().length > 0;
  const qtyValid = Number.isFinite(quantity) && quantity > 0;
  const canSubmit = useMemo(() => nameValid && qtyValid, [nameValid, qtyValid]);

  const errorMessage = !touched
    ? ""
    : !nameValid
    ? "食材名を入力してください。"
    : !qtyValid
    ? "数量は1以上で入力してください。"
    : "";

  return (
    <Modal
      title="食材を登録"
      isOpen={isOpen}
      onClose={onClose}
      // 最初は食材名にフォーカスさせる（Modal側で対応済みの場合）
      initialFocusSelector={`#${nameId}`}
    >
      <p id={hintId} style={{ margin: "0 0 12px", color: "#444" }}>
        カテゴリと食材名、数量を入力して「登録」を押してください。
      </p>

      <form
        aria-describedby={hintId}
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (!canSubmit) return;

          const item: FridgeItem = {
            id: crypto.randomUUID(),
            category,
            name: name.trim(),
            quantity,
            unit: unit.trim() || "個",
          };

          onAdd(item);
          // 次回用に軽くリセット
          setName("");
          setQuantity(1);
          setUnit("個");
          setCategory("野菜");
          setTouched(false);
          onClose();
        }}
        style={{ display: "grid", gap: 12 }}
      >
        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor={categoryId} style={{ fontSize: 14, fontWeight: 700 }}>
            カテゴリ
          </label>
          <select
            id={categoryId}
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            style={inputStyle}
          >
            <option value="肉">肉</option>
            <option value="魚">魚</option>
            <option value="野菜">野菜</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor={nameId} style={{ fontSize: 14, fontWeight: 700 }}>
            食材名{" "}
            <span aria-hidden="true" style={{ color: "#b91c1c" }}>
              *
            </span>
          </label>
          <input
            id={nameId}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            required
            aria-invalid={touched && !nameValid}
            placeholder="例：鶏もも、玉ねぎ"
            style={inputStyle}
          />
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor={qtyId} style={{ fontSize: 14, fontWeight: 700 }}>
              数量{" "}
              <span aria-hidden="true" style={{ color: "#b91c1c" }}>
                *
              </span>
            </label>
            <input
              id={qtyId}
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              onBlur={() => setTouched(true)}
              required
              aria-invalid={touched && !qtyValid}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor={unitId} style={{ fontSize: 14, fontWeight: 700 }}>
              単位
            </label>
            <input
              id={unitId}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="例：個 / g / ml"
              style={inputStyle}
            />
          </div>
        </div>

        {errorMessage ? (
          <p
            role="alert"
            style={{ margin: 0, color: "#b91c1c", fontWeight: 700 }}
          >
            {errorMessage}
          </p>
        ) : null}

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 4,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid rgba(0,0,0,0.2)",
              background: "white",
              borderRadius: 12,
              padding: "10px 12px",
              cursor: "pointer",
            }}
          >
            キャンセル
          </button>

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              border: "none",
              background: canSubmit ? "#111827" : "#9CA3AF",
              color: "white",
              borderRadius: 12,
              padding: "10px 12px",
              cursor: canSubmit ? "pointer" : "not-allowed",
              fontWeight: 800,
            }}
          >
            登録
          </button>
        </div>
      </form>
    </Modal>
  );
}

const inputStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "10px 12px",
  outline: "none",
};
