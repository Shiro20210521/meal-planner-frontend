import Modal from "./Modal";
import type { MenuDetail } from "../types/models";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  detail: MenuDetail | null;
};

export default function MenuDetailModal({ isOpen, onClose, detail }: Props) {
  return (
    <Modal title="レシピ詳細" isOpen={isOpen} onClose={onClose}>
      {!detail ? (
        <p role="status" aria-live="polite">
          献立を選択してください。
        </p>
      ) : (
        <article
          aria-labelledby="recipe-title"
          style={{ display: "grid", gap: 16 }}
        >
          {/* タイトル */}
          <header>
            <h3
              id="recipe-title"
              style={{ margin: 0, fontSize: 20, fontWeight: 900 }}
            >
              {detail.title}
            </h3>
            <p
              style={{ margin: "4px 0 0", fontSize: 14, color: "#444" }}
              aria-label={`調理時間 ${detail.timeMinutes}分`}
            >
              調理時間：{detail.timeMinutes}分
            </p>
          </header>

          {/* 材料 */}
          <section aria-labelledby="ingredients-title">
            <h4
              id="ingredients-title"
              style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800 }}
            >
              使う材料
            </h4>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {detail.ingredientsUsed.map((i, idx) => (
                <li key={idx}>
                  {i.name}：{i.amount}
                  {i.note ? `（${i.note}）` : ""}
                </li>
              ))}
            </ul>
          </section>

          {/* 手順 */}
          <section aria-labelledby="steps-title">
            <h4
              id="steps-title"
              style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800 }}
            >
              手順
            </h4>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {detail.steps.map((s, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>
                  {s}
                </li>
              ))}
            </ol>
          </section>

          {/* コツ */}
          {detail.tips && (
            <section aria-labelledby="tips-title">
              <h4
                id="tips-title"
                style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800 }}
              >
                コツ
              </h4>
              <p style={{ margin: 0 }}>{detail.tips}</p>
            </section>
          )}
        </article>
      )}
    </Modal>
  );
}
