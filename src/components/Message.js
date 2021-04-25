import React from "react";

const Message = ({ message, user }) => {
  const { author, content } = message;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: user.nickname === message.author.nickname ? "flex-end" : "flex-start",
        paddingBottom: ".5rem",
      }}
    >
      {user.nickname !== author.nickname && (
        <div
          style={{
            height: 50,
            width: 50,
            marginRight: "0.5rem",
            border: "2px solid #e5e6ea",
            borderRadius: 100,
            textAlign: "center",
            fontSize: "18pt",
            paddingTop: 5,
          }}
        >
          {author.nickname.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div
        style={{
          background: user.nickname === author.nickname ? "blue" : "#e5e6ea",
          color: user.nickname === author.nickname ? "white" : "black",
          padding: ".5rem",
          borderRadius: "1rem",
          maxWidth: "75%",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
