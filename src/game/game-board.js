/* @flow */

import * as React from 'react';
import styles from './game-board.module.css';

type ColumnValue = number[];

type Props = {
    cardVersion: number,
    useImages: boolean,
};

type State = {
    bColumn: ColumnValue,
    iColumn: ColumnValue,
    nColumn: ColumnValue,
    gColumn: ColumnValue,
    oColumn: ColumnValue,
    extras: ?(string[]),
};

export class GameBoard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            extras: props.useImages ? generateExtras() : null,
            bColumn: getNumbersInRange(1, 15),
            iColumn: getNumbersInRange(16, 30),
            nColumn: getNumbersInRange(31, 45),
            gColumn: getNumbersInRange(46, 60),
            oColumn: getNumbersInRange(61, 75),
        };
    }

    render() {
        return (
            <div className={styles.board}>
                <Column
                    extras={this.state.extras}
                    useImages={this.props.useImages}
                    cardVersion={this.props.cardVersion}
                    topLetter="B"
                    numbers={this.state.bColumn}
                />
                <Column
                    extras={this.state.extras}
                    useImages={this.props.useImages}
                    cardVersion={this.props.cardVersion}
                    topLetter="I"
                    numbers={this.state.iColumn}
                />
                <Column
                    extras={this.state.extras}
                    useImages={this.props.useImages}
                    cardVersion={this.props.cardVersion}
                    topLetter="N"
                    numbers={this.state.nColumn}
                />
                <Column
                    extras={this.state.extras}
                    useImages={this.props.useImages}
                    cardVersion={this.props.cardVersion}
                    topLetter="G"
                    numbers={this.state.gColumn}
                />
                <Column
                    extras={this.state.extras}
                    useImages={this.props.useImages}
                    cardVersion={this.props.cardVersion}
                    topLetter="O"
                    numbers={this.state.oColumn}
                />
            </div>
        );
    }
}

function getLocalStorageItem(key: string) {
    const item = localStorage.getItem(key);

    if (item) {
        return JSON.parse(item);
    }

    return null;
}

function getLocalStorageKey(columnLetter: string) {
    return 'CAIN_BINGO_COLUMN_' + columnLetter;
}

function generateExtras() {
    const extras = [];
    let hasDingo = false;
    let hasSkull = false;

    for (let i = 0; i < 75; i++) {
        const randomNumber = getRandomNumber(1, 100);
        if (randomNumber < 10) {
            extras.push('snowman');
        } else if (randomNumber >= 10 && randomNumber < 20) {
            extras.push('math');
        } else if (randomNumber >= 20 && randomNumber < 25 && !hasSkull) {
            hasSkull = true;
            extras.push('wihi');
        } else if (randomNumber >= 25 && randomNumber < 28 && !hasDingo) {
            hasDingo = true;
            extras.push('dingo');
        } else {
            extras.push('empty');
        }
    }

    return extras;
}

type ColumnProps = {
    numbers: number[],
    topLetter: string,
    cardVersion: number,
    useImages: boolean,
    extras: ?(string[]),
};

type ColumnState = {
    columnNumbers: number[],
    selectedNumbers: number[],
};

class Column extends React.Component<ColumnProps, ColumnState> {
    constructor(props) {
        super(props);

        const key = getLocalStorageKey(props.topLetter);
        const existingNumbers = getLocalStorageItem(key);

        const randomNumbers = existingNumbers
            ? existingNumbers
            : getFiveRandomNumbersOrdered(props.numbers);

        this.state = {
            columnNumbers: randomNumbers,
            selectedNumbers: [],
        };

        localStorage.setItem(key, JSON.stringify(randomNumbers));
    }

    componentWillReceiveProps(prevProps) {
        if (
            prevProps.cardVersion !== this.props.cardVersion &&
            this.props.cardVersion !== 0
        ) {
            const newRandomNumbers = getFiveRandomNumbersOrdered(
                this.props.numbers
            );

            this.setState({
                columnNumbers: newRandomNumbers,
                selectedNumbers: [],
            });

            const key = getLocalStorageKey(this.props.topLetter);
            localStorage.setItem(key, JSON.stringify(newRandomNumbers));
        }
    }

    render() {
        return (
            <div className={styles.column}>
                <div className={styles.header}>{this.props.topLetter}</div>
                {this.state.columnNumbers.map((number, index) => {
                    if (index === 2 && this.props.topLetter === 'N') {
                        return (
                            <div
                                className={styles.cellSelectedAlways}
                                key="FREE"
                            >
                                FREE
                            </div>
                        );
                    }

                    const extraStuff = this.props.extras
                        ? this.props.extras[number - 1]
                        : null;

                    let classNames = this.state.selectedNumbers.includes(number)
                        ? styles.cellSelected
                        : styles.cell;

                    if (extraStuff) {
                        classNames = `${classNames} ${styles[extraStuff]}`;
                    }

                    return (
                        <div
                            onClick={() => this.handleToggleNumber(number)}
                            className={classNames}
                            key={number}
                        >
                            {number}
                        </div>
                    );
                })}
            </div>
        );
    }

    handleToggleNumber = (number) => {
        if (this.state.selectedNumbers.includes(number)) {
            this.setState((prevState) => ({
                selectedNumbers: prevState.selectedNumbers.filter(
                    (existingNumber) => {
                        return existingNumber !== number;
                    }
                ),
            }));
        } else {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat([number]),
            });
        }
    };
}

function getFiveRandomNumbersOrdered(range: number[]) {
    const numbers = [];
    while (numbers.length < 5) {
        const newNumber = getRandomNumber(range[0], range[14]);

        if (!numbers.includes(newNumber)) {
            numbers.push(newNumber);
        }
    }

    return numbers;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getNumbersInRange(min, max) {
    const numbers = [];
    for (let i = 0; i <= 14; i++) {
        numbers.push(min + i);
    }

    return numbers;
}
