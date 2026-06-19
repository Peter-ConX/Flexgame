# Bible Quiz - Interactive Game Platform 🌊

A no-login required Bible quiz game with an interactive water wave effect, daily credit system, and 45 comprehensive Bible questions.

## Features

### 🎮 Game Mechanics
- **45 Bible Quiz Questions** across 3 difficulty levels (15 easy, 15 medium, 15 hard)
- **10-second timer** per question with automatic progression
- **Multiple-choice format** with instant feedback (correct answers turn green)
- **Score tracking** with real-time accuracy updates
- **Earning System**: 10 coins per correct answer

### 💰 Credit System
- **100 daily credits** automatically reset each day at midnight
- **20 credits per game** - required to start a quiz
- **Instant credit deduction** when starting a game
- **Rewards for correct answers** - earn 10 coins per correct question
- **Persistent storage** using browser localStorage
- **No login required** - instant access to gameplay

### 🌊 Interactive Water Effect
- **Dynamic water waves** that respond to mouse clicks and touch
- **Red, green, and black color scheme** for biblical aesthetic
- **Smooth animations** with physics-based wave propagation
- **Touch-friendly** for mobile devices
- **Immersive visual experience** on homepage

### 🎨 Design
- **Dark theme** with high contrast for readability
- **Red and green accent colors** (biblical/gaming aesthetic)
- **Responsive layout** that works on desktop and mobile
- **Clean, modern interface** with smooth transitions
- **Tailwind CSS v4** for styling

## How to Play

### Starting a Game
1. Visit the homepage at `http://localhost:3000`
2. Check your daily credits (displayed in top-right corner)
3. Click **"Start Quiz (20 coins)"** button
4. Answer 45 Bible questions within the 10-second time limit per question

### Answering Questions
- Click on one of the four multiple-choice options (A, B, C, or D)
- Correct answers turn **green** and you earn points
- Wrong answers turn **red**
- The game automatically moves to the next question
- Progress bar shows your completion status

### Viewing Results
- After completing all 45 questions, see your final score
- View percentage accuracy
- Coins earned (score × 10)
- New credit balance
- Option to play again or return home

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **State Management**: React Hooks with localStorage
- **Canvas**: HTML5 Canvas for water wave effects
- **Package Manager**: npm or pnpm

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

## File Structure

```
flexgame/
├── app/
│   ├── page.tsx              # Homepage with water effect and credit display
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles and theme
│   └── quiz/
│       └── page.tsx          # Quiz game interface and logic
├── lib/
│   ├── quizData.ts          # 45 Bible questions database
│   └── creditsProvider.ts   # Credit system logic (daily reset, deduction)
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── tailwind.config.js       # Tailwind configuration
```

## Key Components

### Home Page (`app/page.tsx`)
- Interactive water wave canvas with click/touch response
- Credit balance display with gradient styling
- Play button with affordability check
- Daily reset logic
- Status indicator for ready-to-play state

### Quiz Page (`app/quiz/page.tsx`)
- Question display with 10-second countdown
- Multiple-choice answer buttons with A/B/C/D labels
- Real-time score tracking
- Progress bar showing quiz completion
- Results screen with earnings summary
- Navigation to home or replay

### Quiz Data (`lib/quizData.ts`)
- 45 carefully selected Bible questions
- Easy, Medium, and Hard difficulty levels
- Multiple-choice options for each question
- Correct answer indicators
- XP reward values

### Credits Provider (`lib/creditsProvider.ts`)
- Daily credit management
- Date-based reset (midnight UTC)
- Credit deduction for game play
- Credit rewards for correct answers
- Persistent storage with validation

## Gameplay Rules

- **Timer**: 10 seconds per question (auto-advance if no answer)
- **Cost**: 20 credits per game
- **Reward**: 10 credits per correct answer (max 450 credits per perfect game)
- **Daily Limit**: 100 credits reset at midnight each day
- **No Authentication**: Completely open access
- **Questions**: 45 total across all difficulty levels

## Color Scheme

- **Background**: Pure black (#000000)
- **Primary**: Green (#22ff22) - correct answers, emphasis
- **Accent**: Red (#ef4444) - wrong answers, borders
- **Text**: White on dark backgrounds for contrast
- **Gradients**: Green gradients for interactive elements

## Browser Compatibility

- Modern browsers with ES6 support
- Canvas API support for water effects
- localStorage support for persistence
- Works on desktop, tablet, and mobile
- Tested on Chrome, Firefox, Safari, Edge

## Credits and Scoring

### Earning Credits
- **Start with**: 100 daily credits
- **Game cost**: 20 coins
- **Correct answer bonus**: 10 coins each
- **Maximum per game**: 450 coins (45 correct answers)
- **Total possible per day**: 550 coins (100 base + 450 bonus)

### Daily Reset
- Credits reset at midnight UTC
- Based on calendar date, not 24-hour rolling window
- Players who run out can wait until next day
- Reset happens automatically in browser

## Example Quiz Questions

### Easy Level
- "Who built the ark?" (Answer: Noah)
- "What is the first book of the Bible?" (Answer: Genesis)
- "Who betrayed Jesus?" (Answer: Judas)

### Medium Level
- "Who interpreted Pharaoh's dreams?" (Answer: Joseph)
- "What city did the walls fall after marching around it?" (Answer: Jericho)
- "Who was the first king of Israel?" (Answer: Saul)

### Hard Level
- "Which prophet confronted King Ahab on Mount Carmel?" (Answer: Elijah)
- "Who was the prophet that married a prostitute as a sign to Israel?" (Answer: Hosea)
- "Who was the king who saw the writing on the wall?" (Answer: Belshazzar)

## Future Enhancements

Potential features for future releases:
- Difficulty selection (Easy/Medium/Hard only)
- Multiplayer competitive mode
- Leaderboards with persistent rankings
- Achievement badges and milestones
- Question categories by Bible books
- Customizable daily credit amounts
- Admin dashboard for managing questions
- Sound effects and background music
- Difficulty-based rewards
- Streaks and daily challenges

## Development Notes

- All data is stored in browser localStorage
- No server-side persistence required
- Perfect for standalone deployment
- Great for educational purposes
- Easy to customize questions and credit amounts
- Water effect uses requestAnimationFrame for smooth 60fps animation

## Performance Considerations

- Optimized for fast load times
- Minimal dependencies
- Efficient canvas rendering
- Lazy-loaded quiz questions
- Smooth animations with GPU acceleration
- Mobile-optimized touch interactions

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Port: 3000 (configurable)

## Learning Resources

- Bible Quiz Questions - Comprehensive collection across difficulty levels
- Water Wave Physics - Based on sine wave propagation
- React Hooks - State management and side effects
- Canvas API - 2D drawing and animation
- localStorage - Client-side data persistence

---

**Built with ❤️ as a Bible quiz game with interactive water effects**

*"Test your Bible knowledge with the River of Questions!"* 🌊📖
