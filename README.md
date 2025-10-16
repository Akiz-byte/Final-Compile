# The Final Compile: Endgame

A word-guessing game built with React where you try to guess programming-related words before running out of attempts. Lose too many times and Assembly takes over!

## 🎮 Live Demo

##[final-compile](https://final-compile.netlify.app/)

## 📸 Screenshots

### Game Start
![Game Start](./public/Endgame%20start.JPG)
*Ready to play - guess the programming word!*

### Win State
![Win State with Confetti](./public/Endgame%20win.JPG)
*Victory celebration with confetti effect 🎉*

## About

This is a project I built while working through the Scrimba frontend path. It's basically Hangman but with a programming theme. Each wrong guess "kills" a programming language until you're left with only Assembly (the final boss of programming languages lol).

The game includes:
- Random word selection from a pool of programming terms
- Visual feedback with color-coded language chips
- Toast notifications showing remaining guesses
- Confetti celebration when you win
- Farewell messages in different styles when you guess wrong

## Tech Stack

- **React** - for the UI and state management
- **Vite** - fast dev server and build tool
- **clsx** - conditional CSS classes
- **react-hot-toast** - toast notifications
- **react-confetti** - celebration effects
- **Radix UI Tooltip** - accessible tooltips

## Getting Started

Clone the repo and install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How to Play

1. Click letters to guess the hidden word
2. You have 8 attempts (one for each programming language)
3. Each wrong guess eliminates a language
4. Guess the word before Assembly is your only option!
5. Click "New Game" to play again

## What I Learned

- Managing complex state with React hooks
- Conditional rendering and dynamic styling
- Working with third-party React libraries
- Creating responsive game logic
- Using Vite for faster development

## Future Improvements

Some things I might add:
- Keyboard support for typing letters
- Difficulty levels with different word lists
- Score tracking/leaderboard
- Sound effects
- Mobile-friendly layout improvements

---

Feel free to fork this and make it your own!
