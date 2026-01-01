import Modal from "./Modal";
import type { FridgeItem } from "../types/models";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: FridgeItem[];
};

export default function FridgeModal({ isOpen, onClose, items }: Props) {
  return (
    <Modal title="冷蔵庫の中身" isOpen={isOpen} onClose={onClose}>
      {items.length === 0 ? (
        <p>冷蔵庫は空です。</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}（{item.quantity}
              {item.unit}）
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
