import { useRef, useEffect, useState } from "react";
import { db } from "../appwrite/databases";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils/utils";
import DeleteButton from "./DeleteButton";
import Spinner from "../icons/Spinner";

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  const keyUpTimerRef = useRef(null);
  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);
  let mouseInitialPosition = { x: 0, y: 0 };

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      setZIndex(cardRef.current);
      mouseInitialPosition.x = e.clientX;
      mouseInitialPosition.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseInitialPosition.x - e.clientX,
      y: mouseInitialPosition.y - e.clientY,
    };

    mouseInitialPosition.x = e.clientX;
    mouseInitialPosition.y = e.clientY;

    const positionWithBoundaries = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(positionWithBoundaries);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = async () => {
    setSaving(true);

    if (keyUpTimerRef.current) {
      clearTimeout(keyUpTimerRef.current);
    }

    keyUpTimerRef.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <DeleteButton noteId={note.$id} />

        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} size={16} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => setZIndex(cardRef.current)}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
