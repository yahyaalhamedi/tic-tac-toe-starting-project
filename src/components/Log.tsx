import { GameTurnType } from '../types'

interface LogPropsType {
  gameTurns: GameTurnType[]
}

const Log = (props: LogPropsType) => {
  const { gameTurns } = props

  return (
    <ol id="log">
      {gameTurns.map((turn, index) => (
        <li key={index}>{`${turn.player} selected (${turn.square.row}, ${turn.square.col})`}</li>
      ))}
    </ol>
  )
}

export default Log
