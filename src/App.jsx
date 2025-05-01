import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {
  const [activePlater, setActivePlater] = useState("X");

  const handleSelectSquare = () => {
    setActivePlater((prevActivePlayer) =>
      prevActivePlayer === "X" ? "O" : "X"
    );
  };

  return (
    <>
      <h1>React Tic-Tac-Toe</h1>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName="Player 1"
              symbol="X"
              isActive={activePlater === "X"}
            />
            <Player
              initialName="Player 2"
              symbol="O"
              isActive={activePlater === "O"}
            />
          </ol>
          <GameBoard
            onSelectSquare={handleSelectSquare}
            activePlayerSymbol={activePlater}
          />
        </div>
      </main>
    </>
  );
}

export default App;
