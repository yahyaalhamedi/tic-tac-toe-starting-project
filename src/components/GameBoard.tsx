import { InitialGameBoardType } from '../types'

interface GameBoardPropsType {
  onSelectSquare: (rowIndex: number, colIndex: number) => void
  gameBoard: InitialGameBoardType
}

const GameBoard = (props: GameBoardPropsType) => {
  const { onSelectSquare, gameBoard } = props

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}

export default GameBoard
