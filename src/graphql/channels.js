import { gql } from "@apollo/client";

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

export const GET_NEW_MESSAGE = gql`
  subscription {
    newMessage {
      content
      author {
        nickname
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation($data: MessageInput!) {
    createMessage(data: $data) {
      content
    }
  }
`;

export const LOGIN = gql`
  mutation($data: UserInput!) {
    login(data: $data) {
      nickname
      _id
    }
  }
`;
