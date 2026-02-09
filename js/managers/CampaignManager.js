/**
 * CampaignManager - Manages campaign mode levels and progression
 * Generates unlimited progressive levels
 */
class CampaignManager {
    constructor() {
        this.currentLevel = null;
    }

    /**
     * Generate a level dynamically based on level number
     * Progression: Easy (1-2) -> Medium (3-4) -> Hard (5-10) -> Expert (11+)
     * @param {number} levelNumber - Level number (unlimited)
     * @returns {LevelDefinition} Level definition
     */
    generateLevel(levelNumber) {
        let gridSize, wordCount, minWordLength, maxWordLength, allowDiagonal, allowBackward;

        if (levelNumber <= 2) {
            // Easy: Small grids, simple words
            gridSize = 6 + Math.floor((levelNumber - 1) * 1); // 6, 7
            wordCount = 5 + levelNumber;                      // 6, 7
            minWordLength = 3;
            maxWordLength = 6 + levelNumber;                  // 7, 8
            allowDiagonal = false;
            allowBackward = false;
        } else if (levelNumber <= 4) {
            // Medium: Medium grids, introduce backward
            gridSize = 8 + Math.floor((levelNumber - 3) * 1);        // 8, 9
            wordCount = 7 + (levelNumber - 2);                       // 7, 8
            minWordLength = 4;
            maxWordLength = 8 + (levelNumber - 3);                   // 8, 9
            allowDiagonal = false;
            allowBackward = true;
        } else if (levelNumber <= 10) {
            // Hard: Larger grids, introduce diagonals
            const hardProgress = levelNumber - 5;                    // 0-5
            gridSize = 10 + Math.floor(hardProgress * 0.4);          // 10-12
            wordCount = 8 + hardProgress;                            // 8-13
            minWordLength = 4;
            maxWordLength = 9 + Math.floor(hardProgress * 0.3);      // 9-11
            allowDiagonal = levelNumber >= 7;
            allowBackward = true;
        } else {
            // Expert: Very large grids, all features
            const expertProgress = levelNumber - 11;                 // 0+
            gridSize = Math.min(20, 12 + Math.floor(expertProgress * 0.5)); // 12-20
            wordCount = Math.min(30, 14 + expertProgress);           // 14+
            minWordLength = 4;
            maxWordLength = Math.min(15, 11 + Math.floor(expertProgress * 0.2)); // 11+
            allowDiagonal = true;
            allowBackward = true;
        }

        return new LevelDefinition(levelNumber, gridSize, wordCount, {
            minWordLength: minWordLength,
            maxWordLength: maxWordLength,
            allowDiagonal: allowDiagonal,
            allowBackward: allowBackward
        });
    }

    /**
     * Get level by number (generates on demand)
     * @param {number} levelNumber - Level number (unlimited)
     * @returns {LevelDefinition} Level definition
     */
    getLevel(levelNumber) {
        if (levelNumber >= 1) {
            return this.generateLevel(levelNumber);
        }
        return null;
    }

    /**
     * Check if level is unlocked (always true for unlimited levels)
     * @param {number} levelNumber - Level number
     * @returns {boolean} True if unlocked
     */
    isLevelUnlocked(levelNumber) {
        // All levels are unlocked in unlimited campaign
        // In the future, could implement achievements/badges to lock certain levels
        return true;
    }

    /**
     * Get campaign progress summary
     * @returns {Object} Progress summary
     */
    getProgress() {
        const saveData = SaveSystem.loadGame();
        const completedCount = saveData.campaignProgress ? saveData.campaignProgress.length : 0;
        const totalStars = saveData.campaignProgress 
            ? saveData.campaignProgress.reduce((sum, l) => sum + (l.stars || 0), 0) 
            : 0;

        return {
            currentLevel: saveData.currentCampaignLevel,
            completedLevels: completedCount,
            totalLevels: 'Unlimited',
            totalStars: totalStars,
            highestLevelReached: completedCount,
            progress: saveData.campaignProgress || []
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
