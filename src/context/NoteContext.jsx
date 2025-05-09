import { createContext, useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";

export const NoteContext = createContext();

const NotesProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState();
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await db.notes.list();
      setNotes(response.documents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};
export default NotesProvider;
