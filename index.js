const gameboard = () => {
	const row = 3;
	const column = 3;
	let board = [];

	const winningPattern = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const generateBoard = () => {
		for (let i = 0; i < row * column; i++) {
			board[i] = undefined;
		}
	};

	const updateBoard = (target, playerMarker) => {
		board[target] = playerMarker;
	};

	const resetBoard = () => {
		board = [];
	};

	const getBoard = () => board;

	const availableBoard = () => {
		return board
			.map((box, idx) => (box === undefined ? idx : -1))
			.filter((idx) => idx !== -1);
	};

	generateBoard();

	return {
		generateBoard,
		updateBoard,
		resetBoard,
		availableBoard,
		getBoard,
		winningPattern,
	};
};

function gameController(playerOne = 'Player One', playerTwo = 'Player Two') {
	const board = gameboard();
	const ui = gameUI();

	const players = [
		{
			name: playerOne,
			marker: 'O',
			moves: [],
		},
		{
			name: playerTwo,
			marker: 'X',
			isComputer: false,
			moves: [],
		},
	];

	let activePlayer = players[0];

	const switchPlayer = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const resetActivePlayer = () => (activePlayer = players[0]);

	const updatePlayerBehavior = (playerOneBehavior, playerTwoBehavior) => {
		players[0].isComputer = playerOneBehavior === 'computer' ? true : false;
		players[1].isComputer = playerTwoBehavior === 'computer' ? true : false;
	};

	const randomizeMove = () =>
		board.availableBoard()[
			Math.floor(Math.random() * board.availableBoard().length)
		];

	const resetRound = () => {
		resetActivePlayer();
		board.resetBoard();
	};

	const resetGame = () => {
		resetRound();
		ui.resetPlayersBehavior();
		ui.tooggleScreens();
	};

	const playRound = (index) => {
		const marker = getActivePlayer().marker;

		// record moves
		players[
			players.findIndex((index) => index === getActivePlayer())
		].moves.push(index);

		board.updateBoard(index, marker);

		ui.updateRoundInfo(
			getActivePlayer().name === 'Player One'
				? `Player Two's Turn`
				: `Player One's Turn`,
		);

		ui.renderBoard(board.getBoard());

		switchPlayer();

		checkComputerTurn();
	};

	const checkComputerTurn = () => {
		if (getActivePlayer().isComputer === true) {
			setTimeout(() => {
				playRound(randomizeMove());
			}, 500);
		}
	};

	// const recordPlayerMove = (player, move) => {
	// 	console.log(getActivePlayer());
	// };

	// recordPlayerMove();

	ui.startGame(() => {
		const { p1: playerOneBehavior, p2: playerTwoBehavior } =
			ui.getPlayersBehavior();

		if (
			!(playerOneBehavior === 'computer' && playerTwoBehavior === 'computer')
		) {
			updatePlayerBehavior(playerOneBehavior, playerTwoBehavior);

			ui.tooggleScreens();

			board.generateBoard();

			ui.renderBoard(board.getBoard());

			ui.updatePlayersBehavior(players[0].isComputer, players[1].isComputer);

			ui.updateRoundInfo(`Player One's Turn`);

			checkComputerTurn();
		}
	});

	ui.boardClick((event) => {
		const index = Number(event.getAttribute('index'));

		// prevent current player update board that already filled
		if (board.getBoard()[index] === undefined) {
			playRound(index);
		}
	});

	ui.resetGameSetup(() => {
		ui.resetPlayersBehavior();
	});

	ui.backToGameSetup(() => {
		resetGame();
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

	const updateRoundInfo = (text) => {
		document.querySelector('#roundInfo').textContent = text;
	};

	const renderBoard = (array) => {
		const board = document.querySelector('#board');

		board.innerHTML = '';

		array.forEach((marker, idx) => {
			const cell = document.createElement('div');
			cell.classList.add('cell');
			cell.setAttribute('index', idx);
			cell.textContent = marker === undefined ? '' : marker;

			board.appendChild(cell);
			// target(cell);
		});
	};

	const boardClick = (func) => {
		document.querySelector('#board').addEventListener('click', (event) => {
			func(event.target);
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

	const updatePlayersBehavior = (playerOne, playerTwo) => {
		document.querySelector('#playerOneBehavior').textContent =
			playerOne === false ? 'H' : 'C';
		document.querySelector('#playerTwoBehavior').textContent =
			playerTwo === false ? 'H' : 'C';
	};

	return {
		updatePlayersBehavior,
		startGame,
		resetGameSetup,
		backToGameSetup,
		updateRoundInfo,
		renderBoard,
		boardClick,
		tooggleScreens,
		getPlayersBehavior,
		resetPlayersBehavior,
	};
}

const game = gameController();
