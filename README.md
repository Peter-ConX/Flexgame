# FlexGame - River of Games 🌊

An interactive gaming platform with a stunning water-based UI design. Users can sign up, authenticate, and play 10 exciting games.

## Features

### ✨ Authentication System
- **Sign Up**: Users register with their email
- **Default Credentials**: Email is username, password is `3010`
- **Email Notification**: Credentials sent via email (simulated in MVP)
- **Password Change**: Forced password change on first login
- **Secure Session**: Token-based authentication

### 🎮 10 Games Included

1. **Bible Trivia** - Test your biblical knowledge (📖)
2. **Word Scramble** - Unscramble letters to form words (🔤)
3. **Memory Match** - Match pairs of cards (🧠)
4. **Quiz Master** - General knowledge questions (❓)
5. **Typing Race** - Test your typing speed (⌨️)
6. **Number Puzzle** - Solve mathematical challenges (🔢)
7. **Flappy Bird Clone** - Classic avoidance game (🐦)
8. **Snake Game** - Classic snake gameplay (🐍)
9. **Puzzle Master** - Complex puzzle challenges (🧩)
10. **Reaction Time** - Measure your reflexes (⚡)

### 🎨 Design Features
- **Color Scheme**: Red (#ff0000), Green (#22ff22), Black (#000000)
- **Water Effects**: Interactive canvas with wave animations
- **Responsive Design**: Works on desktop and mobile
- **Touch-Friendly**: Click anywhere to create water ripples

## Tech Stack

**Frontend**
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Canvas API for water effects

**Backend**
- Next.js API Routes
- Mock Database (ready for MongoDB/Firebase integration)
- JWT Tokens for authentication

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Peter-ConX/Flexgame.git
cd flexgame
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=mongodb://localhost:27017/flexgame
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Usage

1. **Home Page**: Click Login or Sign Up
2. **Sign Up**: Enter your email
3. **Login**: Use your email and password `3010`
4. **Change Password**: Update your password on first login
5. **Play Games**: Select any of the 10 games from the dashboard
6. **Earn Points**: Complete games to earn scores

## Test Account
- **Email**: test@example.com
- **Password**: 3010

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial FlexGame MVP"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repo
4. Configure environment variables
5. Deploy!

### 3. Custom Domain
Once deployed, add your custom domain through Vercel dashboard.

## Project Structure

```
flexgame/
├── app/
│   ├── api/
│   │   └── auth/              # Authentication endpoints
│   ├── auth/                  # Auth pages (login, signup, change-password)
│   ├── dashboard/             # Game dashboard
│   ├── games/                 # Individual game components
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page with water effects
│   └── globals.css            # Global styles
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/change-password` - Change password

### Response Format
```json
{
  "success": true,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "message": "Success message"
}
```

## Future Enhancements

- [ ] Real MongoDB integration
- [ ] Email notifications with Nodemailer
- [ ] Leaderboard system
- [ ] Game statistics tracking
- [ ] Multiplayer games
- [ ] In-game achievements
- [ ] Sound effects and music
- [ ] Dark mode toggle
- [ ] User profiles
- [ ] Game difficulty levels

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Peter Okoro** - FlexGame Creator

## Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Built with ❤️ by Peter Okoro**

*"Turn every click into waves of fun!"* 🌊🎮

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
