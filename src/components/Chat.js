import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Row, Col, FormInput, Button } from "shards-react";
import { GET_MESSAGES, CREATE_MESSAGE } from "../graphql/channels";

const Chat = () => {
  const [state, setState] = useState({
    nickname: "crummenauerca",
    content: "",
  });

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const onSend = () => {
    if (state.content.length > 0) {
      createMessage({
        variables: {
          data: {
            author: "6082704d7fac1b098888aae7",
            content: state.content,
          },
        },
      });
    }
    setState({
      ...state,
      content: "",
    });
  };

  const { data } = useQuery(GET_MESSAGES, { pollInterval: 250 });

  if (!data) {
    return null;
  }

  return (
    <Container>
      {data.messages.map(({ author, content }, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: state.nickname === author.nickname ? "flex-end" : "flex-start",
            paddingBottom: "1em",
          }}
        >
          {state.nickname !== author.nickname && (
            <div
              key={index}
              style={{
                height: 50,
                width: 50,
                marginRight: "0.5em",
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
              background: state.nickname === author.nickname ? "blue" : "#e5e6ea",
              color: state.nickname === author.nickname ? "white" : "black",
              padding: ".5em",
              borderRadius: "1em",
              maxWidth: "60%",
            }}
          >
            {content}
          </div>
        </div>
      ))}

      <Row>
        <Col xs={9}>
          <FormInput
            label="Content"
            value={state.content}
            onChange={evt =>
              setState({
                ...state,
                content: evt.target.value,
              })
            }
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
