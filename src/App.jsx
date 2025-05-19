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
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  })

  const activePlater = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map((array) => [...array])]

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
      winner = players[firstSquareSymbol]
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

  const handleRestart = () => {
    setGameTurns([])
  }

  const handlePlayerNameChange = (player, newName) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [player]: newName,
    }))
  }

  return (
    <>
      <header id="header">
        <img src="/game-logo.png" />
        <h1>React Tic-Tac-Toe</h1>
      </header>
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
              onNameChange={handlePlayerNameChange}
            />
            <Player
              initialName="Player 2"
              symbol="O"
              isActive={activePlater === 'O'}
              onNameChange={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver
              winner={winner}
              onRestart={handleRestart}
            />
          )}
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
