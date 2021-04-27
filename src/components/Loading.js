import "../assets/styles/Loading.css";

import loading from "../assets/images/loading.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="Logo do Simple Chat" />
      <h2>Carregando...</h2>
    </div>
  );
};

export default Loading;
