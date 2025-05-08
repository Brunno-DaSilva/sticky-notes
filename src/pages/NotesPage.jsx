import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import NoteCard from "../components/NoteCard";
import Controls from "../components/Controls";

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <>
      <div className="Notes">
        {notes.map((note) => (
          <NoteCard note={note} key={note.$id} />
        ))}
        <Controls />
      </div>
    </>
  );
};

export default NotesPage;
