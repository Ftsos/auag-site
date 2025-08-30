import '../styles/MainText.css';

export const MainText: React.FC = () => {
  return (
    <div className="main-text">
      <h1 className="title">
        <div>Join</div>
        <div>the</div>
        <div>AU<span className="red-text">AG</span></div>
      </h1>
      <div className="accent-line"></div>
    </div>
  );
};
