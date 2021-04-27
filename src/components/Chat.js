import React, { useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_MESSAGES, CREATE_MESSAGE, GET_NEW_MESSAGE } from "../graphql/channels";

import Message from "./Message";
import Loading from "./Loading";
import "../assets/styles/Chat.css";

const Chat = ({ user }) => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState(null);

  const [createMessage] = useMutation(CREATE_MESSAGE);
  let messagesFromServer = useQuery(GET_MESSAGES);
  let newMessageFromServer = useSubscription(GET_NEW_MESSAGE);

  if (newMessageFromServer.data) {
    let newMessages = Object.assign([], messages);
    if (messages.indexOf(newMessageFromServer.data.newMessage) === -1) {
      newMessages.push(newMessageFromServer.data.newMessage);
      setMessages(newMessages);
    }
  }

  if (messagesFromServer) {
    if (messagesFromServer.loading) {
      return <Loading />;
    }

    if (messagesFromServer.data && !messages) {
      setMessages(messagesFromServer.data.messages);
    }

    if (messagesFromServer.error) {
      console.log(messagesFromServer.error || newMessageFromServer.error);
      return <p className="error">Falha ao acessar as mensagens!</p>;
    }
  }

  const onSubmit = event => {
    event.preventDefault();
    if (content.length > 0) {
      createMessage({
        variables: {
          data: {
            author: user._id,
            content: content,
          },
        },
      });
    }
    setContent("");
  };

  console.log();

  return (
    <div className="chat">
      {messages && (
        <div className="messages">
          {messages.map((message, index) => (
            <Message message={message} user={user} key={index} />
          ))}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <input
          value={content}
          type="text"
          onChange={event => {
            if (event.target.value.length <= 25000) {
              setContent(event.target.value);
            } else {
              alert("Máximo de 25 mil caracteres por mensagem!");
            }
          }}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
