# 🚀 FlexGame Deployment Guide

## Prerequisites
- Node.js 18+ installed
- GitHub account
- Vercel account (free)
- Git installed (download from https://git-scm.com/download/win)

## Step 1: Prepare Your Local Repository

### 1.1 Open Terminal/PowerShell in the flexgame directory
```powershell
cd "c:\Users\OKAFOR PETER\Jetphase\flexgame"
```

### 1.2 Initialize Git (if not already done)
```bash
git init
```

### 1.3 Configure Git
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 1.4 Add all files
```bash
git add .
```

### 1.5 Create initial commit
```bash
git commit -m "Initial FlexGame MVP - River of Games with 10 Interactive Games"
```

### 1.6 Add GitHub remote
```bash
git remote add origin https://github.com/Peter-ConX/Flexgame.git
```

### 1.7 Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Go to Vercel
Visit: https://vercel.com

### 2.2 Sign In with GitHub
- Click "Continue with GitHub"
- Authorize Vercel to access your GitHub account

### 2.3 Create New Project
- Click "New Project"
- Find and select the "Flexgame" repository
- Click "Import"

### 2.4 Configure Project
- **Framework Preset**: Next.js (automatically detected)
- **Root Directory**: ./ (default)
- **Build Command**: next build (default)
- **Output Directory**: .next (default)

### 2.5 Environment Variables
Add these to Vercel:
```
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
DATABASE_URL=mongodb://your-connection-string (optional)
JWT_SECRET=your-super-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 2.6 Deploy
- Click "Deploy"
- Wait for the build to complete (usually 2-3 minutes)
- Your app will be live at `https://flexgame-xxx.vercel.app`

## Step 3: Add Custom Domain

### 3.1 In Vercel Dashboard
- Go to your project settings
- Click "Domains"
- Click "Add"
- Enter your custom domain
- Update your domain's DNS settings (instructions provided by Vercel)

## Step 4: Test Your Deployment

### 4.1 Visit Your Live App
- Open your Vercel domain in a browser
- Test the signup process
- Test the login with: test@example.com / 3010
- Play some games!

## Troubleshooting

### Build Fails
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `npm cache clean --force`
- Reinstall dependencies: `rm -r node_modules && npm install`

### Deployment Fails
- Check environment variables are correctly set
- Verify .env.local is in .gitignore (shouldn't be pushed)
- Check logs in Vercel dashboard for specific errors

### White Screen After Deploy
- Open browser developer tools (F12)
- Check console for errors
- Verify API endpoints are accessible

## Project Features Summary

✅ **Authentication**
- Sign up with email
- Default password: 3010
- Force password change on first login
- Session management

✅ **10 Games**
1. Bible Trivia
2. Word Scramble
3. Memory Match
4. Quiz Master
5. Typing Race
6. Number Puzzle
7. Flappy Bird Clone
8. Snake Game
9. Puzzle Master
10. Reaction Time

✅ **Design**
- Red, Green, Black color scheme
- Interactive water wave effects
- Responsive layout
- Touch-friendly interface

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Custom domain configured
- [ ] SSL certificate enabled (automatic with Vercel)
- [ ] Database integrated (if using MongoDB)
- [ ] Email service configured (Gmail/SendGrid)
- [ ] Analytics installed (optional)
- [ ] Error monitoring set up (optional)
- [ ] Backup strategy in place

## Performance Optimization Tips

1. **Images**: Optimize before upload
2. **Database**: Use indexing for fast queries
3. **Caching**: Enable Vercel edge caching
4. **Code Splitting**: Already handled by Next.js
5. **Monitoring**: Use Vercel Analytics

## Security Best Practices

1. Never commit .env.local
2. Use strong JWT secret
3. Validate all user inputs
4. Use HTTPS (automatic with Vercel)
5. Keep dependencies updated
6. Regular security audits

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com
- **GitHub Help**: https://docs.github.com

---

**You're all set! 🎉 Your FlexGame platform is ready to go live!**
