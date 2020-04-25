import * as React from "react";
import styles from "./game-board.module.css";

export class GameBoard extends React.Component {
	constructor() {
		super();
		this.state = {
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
					cardVersion={this.props.cardVersion}
					topLetter="B"
					numbers={this.state.bColumn}
				/>
				<Column
					cardVersion={this.props.cardVersion}
					topLetter="I"
					numbers={this.state.iColumn}
				/>
				<Column
					cardVersion={this.props.cardVersion}
					topLetter="N"
					numbers={this.state.nColumn}
				/>
				<Column
					cardVersion={this.props.cardVersion}
					topLetter="G"
					numbers={this.state.gColumn}
				/>
				<Column
					cardVersion={this.props.cardVersion}
					topLetter="O"
					numbers={this.state.oColumn}
				/>
			</div>
		);
	}
}

class Column extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columnNumbers: getFiveRandomNumbersOrdered(props.numbers),
			selectedNumbers: [],
		};
	}

	componentWillReceiveProps(prevProps) {
		if (prevProps.cardVersion !== this.props.cardVersion) {
			this.setState({
				columnNumbers: getFiveRandomNumbersOrdered(this.props.numbers),
				selectedNumbers: [],
			});
		}
	}

	render() {
		return (
			<div className={styles.column}>
				<div className={styles.header}>{this.props.topLetter}</div>
				{this.state.columnNumbers.map((number) => {
					return (
						<div
							onClick={() => this.handleToggleNumber(number)}
							className={
								this.state.selectedNumbers.includes(number)
									? styles.cellSelected
									: styles.cell
							}
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

function getFiveRandomNumbersOrdered(range) {
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
