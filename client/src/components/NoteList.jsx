import { useQuery } from '@apollo/client';
import { GET_ALL_NOTES } from '../graphql/queries';

const NoteList = ({ onSelectNote }) => {
    const {
        data: getAllNotesData,
        loading: getAllNotesLoading,
        error: getAllNotesError,
    } = useQuery(GET_ALL_NOTES);

    if (getAllNotesLoading) return <p>Data loading...</p>;
    if (getAllNotesError) return <p>Error: {getAllNotesError.message}</p>;

    return (
        <div>
            <h1>All Notes</h1>
            {getAllNotesData.getAllNotes.map((note) => (
                <div key={note.id} style={{ border: '1px solid #ccc', margin: `10px`, padding: `10px` }}>
                    <h2>{note.title}</h2>
                    <p>{note.body}</p>
                    <button onClick={() => onSelectNote(note.id)}>View Details</button>
                </div>
            ))}
        </div>
    );
};

export default NoteList;