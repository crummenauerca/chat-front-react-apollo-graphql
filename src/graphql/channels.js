import { gql } from "@apollo/client";

// Usado para obter todas as mensagens
export const GET_MESSAGES = gql`
  query {
    messages {
      content
      author {
        nickname
      }
    }
  }
`;

// Usado para obter atualização de mensagens
export const GET_NEW_MESSAGE = gql`
  subscription {
    newMessage {
      content
      createdAt
      author {
        nickname
      }
    }
  }
`;

// Usado para enviar novas mensagens
export const CREATE_MESSAGE = gql`
  mutation($data: MessageInput!) {
    createMessage(data: $data) {
      content
    }
  }
`;
