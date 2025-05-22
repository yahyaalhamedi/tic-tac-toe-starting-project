export interface GameTurnType {
  square: {
    row: number
    col: number
  }
  player: string
}

export type SymbolType = 'X' | 'O'

export type PlayerType = {
  X: string
  O: string
}

export type WinningCombinationsType = {
  row: number
  column: number
}[][]

export type InitialGameBoardType = (string | null)[][]
