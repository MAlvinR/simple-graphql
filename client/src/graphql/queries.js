import { gql } from "@apollo/client";

export const GET_ALL_NOTES = gql`
query GetAllNotes {
  getAllNotes {
    id
    title
    body
  }
}
`;

export const GET_NOTE_BY_ID = gql`
query GetNoteByID($id: ID!) {
  getNoteByID(id: $id) {
    title
    body
  }
}
`;

export const CREATE_NOTE = gql`
mutation CreateNote($title: String!, $body: String!) {
  createNote(title: $title, body: $body) {
    title
  }
}
`;

export const UPDATE_NOTE = gql`
mutation UpdateNote($id: ID!, $title: String, $body: String) {
  updateNote(id: $id, title: $title, body: $body) {
    id
  }
}
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`;