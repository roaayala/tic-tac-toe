const gameboard = () => {
	const row = 3;
	const column = 3;
	const board = [];

	for (let i = 0; i < row * column; i++) {
		board[i] = undefined;
	}

	const updateBoard = (target, playerMarker) => {
		board[target] = playerMarker;
	};

	const getBoard = () => board;

	const availableBoard = () => {
		return board
			.map((box, idx) => (box === undefined ? idx : -1))
			.filter((idx) => idx !== -1);
	};

	return { updateBoard, availableBoard, getBoard };
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

	const switchPlayer = () => {
		activePlayer =
			activePlayer === activePlayer[0] ? activePlayer[1] : activePlayer[0];
	};

	const getActivePlayer = () => activePlayer;

	const randomizeMove = () =>
		Math.floor(Math.random() * board.availableBoard().length);

	const playerMove = () => Number(prompt('Enter your move!'));

	while (board.availableBoard().length > 0) {
		board.updateBoard(playerMove(), 1);
		console.log(board.getBoard());
		console.log(board.availableBoard());
		board.updateBoard(randomizeMove(), 2);
		console.log(board.getBoard());
		console.log(board.availableBoard());
	}
}

const game = gameController();
