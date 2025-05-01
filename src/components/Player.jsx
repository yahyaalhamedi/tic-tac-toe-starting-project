import { useState } from "react";

function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <input type="text" required />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button className="player-button" onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}

export default Player;
