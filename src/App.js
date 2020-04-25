import React from "react";
import { GameBoard } from "./game/game-board";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.bingo}>
      <div className={styles.controls}>
        <button onClick={() => {}}>Generate new card</button>
      </div>
      <div className={styles.contents}>
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
