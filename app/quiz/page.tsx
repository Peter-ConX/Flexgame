'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getShuffledQuestions, type Question } from '@/lib/bibleQuestions';
import {
  getRoomData,
  updatePlayerScore,
  updatePlayerAnswers,
  finishGame,
  getRanking,
} from '@/app/actions/rooms';

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

    const loadRoom = async () => {
      const room = await getRoomData(roomCode);
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
    };

    loadRoom();
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

  const handleAnswer = async (optionIndex: number) => {
    if (showResult || !gameStarted) return;

    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    await updatePlayerAnswers(playerInfo.id, newAnswers);

    const isCorrect =
      optionIndex === questions[currentQuestion].correct;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      await updatePlayerScore(playerInfo.id, newScore);
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
      <div className="w-full h-screen gradient-primary flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-purple-900/95 to-purple-800/95 backdrop-blur-md p-12 rounded-2xl border-4 border-accent-gold neon-glow max-w-lg w-full mx-4 text-center shadow-2xl">
          <h2 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
            GET READY!
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-gold to-transparent mx-auto mb-6"></div>
          <p className="text-white text-xl mb-10 font-semibold leading-relaxed">
            10 Questions • 10 Seconds Each<br/>Test Your Bible Knowledge!
          </p>
          <button
            onClick={handleStartQuiz}
            className="w-full px-8 py-5 bg-gradient-to-r from-accent-gold to-yellow-500 text-black font-black text-2xl rounded-lg neon-glow hover:scale-105 smooth-transition drop-shadow-lg"
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
    const isWinner = playerRank === 1;

    return (
      <div className="w-full h-screen gradient-primary flex items-center justify-center p-4 overflow-y-auto">
        <div className="max-w-2xl w-full py-8">
          <div className="text-center mb-12">
            <h2 className={`text-6xl font-black mb-4 drop-shadow-lg ${isWinner ? 'text-accent-gold' : 'text-white'}`}>
              {isWinner ? '🏆 VICTORY!' : '⚔️ GAME OVER'}
            </h2>
            <p className="text-2xl font-bold text-white">
              #{playerRank} Place
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-b from-purple-900/95 to-purple-800/95 backdrop-blur-md p-8 rounded-xl border-3 border-accent-gold neon-glow shadow-lg">
              <p className="text-white text-sm font-bold mb-2">YOUR SCORE</p>
              <p className="text-5xl font-black text-accent-gold mb-2">{score}/10</p>
              <p className="text-white font-bold text-lg">
                {Math.round((score / 10) * 100)}% Accuracy
              </p>
            </div>

            {opponentInfo.id && (
              <div className="bg-gradient-to-b from-blue-900/95 to-cyan-900/95 backdrop-blur-md p-8 rounded-xl border-3 border-white neon-glow-cyan shadow-lg">
                <p className="text-white text-sm font-bold mb-2">
                  {opponentInfo.name.toUpperCase()}
                </p>
                <p className="text-5xl font-black text-white mb-2">
                  {opponentInfo.score}/10
                </p>
                <p className="text-white font-bold text-lg">
                  {Math.round((opponentInfo.score / 10) * 100)}% Accuracy
                </p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-b from-yellow-900/90 to-yellow-800/90 backdrop-blur-md p-10 rounded-xl border-3 border-accent-gold neon-glow mb-10 shadow-lg">
            <h3 className="text-3xl font-black text-white mb-8 text-center drop-shadow-lg">
              🏅 LEADERBOARD
            </h3>
            <div className="space-y-4">
              {ranking.map((player, index) => {
                const medals = ['🥇', '🥈', '🥉'];
                const isWinner = index === 0;
                return (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-5 rounded-lg border-3 font-bold ${
                      player.id === playerInfo.id
                        ? 'bg-gradient-to-r from-accent-gold/30 to-yellow-500/30 border-accent-gold'
                        : 'bg-background/50 border-white/30'
                    } shadow-md`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl w-10">{medals[index] || '📌'}</span>
                      <div>
                        <p className="text-white text-lg flex items-center gap-2">
                          {isWinner && <span className="text-3xl">👑</span>}
                          {player.name}
                          {player.id === playerInfo.id ? ' (You)' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-3xl font-black text-white">
                      {player.score}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full px-8 py-5 bg-gradient-to-r from-white to-gray-200 text-black font-black text-xl rounded-lg hover:scale-105 smooth-transition drop-shadow-lg"
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
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-3">
            <div className="bg-gradient-to-br from-purple-900/95 to-purple-800/95 backdrop-blur-md px-6 py-3 rounded-lg border-3 border-accent-gold neon-glow shadow-lg">
              <p className="text-white text-xs font-bold">YOUR SCORE</p>
              <p className="text-3xl font-black text-accent-gold">{score}</p>
            </div>
            {opponentInfo.id && (
              <div className="bg-gradient-to-br from-blue-900/95 to-cyan-900/95 backdrop-blur-md px-6 py-3 rounded-lg border-3 border-white neon-glow-cyan shadow-lg">
                <p className="text-white text-xs font-bold">OPPONENT</p>
                <p className="text-3xl font-black text-white">
                  {opponentInfo.score}
                </p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-yellow-900/95 to-yellow-800/95 backdrop-blur-md px-8 py-3 rounded-lg border-3 border-accent-gold neon-glow shadow-lg">
            <p className="text-accent-gold font-black text-3xl">{timeLeft}</p>
            <p className="text-white text-xs font-bold">seconds</p>
          </div>
        </div>

        <div className="mb-6 bg-gradient-to-b from-purple-900/95 to-purple-800/95 backdrop-blur-md p-8 rounded-2xl border-3 border-accent-gold neon-glow shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <p className="text-white font-black text-lg">
              Q{currentQuestion + 1} / {questions.length}
            </p>
            <p className="text-accent-gold font-black text-lg">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </p>
          </div>
          <div className="w-full bg-background/50 rounded-full h-3 mb-8 border-2 border-accent-gold/30">
            <div
              className="bg-gradient-to-r from-accent-gold to-yellow-400 h-full rounded-full transition-all shadow-lg"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <h2 className="text-3xl font-black text-white mb-10 leading-tight">
            {question.question}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              let buttonClass =
                'bg-gradient-to-br from-blue-600/20 to-blue-700/20 border-3 border-white text-white hover:scale-105';

              if (isAnswered) {
                if (index === question.correct) {
                  buttonClass =
                    'bg-gradient-to-br from-green-600 to-green-700 border-3 border-white text-white scale-100';
                } else if (index === selectedAnswer && !isCorrect) {
                  buttonClass =
                    'bg-gradient-to-br from-red-600 to-red-700 border-3 border-white text-white scale-100';
                } else {
                  buttonClass =
                    'bg-background/50 border-3 border-white/30 text-gray-300 scale-100';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`p-5 rounded-lg font-black text-lg smooth-transition disabled:hover:scale-100 ${buttonClass}`}
                >
                  <span className="text-2xl mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="inline-block">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (
          <div className="text-center animate-bounce">
            <p
              className={`text-4xl font-black drop-shadow-lg ${
                isCorrect ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isCorrect ? '✓ CORRECT!' : '✗ INCORRECT'}
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
