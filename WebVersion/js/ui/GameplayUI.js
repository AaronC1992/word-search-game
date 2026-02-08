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
        gameManager.onWordFound = (word, playerNumber, isBonus, cells) => this.onWordFound(word, playerNumber, isBonus, cells);
        gameManager.onBonusAlreadyFound = (word) => this.showMessage('Already found!', 'warning');
        gameManager.onPuzzleComplete = (stats) => this.onPuzzleComplete(stats);
        gameManager.onPlayerSelectNeeded = () => this.showPlayerModal();

        // Update UI
        this.updateTimer();
        this.updateProgress();

        // Start timer update loop
        this.startTimerUpdate();

        // Rescale font on window resize
        this._resizeHandler = () => this.scaleFontToGrid();
        window.addEventListener('resize', this._resizeHandler);
    }

    /**
     * Render grid cells
     * @param {PuzzleData} puzzle - Current puzzle
     */
    renderGrid(puzzle) {
        this.gridContainer.innerHTML = '';
        this.gridContainer.style.gridTemplateColumns = `repeat(${puzzle.gridSize}, minmax(0, 1fr))`;
        this.gridContainer.style.gridTemplateRows = `repeat(${puzzle.gridSize}, minmax(0, 1fr))`;

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

        // Dynamically set font size after grid renders so letters fill cells
        requestAnimationFrame(() => this.scaleFontToGrid());
    }

    /**
     * Scale font size so letters fill grid cells proportionally
     */
    scaleFontToGrid() {
        const firstCell = this.gridContainer.querySelector('.grid-cell');
        if (!firstCell) return;
        const cellSize = firstCell.getBoundingClientRect().width;
        // Use ~55% of cell width for the font size — readable with breathing room
        const fontSize = Math.max(8, cellSize * 0.55);
        this.gridContainer.style.fontSize = `${fontSize}px`;
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
    onWordFound(word, playerNumber, isBonus = false, cells = null) {
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
                
                // Create sparkle effects and popup
                this.createBonusEffects(placement.coordinates);
                this.showBonusPopup();
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

    /**
     * Create sparkle effects for bonus word
     * @param {Array} coordinates - Word coordinates
     */
    createBonusEffects(coordinates) {
        coordinates.forEach((coord, index) => {
            setTimeout(() => {
                const cellElement = this.getCellElement(coord.x, coord.y);
                if (!cellElement) return;

                const rect = cellElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Create multiple sparkles per cell
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        this.createSparkle(centerX, centerY);
                    }, i * 50);
                }
            }, index * 100);
        });
    }

    /**
     * Create a single sparkle particle
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.setProperty('--end-x', endX + 'px');
        sparkle.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => sparkle.remove(), 1000);
    }

    /**
     * Show bonus word popup
     */
    showBonusPopup() {
        const popup = document.createElement('div');
        popup.className = 'bonus-popup';
        popup.textContent = 'BONUS WORD!';
        
        document.body.appendChild(popup);
        
        // Trigger animation
        setTimeout(() => popup.classList.add('show'), 10);
        
        // Remove after animation
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }, 1500);
    }

    /**
     * Show message at bottom of screen
     * @param {string} text - Message text
     * @param {string} type - Message type (info, warning, success)
     */
    showMessage(text, type = 'info') {
        const messageEl = document.getElementById('game-message');
        if (!messageEl) return;
        
        messageEl.textContent = text;
        messageEl.className = 'game-message ' + type;
        messageEl.classList.add('show');
        
        // Auto hide after 2 seconds
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 2000);
    }
}
