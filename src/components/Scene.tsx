import "./Scene.css";

type Props = {
  onClickFridge: () => void;
  onClickKitchen: () => void;
  onClickBag: () => void;
};

export default function Scene({
  onClickFridge,
  onClickKitchen,
  onClickBag,
}: Props) {
  return (
    <main
      className="scene"
      aria-labelledby="app-title"
      aria-describedby="app-desc"
    >
      <header className="sceneHeader">
        <h1 id="app-title" className="sceneTitle">
          徳久家の献立解決へ
        </h1>
        <p id="app-desc" className="sceneDesc">
          食材を登録し、作れる献立をAIに決めてもらおう！
        </p>
      </header>

      <section className="sceneGrid" aria-label="操作メニュー">
        <ActionCard
          title="今ある食材は？"
          description="冷蔵庫の中身を確認"
          imageSrc="/images/fridge.png"
          onClick={onClickFridge}
        />
        <ActionCard
          title="何が作れるの？"
          description="今ある食材から献立候補を生成し、選択"
          imageSrc="/images/kitchen.png"
          onClick={onClickKitchen}
        />
        <ActionCard
          title="新しい食材を増やそう"
          description="食材を登録"
          imageSrc="/images/bag.png"
          onClick={onClickBag}
        />
      </section>
    </main>
  );
}

function ActionCard(props: {
  title: string;
  description: string;
  imageSrc: string;
  onClick: () => void;
}) {
  const { title, description, imageSrc, onClick } = props;

  return (
    <button
      type="button"
      className="actionCard"
      onClick={onClick}
      aria-label={`${title}：${description}`}
    >
      <img className="actionImg" src={imageSrc} alt="" aria-hidden="true" />
      <div className="actionText">
        <div className="actionTitle">{title}</div>
        <div className="actionDesc">{description}</div>
      </div>
    </button>
  );
}
