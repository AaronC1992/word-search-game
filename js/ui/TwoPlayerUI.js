/**
 * TwoPlayerUI - Controls two player mode setup screen
 */
class TwoPlayerUI {
    constructor() {
        this.screen = document.getElementById('twoplayer-screen');
        this.selectedDifficulty = 'medium';
        this.wordCount = 10;
        this.initializeButtons();
        this.initializeControls();
    }

    /**
     * Initialize button event listeners
     */
    initializeButtons() {
        document.getElementById('twoplayer-back-btn').addEventListener('click', () => {
            this.hide();
            window.app.showMainMenu();
        });

        document.getElementById('start-twoplayer-btn').addEventListener('click', () => {
            this.startTwoPlayer();
        });

        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn-2p').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectDifficulty(btn.dataset.difficulty);
            });
        });
    }

    /**
     * Initialize word count slider
     */
    initializeControls() {
        const slider = document.getElementById('word-count-slider-2p');
        const display = document.getElementById('word-count-display-2p');

        slider.addEventListener('input', (e) => {
            this.wordCount = parseInt(e.target.value);
            display.textContent = this.wordCount;
            this.updateGridSizeEstimate();
        });

        // Initialize display
        display.textContent = this.wordCount;
        this.updateGridSizeEstimate();
    }

    /**
     * Select difficulty
     * @param {string} difficulty - easy, medium, or hard
     */
    selectDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;

        // Update button states
        document.querySelectorAll('.difficulty-btn-2p').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.difficulty === difficulty) {
                btn.classList.add('selected');
            }
        });

        this.updateDifficultyInfo();
    }

    /**
     * Update difficulty information display
     */
    updateDifficultyInfo() {
        const infoDiv = document.getElementById('difficulty-info-2p');
        const info = {
            easy: 'Horizontal and Vertical only',
            medium: 'Horizontal, Vertical, and Backward',
            hard: 'All directions including Diagonal'
        };

        infoDiv.textContent = info[this.selectedDifficulty] || '';
    }

    /**
     * Update estimated grid size
     */
    updateGridSizeEstimate() {
        const avgWordLength = 6;
        const packingFactor = 1.6;
        const calculatedSize = Math.ceil(Math.sqrt(this.wordCount * avgWordLength * packingFactor));
        const gridSize = Math.max(6, Math.min(30, calculatedSize));

        const estimateDiv = document.getElementById('grid-size-estimate-2p');
        estimateDiv.textContent = `Estimated grid size: ${gridSize}x${gridSize}`;
    }

    /**
     * Start two player game
     */
    startTwoPlayer() {
        window.app.gameManager.startTwoPlayer(this.selectedDifficulty, this.wordCount);
        this.hide();
        window.app.showGameplay();
    }

    /**
     * Show two player menu
     */
    show() {
        this.selectDifficulty('medium');
        this.updateDifficultyInfo();
        this.screen.classList.add('active');
    }

    /**
     * Hide two player menu
     */
    hide() {
        this.screen.classList.remove('active');
    }
}
