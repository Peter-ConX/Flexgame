import { DAILY_CREDITS } from './quizData';

const CREDITS_KEY = 'bible_quiz_credits';
const LAST_RESET_KEY = 'bible_quiz_last_reset';

function getTodayString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
}

export function getCredits(): number {
  if (typeof window === 'undefined') return DAILY_CREDITS;
  
  const stored = localStorage.getItem(CREDITS_KEY);
  const lastReset = localStorage.getItem(LAST_RESET_KEY);
  const today = getTodayString();

  // If it's a new day, reset credits
  if (lastReset !== today) {
    localStorage.setItem(CREDITS_KEY, DAILY_CREDITS.toString());
    localStorage.setItem(LAST_RESET_KEY, today);
    return DAILY_CREDITS;
  }

  return stored ? parseInt(stored, 10) : DAILY_CREDITS;
}

export function deductCredits(amount: number): boolean {
  const current = getCredits();
  
  if (current < amount) {
    return false;
  }

  const newAmount = current - amount;
  localStorage.setItem(CREDITS_KEY, newAmount.toString());
  return true;
}

export function addCredits(amount: number): void {
  const current = getCredits();
  const newAmount = current + amount;
  localStorage.setItem(CREDITS_KEY, newAmount.toString());
}

export function resetCredits(): void {
  localStorage.setItem(CREDITS_KEY, DAILY_CREDITS.toString());
  localStorage.setItem(LAST_RESET_KEY, getTodayString());
}
