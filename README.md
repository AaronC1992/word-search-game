# 🔤 Word Search Game

**[🎮 Play Now](https://aaronc1992.github.io/word-search-game/WebVersion/index.html)**

A complete browser-based Word Search game with Campaign, Quick Play, and Two Player modes.

![Platform](https://img.shields.io/badge/Platform-Web%20Browser-green)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow)

---

## ✨ Features

### 🎮 **Three Game Modes**
- **Campaign Mode:** 10 progressive levels with increasing difficulty
- **Quick Play:** Customizable difficulty (Easy/Medium/Hard) and word count (5-50 words)
- **Two Player Mode:** Competitive same-screen multiplayer with color-coded highlights

### 💾 **Complete Save System**
- Auto-save progress with LocalStorage
- Resume exactly where you left off
- Persistent level completion tracking
- Settings persistence (sound, timer, optional fullscreen)
- Reset all progress option

### 🎯 **Core Gameplay**
- 8-directional word placement (horizontal, vertical, diagonal)
- Forward and backward word orientation
- Smooth drag selection (mouse or touch)
- Live selection highlighting
- Found word highlighting and strike-through
- Timer tracking (optional toggles)
- Responsive layout that scales the grid and word list to fit the screen
- Grid sizes from 6×6 to 30×30
- Up to 50 words per puzzle

### 🎨 **Two Player Features**
- Player identification modal after each word found
- Color-coded highlights (Player 1: Blue, Player 2: Red)
- Real-time score tracking
- Winner announcement with final stats

---

## 🚀 Quick Start

**Play Instantly:**
1. Visit [https://aaronc1992.github.io/word-search-game/WebVersion/](https://aaronc1992.github.io/word-search-game/WebVersion/)
2. Choose your game mode
3. Start playing!

**Run Locally:**
```bash
# Clone the repository
git clone https://github.com/AaronC1992/word-search-game.git

# Navigate to web version
cd word-search-game/WebVersion

# Start local server (Python 3)
python -m http.server 8000

# Open in browser
# Visit http://localhost:8000
```

---

## 📦 Project Structure

```
WebVersion/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   ├── app.js          # Application entry point
│   ├── core/           # Core game logic
│   │   ├── WordSearchGenerator.js
│   │   ├── LevelDefinition.js
│   │   ├── PuzzleData.js
│   │   ├── WordList.js
│   │   └── WordPlacement.js
│   ├── managers/       # Game state managers
│   │   ├── GameManager.js
│   │   ├── CampaignManager.js
│   │   └── SaveSystem.js
│   └── ui/             # UI controllers
│       ├── MainMenuUI.js
│       ├── CampaignUI.js
│       ├── QuickPlayUI.js
│       ├── TwoPlayerUI.js
│       ├── GameplayUI.js
│       └── WinScreenUI.js
└── README.md           # Web version documentation
```

---

## 🎮 Game Modes

### Campaign Mode
- 10 progressively challenging levels
- Difficulty scales from 6×6 grids (5 words) to larger grids (15+ words)
- Unlock levels by completing previous ones
- Saved progress across sessions

### Quick Play Mode
- Choose difficulty: Easy, Medium, or Hard
- Select word count: 5-50 words
- Grid automatically scales to fit
- Instant play with randomized puzzles

### Two Player Mode
- Same-screen competitive gameplay
- Player identification after each word selection
- Color-coded word highlights
- Score tracking and winner announcement
- Choose difficulty and word count

---

## 🛠️ Technologies

- **HTML5** - Structure and semantics
- **CSS3** - Styling with CSS variables and flexbox
- **JavaScript (ES6+)** - Game logic and interactions
- **LocalStorage API** - Save system and settings
- **Responsive Design** - Works on desktop and mobile

---

## 📝 License

This project is available for personal and educational use.

---

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your own use!

---

**[🎮 Start Playing Now](https://aaronc1992.github.io/word-search-game/WebVersion/index.html)**

