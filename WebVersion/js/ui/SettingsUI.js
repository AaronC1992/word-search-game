/**
 * SettingsUI - Controls settings screen
 */
class SettingsUI {
    constructor() {
        this.screen = document.getElementById('settings-screen');
        this.soundToggle = document.getElementById('sound-toggle');
        this.timerToggle = document.getElementById('timer-toggle');
        this.fullscreenToggle = document.getElementById('fullscreen-toggle');
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
        this.fullscreenToggle.addEventListener('change', () => {
            this.saveSettings();
            // Apply fullscreen immediately if checked
            if (this.fullscreenToggle.checked) {
                this.requestFullscreen();
            } else {
                this.exitFullscreen();
            }
        });
    }

    /**
     * Load settings into the UI
     */
    loadSettings() {
        const settings = SaveSystem.loadSettings();
        this.soundToggle.checked = !!settings.soundEnabled;
        this.timerToggle.checked = !!settings.timerEnabled;
        this.fullscreenToggle.checked = settings.fullscreenEnabled !== false; // Default true
    }

    /**
     * Save settings from the UI
     */
    saveSettings() {
        const existing = SaveSystem.loadSettings();
        SaveSystem.saveSettings({
            ...existing,
            soundEnabled: this.soundToggle.checked,
            timerEnabled: this.timerToggle.checked,
            fullscreenEnabled: this.fullscreenToggle.checked
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

    /**
     * Request fullscreen mode
     */
    requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => {
                console.log('Fullscreen request failed:', err);
            });
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    /**
     * Exit fullscreen mode
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.log('Exit fullscreen failed:', err);
            });
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

