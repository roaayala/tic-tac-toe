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
	playerOne = 'Player One' ? 'Player One' : 'Computer';
	playerTwo = 'Player Two' ? 'Player Two' : 'Computer';
	const board = gameboard();
	const gameUi = gameUI();

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
		board.availableBoard()[
			Math.floor(Math.random() * board.availableBoard().length)
		];

	const playerMove = () => Number(prompt('Enter your move!'));

	// while (board.availableBoard().length > 0) {
	// 	const theMove = playerMove();
	// 	if (board.getBoard()[theMove] === undefined) {
	// 		board.updateBoard(theMove, 1);
	// 		board.updateBoard(randomizeMove(), 2);
	// 	}
	// 	console.log(board.getBoard());
	// }
}

function gameUI() {
	const gameSetup = document.querySelector('.game-setup');
	const game = document.querySelector('.game');

	const startGameButton = document.querySelector('#startGame');
	const resetGameSetupButton = document.querySelector('#resetGameSetup');
	const backToGameSetupButton = document.querySelector('#backToGameSetup');

	startGameButton.addEventListener('click', () => {
		const playerOne = document.querySelector('#playerOne').value;
		const playerTwo = document.querySelector('#playerTwo').value;
		if (!(playerOne === 'computer' && playerTwo === 'computer')) {
			gameSetup.classList.toggle('none');
			game.classList.toggle('none');
		}
	});

	backToGameSetupButton.addEventListener('click', () => {
		gameSetup.classList.toggle('none');
		game.classList.toggle('none');
	});
}

const game = gameController();
