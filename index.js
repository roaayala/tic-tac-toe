const gameboard = () => {
	const row = 3;
	const column = 3;
	const board = [];

	for (let i = 0; i < row * column; i++) {
		board[i] = undefined;
	}

	const getBoard = () => board;
	console.log(getBoard());
};

function gameController(playerOne, playerTwo) {
	playerOne = 'Player One';
	playerTwo = 'Player Two' ? 'Player Two' : 'Computer';
	const board = gameboard();

	const players = [
		{
			name: playerOne,
			symbol: 1,
		},
		{
			name: playerTwo,
			symbol: 2,
		},
	];

	let activePlayer = players[0];

	const swithPlayer = () => {
		activePlayer =
			activePlayer === activePlayer[0] ? activePlayer[1] : activePlayer[0];
	};

	const getActivePlayer = () => activePlayer;
}

const game = gameController();
