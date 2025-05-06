import { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow } from "../utils/utils";

const NoteCard = ({ note }) => {
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  let mouseInitialPosition = { x: 0, y: 0 };
  const body = JSON.parse(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  const mouseDown = (e) => {
    mouseInitialPosition.x = e.clientX;
    mouseInitialPosition.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
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
  };

  useEffect(() => {
    autoGrow(textAreaRef);
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
        <Trash /> Header Hard Code
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => autoGrow(textAreaRef)}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
