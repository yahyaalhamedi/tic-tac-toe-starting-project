import Player from './components/Player'
import GameBoard from './components/GameBoard'
import { useState } from 'react'
import Log from './components/Log'
import GameOver from './components/GameOver'
import { initialGameBoard, WINNING_COMBINATIONS } from './helper'

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

  let gameBoard = initialGameBoard

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }

  let winner = null
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thridSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thridSquareSymbol
    ) {
      winner = firstSquareSymbol
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner

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
          {(winner || hasDraw) && <GameOver winner={winner} />}
          <GameBoard
            onSelectSquare={handleSelectSquare}
            gameBoard={gameBoard}
          />
        </div>
        <Log gameTurns={gameTurns} />
      </main>
    </>
  )
}

export default App
