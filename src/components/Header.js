import React from "react";
import "../assets/styles/Header.css";
import logo from "../assets/images/logo.png";

const Header = ({ nickname }) => {
  const logout = () => {
    localStorage.removeItem("@simple-chat/user");
    window.location.reload();
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo do Simple Chat" />
      <div>
        <span>{nickname} | </span>
        <button onClick={logout}>Sair</button>
      </div>
    </header>
  );
};

export default Header;
