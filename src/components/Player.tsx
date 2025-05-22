import { useState } from 'react'
import { SymbolType } from '../types'

interface PlayerPropsType {
  initialName: string
  symbol: SymbolType
  isActive: boolean
  onNameChange: (symbol: SymbolType, player: string) => void
}

const Player = (props: PlayerPropsType) => {
  const { initialName, symbol, isActive, onNameChange } = props

  const [playerName, setPlayerName] = useState<string>(initialName)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing((prev) => !prev)
    if (isEditing) {
      onNameChange(symbol, playerName)
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
