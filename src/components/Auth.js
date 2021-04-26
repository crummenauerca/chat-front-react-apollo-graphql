import React, { useState } from "react";
import "../assets/styles/Auth.css";
import Chat from "./Chat";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/channels";
import Header from "./Header";

import logo from "../assets/images/logo.png";

const Auth = () => {
  const [nicknameInput, setNicknameInput] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("@simple-chat/user")));

  const [login] = useMutation(LOGIN);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!nicknameInput) {
      alert("É necessário inserir um nickname!");
      return;
    }

    const { data } = await login({
      variables: {
        data: {
          nickname: nicknameInput,
        },
      },
    });

    localStorage.setItem("@simple-chat/user", JSON.stringify(data.login));
    setUser(data.login);
  };

  if (user) {
    return (
      <>
        <Header nickname={user.nickname} />
        <Chat user={user} />;
      </>
    );
  } else {
    return (
      <div className="auth">
        <img src={logo} alt="Logo do Simple Chat" />
        <h1>Simple Chat</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Seu nickname"
            type="text"
            value={nicknameInput}
            onChange={event => setNicknameInput(event.target.value)}
          />
          <button type="submit">Acessar</button>
        </form>
      </div>
    );
  }
};

export default Auth;
