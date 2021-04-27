import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES, CREATE_MESSAGE } from "../graphql/channels";

import Message from "./Message";
import Loading from "./Loading";
import "../assets/styles/Chat.css";

const Chat = ({ user }) => {
  const [content, setContent] = useState("");
  // const [messages, setMessages] = useState();

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const { data, loading, error } = useQuery(GET_MESSAGES, { pollInterval: 100 });

  /*if (data && !messages) {
    setMessages(data.messages);
  }*/

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <p className="error">Falha ao acessar os dados!</p>;
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

  if (data) {
    return (
      <div className="chat">
        <div className="messages">
          {data.messages.map((message, index) => (
            <Message message={message} user={user} key={index} />
          ))}
        </div>
        <form onSubmit={onSubmit}>
          <input
            value={content}
            type="text"
            onChange={event => {
              if (event.target.value.length <= 500) {
                setContent(event.target.value);
              } else {
                alert("Máximo de 500 caracteres por mensagem!");
              }
            }}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
};

export default Chat;
