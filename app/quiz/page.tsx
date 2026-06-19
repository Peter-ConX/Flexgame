'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getShuffledQuestions, type Question } from '@/lib/bibleQuestions';
import {
  getRoom,
  updatePlayerAnswer,
  updatePlayerScore,
  finishGame,
  getRanking,
} from '@/lib/roomSystem';

function QuizContent() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get('room');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [playerInfo, setPlayerInfo] = useState({ id: '', name: 'You' });
  const [opponentInfo, setOpponentInfo] = useState({ id: '', name: '', score: 0 });

  useEffect(() => {
    if (!roomCode) {
      window.location.href = '/';
      return;
    }

    const room = getRoom(roomCode);
    if (!room) {
      window.location.href = '/';
      return;
    }

    const playerId = localStorage.getItem('currentPlayerId');
    if (!playerId) {
      window.location.href = '/';
      return;
    }

    const currentPlayer = room.players.find((p) => p.id === playerId);
    if (!currentPlayer) {
      window.location.href = '/';
      return;
    }

    setPlayerInfo({ id: playerId, name: currentPlayer.name });

    const opponent = room.players.find((p) => p.id !== playerId);
    if (opponent) {
      setOpponentInfo({
        id: opponent.id,
        name: opponent.name,
        score: opponent.score,
      });
    }

    setQuestions(getShuffledQuestions());
  }, [roomCode]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, gameStarted, gameOver]);

  const handleAnswer = (optionIndex: number) => {
    if (showResult || !gameStarted) return;

    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    updatePlayerAnswer(roomCode!, playerInfo.id, currentQuestion, optionIndex);

    const isCorrect =
      optionIndex === questions[currentQuestion].correct;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      updatePlayerScore(roomCode!, playerInfo.id, newScore);
    }

    setShowResult(true);
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
      setShowResult(false);
    } else {
      setGameOver(true);
      finishGame(roomCode!);
    }
  };

  const handleStartQuiz = () => {
    setGameStarted(true);
    setTimeLeft(10);
  };

  if (!gameStarted && !gameOver) {
    return (
      <div className="w-full h-screen gradient-primary flex items-center justify-center">
        <div className="bg-background-secondary/80 backdrop-blur-md p-12 rounded-xl border-2 border-foreground neon-glow max-w-lg w-full mx-4 text-center">
          <h2 className="text-4xl font-black text-neon-glow mb-4">
            READY?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            10 questions. 10 seconds each. Test your Bible knowledge!
          </p>
          <button
            onClick={handleStartQuiz}
            className="w-full px-8 py-4 bg-gradient-accent text-black font-black text-xl rounded-lg neon-glow hover:scale-105 smooth-transition"
          >
            START QUIZ
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const room = getRoom(roomCode!);
    const ranking = getRanking(roomCode!);
    const playerRank = ranking.findIndex((p) => p.id === playerInfo.id) + 1;

    return (
      <div className="w-full h-screen gradient-primary flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-black text-neon-glow mb-4">
              {playerRank === 1 ? 'VICTORY!' : 'GAME OVER'}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-background-secondary/80 backdrop-blur-md p-6 rounded-xl border-2 border-foreground neon-glow">
              <p className="text-text-secondary text-sm mb-2">YOUR SCORE</p>
              <p className="text-4xl font-black text-neon-glow">{score}/10</p>
              <p className="text-text-secondary text-sm mt-2">
                {Math.round((score / 10) * 100)}% Accuracy
              </p>
            </div>

            {opponentInfo.id && (
              <div className="bg-background-secondary/80 backdrop-blur-md p-6 rounded-xl border-2 border-accent-cyan neon-glow-cyan">
                <p className="text-text-secondary text-sm mb-2">
                  {opponentInfo.name.toUpperCase()}&apos;S SCORE
                </p>
                <p className="text-4xl font-black text-accent-cyan">
                  {opponentInfo.score}/10
                </p>
                <p className="text-text-secondary text-sm mt-2">
                  {Math.round((opponentInfo.score / 10) * 100)}% Accuracy
                </p>
              </div>
            )}
          </div>

          <div className="bg-background-secondary/80 backdrop-blur-md p-8 rounded-xl border-2 border-accent-gold mb-8">
            <h3 className="text-2xl font-black text-accent-gold mb-6 text-center">
              LEADERBOARD
            </h3>
            <div className="space-y-3">
              {ranking.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    player.id === playerInfo.id
                      ? 'border-neon-glow bg-background/50'
                      : 'border-text-secondary/20 bg-background/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-black text-accent-gold w-8">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-white">
                        {player.name}
                        {player.id === playerInfo.id ? ' (You)' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-neon-glow">
                    {player.score}/10
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full px-8 py-4 bg-text-secondary text-black font-black text-xl rounded-lg hover:bg-white smooth-transition"
          >
            BACK TO MENU
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="w-full h-screen gradient-primary flex items-center justify-center">
        <p className="text-2xl font-bold text-neon-glow">Loading...</p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = answers.length > currentQuestion;
  const selectedAnswer = answers[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="w-full h-screen gradient-primary flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <div className="bg-background-secondary/80 backdrop-blur-md px-4 py-2 rounded-lg border-2 border-foreground neon-glow">
              <p className="text-text-secondary text-xs">YOUR SCORE</p>
              <p className="text-2xl font-black text-neon-glow">{score}</p>
            </div>
            {opponentInfo.id && (
              <div className="bg-background-secondary/80 backdrop-blur-md px-4 py-2 rounded-lg border-2 border-accent-cyan neon-glow-cyan">
                <p className="text-text-secondary text-xs">OPPONENT</p>
                <p className="text-2xl font-black text-accent-cyan">
                  {opponentInfo.score}
                </p>
              </div>
            )}
          </div>

          <div className="bg-background-secondary/80 backdrop-blur-md px-6 py-2 rounded-lg border-2 border-accent-gold">
            <p className="text-accent-gold font-black text-xl">{timeLeft}s</p>
          </div>
        </div>

        <div className="mb-4 bg-background-secondary/80 backdrop-blur-md p-6 rounded-xl border-2 border-foreground neon-glow">
          <p className="text-text-secondary mb-4">
            QUESTION {currentQuestion + 1} OF {questions.length}
          </p>
          <div className="w-full bg-background rounded-lg h-2 mb-6">
            <div
              className="bg-gradient-accent h-full rounded-lg transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <h2 className="text-2xl font-black text-white mb-8">
            {question.question}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              let buttonClass =
                'bg-background-secondary/50 border-2 border-text-secondary/30 text-white';

              if (isAnswered) {
                if (index === question.correct) {
                  buttonClass =
                    'bg-green-600/30 border-2 border-green-500 text-green-400';
                } else if (index === selectedAnswer && !isCorrect) {
                  buttonClass =
                    'bg-red-600/30 border-2 border-red-500 text-red-400';
                } else {
                  buttonClass =
                    'bg-background-secondary/30 border-2 border-text-secondary/20 text-text-secondary';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`p-4 rounded-lg font-bold text-lg smooth-transition hover:scale-105 disabled:hover:scale-100 ${buttonClass}`}
                >
                  <span className="font-black text-xl mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (
          <div className="text-center">
            <p
              className={`text-2xl font-black ${
                isCorrect ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isCorrect ? 'CORRECT!' : 'INCORRECT'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen gradient-primary flex items-center justify-center"><p className="text-2xl font-bold text-neon-glow">Loading...</p></div>}>
      <QuizContent />
    </Suspense>
  );
}
