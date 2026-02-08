/**
 * CampaignUI - Controls campaign level selection screen
 */
class CampaignUI {
    constructor() {
        this.screen = document.getElementById('campaign-screen');
        this.campaignManager = new CampaignManager();
        this.initializeButtons();
        this.renderLevels();
    }

    /**
     * Initialize button event listeners
     */
    initializeButtons() {
        document.getElementById('campaign-back-btn').addEventListener('click', () => {
            this.hide();
            window.app.showMainMenu();
        });
    }

    /**
     * Render campaign levels
     */
    renderLevels() {
        const container = document.getElementById('level-grid');
        container.innerHTML = '';

        const progress = this.campaignManager.getProgress();

        for (let i = 1; i <= 10; i++) {
            const levelData = progress.progress[i - 1];
            const levelButton = this.createLevelButton(i, levelData);
            container.appendChild(levelButton);
        }

        this.updateProgressDisplay(progress);
    }

    /**
     * Create level button
     * @param {number} levelNumber - Level number
     * @param {Object} levelData - Level progress data
     * @returns {HTMLElement} Level button element
     */
    createLevelButton(levelNumber, levelData) {
        const button = document.createElement('div');
        button.className = 'level-button';

        if (!levelData.unlocked) {
            button.classList.add('locked');
        } else if (levelData.completed) {
            button.classList.add('completed');
        }

        // Level number
        const numberDiv = document.createElement('div');
        numberDiv.className = 'level-number';
        numberDiv.textContent = levelData.unlocked ? levelNumber : '🔒';
        button.appendChild(numberDiv);

        // Stars
        if (levelData.completed) {
            const starsDiv = document.createElement('div');
            starsDiv.className = 'level-stars';
            starsDiv.textContent = '⭐'.repeat(levelData.stars);
            button.appendChild(starsDiv);
        }

        // Best time
        if (levelData.bestTime > 0) {
            const timeDiv = document.createElement('div');
            timeDiv.className = 'level-time';
            const minutes = Math.floor(levelData.bestTime / 60);
            const seconds = levelData.bestTime % 60;
            timeDiv.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            button.appendChild(timeDiv);
        }

        // Click handler
        if (levelData.unlocked) {
            button.addEventListener('click', () => {
                this.startLevel(levelNumber);
            });
        }

        return button;
    }

    /**
     * Update progress display
     * @param {Object} progress - Campaign progress
     */
    updateProgressDisplay(progress) {
        const progressText = document.getElementById('campaign-progress');
        progressText.textContent = `Progress: ${progress.completedLevels}/${progress.totalLevels} Levels | Stars: ${progress.totalStars}/${progress.maxStars}`;
    }

    /**
     * Start selected level
     * @param {number} levelNumber - Level to start
     */
    startLevel(levelNumber) {
        window.app.gameManager.startCampaignLevel(levelNumber);
        this.hide();
        window.app.showGameplay();
    }

    /**
     * Show campaign menu
     */
    show() {
        this.renderLevels();
        this.screen.classList.add('active');
    }

    /**
     * Hide campaign menu
     */
    hide() {
        this.screen.classList.remove('active');
    }
}
