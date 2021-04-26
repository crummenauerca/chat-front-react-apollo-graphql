import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES, CREATE_MESSAGE } from "../graphql/channels";

import "../assets/styles/Chat.css";
import Message from "./Message";

const Chat = ({ user }) => {
  const [content, setContent] = useState("");

  const [createMessage] = useMutation(CREATE_MESSAGE);

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

  const { data } = useQuery(GET_MESSAGES, { pollInterval: 250 });

  if (!data) {
    return null;
  }

  return (
    <div className="chat">
      <div className="messages">
        {data.messages.map((message, index) => (
          <Message message={message} user={user} key={index} />
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input value={content} type="text" onChange={event => setContent(event.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
