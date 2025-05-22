import {
  GameTurnType,
  InitialGameBoardType,
  PlayerType,
  SymbolType,
  WinningCombinationsType,
} from './types'

export const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

export const INITIAL_GAME_BOARD: InitialGameBoardType = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export const WINNING_COMBINATIONS: WinningCombinationsType = [
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
]

export const deriveActivePlayer = (gameTurns: GameTurnType[]) => {
  // If number of turns is even, it's X's turn, otherwise O's turn
  return gameTurns.length % 2 === 0 ? 'X' : 'O'
}

export const deriveGameBoard = (gameTurns: GameTurnType[]) => {
  const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  return gameBoard
}

export const deriveWinner = (gameBoard: InitialGameBoardType, players: PlayerType) => {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][
      combination[0].column
    ] as keyof SymbolType
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      return players[firstSquareSymbol as keyof PlayerType]
    }
  }
  return null
}
