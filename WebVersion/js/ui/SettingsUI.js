/**
 * SettingsUI - Controls settings screen
 */
class SettingsUI {
    constructor() {
        this.screen = document.getElementById('settings-screen');
        this.soundToggle = document.getElementById('sound-toggle');
        this.timerToggle = document.getElementById('timer-toggle');
        this.resetButton = document.getElementById('reset-progress-btn');
        this.initializeButtons();
        this.initializeToggles();
    }

    /**
     * Initialize button event listeners
     */
    initializeButtons() {
        document.getElementById('settings-back-btn').addEventListener('click', () => {
            this.hide();
            window.app.showMainMenu();
        });

        this.resetButton.addEventListener('click', () => {
            const confirmReset = confirm(
                'Reset all levels and erase ALL saved data? This cannot be undone.'
            );

            if (confirmReset) {
                window.app.resetAllData();
                alert('All saved data has been erased.');
            }
        });
    }

    /**
     * Initialize toggle change handlers
     */
    initializeToggles() {
        this.soundToggle.addEventListener('change', () => this.saveSettings());
        this.timerToggle.addEventListener('change', () => this.saveSettings());
    }

    /**
     * Load settings into the UI
     */
    loadSettings() {
        const settings = SaveSystem.loadSettings();
        this.soundToggle.checked = !!settings.soundEnabled;
        this.timerToggle.checked = !!settings.timerEnabled;
    }

    /**
     * Save settings from the UI
     */
    saveSettings() {
        const existing = SaveSystem.loadSettings();
        SaveSystem.saveSettings({
            ...existing,
            soundEnabled: this.soundToggle.checked,
            timerEnabled: this.timerToggle.checked
        });
    }

    /**
     * Show settings screen
     */
    show() {
        this.loadSettings();
        this.screen.classList.add('active');
    }

    /**
     * Hide settings screen
     */
    hide() {
        this.screen.classList.remove('active');
    }
}
