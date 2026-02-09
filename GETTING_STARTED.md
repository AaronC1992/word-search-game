# Getting Started - Browser Version

Quick start guide for the Word Search Browser Game.

## Opening the Game

### 🎮 Quick Start (Easiest)
1. Navigate to the `WebVersion` folder
2. Double-click `index.html`
3. Game opens in your default browser
4. Start playing immediately!

### 🚀 Using a Local Server (Recommended for Development)

#### Option 1: Python
```bash
cd WebVersion
python -m http.server 8000
```
Open: http://localhost:8000

#### Option 2: Node.js
```bash
cd WebVersion
npx http-server -p 8000
```
Open: http://localhost:8000

#### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## First Time Playing

### Campaign Mode
- Start with **Campaign** from the main menu
- Level 1 is automatically unlocked (Tutorial)
- Complete levels to unlock the next ones
- Earn stars based on completion time:
  - ⭐⭐⭐ Under 60 seconds
  - ⭐⭐ Under 120 seconds
  - ⭐ Over 120 seconds

### Quick Play Mode
- Click **Quick Play** from main menu
- Choose difficulty:
  - **Easy**: Horizontal and Vertical only
  - **Medium**: + Backward words
  - **Hard**: + Diagonal directions
- Adjust word count (5-20 words)
- Click **Start Game**

## How to Play

### Finding Words
1. **Mouse Users**: Click and drag across letters
2. **Touch Users**: Touch and drag across letters
3. Release to submit the word
4. Found words are highlighted green

### During Gameplay
- **Timer**: Tracks your completion time
- **Progress**: Shows words found / total words
- **💡 Hint**: Reveals next word to find
- **🔄 Reset**: Restart the puzzle
- **🏠 Menu**: Save and return to menu

### Completing a Puzzle
- Find all words to complete
- View your statistics:
  - Completion time
  - Words found
  - Hints used
- Campaign: Earn stars and unlock next level
- Quick Play: Play again or return to menu

## Save System

### Automatic Saving
- Campaign progress saved automatically
- Current puzzle saved when returning to menu
- Click **Resume Game** to continue

### Manual Actions
- Press F12 (browser console)
- Clear save data: `SaveSystem.deleteSave()`
- Load save data: `SaveSystem.loadGame()`

## Troubleshooting

### Game Won't Load
- Check browser console (F12) for errors
- Ensure all files are in correct folders
- Try using a local server instead of direct file

### Touch Not Working
- Ensure viewport meta tag is present (already in HTML)
- Try refreshing the page
- Test in different browser

### Selection Issues
- Make sure cells are adjacent
- Selection must be continuous
- Try shorter drag movements

### Progress Not Saving
- Check localStorage is enabled
- Try different browser
- Look for console errors

## Browser Requirements

**Minimum Requirements**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile Support**:
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## File Structure Overview

```
WebVersion/
├── index.html          # Main game file
├── css/
│   └── styles.css      # All styling
├── js/
│   ├── core/          # Game logic
│   ├── managers/      # State management
│   ├── ui/            # Screen controllers
│   └── app.js         # Main initialization
└── README.md          # Full documentation
```

## Tips for Best Experience

### Desktop
- Use mouse for precise selection
- Full screen browser (F11)
- Zoom in/out (Ctrl +/-)

### Mobile
- Landscape mode for larger grids
- Use stylus for precision
- Enable full screen in browser

### Performance
- Close other browser tabs
- Clear browser cache if slow
- Use modern browser

## Next Steps

1. ✅ Open the game
2. ✅ Try Campaign Level 1
3. ✅ Complete a puzzle
4. ✅ Try Quick Play mode
5. ✅ Explore all difficulty levels

## Need Help?

- Check [README.md](README.md) for full documentation
- Open browser console (F12) to see debug logs
- Look for error messages in console

---

**Ready to play? Open index.html and start searching!** 🔍✨
