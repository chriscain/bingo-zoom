import * as React from 'react';
import {GameBoard} from './game/game-board';
import styles from './App.module.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cardVersion: 0,
        };
    }

    render() {
        return (
            <div className={styles.bingo}>
                <div className={styles.controls}>
                    <button onClick={this.handleNewCard}>
                        Generate new card
                    </button>
                </div>
                <div className={styles.contents}>
                    <GameBoard cardVersion={this.state.cardVersion} />
                </div>
            </div>
        );
    }

    handleNewCard = () => {
        this.setState({
            cardVersion: this.state.cardVersion + 1,
        });
    };
}

export default App;
