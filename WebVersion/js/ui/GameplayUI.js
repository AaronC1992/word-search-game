/**
 * GameplayUI - Controls main gameplay screen
 */
class GameplayUI {
    constructor() {
        this.screen = document.getElementById('gameplay-screen');
        this.gridContainer = document.getElementById('grid-container');
        this.wordListContainer = document.getElementById('word-list');
        this.playerModal = document.getElementById('player-select-modal');
        this.currentSelectionCells = [];
        this.initializeButtons();
        this.initializePlayerModal();
    }

    /**
     * Initialize button event listeners
     */
    initializeButtons() {
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.pauseGame();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetPuzzle();
        });

        document.getElementById('menu-btn').addEventListener('click', () => {
            this.returnToMenu();
        });
    }

    /**
     * Initialize player selection modal
     */
    initializePlayerModal() {
        document.getElementById('player1-select-btn').addEventListener('click', () => {
            this.selectPlayer(1);
        });

        document.getElementById('player2-select-btn').addEventListener('click', () => {
            this.selectPlayer(2);
        });
    }

    /**
     * Show player selection modal
     */
    showPlayerModal() {
        this.playerModal.style.display = 'flex';
    }

    /**
     * Hide player selection modal
     */
    hidePlayerModal() {
        this.playerModal.style.display = 'none';
    }

    /**
     * Handle player selection
     * @param {number} playerNumber - 1 or 2
     */
    selectPlayer(playerNumber) {
        const gameManager = window.app.gameManager;
        gameManager.confirmPlayerSelection(playerNumber);
        this.hidePlayerModal();
    }

    /**
     * Start new game display
     */
    startGame() {
        const gameManager = window.app.gameManager;

        // Render grid
        this.renderGrid(gameManager.currentPuzzle);

        // Render word list
        this.renderWordList(gameManager.currentPuzzle.targetWords);

        // Setup input
        this.setupInput();

        // Setup callbacks
        gameManager.onWordFound = (word, playerNumber) => this.onWordFound(word, playerNumber);
        gameManager.onPuzzleComplete = (stats) => this.onPuzzleComplete(stats);
        gameManager.onPlayerSelectNeeded = () => this.showPlayerModal();

        // Update UI
        this.updateTimer();
        this.updateProgress();

        // Start timer update loop
        this.startTimerUpdate();
    }

    /**
     * Render grid cells
     * @param {PuzzleData} puzzle - Current puzzle
     */
    renderGrid(puzzle) {
        this.gridContainer.innerHTML = '';
        this.gridContainer.style.gridTemplateColumns = `repeat(${puzzle.gridSize}, 1fr)`;

        for (let row = 0; row < puzzle.gridSize; row++) {
            for (let col = 0; col < puzzle.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.textContent = puzzle.getChar(row, col);
                this.gridContainer.appendChild(cell);
            }
        }
    }

    /**
     * Render word list
     * @param {Array} words - Target words
     */
    renderWordList(words) {
        this.wordListContainer.innerHTML = '';

        words.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'word-item';
            wordDiv.dataset.word = word;
            wordDiv.textContent = word;
            this.wordListContainer.appendChild(wordDiv);
        });
    }

    /**
     * Setup input controller
     */
    setupInput() {
        const gameManager = window.app.gameManager;
        gameManager.inputController = new InputController(this.gridContainer);

        gameManager.inputController.onSelectionChanged = (cells) => {
            this.onSelectionChanged(cells);
        };

        gameManager.inputController.onSelectionComplete = (cells) => {
            this.onSelectionComplete(cells);
        };
    }

    /**
     * Handle selection changed
     * @param {Array} cells - Selected cells
     */
    onSelectionChanged(cells) {
        // Clear previous selection
        this.clearSelection();

        // Highlight selected cells
        cells.forEach(cell => {
            const cellElement = this.getCellElement(cell.x, cell.y);
            if (cellElement) {
                cellElement.classList.add('selecting');
            }
        });

        this.currentSelectionCells = cells;
    }

    /**
     * Handle selection complete
     * @param {Array} cells - Selected cells
     */
    onSelectionComplete(cells) {
        const gameManager = window.app.gameManager;
        gameManager.processSelection(cells);
        this.clearSelection();
    }

    /**
     * Clear selection highlighting
     */
    clearSelection() {
        document.querySelectorAll('.grid-cell.selecting').forEach(cell => {
            cell.classList.remove('selecting');
        });
        this.currentSelectionCells = [];
    }

    /**
     * Handle word found
     * @param {string} word - Found word
     * @param {number} playerNumber - Player number (for two player mode)
     * @param {boolean} isBonus - Whether this is a bonus word
     */
    onWordFound(word, playerNumber, isBonus = false) {
        if (isBonus) {
            // Highlight bonus word cells in gold
            const gameManager = window.app.gameManager;
            const placement = gameManager.currentPuzzle.bonusWordPlacements.find(p => p.word === word);
            
            if (placement) {
                placement.coordinates.forEach(coord => {
                    const cellElement = this.getCellElement(coord.x, coord.y);
                    if (cellElement) {
                        cellElement.classList.remove('selecting');
                        cellElement.classList.add('bonus-found');
                    }
                });
            }
        } else {
            // Mark regular word in list
            const wordElement = this.wordListContainer.querySelector(`[data-word="${word}"]`);
            if (wordElement) {
                wordElement.classList.add('found');
                if (playerNumber === 1) {
                    wordElement.classList.add('player1-found');
                } else if (playerNumber === 2) {
                    wordElement.classList.add('player2-found');
                }
            }

            // Highlight cells permanently
            const gameManager = window.app.gameManager;
            const placement = gameManager.currentPuzzle.wordPlacements.find(p => p.word === word);
            
            if (placement) {
                placement.coordinates.forEach(coord => {
                    const cellElement = this.getCellElement(coord.x, coord.y);
                    if (cellElement) {
                        cellElement.classList.remove('selecting');
                        cellElement.classList.add('found');
                        if (playerNumber === 1) {
                            cellElement.classList.add('player1-found');
                        } else if (playerNumber === 2) {
                            cellElement.classList.add('player2-found');
                        }
                    }
                });
            }

            this.updateProgress();
        }

        // Play sound effect (if implemented)
        console.log(`Word found: ${word}${playerNumber ? ' by Player ' + playerNumber : ''}${isBonus ? ' (BONUS!)' : ''}`);
    }

    /**
     * Handle puzzle complete
     * @param {Object} stats - Completion statistics
     */
    onPuzzleComplete(stats) {
        this.stopTimerUpdate();
        this.hide();
        window.app.showWinScreen(stats);
    }

    /**
     * Get cell element
     * @param {number} row - Row index
     * @param {number} col - Column index
     * @returns {HTMLElement} Cell element
     */
    getCellElement(row, col) {
        return this.gridContainer.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    /**
     * Update timer display
     */
    updateTimer() {
        const gameManager = window.app.gameManager;
        document.getElementById('timer-display').textContent = gameManager.getFormattedTime();
    }

    /**
     * Update progress display
     */
    updateProgress() {
        const gameManager = window.app.gameManager;
        const progress = gameManager.getProgress();
        const foundCount = gameManager.foundWords.length;
        const totalCount = gameManager.currentPuzzle.targetWords.length;

        document.getElementById('progress-display').textContent = `${foundCount}/${totalCount}`;
        document.getElementById('progress-bar').style.width = `${progress}%`;
    }

    /**
     * Start timer update loop
     */
    startTimerUpdate() {
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 100);
    }

    /**
     * Stop timer update loop
     */
    stopTimerUpdate() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Pause game
     */
    pauseGame() {
        const gameManager = window.app.gameManager;
        gameManager.togglePause();

        const pauseBtn = document.getElementById('pause-btn');
        pauseBtn.textContent = gameManager.isPaused ? '▶️ Resume' : '⏸️ Pause';
    }



    /**
     * Reset puzzle
     */
    resetPuzzle() {
        if (confirm('Reset this puzzle? All progress will be lost.')) {
            const gameManager = window.app.gameManager;
            gameManager.resetPuzzle();

            // Clear all found markings
            document.querySelectorAll('.grid-cell.found, .word-item.found, .grid-cell.player1-found, .grid-cell.player2-found, .word-item.player1-found, .word-item.player2-found').forEach(el => {
                el.classList.remove('found', 'player1-found', 'player2-found');
            });

            this.updateProgress();
            this.updateTimer();
        }
    }

    /**
     * Return to menu
     */
    returnToMenu() {
        if (confirm('Return to menu? Progress will be saved.')) {
            const gameManager = window.app.gameManager;
            gameManager.saveCurrentState();
            this.stopTimerUpdate();
            gameManager.stopTimer();
            this.hide();
            window.app.showMainMenu();
        }
    }

    /**
     * Show gameplay screen
     */
    show() {
        this.startGame();
        this.screen.classList.add('active');
    }

    /**
     * Hide gameplay screen
     */
    hide() {
        this.stopTimerUpdate();
        this.screen.classList.remove('active');
    }
}
