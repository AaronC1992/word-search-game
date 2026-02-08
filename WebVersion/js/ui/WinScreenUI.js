/**
 * WinScreenUI - Controls victory/completion screen
 */
class WinScreenUI {
    constructor() {
        this.screen = document.getElementById('win-screen');
        this.stats = null;
        this.initializeButtons();
    }

    /**
     * Initialize button event listeners
     */
    initializeButtons() {
        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('replay-btn').addEventListener('click', () => {
            this.replay();
        });

        document.getElementById('win-menu-btn').addEventListener('click', () => {
            this.returnToMenu();
        });
    }

    /**
     * Show win screen with statistics
     * @param {Object} stats - Completion statistics
     */
    show(stats) {
        this.stats = stats;
        this.renderStats();
        this.screen.classList.add('active');
    }

    /**
     * Render completion statistics
     */
    renderStats() {
        const gameManager = window.app.gameManager;

        // Format time
        const minutes = Math.floor(this.stats.time / 60);
        const seconds = this.stats.time % 60;
        const timeText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Update title and stats based on game mode
        const title = document.getElementById('win-title');
        const statsDiv = document.querySelector('.win-stats');

        if (gameManager.currentGameMode === 'twoplayer') {
            // Two player mode - show winner
            const player1Score = this.stats.player1Score || 0;
            const player2Score = this.stats.player2Score || 0;

            if (player1Score > player2Score) {
                title.textContent = 'Player 1 Wins! 🎉';
            } else if (player2Score > player1Score) {
                title.textContent = 'Player 2 Wins! 🎉';
            } else {
                title.textContent = 'It\'s a Tie! 🤝';
            }

            statsDiv.innerHTML = `
                <p>Time: <span>${timeText}</span></p>
                <div class="player-score">
                    <p class="player1-text">Player 1 (Blue): <span>${player1Score} words</span></p>
                    <p class="player2-text">Player 2 (Red): <span>${player2Score} words</span></p>
                </div>
            `;

            document.getElementById('star-display').style.display = 'none';
        } else {
            // Single player modes
            document.getElementById('completion-time').textContent = timeText;
            document.getElementById('words-found').textContent = `${this.stats.wordsFound}/${this.stats.totalWords}`;

            // Display bonus words if any were found
            if (this.stats.bonusWordsFound > 0) {
                const statsDiv = document.querySelector('.win-stats');
                const bonusDiv = document.createElement('p');
                bonusDiv.innerHTML = `<span style="color: gold;">★ Bonus Words: ${this.stats.bonusWordsFound} (+${this.stats.bonusPoints} points)</span>`;
                statsDiv.appendChild(bonusDiv);
            }

            // Calculate stars (campaign only)
            if (gameManager.currentGameMode === 'campaign') {
                const stars = this.calculateStars(this.stats.time);
                this.displayStars(stars);
            } else {
                document.getElementById('star-display').style.display = 'none';
            }

            // Update title
            if (gameManager.currentGameMode === 'campaign') {
                title.textContent = `Level ${gameManager.currentLevelNumber} Complete!`;
            } else {
                title.textContent = 'Puzzle Complete!';
            }
        }

        // Show/hide next level button (always show for campaign - unlimited levels)
        const nextBtn = document.getElementById('next-level-btn');
        if (gameManager.currentGameMode === 'campaign') {
            nextBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'none';
        }
    }

    /**
     * Calculate stars based on completion time
     * @param {number} time - Completion time in seconds
     * @returns {number} Stars (1-3)
     */
    calculateStars(time) {
        if (time < 60) return 3;
        if (time < 120) return 2;
        return 1;
    }

    /**
     * Display stars
     * @param {number} count - Number of stars (1-3)
     */
    displayStars(count) {
        const starDisplay = document.getElementById('star-display');
        starDisplay.style.display = 'block';
        starDisplay.textContent = '⭐'.repeat(count);

        // Animate stars
        starDisplay.classList.add('star-animation');
        setTimeout(() => {
            starDisplay.classList.remove('star-animation');
        }, 1000);
    }

    /**
     * Proceed to next level (campaign - unlimited levels)
     */
    nextLevel() {
        const gameManager = window.app.gameManager;
        const nextLevelNumber = gameManager.currentLevelNumber + 1;

        this.hide();
        gameManager.startCampaignLevel(nextLevelNumber);
        window.app.showGameplay();
    }

    /**
     * Replay current level/difficulty
     */
    replay() {
        const gameManager = window.app.gameManager;
        this.hide();

        if (gameManager.currentGameMode === 'campaign') {
            gameManager.startCampaignLevel(gameManager.currentLevelNumber);
        } else {
            gameManager.startQuickPlay(gameManager.currentDifficulty, gameManager.currentPuzzle.targetWords.length);
        }

        window.app.showGameplay();
    }

    /**
     * Return to main menu
     */
    returnToMenu() {
        this.hide();
        window.app.showMainMenu();
    }

    /**
     * Hide win screen
     */
    hide() {
        this.screen.classList.remove('active');
    }
}
