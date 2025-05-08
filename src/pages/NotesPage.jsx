import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../components/NoteCard";

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <>
      <div className="Notes">
        {notes.map((note) => (
          <NoteCard note={note} key={note.$id} />
        ))}
      </div>
    </>
  );
};

export default NotesPage;
