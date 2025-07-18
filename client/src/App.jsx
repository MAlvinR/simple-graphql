import { useState } from 'react';
import './App.css';

import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import Modal from './components/Modal';

function App() {
  const [selectedNoteId, setSelectedNoteId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenNoteDetail = (id) => {
    setSelectedNoteId(id);
    setIsModalOpen(true);
  }

  const handleCloseNoteDetail = (id) => {
    setIsModalOpen(false);
    setSelectedNoteId(null);
  }

  return (
    <>
      <NoteForm />
      <NoteList onSelectNote={setSelectedNoteId} />

      {isModalOpen && (
        <Modal onClose={handleCloseNoteDetail}>
          <NoteDetail noteID={selectedNoteId} />
        </Modal>
      )}
    </>
  );
}

export default App;