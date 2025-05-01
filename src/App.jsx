import Player from "./components/Player";

function App() {
  return (
    <>
      <h1>React Tic-Tac-Toe</h1>
      <main>
        <div id="game-container">
          <ol id="players">
            <Player name="Player 1" symbol="X" />
            <Player name="Player 2" symbol="O" />
          </ol>
        </div>
      </main>
    </>
  );
}

export default App;
