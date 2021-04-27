import React, { useEffect } from "react";

import "../assets/styles/Message.css";

const Message = ({ message, user }) => {
  const { author, content } = message;

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  return (
    <div
      className="message"
      style={{
        display: "flex",
        justifyContent: user.nickname === message.author.nickname ? "flex-end" : "flex-start",
        paddingBottom: ".25rem",
      }}
    >
      <div
        style={{
          background: user.nickname === author.nickname ? "#20bf6b" : "#fff",
          color: user.nickname === author.nickname ? "white" : "black",
          padding: ".5rem",
          borderRadius: "12px",
          maxWidth: "80%",
          wordBreak: "break-word",
        }}
      >
        {user.nickname !== author.nickname && (
          <div className="other-user-info">
            <span>{author.nickname}</span>
          </div>
        )}
        {content}
      </div>
    </div>
  );
};

export default Message;
