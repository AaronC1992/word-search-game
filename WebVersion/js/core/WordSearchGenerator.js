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
                
                // Try to place bonus words
                this.placeBonusWords(puzzle, levelDef);

                // Detect coincidental words already in the grid
                this.detectCoincidentalBonusWords(puzzle, levelDef);
                
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
     * Place bonus words (hidden words not in word list)
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {LevelDefinition} levelDef - Level configuration
     */
    placeBonusWords(puzzle, levelDef) {
        // Calculate how many bonus words to try (1-3 based on grid size)
        const bonusAttempts = Math.min(3, Math.floor(levelDef.gridSize / 8));
        
        for (let i = 0; i < bonusAttempts; i++) {
            // Get a random word not already in the puzzle
            const existingWords = puzzle.targetWords.map(w => w.toUpperCase());
            let bonusWord = null;
            let attempts = 0;
            
            while (!bonusWord && attempts < 20) {
                const randomWord = WordList.getRandomWords(1, 4, 8, Math.random())[0];
                if (!existingWords.includes(randomWord.toUpperCase())) {
                    bonusWord = randomWord;
                }
                attempts++;
            }
            
            if (!bonusWord) continue;
            
            // Try to place the bonus word
            const allowedDirections = levelDef.getAllowedDirections();
            const placed = this.tryPlaceBonusWord(puzzle, bonusWord, allowedDirections);
            
            if (!placed) {
                // Failed to place this bonus word, try next one
                continue;
            }
        }
    }

    /**
     * Try to place a bonus word in the grid
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {string} word - Word to place
     * @param {Array} allowedDirections - Allowed direction vectors
     * @returns {boolean} True if placed successfully
     */
    tryPlaceBonusWord(puzzle, word, allowedDirections) {
        word = word.toUpperCase();

        const placements = this.getAllValidPlacements(puzzle, word, allowedDirections);
        if (placements.length === 0) {
            return false;
        }

        const choice = placements[Math.floor(this.random() * placements.length)];
        this.placeBonusWord(puzzle, word, choice.startRow, choice.startCol, choice.direction);
        return true;
    }

    /**
     * Place bonus word in the grid (as WordPlacement but tracked separately)
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {string} word - Word to place
     * @param {number} startRow - Starting row
     * @param {number} startCol - Starting column
     * @param {Object} direction - Direction vector {x, y}
     */
    placeBonusWord(puzzle, word, startRow, startCol, direction) {
        const placement = new WordPlacement(word, startRow, startCol, direction);
        puzzle.bonusWordPlacements.push(placement);

        for (let i = 0; i < word.length; i++) {
            const row = startRow + (direction.x * i);
            const col = startCol + (direction.y * i);
            puzzle.setChar(row, col, word[i]);
        }
    }

    /**
     * Detect and register words that appear in the filled grid by coincidence
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {LevelDefinition} levelDef - Level configuration
     */
    detectCoincidentalBonusWords(puzzle, levelDef) {
        const minLen = Math.max(4, levelDef.minWordLength || 3);
        const maxLen = Math.max(minLen, levelDef.maxWordLength || 12);
        const maxBonus = Math.min(12, Math.floor((puzzle.gridSize * puzzle.gridSize) / 10));

        const { wordSet, prefixSet } = this.buildWordLookup(minLen, maxLen);
        const existingWords = new Set(
            [...puzzle.targetWords, ...puzzle.bonusWordPlacements.map(p => p.word)].map(w => w.toUpperCase())
        );

        const directions = this.getScanDirections();
        let added = 0;

        for (let row = 0; row < puzzle.gridSize; row++) {
            for (let col = 0; col < puzzle.gridSize; col++) {
                for (const direction of directions) {
                    let word = '';

                    for (let i = 0; i < maxLen; i++) {
                        const r = row + (direction.x * i);
                        const c = col + (direction.y * i);

                        if (r < 0 || r >= puzzle.gridSize || c < 0 || c >= puzzle.gridSize) {
                            break;
                        }

                        word += puzzle.getChar(r, c);

                        if (!prefixSet.has(word)) {
                            break;
                        }

                        if (word.length >= minLen && wordSet.has(word) && !existingWords.has(word)) {
                            this.registerBonusPlacement(puzzle, word, row, col, direction);
                            existingWords.add(word);
                            added++;

                            if (added >= maxBonus) {
                                return;
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Register a bonus word placement without modifying the grid
     * @param {PuzzleData} puzzle - Current puzzle
     * @param {string} word - Word to register
     * @param {number} startRow - Starting row
     * @param {number} startCol - Starting column
     * @param {Object} direction - Direction vector {x, y}
     */
    registerBonusPlacement(puzzle, word, startRow, startCol, direction) {
        const placement = new WordPlacement(word, startRow, startCol, direction);
        puzzle.bonusWordPlacements.push(placement);
    }

    /**
     * Build word and prefix lookups for fast scanning
     * @param {number} minLen - Minimum word length
     * @param {number} maxLen - Maximum word length
     * @returns {Object} {wordSet, prefixSet}
     */
    buildWordLookup(minLen, maxLen) {
        const wordSet = new Set();
        const prefixSet = new Set();
        const allWords = [...WordList.shortWords, ...WordList.mediumWords, ...WordList.longWords];

        for (const rawWord of allWords) {
            const word = rawWord.toUpperCase();
            if (word.length < minLen || word.length > maxLen) continue;

            wordSet.add(word);
            for (let i = 1; i <= word.length; i++) {
                prefixSet.add(word.slice(0, i));
            }
        }

        return { wordSet, prefixSet };
    }

    /**
     * Get all straight-line scan directions (8 directions)
     * @returns {Array} Direction vectors {x, y}
     */
    getScanDirections() {
        return [
            {x: 0, y: 1},   // Right
            {x: 0, y: -1},  // Left
            {x: 1, y: 0},   // Down
            {x: -1, y: 0},  // Up
            {x: 1, y: 1},   // Down-Right
            {x: 1, y: -1},  // Down-Left
            {x: -1, y: 1},  // Up-Right
            {x: -1, y: -1}  // Up-Left
        ];
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
