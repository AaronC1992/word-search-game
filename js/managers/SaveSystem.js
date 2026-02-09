/**
 * SaveSystem - Manages game save/load using localStorage
 * Stores campaign progress and settings
 */
class SaveSystem {
    static SAVE_KEY = 'wordSearchGameSave';
    static SETTINGS_KEY = 'wordSearchSettings';

    /**
     * Save game data
     * @param {Object} saveData - Complete save data
     */
    static saveGame(saveData) {
        try {
            const json = JSON.stringify(saveData);
            localStorage.setItem(this.SAVE_KEY, json);
            console.log('Game saved successfully');
        } catch (error) {
            console.error('Failed to save game:', error);
        }
    }

    /**
     * Load game data
     * @returns {Object} Saved data or default structure
     */
    static loadGame() {
        try {
            const json = localStorage.getItem(this.SAVE_KEY);
            if (json) {
                return JSON.parse(json);
            }
        } catch (error) {
            console.error('Failed to load game:', error);
        }

        // Return default save data
        return {
            currentCampaignLevel: 1,
            campaignProgress: [], // Unlimited levels - track completed levels only
            tutorialCompleted: false,
            totalPlayTime: 0,
            quickPlayStats: {
                totalGames: 0,
                totalWins: 0,
                bestTimeEasy: 0,
                bestTimeMedium: 0,
                bestTimeHard: 0
            }
        };
    }

    /**
     * Save current puzzle state
     * @param {Object} puzzleState - Current puzzle and progress
     */
    static saveCurrentPuzzle(puzzleState) {
        try {
            const json = JSON.stringify(puzzleState);
            localStorage.setItem('currentPuzzle', json);
        } catch (error) {
            console.error('Failed to save current puzzle:', error);
        }
    }

    /**
     * Load current puzzle state
     * @returns {Object} Saved puzzle state or null
     */
    static loadCurrentPuzzle() {
        try {
            const json = localStorage.getItem('currentPuzzle');
            if (json) {
                return JSON.parse(json);
            }
        } catch (error) {
            console.error('Failed to load current puzzle:', error);
        }
        return null;
    }

    /**
     * Clear current puzzle (when completed or abandoned)
     */
    static clearCurrentPuzzle() {
        localStorage.removeItem('currentPuzzle');
    }

    /**
     * Save settings
     * @param {Object} settings - Game settings
     */
    static saveSettings(settings) {
        try {
            const json = JSON.stringify(settings);
            localStorage.setItem(this.SETTINGS_KEY, json);
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    /**
     * Load settings
     * @returns {Object} Saved settings or defaults
     */
    static loadSettings() {
        try {
            const json = localStorage.getItem(this.SETTINGS_KEY);
            if (json) {
                return JSON.parse(json);
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }

        // Return default settings
        return {
            soundEnabled: true,
            musicEnabled: true,
            timerEnabled: true,
            fullscreenEnabled: false
        };
    }

    /**
     * Check if save data exists
     * @returns {boolean} True if save exists
     */
    static hasSaveData() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    }

    /**
     * Delete all save data
     */
    static deleteSave() {
        localStorage.removeItem(this.SAVE_KEY);
        localStorage.removeItem('currentPuzzle');
        localStorage.removeItem(this.SETTINGS_KEY);
        sessionStorage.removeItem(this.SAVE_KEY);
        sessionStorage.removeItem('currentPuzzle');
        sessionStorage.removeItem(this.SETTINGS_KEY);
        console.log('All save data deleted');
    }

    /**
     * Update campaign progress for a level
     * @param {number} levelNumber - Level number (unlimited)
     * @param {number} completionTime - Time taken in seconds
     */
    static updateCampaignProgress(levelNumber, completionTime) {
        const saveData = this.loadGame();
        
        // Find or create level progress entry
        let levelData = saveData.campaignProgress.find(l => l.levelNumber === levelNumber);
        if (!levelData) {
            levelData = {
                levelNumber: levelNumber,
                completed: false,
                bestTime: 0,
                stars: 0
            };
            saveData.campaignProgress.push(levelData);
        }

        // Mark as completed
        levelData.completed = true;

        // Update best time
        if (levelData.bestTime === 0 || completionTime < levelData.bestTime) {
            levelData.bestTime = completionTime;
        }

        // Calculate stars (simple formula)
        if (completionTime < 60) levelData.stars = 3;
        else if (completionTime < 120) levelData.stars = 2;
        else levelData.stars = 1;

        // Update current level to next level
        saveData.currentCampaignLevel = levelNumber + 1;

        this.saveGame(saveData);
    }

    /**
     * Update quick play stats
     * @param {string} difficulty - easy, medium, hard
     * @param {number} completionTime - Time taken in seconds
     */
    static updateQuickPlayStats(difficulty, completionTime) {
        const saveData = this.loadGame();
        const stats = saveData.quickPlayStats;

        stats.totalGames++;
        stats.totalWins++;

        // Update best time for difficulty
        const bestTimeKey = `bestTime${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
        if (stats[bestTimeKey] === 0 || completionTime < stats[bestTimeKey]) {
            stats[bestTimeKey] = completionTime;
        }

        this.saveGame(saveData);
    }
}
