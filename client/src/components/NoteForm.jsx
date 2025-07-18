import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NOTE, GET_ALL_NOTES } from '../graphql/queries';

const NoteForm = () => {
    const [newNote, setNewNote] = useState({});
    const [createNote] = useMutation(CREATE_NOTE);

    const handleCreateNote = async () => {
        if (!newNote.title || !newNote.body) {
            alert("Title and body are required fields.");
            return;
        }

        await createNote({
            variables: {
                title: newNote.title,
                body: newNote.body,
            },
            refetchQueries: [{ query: GET_ALL_NOTES }],
        });

        setNewNote({ title: "", body: "" });
    };

    return (
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
    );
};

export default NoteForm;