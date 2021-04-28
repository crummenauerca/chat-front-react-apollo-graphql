import React from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { USER_STATUS_CHANGED } from "../graphql/channels";
import { LOGOUT } from "../graphql/channels";

import "../assets/styles/Header.css";
import logo from "../assets/images/logo.png";
import showNotification from "../utils/Notification";

const Header = ({ nickname }) => {
  const [logout] = useMutation(LOGOUT);

  const { data } = useSubscription(USER_STATUS_CHANGED);

  if (data) {
    if (nickname !== data.userStatusChanged.nickname) {
      showNotification(
        "User status",
        data.userStatusChanged.nickname,
        data.userStatusChanged.isActive ? "online" : "offline"
      );
    }
  }

  const leave = async () => {
    await logout({
      variables: {
        data: {
          nickname,
        },
      },
    });

    localStorage.removeItem("@simple-chat/user");
    window.location.reload();
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo do Simple Chat" />
      {data && data.userStatusChanged.nickname !== nickname && (
        <span className="users-status">
          {data.userStatusChanged.nickname}
          <br />
          {data.userStatusChanged.isActive === true ? "entrou 😃" : "saiu 😥"}
        </span>
      )}
      <div>
        <span>{nickname} | </span>
        <button onClick={leave}>Sair</button>
      </div>
    </header>
  );
};

export default Header;
