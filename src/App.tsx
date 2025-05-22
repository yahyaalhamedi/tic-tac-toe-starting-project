import Player from './components/Player'
import GameBoard from './components/GameBoard'
import { useState } from 'react'
import Log from './components/Log'
import GameOver from './components/GameOver'
import { PLAYERS, deriveActivePlayer, deriveGameBoard, deriveWinner } from './helper'
import { GameTurnType, SymbolType } from './types'

const App = () => {
  const [gameTurns, setGameTurns] = useState<GameTurnType[]>([])
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
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

  const handlePlayerNameChange = (player: SymbolType, newName: string) => {
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
              isActive={activePlayer === 'X'}
              onNameChange={handlePlayerNameChange}
            />
            <Player
              initialName="Player 2"
              symbol="O"
              isActive={activePlayer === 'O'}
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
