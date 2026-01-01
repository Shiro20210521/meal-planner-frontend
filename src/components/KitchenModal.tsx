import Modal from "./Modal";
import type { MenuCandidate } from "../types/models";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  candidates: MenuCandidate[];
  onSelect: (id: string) => void;
};

export default function KitchenModal({
  isOpen,
  onClose,
  candidates,
  onSelect,
}: Props) {
  return (
    <Modal title="献立候補を選ぶ" isOpen={isOpen} onClose={onClose}>
      <p style={{ margin: "0 0 12px", color: "#444" }}>
        作りたい献立を選択してください（Enter / Space でも選べます）
      </p>

      <div
        role="list"
        aria-label="献立候補一覧"
        style={{ display: "grid", gap: 10 }}
      >
        {candidates.length === 0 ? (
          <div
            style={{
              padding: 12,
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 12,
            }}
          >
            候補がありません。
          </div>
        ) : (
          candidates.map((c) => (
            <div role="listitem" key={c.id}>
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                aria-label={`${c.title}、所要時間${c.timeMinutes}分。選択`}
                style={{
                  width: "100%",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 12,
                  padding: 12,
                  background: "white",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 16 }}>{c.title}</div>
                <div style={{ fontSize: 14, color: "#444", marginTop: 4 }}>
                  {c.timeMinutes}分
                </div>
              </button>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
