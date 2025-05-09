import Player from './components/Player'
import GameBoard from './components/GameBoard'
import { useState } from 'react'
import Log from './components/Log'

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])

  const activePlater = deriveActivePlayer(gameTurns)

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurens) => {
      const currentPlayer = deriveActivePlayer(prevTurens)

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurens,
      ]

      return updatedTurns
    })
  }

  return (
    <>
      <h1>React Tic-Tac-Toe</h1>
      <main>
        <div id="game-container">
          <ol
            id="players"
            className="highlight-player"
          >
            <Player
              initialName="Player 1"
              symbol="X"
              isActive={activePlater === 'X'}
            />
            <Player
              initialName="Player 2"
              symbol="O"
              isActive={activePlater === 'O'}
            />
          </ol>
          <GameBoard
            onSelectSquare={handleSelectSquare}
            gameTurns={gameTurns}
          />
        </div>
        <Log gameTurns={gameTurns} />
      </main>
    </>
  )
}

export default App
