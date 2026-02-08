/**
 * MainMenuUI - Controls main menu screen
 */
class MainMenuUI {
    constructor() {
        this.screen = document.getElementById('main-menu-screen');
        this.initializeButtons();
        this.checkForSavedGame();
    }

    /**
     * Initialize button event listeners
     */
    initializeButtons() {
        document.getElementById('campaign-btn').addEventListener('click', () => {
            this.hide();
            window.app.showCampaignMenu();
        });

        document.getElementById('quick-play-btn').addEventListener('click', () => {
            this.hide();
            window.app.showQuickPlayMenu();
        });

        document.getElementById('two-player-btn').addEventListener('click', () => {
            this.hide();
            window.app.showTwoPlayerMenu();
        });

        document.getElementById('resume-btn').addEventListener('click', () => {
            this.resumeGame();
        });

        document.getElementById('settings-btn').addEventListener('click', () => {
            this.hide();
            window.app.showSettings();
        });
    }

    /**
     * Check for saved game and show/hide resume button
     */
    checkForSavedGame() {
        const hasSave = SaveSystem.loadCurrentPuzzle() !== null;
        const resumeBtn = document.getElementById('resume-btn');
        resumeBtn.style.display = hasSave ? 'block' : 'none';
    }

    /**
     * Resume saved game
     */
    resumeGame() {
        const savedState = SaveSystem.loadCurrentPuzzle();
        if (savedState) {
            window.app.gameManager.resumePuzzle(savedState);
            this.hide();
            window.app.showGameplay();
        }
    }

    /**
     * Show main menu
     */
    show() {
        this.checkForSavedGame();
        this.screen.classList.add('active');
    }

    /**
     * Hide main menu
     */
    hide() {
        this.screen.classList.remove('active');
    }
}
