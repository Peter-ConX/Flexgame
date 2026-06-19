#!/bin/bash

# FlexGame Deployment Script
# This script prepares the project for deployment to Vercel

echo "🚀 FlexGame Deployment Script"
echo "=============================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "Visit: https://git-scm.com/download/win"
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial FlexGame MVP - River of Games with 10 Interactive Games"

# Add remote origin
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/Peter-ConX/Flexgame.git 2>/dev/null || git remote set-url origin https://github.com/Peter-ConX/Flexgame.git

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment script completed!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'New Project'"
echo "4. Select the Flexgame repository"
echo "5. Configure environment variables"
echo "6. Deploy!"
echo ""
echo "🎉 Your game platform will be live soon!"
