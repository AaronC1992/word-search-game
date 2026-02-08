/**
 * GameManager - Main game state manager
 * Handles puzzle generation, word selection, and game flow
 */
class GameManager {
    constructor() {
        this.currentPuzzle = null;
        this.foundWords = [];
        this.currentGameMode = null; // 'campaign', 'quickplay', or 'twoplayer'
        this.currentLevelNumber = null;
        this.currentDifficulty = null;
        this.startTime = null;
        this.elapsedTime = 0;
        this.isPaused = false;
        this.hintsUsed = 0;

        // Two player mode
        this.twoPlayerMode = false;
        this.player1Words = [];
        this.player2Words = [];
        this.pendingSelection = null;

        this.generator = new WordSearchGenerator();
        this.inputController = null;

        // Callbacks
        this.onWordFound = null;
        this.onPuzzleComplete = null;
        this.onSelectionChanged = null;
    }

    /**
     * Reset all in-memory game state
     */
    resetSession() {
        this.stopTimer();
        this.currentPuzzle = null;
        this.foundWords = [];
        this.player1Words = [];
        this.player2Words = [];
        this.pendingSelection = null;
        this.currentGameMode = null;
        this.currentLevelNumber = null;
        this.currentDifficulty = null;
        this.startTime = null;
        this.elapsedTime = 0;
        this.isPaused = false;
        this.hintsUsed = 0;
        this.twoPlayerMode = false;
        this.inputController = null;
        this.onWordFound = null;
        this.onPuzzleComplete = null;
        this.onSelectionChanged = null;
        this.onPlayerSelectNeeded = null;
    }

    /**
     * Start a new campaign level
     * @param {number} levelNumber - Level number (1-10)
     */
    startCampaignLevel(levelNumber) {
        const campaignManager = new CampaignManager();
        const levelDef = campaignManager.startLevel(levelNumber);

        if (!levelDef) {
            console.error('Failed to start level - may be locked');
            return;
        }

        this.currentGameMode = 'campaign';
        this.currentLevelNumber = levelNumber;
        this.currentPuzzle = this.generator.generatePuzzle(levelDef);
        this.resetGameState();
    }

    /**
     * Start a new quick play game
     * @param {string} difficulty - easy, medium, or hard
     * @param {number} wordCount - Number of words
     */
    startQuickPlay(difficulty, wordCount) {
        this.currentGameMode = 'quickplay';
        this.currentDifficulty = difficulty;
        this.twoPlayerMode = false;
        this.currentPuzzle = this.generator.generateQuickPlayPuzzle(difficulty, wordCount);
        this.resetGameState();
    }

    /**
     * Start a new two player game
     * @param {string} difficulty - easy, medium, or hard
     * @param {number} wordCount - Number of words
     */
    startTwoPlayer(difficulty, wordCount) {
        this.currentGameMode = 'twoplayer';
        this.currentDifficulty = difficulty;
        this.twoPlayerMode = true;
        this.currentPuzzle = this.generator.generateQuickPlayPuzzle(difficulty, wordCount);
        this.resetGameState();
    }

    /**
     * Resume a saved puzzle
     * @param {Object} savedState - Saved puzzle state
     */
    resumePuzzle(savedState) {
        this.currentGameMode = savedState.gameMode;
        this.currentLevelNumber = savedState.levelNumber;
        this.currentDifficulty = savedState.difficulty;
        this.currentPuzzle = PuzzleData.fromJSON(savedState.puzzleData);
        this.foundWords = savedState.foundWords || [];
        this.elapsedTime = savedState.elapsedTime || 0;
        this.hintsUsed = savedState.hintsUsed || 0;
        this.startTimer();
    }

    /**
     * Reset game state for new game
     */
    resetGameState() {
        this.foundWords = [];
        this.player1Words = [];
        this.player2Words = [];
        this.pendingSelection = null;
        this.elapsedTime = 0;
        this.hintsUsed = 0;
        this.isPaused = false;
        this.startTimer();
    }

