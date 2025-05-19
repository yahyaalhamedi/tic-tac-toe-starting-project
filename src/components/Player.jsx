import { useState } from 'react'

function Player({ initialName, symbol, isActive, onNameChange }) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing((prev) => !prev)
    if (isEditing) {
      onNameChange(symbol, playerName)
    }
  }

  const handleNameChange = (event) => {
    setPlayerName(event.target.value)
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange}
            required
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button
        className="player-button"
        onClick={handleEditClick}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  )
}

export default Player
