/**
 * InputController - Handles mouse and touch input for word selection
 * Manages drag selection across grid cells
 */
class InputController {
    constructor(gridElement) {
        this.gridElement = gridElement;
        this.isDragging = false;
        this.selectedCells = [];
        this.lastSelectedCell = null;
        this.selectionDirection = null; // Locked direction: {dx, dy}

        // Callbacks
        this.onSelectionChanged = null;
        this.onSelectionComplete = null;

        this.initializeEvents();
    }

    /**
     * Initialize mouse and touch event listeners
     */
    initializeEvents() {
        // Mouse events
        this.gridElement.addEventListener('mousedown', (e) => this.handleStart(e));
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        document.addEventListener('mouseup', (e) => this.handleEnd(e));

        // Touch events
        this.gridElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleStart(e.touches[0]);
        }, {passive: false});

        document.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                e.preventDefault();
                this.handleMove(e.touches[0]);
            }
        }, {passive: false});

        document.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleEnd(e);
        });
    }

    /**
     * Handle selection start
     * @param {Event} e - Mouse or touch event
     */
    handleStart(e) {
        const cell = this.getCellFromEvent(e);
        if (!cell) return;

        this.isDragging = true;
        this.selectedCells = [];
        this.lastSelectedCell = null;
        this.selectionDirection = null; // Reset direction on new selection

        this.addCellToSelection(cell);
    }

    /**
     * Handle selection move
     * @param {Event} e - Mouse or touch event
     */
    handleMove(e) {
        if (!this.isDragging) return;

        const cell = this.getCellFromEvent(e);
        if (!cell) return;

        const cellCoords = this.getCellCoords(cell);

        // Check if this is a different cell
        if (!this.lastSelectedCell || 
            cellCoords.x !== this.lastSelectedCell.x || 
            cellCoords.y !== this.lastSelectedCell.y) {

            // On second cell selection, establish the direction
            if (this.selectedCells.length === 1 && !this.selectionDirection) {
                const direction = this.getDirection(this.lastSelectedCell, cellCoords);
                if (direction) {
                    this.selectionDirection = direction;
                }
            }

            // Check if movement follows the locked direction
            if (this.isValidMove(this.lastSelectedCell, cellCoords)) {
                // Check if already in selection (backtracking)
                const existingIndex = this.selectedCells.findIndex(c => 
                    c.x === cellCoords.x && c.y === cellCoords.y
                );

                if (existingIndex !== -1 && existingIndex < this.selectedCells.length - 1) {
                    // Backtrack - remove cells after this one
                    this.selectedCells = this.selectedCells.slice(0, existingIndex + 1);
                    this.lastSelectedCell = cellCoords;
                    this.triggerSelectionChanged();
                } else if (existingIndex === -1) {
                    // New cell - add to selection
                    this.addCellToSelection(cell);
                }
            }
        }
    }

    /**
     * Handle selection end
     */
    handleEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;

        if (this.selectedCells.length > 0 && this.onSelectionComplete) {
            this.onSelectionComplete([...this.selectedCells]);
        }

        this.selectedCells = [];
        this.lastSelectedCell = null;
    }

    /**
     * Add cell to current selection
     * @param {HTMLElement} cell - Grid cell element
     */
    addCellToSelection(cell) {
        const coords = this.getCellCoords(cell);
        this.selectedCells.push(coords);
        this.lastSelectedCell = coords;
        this.triggerSelectionChanged();
    }

    /**
     * Trigger selection changed callback
     */
    triggerSelectionChanged() {
        if (this.onSelectionChanged) {
            this.onSelectionChanged([...this.selectedCells]);
        }
    }

    /**
     * Get cell element from event
     * @param {Event} e - Mouse or touch event
     * @returns {HTMLElement} Cell element or null
     */
    getCellFromEvent(e) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        return element && element.classList.contains('grid-cell') ? element : null;
    }

    /**
     * Get cell coordinates from element
     * @param {HTMLElement} cell - Grid cell element
     * @returns {Object} {x, y} coordinates
     */
    getCellCoords(cell) {
        return {
            x: parseInt(cell.dataset.row),
            y: parseInt(cell.dataset.col)
        };
    }

    /**
     * Calculate normalized direction vector from one cell to another
     * @param {Object} from - {x, y} starting coordinates
     * @param {Object} to - {x, y} ending coordinates
     * @returns {Object|null} {dx, dy} normalized direction or null if same cell
     */
    getDirection(from, to) {
        const dx = to.x - from.x;
        const dy = to.y - from.y;

        if (dx === 0 && dy === 0) return null;

        // Normalize to -1, 0, or 1
        const normDx = dx === 0 ? 0 : (dx > 0 ? 1 : -1);
        const normDy = dy === 0 ? 0 : (dy > 0 ? 1 : -1);

        return { dx: normDx, dy: normDy };
    }

    /**
     * Check if move from lastCell to newCell is valid given the locked direction
     * @param {Object} lastCell - {x, y} current position
     * @param {Object} newCell - {x, y} target position
     * @returns {boolean} True if move follows locked direction
     */
    isValidMove(lastCell, newCell) {
        // First move - always valid
        if (!this.selectionDirection) {
            return this.isAdjacent(lastCell, newCell);
        }

        const direction = this.getDirection(lastCell, newCell);
        if (!direction) return false;

        // Check if direction matches locked direction or reverse
        const matchesForward = direction.dx === this.selectionDirection.dx && 
                               direction.dy === this.selectionDirection.dy;
        const matchesReverse = direction.dx === -this.selectionDirection.dx && 
                               direction.dy === -this.selectionDirection.dy;

        return matchesForward || matchesReverse;
    }

    /**
     * Check if two cells are adjacent
     * @param {Object} cell1 - {x, y} coordinates
     * @param {Object} cell2 - {x, y} coordinates
     * @returns {boolean} True if adjacent
     */
    isAdjacent(cell1, cell2) {
        const rowDiff = Math.abs(cell1.x - cell2.x);
        const colDiff = Math.abs(cell1.y - cell2.y);
        return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
    }
}
