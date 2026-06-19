# 📋 FlexGame - Commands Cheat Sheet

## Installation & Setup

### Initial Setup
```bash
# Navigate to project directory
cd c:\Users\OKAFOR PETER\Jetphase\flexgame

# Install dependencies (do this first!)
npm install

# Install specific packages if needed
npm install package-name
npm install --save-dev package-name
```

## Development Commands

### Start Development Server
```bash
# Standard development server (hot reload enabled)
npm run dev

# Development server on different port
npm run dev -- -p 3001
```

### Build & Run Production
```bash
# Build for production
npm run build

# Run production build locally
npm start
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## Git Commands

### Initial Git Setup (One Time)
```bash
# Initialize git repository
git init

# Configure user (do this once)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Configure globally (optional)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Daily Workflow
```bash
# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# View status
git status

# View commit history
git log
```

### Push to GitHub
```bash
# First time setup - add remote
git remote add origin https://github.com/Peter-ConX/Flexgame.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub (first time)
git push -u origin main

# Push updates (after first push)
git push

# Pull latest changes
git pull
```

### Branching (for features)
```bash
# Create new branch
git checkout -b feature/your-feature-name

# Switch branches
git checkout branch-name

# List branches
git branch -a

# Delete branch
git branch -d branch-name

# Push branch to GitHub
git push -u origin feature/your-feature-name
```

## npm Package Management

### Install Packages
```bash
# Install from npm registry
npm install package-name

# Install specific version
npm install package-name@1.2.3

# Install as dev dependency
npm install --save-dev package-name
npm install -D package-name

# Install all dependencies from package.json
npm install

# Clean install (remove node_modules first)
rm -r node_modules
npm install
```

### Update Packages
```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name
```

### Remove Packages
```bash
# Uninstall package
npm uninstall package-name

# Remove from package.json
npm uninstall --save package-name
```

## Vercel Deployment Commands

### Manual Deployment
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod

# View deployment info
vercel ls
```

## File & Directory Management

### Using PowerShell (Windows)
```powershell
# Navigate directories
cd path\to\directory
cd ..                              # Go up one level
cd ~                               # Go to home

# List files
ls                                 # List current directory
ls -Recurse                        # List recursively
dir                                # Alternative to ls

# Create directory
mkdir folder-name
New-Item -ItemType Directory -Name "folder-name"

# Create file
New-Item -ItemType File -Name "filename.txt"

# Delete
Remove-Item filename.txt           # Delete file
Remove-Item -Recurse folder-name   # Delete directory

# Copy
Copy-Item source.txt destination.txt

# Move/Rename
Move-Item old-name.txt new-name.txt

# View file content
Get-Content filename.txt
cat filename.txt
```

### Using Git Bash / Terminal
```bash
# Navigate
cd path/to/directory
cd ..

# List files
ls
ls -la                             # With details
ls -la | grep "pattern"            # Filter

# Create
mkdir folder-name
touch filename.txt

# Delete
rm filename.txt
rm -r folder-name                  # Delete directory

# Copy
cp source.txt destination.txt
cp -r source-folder/ destination/

# Move/Rename
mv old-name.txt new-name.txt

# View file
cat filename.txt
cat filename.txt | head -20        # First 20 lines
cat filename.txt | tail -20        # Last 20 lines
```

## Debugging Commands

### View Logs
```bash
# View npm debug log
cat ~/.npm/_logs/debug-0.log       # macOS/Linux
cat %APPDATA%\npm\_logs\debug-0.log # Windows

# View Vercel logs
vercel logs
```

### Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Clear next.js cache
rm -r .next
```

### Port Issues
```bash
# Check what's using port 3000
lsof -i :3000                      # macOS/Linux
Get-NetTCPConnection -LocalPort 3000 # PowerShell

# Kill process on port
kill -9 PID                        # macOS/Linux
Stop-Process -Id PID               # PowerShell
```

## Environment & Configuration

### Environment Variables
```bash
# View all environment variables
env                                # macOS/Linux
Get-ChildItem env:                 # PowerShell
set                                # Windows CMD

# Set temporary environment variable
export VAR_NAME="value"            # macOS/Linux
$env:VAR_NAME="value"              # PowerShell
set VAR_NAME=value                 # Windows CMD
```

## Testing Commands

### Run Tests (when configured)
```bash
npm test
npm test -- --watch
npm test -- --coverage
```

## Useful Shortcuts

### Terminal/PowerShell
```
Ctrl + C          Stop running process
Ctrl + D          Exit terminal
Ctrl + L          Clear screen (cls in PowerShell)
Ctrl + A          Select all (in command line)
↑ / ↓             Previous/next command in history
Tab               Auto-complete
```

### VS Code (in terminal)
```bash
code .             # Open current folder in VS Code
code filename.ts   # Open specific file
```

## Quick Reference

### Common Commands Workflow
```bash
# 1. Setup
npm install

# 2. Development
npm run dev
# Visit http://localhost:3000

# 3. Make changes in VS Code

# 4. Test locally

# 5. Git workflow
git add .
git commit -m "Feature description"
git push

# 6. Deploy
vercel --prod
# OR push to GitHub and deploy via Vercel dashboard
```

### Common Issues & Fixes
```bash
# Build fails
npm cache clean --force
npm install
npm run build

# Port already in use
npm run dev -- -p 3001

# Module not found
rm -r node_modules package-lock.json
npm install

# Git authentication issues
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Important File Paths

### Project Structure
```
c:\Users\OKAFOR PETER\Jetphase\flexgame\
├── app/                  # Application code
├── public/              # Static files
├── node_modules/        # Dependencies (generated)
├── .next/               # Build output (generated)
├── .env.local           # Local environment variables
├── package.json         # Project configuration
└── tsconfig.json        # TypeScript configuration
```

## NPM Scripts in package.json
```json
{
  "scripts": {
    "dev": "next dev",           // Start dev server
    "build": "next build",       // Build for production
    "start": "next start",       // Run production build
    "lint": "eslint ."           // Run linter
  }
}
```

---

**Pro Tips:**
- 📌 Save this file for quick reference
- 🔄 Use arrow keys to navigate command history
- 💡 Use Tab for auto-complete
- 📝 Copy-paste commands carefully
- 🚀 Bookmark for future use

**Ready to code?** Start with: `npm run dev`
