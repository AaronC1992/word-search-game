# 🔤 Word Search Game - Unity C#

A complete, production-ready 2D Word Search game for Unity with cross-platform support (PC, Android, iOS).

![Unity Version](https://img.shields.io/badge/Unity-2021.3%2B-blue)
![Platform](https://img.shields.io/badge/Platform-PC%20%7C%20Android%20%7C%20iOS-green)
![Language](https://img.shields.io/badge/Language-C%23-purple)

---

## ✨ Features

### 🎮 **Two Game Modes**
- **Campaign Mode:** 10 progressive levels with increasing difficulty
- **Quick Play:** Customizable difficulty (Easy/Medium/Hard) and word count

### 💾 **Complete Save System**
- Auto-save progress after finding each word
- Resume exactly where you left off
- Persistent level completion tracking
- Cross-session puzzle state restoration

### 🎯 **Core Gameplay**
- 8-directional word placement (horizontal, vertical, diagonal)
- Forward and backward word orientation
- Smooth drag selection (mouse on PC, touch on mobile)
- Live selection highlighting
- Found word locking and strike-through
- Hint system for assistance
- Timer tracking (optional)

### 🏗️ **Clean Architecture**
- Separated concerns with dedicated managers
- Data-driven level design
- Deterministic puzzle generation (seed-based)
- Modular component system
- Easy to extend and customize

---

## 📦 What's Included

### **Scripts (17 files)**
```
Scripts/
├── Core/               # Core gameplay mechanics
│   ├── WordSearchGenerator.cs
│   ├── WordSearchBoardView.cs
│   └── InputController.cs
├── Data/               # Data models
│   ├── PuzzleData.cs
│   ├── WordPlacement.cs
│   ├── LevelDefinition.cs
│   └── SaveData.cs
├── Managers/           # Game managers
│   ├── GameManager.cs
│   ├── CampaignManager.cs
│   └── SaveSystem.cs
├── UI/                 # User interface
│   ├── MainMenuUI.cs
│   ├── CampaignUI.cs
│   ├── QuickPlayUI.cs
│   ├── GameplayUI.cs
│   └── WinScreenUI.cs
├── Utilities/          # Helper utilities
│   └── WordList.cs
└── GameInitializer.cs  # Scene initialization
```

### **Documentation**
- `SETUP_GUIDE.md` - Detailed step-by-step setup instructions
- `README.md` - This file
- Inline code comments throughout

---

## 🚀 Quick Start

### **Prerequisites**
- Unity 2021.3 LTS or newer
- TextMeshPro package (included with Unity)

### **Setup (5 minutes)**
1. Import all scripts into your Unity project
2. Create two scenes: `MainMenu` and `Gameplay`
3. Follow the **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for detailed instructions
4. Create 3 simple prefabs: GridCell, WordListItem, LevelButton
5. Wire up UI references in Inspector
6. Press Play!

---

## 🎲 Campaign Difficulty Progression

| Level | Grid Size | Words | Directions | Features |
|-------|-----------|-------|------------|----------|
| 1 | 6×6 | 5 | H, V | Intro level |
| 2 | 7×7 | 6 | H, V + Backward | First challenge |
| 3 | 8×8 | 7 | + Diagonal (fwd) | Diagonal intro |
| 4 | 9×9 | 8 | All 8 directions | Full challenge |
| 5 | 10×10 | 9 | All + longer words | Mid difficulty |
| 6-7 | 11-12 | 10-11 | All directions | High difficulty |
| 8-9 | 13-14 | 12-13 | All + dense | Very hard |
| 10 | 15×15 | 15 | All + longest | Master level |

**Legend:** H = Horizontal, V = Vertical

---

## 🎨 Customization

### **Easy Customizations**

**Change Grid Colors:**
```csharp
// In WordSearchBoardView.cs
public Color normalColor = Color.white;
public Color highlightColor = new Color(1f, 1f, 0.5f); // Yellow
public Color foundColor = new Color(0.5f, 1f, 0.5f);  // Green
```

**Add More Words:**
```csharp
// In WordList.cs - add to any array
private static readonly string[] mediumWords = new string[]
{
    "PYTHON", "COFFEE", "GUITAR", // ... add your words here
};
```

**Adjust Grid Sizing:**
```csharp
// In WordSearchBoardView.cs
public float maxGridWidth = 800f;  // Adjust for different screen sizes
public float cellSpacing = 5f;     // Space between cells
```

**Modify Level Difficulty:**
```csharp
// In CampaignManager.cs - InitializeLevels()
levels[1] = new LevelDefinition(1, 8, 6,  // Larger grid, more words
    allowDiagonal: true,  // Enable diagonals earlier
    allowBackward: true,
    minWordLength: 4,
    maxWordLength: 8);
```

---

## 🔧 Advanced Features

### **Deterministic Generation**
- Each puzzle uses a seed for reproducibility
- Same seed = same puzzle every time
- Perfect for sharing challenges or debugging

### **Save System**
- JSON-based serialization
- Saves to `Application.persistentDataPath`
- Stores: levels completed, current puzzle state, found words, elapsed time
- Platform-agnostic (works on all platforms)

### **Cross-Platform Input**
- Single InputController handles both mouse and touch
- Automatic platform detection
- Adjacent cell selection with backtracking
- Smooth drag experience

---

## 📱 Mobile Optimization

### **Performance**
- Grid size auto-scales based on word count
- Efficient cell pooling possible (future enhancement)
- Minimal draw calls with TextMeshPro

### **Touch Controls**
- Native touch support
- Drag threshold to prevent accidental selections
- Works with multiple screen sizes

### **Build Settings**
- **Android:** Min API 21 (Android 5.0)
- **iOS:** Min iOS 11.0, ARM64 architecture
- Canvas auto-scales to screen resolution

---

## 🧪 Testing Checklist

- [ ] Campaign: Play through all 10 levels
- [ ] Quick Play: Test all 3 difficulties
- [ ] Save/Resume: Quit mid-game and resume
- [ ] Word Selection: Test all 8 directions
- [ ] Backward Words: Verify backward detection
- [ ] Hint System: Use hint, verify it highlights correctly
- [ ] Reset: Clear progress and restart puzzle
- [ ] Mobile: Test touch input on device
- [ ] Multiple Sessions: Verify save persistence across restarts

---

## 🐛 Known Limitations

1. **Word Placement:** Very dense grids may occasionally fail to place all words
   - Mitigation: Generator retries 100 times per word
   - Solution: Increase grid size or reduce word count

2. **No Undo:** Once a selection is made, it cannot be undone
   - Workaround: Use Reset button to start over

3. **No Animation:** Word discovery and highlights are instant
   - Future: Add tweening/animation system

4. **Simple Hint:** Hint reveals entire word path
   - Future: Add progressive hints (first letter only, etc.)

---

## 🛠️ Extension Ideas

### **Easy Extensions:**
- [ ] Add sound effects and background music
- [ ] Implement particle effects for word found
- [ ] Add animations for level transitions
- [ ] Create settings screen (volume, screen shake, etc.)
- [ ] Add "daily challenge" mode with fixed seed

### **Medium Extensions:**
- [ ] Implement star rating (based on time/hints)
- [ ] Add achievement system
- [ ] Create themed word categories
- [ ] Add word definitions on hover
- [ ] Implement high score leaderboards

### **Advanced Extensions:**
- [ ] Multiplayer race mode (who finds words faster)
- [ ] User-generated puzzles
- [ ] Cloud save synchronization
- [ ] Procedural difficulty adjustment (adaptive AI)
- [ ] AR mode for mobile (place puzzle in real world)

---

## 📚 Code Documentation

All scripts include:
- ✅ XML documentation comments
- ✅ Method summaries
- ✅ Parameter descriptions
- ✅ Clear variable naming
- ✅ Organized into logical namespaces

**Example:**
```csharp
/// <summary>
/// Generate a complete puzzle based on level definition
/// </summary>
/// <param name="levelDef">Level configuration</param>
/// <param name="forcedSeed">Optional seed for reproducibility</param>
/// <returns>Complete puzzle with grid and word placements</returns>
public PuzzleData GeneratePuzzle(LevelDefinition levelDef, int? forcedSeed = null)
```

---

## 🤝 Contributing

This is a complete, production-ready codebase. Feel free to:
- Extend functionality
- Fix bugs
- Optimize performance
- Add new features
- Create themes/skins

**Code Style:**
- Follow C# naming conventions
- Add XML comments for public methods
- Keep classes focused (single responsibility)
- Use namespaces to organize code

---

## 📄 License

This code is provided as-is for educational and commercial use.

**Word List:** Public domain common English words

**Dependencies:**
- Unity Engine (Unity Technologies)
- TextMeshPro (Unity Technologies)

---

## 🎓 Learning Resources

**This project demonstrates:**
- ✅ Clean architecture patterns
- ✅ Save/load systems
- ✅ Cross-platform input handling
- ✅ UI/UX best practices
- ✅ Procedural generation
- ✅ State management
- ✅ Data serialization

**Great for learning:**
- Unity UI system
- Mobile game development
- Save system implementation
- Puzzle game mechanics
- Grid-based gameplay

---

## 📞 Support

**Having issues?**
1. Read the [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Check Unity Console for errors
3. Verify all Inspector assignments
4. Ensure scenes are in Build Settings

**Common Errors:**
- `NullReferenceException`: Missing Inspector assignment
- `Scene not found`: Add scenes to Build Settings
- `JSON error`: Delete save file and restart

---

## 🏆 Credits

**Developed by:** Senior Unity Game Engineer  
**Engine:** Unity 2021.3 LTS  
**Language:** C# (.NET Standard 2.1)  
**UI Framework:** Unity UI + TextMeshPro  

---

**Ready to build your Word Search game? Start with [SETUP_GUIDE.md](SETUP_GUIDE.md)!** 🚀

---

**⭐ If you find this useful, please star the repository!**
