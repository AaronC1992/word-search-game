# Word Search Game - Browser Version

A complete browser-based 2D Word Search puzzle game with Campaign and Quick Play modes.

## Features

### Game Modes
- **Campaign Mode**: 10 progressive levels with increasing difficulty
  - Level 1: 6x6 grid, horizontal/vertical only (Tutorial)
  - Level 5: Introduces diagonal directions
  - Level 10: 15x15 grid, all directions (Master level)
  - Star rating system based on completion time
  - Automatic level unlocking

- **Quick Play Mode**: Customizable puzzles
  - 3 difficulty levels (Easy, Medium, Hard)
  - Adjustable word count (5-20 words)
  - Dynamic grid sizing

### Gameplay Features
- **Drag Selection**: Click/touch and drag to select words
- **8-Direction Search**: Words can be placed horizontally, vertically, diagonally, and backwards
- **Hint System**: Get hints for remaining words
- **Timer**: Track your completion time
- **Progress Tracking**: Visual progress bar and word count
- **Save/Resume**: Automatically saves progress when returning to menu

### Technical Features
- Pure HTML5, CSS3, and JavaScript (no frameworks)
- Responsive design (works on desktop, tablet, and mobile)
- LocalStorage for persistent save data
- Touch and mouse input support
- Deterministic puzzle generation using seeds

## How to Run

### Option 1: Direct File Opening
1. Navigate to the `WebVersion` folder
2. Double-click `index.html` to open in your default browser

### Option 2: Local Web Server (Recommended)
Using Python:
```bash
cd WebVersion
python -m http.server 8000
```
Then open: http://localhost:8000

Using Node.js (http-server):
```bash
cd WebVersion
npx http-server -p 8000
```
Then open: http://localhost:8000

Using VS Code Live Server:
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## How to Play

### Starting a Game
1. **Campaign Mode**:
   - Click "Campaign" from main menu
   - Select an unlocked level
   - Complete levels to unlock next ones

2. **Quick Play Mode**:
   - Click "Quick Play" from main menu
   - Choose difficulty (Easy/Medium/Hard)
   - Adjust word count using slider
   - Click "Start Game"

### Finding Words
1. **Mouse**: Click and drag across letters
2. **Touch**: Touch and drag across letters
3. Release to submit your selection
4. Found words are highlighted in the grid and crossed off the list

### Controls During Gameplay
- **Pause Button**: Pause/resume the timer
- **Hint Button**: Reveal the next unfound word
- **Reset Button**: Start the puzzle over (confirmation required)
- **Menu Button**: Return to main menu (saves progress)

### Selection Tips
- Words can go in any direction (based on difficulty)
- You can backtrack during selection
- Selection must be continuous (adjacent cells)
- Words can overlap in the grid

## Architecture

### File Structure
```
WebVersion/
├── index.html              # Main HTML structure
├── css/
│   └── styles.css          # Complete styling
├── js/
│   ├── core/               # Core game logic
│   │   ├── WordList.js     # Word database (650+ words)
│   │   ├── PuzzleData.js   # Grid data structure
│   │   ├── WordPlacement.js # Word placement tracking
│   │   ├── LevelDefinition.js # Level configuration
│   │   ├── WordSearchGenerator.js # Puzzle generation
│   │   └── InputController.js # Input handling
│   ├── managers/           # Game state managers
│   │   ├── SaveSystem.js   # LocalStorage save/load
│   │   ├── CampaignManager.js # Campaign progression
│   │   └── GameManager.js  # Main game state
│   ├── ui/                 # UI controllers
│   │   ├── MainMenuUI.js   # Main menu screen
│   │   ├── CampaignUI.js   # Campaign level selection
│   │   ├── QuickPlayUI.js  # Quick play setup
│   │   ├── GameplayUI.js   # Main gameplay screen
│   │   └── WinScreenUI.js  # Victory screen
│   └── app.js              # Application initialization
└── README.md               # This file
```

### Class Overview

**Core Classes**:
- `WordList`: Static word database with 650+ words
- `PuzzleData`: Grid state management and serialization
- `WordPlacement`: Tracks word positions and coordinates
- `LevelDefinition`: Configures level parameters
- `WordSearchGenerator`: Generates puzzles algorithmically
- `InputController`: Handles mouse/touch input

**Manager Classes**:
- `SaveSystem`: LocalStorage wrapper for save/load
- `CampaignManager`: Manages 10 campaign levels
- `GameManager`: Main game loop and state

**UI Classes**:
- `MainMenuUI`: Menu navigation
- `CampaignUI`: Level selection with progress display
- `QuickPlayUI`: Quick play configuration
- `GameplayUI`: Main gameplay interface
- `WinScreenUI`: Completion statistics

## Save System

### Storage Keys
- `wordSearchGameSave`: Main save data (campaign progress, stats)
- `currentPuzzle`: Active puzzle state (for resume)
- `wordSearchSettings`: Game settings (sound, hints, etc.)

### Save Data Structure
```javascript
{
  currentCampaignLevel: 1,
  campaignProgress: [
    {
      levelNumber: 1,
      unlocked: true,
      completed: false,
      bestTime: 0,
      stars: 0
    },
    // ... 9 more levels
  ],
  quickPlayStats: {
    totalGames: 0,
    totalWins: 0,
    bestTimeEasy: 0,
    bestTimeMedium: 0,
    bestTimeHard: 0
  }
}
```

### Clearing Save Data
Open browser console (F12) and run:
```javascript
SaveSystem.deleteSave();
```

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Differences from Unity Version

| Feature | Unity Version | Browser Version |
|---------|--------------|-----------------|
| Save System | PlayerPrefs/JSON | LocalStorage |
| Input | InputSystem package | DOM events |
| UI | Unity UI + TextMeshPro | HTML/CSS |
| Build Platform | PC/Android/iOS | Any browser |
| Assets | Sprites/Prefabs | CSS styling |

Both versions share identical:
- Game logic and algorithms
- Level configurations
- Word database
- Puzzle generation algorithm
- Campaign progression system

## Development

### Adding New Words
Edit `js/core/WordList.js` and add words to the arrays:
- `shortWords`: 3-5 letters
- `mediumWords`: 6-8 letters
- `longWords`: 9-12 letters

### Modifying Levels
Edit `js/managers/CampaignManager.js` in the `createCampaignLevels()` method.

### Styling Changes
All styles are in `css/styles.css`. Key CSS classes:
- `.grid-cell`: Individual grid cells
- `.grid-cell.selecting`: Currently selecting
- `.grid-cell.found`: Part of found word
- `.word-item.found`: Found word in list

### Debug Mode
Open browser console (F12) for logs:
- Puzzle generation details
- Word placement attempts
- Selection events
- Save/load operations

## Known Limitations

1. **No Sound**: Audio not implemented (easy to add)
2. **No Animations**: Minimal animations (can be enhanced with CSS)
3. **No Accessibility**: Screen reader support not implemented
4. **Basic Settings**: Settings screen is placeholder

## Future Enhancements

- [ ] Sound effects and background music
- [ ] More animations (word found, level complete)
- [ ] Daily challenge mode
- [ ] Multiplayer/competitive mode
- [ ] Theme customization
- [ ] Accessibility improvements
- [ ] PWA support for offline play
- [ ] Leaderboards

## Credits

- Game Design: Complete word search implementation
- Word List: 650+ common English words
- Architecture: Mirrors Unity C# implementation

## License

This is a portfolio project. Feel free to use for learning purposes.

---

**Enjoy the game!** 🎮✨
