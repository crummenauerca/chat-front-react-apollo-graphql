import React from "react";
import "../assets/styles/Header.css";

const Header = ({ nickname }) => {
  const logout = () => {
    localStorage.removeItem("@simple-chat/user");
    window.location.reload();
  };

  return (
    <header className="header">
      <h3>Simple Chat</h3>
      <div>
        <span>{nickname} | </span>
        <button onClick={logout}>Sair</button>
      </div>
    </header>
  );
};

export default Header;
