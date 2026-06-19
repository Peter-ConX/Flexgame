# 🎮 FlexGame - Quick Start Guide

## Welcome to FlexGame!

A river of games awaits you. Let's get started in just 5 minutes!

## Step 1: Install Dependencies

```bash
cd c:\Users\OKAFOR PETER\Jetphase\flexgame
npm install
```

**What happens**: Downloads all required packages (React, Next.js, Tailwind CSS, etc.)

## Step 2: Start the Development Server

```bash
npm run dev
```

**Output**: You should see:
```
▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

## Step 3: Open in Browser

Visit: **http://localhost:3000**

You should see the FlexGame home page with:
- ✨ Interactive water waves (click to create ripples!)
- 🔴 Red Login Button
- 🟢 Green Sign Up Button

## Step 4: Test the App

### Option A: Sign Up (New User)
1. Click "Sign Up"
2. Enter your email: `newuser@example.com`
3. Click "Sign Up"
4. Alert confirms account creation
5. Redirects to login page

### Option B: Login (Existing User)
1. Click "Login"
2. Email: `test@example.com`
3. Password: `3010`
4. Click "Login"

### Step 5: Change Password
1. You'll be redirected to password change page
2. Enter new password (min 6 characters)
3. Confirm password
4. Click "Update Password"

### Step 6: Play Games!
1. Dashboard shows all 10 games
2. Click any game card to play
3. Each game has unique gameplay:

#### Games Overview:
- 📖 **Bible Trivia**: Multiple choice questions about the Bible
- 🔤 **Word Scramble**: Unscramble letters to form words
- 🧠 **Memory Match**: Click cards to find matching pairs
- ❓ **Quiz Master**: General knowledge questions
- ⌨️ **Typing Race**: Type text as fast as you can (60 seconds)
- 🔢 **Number Puzzle**: Solve mathematical challenges
- 🐦 **Flappy Bird**: Avoid obstacles (demo version)
- 🐍 **Snake Game**: Eat food and grow (demo version)
- 🧩 **Puzzle Master**: Solve complex puzzles (demo version)
- ⚡ **Reaction Time**: Test your reflexes

## Design Elements

### Colors
- 🔴 Red (#ff0000) - Buttons, highlights
- 🟢 Green (#22ff22) - Text, borders, success
- ⚫ Black (#000000) - Background

### Interactive Features
- Click anywhere on home page to create water waves
- Hover effects on buttons
- Responsive grid layout
- Touch-friendly on mobile

## File Structure

```
flexgame/
├── app/
│   ├── api/auth/           ← Authentication endpoints
│   ├── auth/               ← Login, Signup, Password change pages
│   ├── dashboard/          ← Game selection dashboard
│   ├── games/[id]/         ← Individual game components
│   ├── page.tsx            ← Home page with water effects
│   ├── layout.tsx          ← Root layout
│   └── globals.css         ← Tailwind CSS
├── public/                 ← Static assets
├── .env.local              ← Environment variables (local)
├── package.json            ← Dependencies
└── README.md               ← Full documentation
```

## Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint and fix code
npm run lint
```

## Test Credentials

**Default Test Account:**
- Email: `test@example.com`
- Password: `3010` (then change to something else on first login)

**Create New Account:**
- Any email address works for signup
- All new accounts get password `3010` sent to them

## Troubleshooting

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Dependencies installation fails
```bash
# Clear cache and reinstall
npm cache clean --force
rm -r node_modules
npm install
```

### Hot reload not working
- Restart dev server: `Ctrl + C` then `npm run dev`
- Clear browser cache (Ctrl + Shift + Delete)

### Build errors
- Check terminal for specific error messages
- Ensure all files are saved
- Try: `npm cache clean --force && npm install`

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps

1. **Explore the Code**: Check out the game components in `/app/games`
2. **Customize**: Edit colors in `globals.css` and `page.tsx`
3. **Add More Games**: Create new game components in `/app/games`
4. **Deploy**: Follow DEPLOYMENT.md guide
5. **Database**: Integrate MongoDB or Firebase

## Tips & Tricks

💡 **Performance**: Games run smoothly with canvas-based graphics

💡 **Mobile**: All components are responsive and touch-friendly

💡 **Customization**: Edit color scheme in `globals.css` (line numbers provided)

💡 **Water Effects**: Canvas animation is optimized for 60 FPS

## Commands Cheat Sheet

```bash
# Install
npm install

# Development
npm run dev          # Start dev server
npm run lint         # Check code style

# Production
npm run build        # Build for production
npm start           # Run production build
```

## Important Notes

⚠️ **Local Storage**: Login tokens stored in browser's localStorage

⚠️ **Mock Database**: Current version uses in-memory storage (resets on refresh)

⚠️ **Email Simulation**: Signup email notification is logged to console (replace with real email service)

## Get Started Now! 🚀

```bash
cd c:\Users\OKAFOR PETER\Jetphase\flexgame
npm install
npm run dev
```

Open http://localhost:3000 and start playing!

---

**Questions?** Check out:
- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Vercel deployment guide
- [Next.js Docs](https://nextjs.org/docs)

**Happy Gaming! 🎮🌊**
