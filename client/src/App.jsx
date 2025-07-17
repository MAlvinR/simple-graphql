import { useState } from 'react';
import './App.css';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_ALL_NOTES = gql`
query GetAllNotes {
  getAllNotes {
    id
    title
    body
  }
}
`;

const GET_NOTE_BY_ID = gql`
query GetNoteByID($id: ID!) {
  getNoteByID(id: $id) {
    title
    body
  }
}
`;

const CREATE_NOTE = gql`
mutation CreateNote($title: String!, $body: String!) {
  createNote(title: $title, body: $body) {
    title
  }
}
`;

const UPDATE_NOTE = gql`
mutation UpdateNote($id: ID!, $title: String, $body: String) {
  updateNote(id: $id, title: $title, body: $body) {
    id
  }
}
`;

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

function App() {
  const [selectedNoteId, setSelectedNoteId] = useState();
  const [newNote, setNewNote] = useState({});

  const {
    data: getAllNotesData,
    loading: getAllNotesLoading,
    error: getAllNotesError,
  } = useQuery(GET_ALL_NOTES);

  const {
    data: getNoteData,
    loading: getNoteLoading,
    error: getNoteError,
  } = useQuery(GET_NOTE_BY_ID, {
    skip: !selectedNoteId,
    variables: { id: selectedNoteId },
  });

  const [createNote] = useMutation(CREATE_NOTE);

  if (getAllNotesLoading) return <p>Data loading...</p>;

  if (getAllNotesError) return <p>Error: {getAllNotesError.message}</p>;

  const handleCreateNote = async () => {
    console.log(newNote);
    createNote({
      variables: {
        title: newNote.title,
        body: newNote.body,
      }
    })
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder='Title...'
          value={newNote.title ?? ""}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, title: e.target.value }))
          } />
        <input
          type="text"
          placeholder='Body...'
          value={newNote.body ?? ""}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, body: e.target.value }))
          } />
        <button onClick={handleCreateNote}>Create Note</button>
      </div>

      <div>
        {selectedNoteId ? (
          <>
            {getNoteLoading && <p>Loading note ...</p>}
            {getNoteError && (
              <p>Error loading specified note: {getNoteError.message}</p>
            )}
            {getNoteData && (
              <>
                <h1>Chosen Note: </h1>
                <h2>{getNoteData.getNoteByID.title}</h2>
                <p>{getNoteData.getNoteByID.body}</p>
              </>
            )}
          </>
        ) : (
          <p>No note selected</p>
        )}
      </div>

      <h1>All Notes</h1>
      <div>
        {getAllNotesData.getAllNotes.map((note) => (
          <div key={note.id} style={{ border: '1px solid #ccc', margin: `10px`, padding: `10px`}}>
            <h2>{note.title}</h2>
            <p>{note.body}</p>
            <button onClick={() => setSelectedNoteId(note.id)}>View Details</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;