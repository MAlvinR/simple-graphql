import { useQuery } from '@apollo/client';
import { GET_NOTE_BY_ID } from '../graphql/queries';

const NoteDetail = ({ noteID }) => {
    const {
        data: getNoteData,
        loading: getNoteLoading,
        error: getNoteError,
      } = useQuery(GET_NOTE_BY_ID, {
        skip: !noteID,
        variables: { id: noteID },
      });

    return (
        <div>
        {noteID ? (
          <>
            {getNoteLoading && <p>Loading note ...</p>}
            {getNoteError && (
              <p>Error loading specified note: {getNoteError.message}</p>
            )}
            {getNoteData?.getNoteByID && (
              <>
                <h2>{getNoteData?.getNoteByID.title}</h2>
                <p>{getNoteData?.getNoteByID.body}</p>
              </>
            )}
          </>
        ) : (
          <p>No note selected</p>
        )}
      </div>
    );
};

export default NoteDetail;