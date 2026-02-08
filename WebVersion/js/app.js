/**
 * Main Application - Initializes game and manages screens
 */
class WordSearchApp {
    constructor() {
        this.gameManager = new GameManager();
        this.mainMenuUI = null;
        this.campaignUI = null;
        this.quickPlayUI = null;
        this.twoPlayerUI = null;
        this.gameplayUI = null;
        this.winScreenUI = null;
        this.settingsUI = null;

        this.initialize();
    }

    /**
     * Initialize application
     */
    initialize() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Setup UI controllers
     */
    setup() {
        console.log('Word Search Game - Initializing...');

        // Initialize UI controllers
        this.mainMenuUI = new MainMenuUI();
        this.campaignUI = new CampaignUI();
        this.quickPlayUI = new QuickPlayUI();
        this.twoPlayerUI = new TwoPlayerUI();
        this.gameplayUI = new GameplayUI();
        this.winScreenUI = new WinScreenUI();
        this.settingsUI = new SettingsUI();

        // Show main menu
        this.showMainMenu();

        console.log('Word Search Game - Ready!');
    }

    /**
     * Show main menu screen
     */
    showMainMenu() {
        this.hideAllScreens();
        this.mainMenuUI.show();
    }

    /**
     * Show campaign menu screen
     */
    showCampaignMenu() {
        this.hideAllScreens();
        this.campaignUI.show();
    }

    /**
     * Show quick play menu screen
     */
    showQuickPlayMenu() {
        this.hideAllScreens();
        this.quickPlayUI.show();
    }

    /**
     * Show two player menu screen
     */
    showTwoPlayerMenu() {
        this.hideAllScreens();
        this.twoPlayerUI.show();
    }

    /**
     * Show gameplay screen
     */
    showGameplay() {
        this.hideAllScreens();
        this.gameplayUI.show();
    }

    /**
     * Show win screen
     * @param {Object} stats - Completion statistics
     */
    showWinScreen(stats) {
        this.hideAllScreens();
        this.winScreenUI.show(stats);
    }

    /**
     * Show settings screen (placeholder)
     */
    showSettings() {
        this.hideAllScreens();
        this.settingsUI.show();
    }

    /**
     * Reset all saved data and in-memory game state
     */
    resetAllData() {
        SaveSystem.deleteSave();
        this.gameManager.resetSession();
        this.showMainMenu();
    }

    /**
     * Hide all screens
     */
    hideAllScreens() {
        if (this.mainMenuUI) this.mainMenuUI.hide();
        if (this.campaignUI) this.campaignUI.hide();
        if (this.quickPlayUI) this.quickPlayUI.hide();
        if (this.twoPlayerUI) this.twoPlayerUI.hide();
        if (this.gameplayUI) this.gameplayUI.hide();
        if (this.winScreenUI) this.winScreenUI.hide();
        if (this.settingsUI) this.settingsUI.hide();
    }
}

// Create global app instance
window.app = new WordSearchApp();
