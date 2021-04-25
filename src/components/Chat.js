import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Row, Col, FormInput, Button } from "shards-react";
import { GET_MESSAGES, CREATE_MESSAGE } from "../graphql/channels";
import Message from "./Message";

const Chat = ({ user }) => {
  const [content, setContent] = useState("");

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const onSend = () => {
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
    <Container
      style={{
        padding: "5rem",
      }}
    >
      {data.messages.map((message, index) => (
        <Message message={message} user={user} key={index} />
      ))}

      <Row
        style={{
          position: "fixed",
          bottom: 0,
          padding: 10,
          width: "80%",
        }}
      >
        <Col xs={9}>
          <FormInput
            value={content}
            onChange={evt => setContent(evt.target.value)}
            onKeyUp={evt => {
              if (evt.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={3} style={{ padding: 0 }}>
          <Button onClick={() => onSend()} style={{ width: "100%" }}>
            Enviar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
