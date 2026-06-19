'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QUESTIONS, GAME_COST, TIME_LIMIT } from '@/lib/quizData';
import { getCredits, deductCredits, addCredits } from '@/lib/creditsProvider';

export default function QuizPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [credits, setCredits] = useState(getCredits());
  const [gameOver, setGameOver] = useState(false);
  const [canAffordGame, setCanAffordGame] = useState(true);

  // Check if player can afford the game and deduct credits when starting
  useEffect(() => {
    const playerCredits = getCredits();
    if (playerCredits < GAME_COST) {
      setCanAffordGame(false);
    } else {
      setCanAffordGame(true);
    }
  }, []);

  // Deduct credits when game starts (only once)
  useEffect(() => {
    if (gameStarted && !gameOver && answers.length === 0) {
      if (deductCredits(GAME_COST)) {
        setCredits(getCredits());
      }
    }
  }, [gameStarted]);

  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return TIME_LIMIT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, currentQuestion, selectedAnswer]);

  const handleStartGame = () => {
    if (!canAffordGame) return;
    setGameStarted(true);
    setTimeLeft(TIME_LIMIT);
  };

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(index);
    const isCorrect = index === QUESTIONS[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

    setTimeout(() => {
      handleNextQuestion();
    }, 500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(TIME_LIMIT);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameOver(true);
    // Award points for correct answers
    const earnedCredits = score * 10;
    addCredits(earnedCredits);
    setCredits(getCredits());
  };

  if (!gameStarted && !gameOver) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <Link href="/" className="absolute top-4 left-4 text-green-500 hover:text-green-400">
          ← Back Home
        </Link>

        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-500 mb-6">Bible Quiz</h1>
          
          {!canAffordGame ? (
            <div className="bg-red-900 border-2 border-red-600 rounded-lg p-8 max-w-md">
              <p className="text-red-200 text-lg mb-4">Not enough credits to play!</p>
              <p className="text-red-300 mb-4">Required: {GAME_COST} coins</p>
              <p className="text-red-300">Current: {credits} coins</p>
              <Link href="/">
                <button className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-black font-bold rounded border-2 border-red-600">
                  Go Home
                </button>
              </Link>
            </div>
          ) : (
            <div className="bg-gray-900 border-2 border-green-600 rounded-lg p-8 max-w-md">
              <p className="text-green-400 mb-6 text-lg">
                Ready to test your Bible knowledge?
              </p>
              <p className="text-gray-300 mb-6">
                {QUESTIONS.length} questions • {TIME_LIMIT}s per question
              </p>
              <p className="text-red-400 font-bold mb-6">Cost: {GAME_COST} coins</p>
              <button
                onClick={handleStartGame}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-black font-bold rounded-lg border-2 border-red-600 transition"
              >
                Start Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    const earnedCredits = score * 10;

    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <h1 className="text-5xl font-bold text-green-500 mb-8">Quiz Complete!</h1>

          <div className="bg-gray-900 border-2 border-green-600 rounded-lg p-8 mb-6">
            <p className="text-gray-300 text-lg mb-4">Final Score</p>
            <p className="text-5xl font-bold text-green-500 mb-2">
              {score}/{QUESTIONS.length}
            </p>
            <p className="text-2xl text-green-400 mb-6">{percentage}%</p>

            <div className="bg-gradient-to-b from-green-600 to-green-700 px-4 py-3 rounded mb-4 border border-red-600">
              <p className="text-black font-bold text-sm">COINS EARNED</p>
              <p className="text-white text-2xl font-bold">+{earnedCredits}</p>
            </div>

            <p className="text-gray-400 mb-6">
              New Balance: <span className="text-green-400 font-bold">{credits}</span> coins
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="/quiz" className="flex-1">
              <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-black font-bold rounded border-2 border-red-600">
                Play Again
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-800 text-green-400 font-bold rounded border-2 border-green-600">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-green-500 hover:text-green-400 text-sm">
          ← Exit
        </Link>
        <div className="text-center">
          <p className="text-green-500 font-bold">Question {currentQuestion + 1}/{QUESTIONS.length}</p>
          <p className="text-gray-400 text-sm">{score} correct</p>
        </div>
        <div className="text-right">
          <p className="text-red-500 font-bold text-2xl">{timeLeft}s</p>
          <p className="text-gray-400 text-sm">Time Left</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-8 border border-green-600">
        <div
          className="bg-gradient-to-r from-green-600 to-red-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full mb-8">
        <h2 className="text-3xl font-bold text-green-500 text-center mb-12">
          {question.text}
        </h2>

        {/* Answers */}
        <div className="grid grid-cols-1 gap-4 w-full">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correct;
            const isSelected = index === selectedAnswer;

            let bgColor = 'bg-gray-800 hover:bg-gray-700 border-gray-600';
            
            if (isAnswered) {
              if (isCorrect) {
                bgColor = 'bg-green-600 border-green-400';
              } else if (isSelected && !isCorrect) {
                bgColor = 'bg-red-600 border-red-400';
              }
            } else if (isSelected) {
              bgColor = 'bg-green-600 border-green-400';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
                className={`p-4 rounded-lg border-2 font-bold text-lg transition ${bgColor} ${
                  isAnswered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span className="text-gray-300 mr-4">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="text-white">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom info */}
      <div className="text-center text-gray-500 text-sm">
        <p>Select an answer to continue to the next question</p>
      </div>
    </div>
  );
}
