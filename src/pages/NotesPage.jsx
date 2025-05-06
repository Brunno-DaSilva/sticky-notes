import React, { useEffect, useState } from "react";
import { db } from "../appwrite/databases";
import NoteCard from "../components/NoteCard";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await db.notes.list();
      setNotes(response.documents);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
