/**
 * CampaignManager - Manages campaign mode levels and progression
 * Creates 10 progressive levels
 */
class CampaignManager {
    constructor() {
        this.levels = this.createCampaignLevels();
        this.currentLevel = null;
    }

    /**
     * Create all 10 campaign levels
     * @returns {Array} Array of LevelDefinition objects
     */
    createCampaignLevels() {
        return [
            // Level 1 - Tutorial (Easy)
            new LevelDefinition(1, 6, 5, 3, 6, false, false),

            // Level 2 - Getting Started
            new LevelDefinition(2, 8, 6, 3, 7, false, false),

            // Level 3 - Introduce Backward
            new LevelDefinition(3, 8, 7, 4, 8, false, true),

            // Level 4 - More Words
            new LevelDefinition(4, 10, 8, 4, 8, false, true),

            // Level 5 - Introduce Diagonal
            new LevelDefinition(5, 10, 8, 4, 9, true, false),

            // Level 6 - All Directions
            new LevelDefinition(6, 12, 10, 4, 10, true, true),

            // Level 7 - Larger Grid
            new LevelDefinition(7, 12, 12, 5, 10, true, true),

            // Level 8 - Challenge
            new LevelDefinition(8, 14, 14, 5, 11, true, true),

            // Level 9 - Expert
            new LevelDefinition(9, 15, 15, 6, 12, true, true),

            // Level 10 - Master
            new LevelDefinition(10, 15, 18, 6, 12, true, true)
        ];
    }

    /**
     * Get level by number
     * @param {number} levelNumber - Level number (1-10)
     * @returns {LevelDefinition} Level definition or null
     */
    getLevel(levelNumber) {
        if (levelNumber >= 1 && levelNumber <= 10) {
            return this.levels[levelNumber - 1];
        }
        return null;
    }

    /**
     * Check if level is unlocked
     * @param {number} levelNumber - Level number (1-10)
     * @returns {boolean} True if unlocked
     */
    isLevelUnlocked(levelNumber) {
        const saveData = SaveSystem.loadGame();
        if (levelNumber >= 1 && levelNumber <= 10) {
            return saveData.campaignProgress[levelNumber - 1].unlocked;
        }
        return false;
    }

    /**
     * Get campaign progress summary
     * @returns {Object} Progress summary
     */
    getProgress() {
        const saveData = SaveSystem.loadGame();
        const completedCount = saveData.campaignProgress.filter(l => l.completed).length;
        const totalStars = saveData.campaignProgress.reduce((sum, l) => sum + l.stars, 0);

        return {
            currentLevel: saveData.currentCampaignLevel,
            completedLevels: completedCount,
            totalLevels: 10,
            totalStars: totalStars,
            maxStars: 30,
            progress: saveData.campaignProgress
        };
    }

    /**
     * Start a campaign level
     * @param {number} levelNumber - Level number (1-10)
     * @returns {LevelDefinition} Level definition or null if locked
     */
    startLevel(levelNumber) {
        if (!this.isLevelUnlocked(levelNumber)) {
            console.warn(`Level ${levelNumber} is locked`);
            return null;
        }

        this.currentLevel = this.getLevel(levelNumber);
        return this.currentLevel;
    }

    /**
     * Complete current level
     * @param {number} completionTime - Time taken in seconds
     */
    completeLevel(levelNumber, completionTime) {
        SaveSystem.updateCampaignProgress(levelNumber, completionTime);
    }

    /**
     * Reset campaign progress (for testing)
     */
    resetProgress() {
        SaveSystem.deleteSave();
    }
}