    /**
     * Start game timer
     */
    startTimer() {
        this.startTime = Date.now() - (this.elapsedTime * 1000);
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            }
        }, 100);
    }

    /**
     * Stop game timer
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Pause/Resume game
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.startTime = Date.now() - (this.elapsedTime * 1000);
        }
    }

    /**
     * Process word selection
     * @param {Array} selectedCells - Array of {x, y} coordinates
     */
    processSelection(selectedCells) {
        if (selectedCells.length < 2) return;

        // Check each word placement
        for (const placement of this.currentPuzzle.wordPlacements) {
            if (this.foundWords.includes(placement.word)) continue;

            if (placement.matchesSelection(selectedCells)) {
                if (this.twoPlayerMode) {
                    // Store selection and wait for player identification
                    this.pendingSelection = {
                        word: placement.word,
                        cells: selectedCells
                    };
                    if (this.onPlayerSelectNeeded) {
                        this.onPlayerSelectNeeded(placement.word);
                    }
                } else {
                    this.markWordAsFound(placement.word);
                }
                return;
            }
        }
    }

    /**
     * Mark word as found by a specific player (two player mode)
     * @param {number} playerNumber - 1 or 2
     */
    confirmPlayerSelection(playerNumber) {
        if (!this.pendingSelection) return;

        const word = this.pendingSelection.word;
        
        if (playerNumber === 1) {
            this.player1Words.push(word);
        } else if (playerNumber === 2) {
            this.player2Words.push(word);
        }

        this.markWordAsFound(word, playerNumber);
        this.pendingSelection = null;
    }

    /**
     * Mark word as found
     * @param {string} word - Found word
     * @param {number} playerNumber - Player number (for two player mode)
     */
    markWordAsFound(word, playerNumber = null) {
        if (!this.foundWords.includes(word)) {
            this.foundWords.push(word);

            if (this.onWordFound) {
                this.onWordFound(word, playerNumber);
            }

            // Check if puzzle complete
            if (this.foundWords.length === this.currentPuzzle.targetWords.length) {
                this.completePuzzle();
            }
        }
    }

    /**
     * Complete the current puzzle
     */
    completePuzzle() {
        this.stopTimer();

        // Save progress (not for two player mode)
        if (this.currentGameMode === 'campaign') {
            const campaignManager = new CampaignManager();
            campaignManager.completeLevel(this.currentLevelNumber, this.elapsedTime);
        } else if (this.currentGameMode === 'quickplay') {
            SaveSystem.updateQuickPlayStats(this.currentDifficulty, this.elapsedTime);
        }

        // Clear saved puzzle
        SaveSystem.clearCurrentPuzzle();

        if (this.onPuzzleComplete) {
            const stats = {
                time: this.elapsedTime,
                hintsUsed: this.hintsUsed,
                wordsFound: this.foundWords.length,
                totalWords: this.currentPuzzle.targetWords.length
            };

            // Add two player stats if applicable
            if (this.twoPlayerMode) {
                stats.player1Score = this.player1Words.length;
                stats.player2Score = this.player2Words.length;
                stats.player1Words = this.player1Words;
                stats.player2Words = this.player2Words;
            }

            this.onPuzzleComplete(stats);
        }
    }

    /**
     * Use a hint
     * @returns {string} Hint word or null
     */
    useHint() {
        const remainingWords = this.currentPuzzle.targetWords.filter(
            word => !this.foundWords.includes(word)
        );

        if (remainingWords.length > 0) {
            this.hintsUsed++;
            return remainingWords[0];
        }

        return null;
    }

    /**
     * Reset current puzzle
     */
    resetPuzzle() {
        this.foundWords = [];
        this.player1Words = [];
        this.player2Words = [];
        this.pendingSelection = null;
        this.elapsedTime = 0;
        this.hintsUsed = 0;
        this.startTimer();
    }

    /**
     * Save current game state
     */
    saveCurrentState() {
        const state = {
            gameMode: this.currentGameMode,
            levelNumber: this.currentLevelNumber,
            difficulty: this.currentDifficulty,
            puzzleData: this.currentPuzzle.toJSON(),
            foundWords: this.foundWords,
            elapsedTime: this.elapsedTime,
            hintsUsed: this.hintsUsed
        };

        SaveSystem.saveCurrentPuzzle(state);
    }

    /**
     * Format time as MM:SS
     * @returns {string} Formatted time
     */
    getFormattedTime() {
        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = this.elapsedTime % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * Get progress percentage
     * @returns {number} Progress (0-100)
     */
    getProgress() {
        if (!this.currentPuzzle) return 0;
        return Math.floor((this.foundWords.length / this.currentPuzzle.targetWords.length) * 100);
    }

    /**
     * Check if word is found
     * @param {string} word - Word to check
     * @returns {boolean} True if found
     */
    isWordFound(word) {
        return this.foundWords.includes(word);
    }
}
