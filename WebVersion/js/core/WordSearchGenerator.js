/**
 * WordSearchGenerator - Generates word search puzzles
 * Places words in grid according to difficulty settings
 */
class WordSearchGenerator {
    /**
     * Generate a puzzle based on level definition
     * @param {LevelDefinition} levelDef - Level configuration
     * @param {number} forcedSeed - Optional seed for reproducibility
     * @returns {PuzzleData} Complete puzzle
     */
    generatePuzzle(levelDef, forcedSeed = null) {
        const maxGenerationAttempts = forcedSeed ? 1 : 50;

        let lastAttemptPuzzle = null;
        let lastPlacedWords = [];

        for (let generationAttempt = 0; generationAttempt < maxGenerationAttempts; generationAttempt++) {
            const seed = forcedSeed || Math.floor(Math.random() * 1000000) + generationAttempt;
            this.random = WordList.createSeededRandom(seed);

            const puzzle = new PuzzleData(levelDef.gridSize, seed);
            lastAttemptPuzzle = puzzle;

            // Get words for this level
            const words = WordList.getRandomWords(
                levelDef.wordCount,
                levelDef.minWordLength,
                levelDef.maxWordLength,
                seed
            );

            // Sort words by length (longest first - more constrained placement)
            const sortedWords = words.slice().sort((a, b) => b.length - a.length);
            puzzle.targetWords = sortedWords;

            // Try to place all words
            const allowedDirections = levelDef.getAllowedDirections();
            let allPlaced = true;
            const placedWords = [];

            for (const word of sortedWords) {
                const placed = this.tryPlaceWord(puzzle, word, allowedDirections, 0);
                if (!placed) {
                    allPlaced = false;
                    break;
                }
                placedWords.push(word);
            }

            lastPlacedWords = placedWords;

            if (allPlaced) {
                // Fill remaining cells
                this.fillEmptyCells(puzzle);
                return puzzle;
            }
        }

        console.warn('Failed to place all words after multiple attempts. Returning a reduced word set.');
        if (lastAttemptPuzzle) {
            lastAttemptPuzzle.targetWords = lastPlacedWords;
            this.fillEmptyCells(lastAttemptPuzzle);
            return lastAttemptPuzzle;
        }

        return null;
    }

    /**
     * Generate Quick Play puzzle
     * @param {string} difficulty - easy, medium, or hard
     * @param {number} wordCount - Number of words
     * @param {number} forcedSeed - Optional seed
     * @returns {PuzzleData} Complete puzzle
     */
    generateQuickPlayPuzzle(difficulty, wordCount, forcedSeed = null) {
        // Calculate grid size
        const avgWordLength = 6;
        const packingFactor = 1.6;
        const calculatedSize = Math.ceil(Math.sqrt(wordCount * avgWordLength * packingFactor));
        const gridSize = Math.max(6, Math.min(30, calculatedSize));

        // Create level definition
        const levelDef = new LevelDefinition(0, gridSize, wordCount);

        switch (difficulty.toLowerCase()) {
            case 'easy':
                levelDef.allowDiagonal = false;
                levelDef.allowBackward = false;
                levelDef.minWordLength = 3;
                levelDef.maxWordLength = 7;
                break;

            case 'medium':
                levelDef.allowDiagonal = false;
                levelDef.allowBackward = true;
                levelDef.minWordLength = 4;
                levelDef.maxWordLength = 10;
                break;

            case 'hard':
                levelDef.allowDiagonal = true;
                levelDef.allowBackward = true;
                levelDef.minWordLength = 5;
                levelDef.maxWordLength = 12;
                break;
        }

        return this.generatePuzzle(levelDef, forcedSeed);
    }

    /**
     * Try to place a word in the grid
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {string} word - Word to place
     * @param {Array} allowedDirections - Allowed direction vectors
     * @param {number} maxAttempts - Maximum placement attempts
     * @returns {boolean} True if placed successfully
     */
    tryPlaceWord(puzzle, word, allowedDirections, maxAttempts) {
        word = word.toUpperCase();

        const placements = this.getAllValidPlacements(puzzle, word, allowedDirections);
        if (placements.length === 0) {
            return false;
        }

        const choice = placements[Math.floor(this.random() * placements.length)];
        this.placeWord(puzzle, word, choice.startRow, choice.startCol, choice.direction);
        return true;
    }

    /**
     * Get all valid placements for a word
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {string} word - Word to place
     * @param {Array} allowedDirections - Allowed direction vectors
     * @returns {Array} List of valid placements
     */
    getAllValidPlacements(puzzle, word, allowedDirections) {
        const placements = [];

        for (let row = 0; row < puzzle.gridSize; row++) {
            for (let col = 0; col < puzzle.gridSize; col++) {
                for (const direction of allowedDirections) {
                    if (this.canPlaceWord(puzzle, word, row, col, direction)) {
                        placements.push({ startRow: row, startCol: col, direction });
                    }
                }
            }
        }

        return placements;
    }

    /**
     * Check if word can be placed at position
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {string} word - Word to place
     * @param {number} startRow - Starting row
     * @param {number} startCol - Starting column
     * @param {Object} direction - Direction vector {x, y}
     * @returns {boolean} True if can place
     */
    canPlaceWord(puzzle, word, startRow, startCol, direction) {
        for (let i = 0; i < word.length; i++) {
            const row = startRow + (direction.x * i);
            const col = startCol + (direction.y * i);

            // Check bounds
            if (row < 0 || row >= puzzle.gridSize || col < 0 || col >= puzzle.gridSize) {
                return false;
            }

            // Check if cell is empty or contains same letter
            const currentChar = puzzle.getChar(row, col);
            if (currentChar !== '' && currentChar !== word[i]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Place word in the grid
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {string} word - Word to place
     * @param {number} startRow - Starting row
     * @param {number} startCol - Starting column
     * @param {Object} direction - Direction vector {x, y}
     */
    placeWord(puzzle, word, startRow, startCol, direction) {
        const placement = new WordPlacement(word, startRow, startCol, direction);
        puzzle.wordPlacements.push(placement);

        for (let i = 0; i < word.length; i++) {
            const row = startRow + (direction.x * i);
            const col = startCol + (direction.y * i);
            puzzle.setChar(row, col, word[i]);
        }
    }

    /**
     * Fill empty cells with random letters
     * @param {PuzzleData} puzzle - Current puzzle
     */
    fillEmptyCells(puzzle) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let row = 0; row < puzzle.gridSize; row++) {
            for (let col = 0; col < puzzle.gridSize; col++) {
                if (puzzle.getChar(row, col) === '') {
                    const randomChar = alphabet[Math.floor(this.random() * alphabet.length)];
                    puzzle.setChar(row, col, randomChar);
                }
            }
        }
    }
}
