/**
 * LevelDefinition - Defines configuration for a campaign level
 * Controls grid size, word count, and allowed directions
 */
class LevelDefinition {
    constructor(levelNumber, gridSize, wordCount, options = {}) {
        this.levelNumber = levelNumber;
        this.gridSize = gridSize;
        this.wordCount = wordCount;
        this.allowHorizontal = options.allowHorizontal !== false;
        this.allowVertical = options.allowVertical !== false;
        this.allowDiagonal = options.allowDiagonal || false;
        this.allowBackward = options.allowBackward || false;
        this.minWordLength = options.minWordLength || 3;
        this.maxWordLength = options.maxWordLength || 10;
    }

    /**
     * Get all allowed directions based on level settings
     * @returns {Array} Array of direction vectors {x, y}
     */
    getAllowedDirections() {
        const directions = [];

        // Horizontal and Vertical
        if (this.allowHorizontal) {
            directions.push({x: 0, y: 1});  // Right
            if (this.allowBackward) {
                directions.push({x: 0, y: -1}); // Left
            }
        }

        if (this.allowVertical) {
            directions.push({x: 1, y: 0});  // Down
            if (this.allowBackward) {
                directions.push({x: -1, y: 0}); // Up
            }
        }

        // Diagonals
        if (this.allowDiagonal) {
            directions.push({x: 1, y: 1});   // Down-Right
            directions.push({x: -1, y: 1});  // Up-Right

            if (this.allowBackward) {
                directions.push({x: 1, y: -1});  // Down-Left
                directions.push({x: -1, y: -1}); // Up-Left
            }
        }

        return directions;
    }
}
