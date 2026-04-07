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

function gameController(playerOne = 'Player One', playerTwo = 'Player Two') {
	const board = gameboard();
	const ui = gameUI();

	const players = [
		{
			name: playerOne,
			marker: 'O',
			isComputer: false,
		},
		{
			name: playerTwo,
			marker: 'X',
			isComputer: false,
		},
	];

	let activePlayer = players[0];

	const switchPlayer = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const randomizeMove = () =>
		board.availableBoard()[
			Math.floor(Math.random() * board.availableBoard().length)
		];

	const playerMove = () => Number(prompt('Enter your move!'));

	ui.startGame(() => {
		const { p1: playerOneBehavior, p2: playerTwoBehavior } =
			ui.getPlayersBehavior();

		if (
			!(playerOneBehavior === 'computer' && playerTwoBehavior === 'computer')
		) {
			ui.renderBoard(board.getBoard(), ui.targetCell);
			ui.tooggleScreens();
		}
	});

	ui.resetGameSetup(() => {
		ui.resetPlayersBehavior();
	});

	ui.backToGameSetup(() => {
		ui.resetPlayersBehavior();
		ui.tooggleScreens();
	});

	ui.resetPlayersBehavior();
}

function gameUI() {
	const gameSetup = document.querySelector('.game-setup');
	const game = document.querySelector('.game');

	const startGame = (func) => {
		document.querySelector('#startGame').addEventListener('click', () => {
			func();
		});
	};

	const resetGameSetup = (func) => {
		document.querySelector('#resetGameSetup').addEventListener('click', () => {
			func();
		});
	};

	const backToGameSetup = (func) => {
		document.querySelector('#backToGameSetup').addEventListener('click', () => {
			func();
		});
	};

	const targetCell = (cell) => {
		cell.addEventListener('click', (event) => {
			console.log(event.target);
		});
	};

	const renderBoard = (array, target) => {
		const board = document.querySelector('#board');

		board.innerHTML = '';

		array.forEach((marker, idx) => {
			const cell = document.createElement('div');
			cell.classList.add('cell');
			cell.setAttribute('index', idx);
			cell.textContent = marker === undefined ? '' : marker;

			board.appendChild(cell);
			target(cell);
		});
	};

	const tooggleScreens = () => {
		gameSetup.classList.toggle('none');
		game.classList.toggle('none');
	};

	const resetPlayersBehavior = () => {
		document.querySelector('#playerOne').value = 'player';
		document.querySelector('#playerTwo').value = 'player';
	};

	const getPlayersBehavior = () => {
		return {
			p1: document.querySelector('#playerOne').value,
			p2: document.querySelector('#playerTwo').value,
		};
	};

	return {
		startGame,
		resetGameSetup,
		backToGameSetup,
		targetCell,
		renderBoard,
		tooggleScreens,
		getPlayersBehavior,
		resetPlayersBehavior,
	};
}

const game = gameController();
