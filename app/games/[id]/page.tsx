'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

// Bible Trivia Questions - 45 Questions across 3 difficulty levels
const easyBibleTrivia = [
  { question: 'Who built the ark?', options: ['Moses', 'Noah', 'Abraham', 'David'], correct: 1, difficulty: 'easy' },
  { question: 'What did God create on the first day?', options: ['Animals', 'Light', 'Plants', 'Humans'], correct: 1, difficulty: 'easy' },
  { question: 'Who was swallowed by a great fish?', options: ['Jonah', 'Paul', 'Peter', 'Job'], correct: 0, difficulty: 'easy' },
  { question: 'Who led the Israelites out of Egypt?', options: ['Joshua', 'Moses', 'Aaron', 'David'], correct: 1, difficulty: 'easy' },
  { question: 'What is the first book of the Bible?', options: ['Exodus', 'Genesis', 'Psalms', 'Matthew'], correct: 1, difficulty: 'easy' },
  { question: 'Who was the first man?', options: ['Adam', 'Noah', 'Abraham', 'Isaac'], correct: 0, difficulty: 'easy' },
  { question: 'Who was the first woman?', options: ['Sarah', 'Eve', 'Rachel', 'Hannah'], correct: 1, difficulty: 'easy' },
  { question: 'What did Jesus turn water into?', options: ['Milk', 'Wine', 'Oil', 'Honey'], correct: 1, difficulty: 'easy' },
  { question: 'Who betrayed Jesus?', options: ['Peter', 'Judas', 'Thomas', 'John'], correct: 1, difficulty: 'easy' },
  { question: 'What is the shortest verse in the Bible?', options: ['Jesus wept', 'God is love', 'Pray continually', 'Fear not'], correct: 0, difficulty: 'easy' },
  { question: 'Who killed Goliath?', options: ['Saul', 'David', 'Samson', 'Solomon'], correct: 1, difficulty: 'easy' },
  { question: 'What did God use to guide the Israelites at night?', options: ['Fire', 'Cloud', 'Star', 'Angel'], correct: 0, difficulty: 'easy' },
  { question: 'Who was Abraham\'s wife?', options: ['Sarah', 'Rebekah', 'Rachel', 'Leah'], correct: 0, difficulty: 'easy' },
  { question: 'How many disciples did Jesus have?', options: ['10', '12', '14', '7'], correct: 1, difficulty: 'easy' },
  { question: 'Who was thrown into the lions\' den?', options: ['Daniel', 'Joseph', 'Elijah', 'Moses'], correct: 0, difficulty: 'easy' },
];

const mediumBibleTrivia = [
  { question: 'Who interpreted Pharaoh\'s dreams?', options: ['Daniel', 'Joseph', 'Moses', 'Samuel'], correct: 1, difficulty: 'medium' },
  { question: 'What was Ruth\'s mother-in-law\'s name?', options: ['Naomi', 'Sarah', 'Esther', 'Hannah'], correct: 0, difficulty: 'medium' },
  { question: 'Who was the strongest man in the Bible?', options: ['Samson', 'David', 'Saul', 'Gideon'], correct: 0, difficulty: 'medium' },
  { question: 'Who was the first king of Israel?', options: ['Saul', 'David', 'Solomon', 'Samuel'], correct: 0, difficulty: 'medium' },
  { question: 'Who denied Jesus three times?', options: ['Judas', 'Peter', 'John', 'Thomas'], correct: 1, difficulty: 'medium' },
  { question: 'Who was the father of John the Baptist?', options: ['Zechariah', 'Joseph', 'Simeon', 'Nicodemus'], correct: 0, difficulty: 'medium' },
  { question: 'What city did the walls fall after marching around it?', options: ['Jericho', 'Nineveh', 'Babylon', 'Jerusalem'], correct: 0, difficulty: 'medium' },
  { question: 'Who was the wisest king of Israel?', options: ['Saul', 'David', 'Solomon', 'Hezekiah'], correct: 2, difficulty: 'medium' },
  { question: 'Who was thrown into a fiery furnace?', options: ['Shadrach, Meshach, Abednego', 'Daniel', 'Joseph', 'Elijah'], correct: 0, difficulty: 'medium' },
  { question: 'Who was the tax collector that climbed a tree to see Jesus?', options: ['Zacchaeus', 'Matthew', 'Levi', 'Simon'], correct: 0, difficulty: 'medium' },
  { question: 'Who was the prophet taken up to heaven in a whirlwind?', options: ['Elijah', 'Elisha', 'Isaiah', 'Jeremiah'], correct: 0, difficulty: 'medium' },
  { question: 'Who was the disciple known as "Doubting"?', options: ['Peter', 'Thomas', 'Andrew', 'Philip'], correct: 1, difficulty: 'medium' },
  { question: 'What river was Jesus baptized in?', options: ['Jordan', 'Nile', 'Euphrates', 'Tigris'], correct: 0, difficulty: 'medium' },
  { question: 'Who was the first martyr in the New Testament?', options: ['Stephen', 'James', 'Paul', 'Peter'], correct: 0, difficulty: 'medium' },
  { question: 'Who wrote most of the Psalms?', options: ['David', 'Solomon', 'Moses', 'Asaph'], correct: 0, difficulty: 'medium' },
];

const hardBibleTrivia = [
  { question: 'Which prophet confronted King Ahab on Mount Carmel?', options: ['Isaiah', 'Elijah', 'Elisha', 'Jeremiah'], correct: 1, difficulty: 'hard' },
  { question: 'How many horsemen are described in Revelation?', options: ['3', '4', '5', '7'], correct: 1, difficulty: 'hard' },
  { question: 'Who was the high priest when Jesus was crucified?', options: ['Caiaphas', 'Annas', 'Gamaliel', 'Nicodemus'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the prophet that married a prostitute as a sign to Israel?', options: ['Hosea', 'Amos', 'Micah', 'Joel'], correct: 0, difficulty: 'hard' },
  { question: 'What was Paul\'s original name?', options: ['Saul', 'Simon', 'Levi', 'Barnabas'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the king who saw the writing on the wall?', options: ['Nebuchadnezzar', 'Belshazzar', 'Darius', 'Cyrus'], correct: 1, difficulty: 'hard' },
  { question: 'Who was the prophet that saw dry bones come to life?', options: ['Ezekiel', 'Isaiah', 'Jeremiah', 'Daniel'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the prophet that said "Here am I, send me"?', options: ['Isaiah', 'Jeremiah', 'Amos', 'Micah'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the queen that visited Solomon?', options: ['Queen of Sheba', 'Esther', 'Jezebel', 'Athaliah'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the prophet that confronted David about Bathsheba?', options: ['Nathan', 'Samuel', 'Gad', 'Elijah'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the prophet that saw a vision of a flying scroll?', options: ['Zechariah', 'Malachi', 'Habakkuk', 'Joel'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the prophet that said "The just shall live by faith"?', options: ['Habakkuk', 'Hosea', 'Amos', 'Micah'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the prophet that saw a vision of a wheel within a wheel?', options: ['Ezekiel', 'Isaiah', 'Daniel', 'Jeremiah'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the prophet that confronted Nineveh?', options: ['Jonah', 'Nahum', 'Micah', 'Amos'], correct: 0, difficulty: 'hard' },
  { question: 'Who was the prophet that saw the valley of vision?', options: ['Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel'], correct: 0, difficulty: 'hard' },
];

// Combine all difficulty levels
const bibleTrivia = [...easyBibleTrivia, ...mediumBibleTrivia, ...hardBibleTrivia].sort(() => Math.random() - 0.5).slice(0, 10);

// Word Scramble Questions
const wordScramble = [
  { scrambled: 'SEOIRV', correct: 'REVISE', hint: 'To go over again' },
  { scrambled: 'ACMRIE', correct: 'AMERICA', hint: 'A continent' },
  { scrambled: 'AZNBZIL', correct: 'BRAZIL', hint: 'South American country' },
  { scrambled: 'OPTHRAE', correct: 'THERAPY', hint: 'Medical treatment' },
  { scrambled: 'SGIDNEG', correct: 'DESIGNS', hint: 'Plans or sketches' },
];

// Memory Match cards
const memoryCards = [
  { id: 1, value: '🎮', flipped: false, matched: false },
  { id: 2, value: '🎮', flipped: false, matched: false },
  { id: 3, value: '🎯', flipped: false, matched: false },
  { id: 4, value: '🎯', flipped: false, matched: false },
  { id: 5, value: '🎲', flipped: false, matched: false },
  { id: 6, value: '🎲', flipped: false, matched: false },
  { id: 7, value: '🏆', flipped: false, matched: false },
  { id: 8, value: '🏆', flipped: false, matched: false },
];

// Quiz Master Questions
const quizMaster = [
  { question: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin', 'Madrid'], correct: 1 },
  { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1 },
  { question: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Da Vinci', 'Michelangelo', 'Raphael'], correct: 1 },
  { question: 'What is the largest planet?', options: ['Saturn', 'Mars', 'Jupiter', 'Neptune'], correct: 2 },
  { question: 'In what year did World War II end?', options: ['1943', '1944', '1945', '1946'], correct: 2 },
];

interface GameProps {
  params: { id: string };
}

export default function GamePage() {
  const params = useParams();
  const gameId = Number(params.id);
  const router = useRouter();
  const [gameState, setGameState] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Initialize game based on ID
    setTimeout(() => {
      let questions: any[] = [];
      switch (gameId) {
        case 1:
          questions = [...easyBibleTrivia, ...mediumBibleTrivia, ...hardBibleTrivia]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
          setAllQuestions(questions);
          setGameState({ type: 'trivia', questions });
          break;
        case 2:
          setGameState({ type: 'scramble', questions: wordScramble });
          break;
        case 3:
          setGameState({ type: 'memory', cards: memoryCards.sort(() => Math.random() - 0.5) });
          break;
        case 4:
          setGameState({ type: 'quiz', questions: quizMaster });
          break;
        case 5:
          setGameState({ type: 'typing' });
          break;
        case 6:
          setGameState({ type: 'flappy' });
          break;
        case 7:
          setGameState({ type: 'puzzle' });
          break;
        case 8:
          setGameState({ type: 'snake' });
          break;
        case 9:
          setGameState({ type: 'puzzle2' });
          break;
        case 10:
          setGameState({ type: 'reaction' });
          break;
        default:
          setGameState({ type: 'default' });
      }
      setQuestionStartTime(Date.now());
      setTimeLeft(10);
      setLoading(false);
    }, 500);
  }, [gameId, router]);

  // Timer for trivia games (Bible Trivia and Quiz Master)
  useEffect(() => {
    if ((gameState?.type === 'trivia' || gameState?.type === 'quiz') && !loading && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up, move to next question
            if (currentQuestion < gameState.questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
              setTimeLeft(10);
              setQuestionStartTime(Date.now());
              return 10;
            } else {
              const finalScore = score;
              alert(`Time's Up! Game Over! Final XP: ${finalScore}`);
              router.push('/dashboard');
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, loading, currentQuestion, score, router]);

  const handleAnswer = (answerIndex: number) => {
    if (gameState.type === 'trivia' || gameState.type === 'quiz') {
      const timeTaken = (Date.now() - questionStartTime) / 1000;
      let xpEarned = 0;
      let correct = false;

      if (answerIndex === gameState.questions[currentQuestion].correct) {
        correct = true;
        // Calculate XP based on speed
        if (timeTaken <= 4) {
          xpEarned = 50; // 50 XP for answering in ≤4 seconds
        } else if (timeTaken <= 5) {
          xpEarned = 20; // 20 XP for answering in ≤5 seconds
        } else {
          xpEarned = 10; // 10 XP for correct answer within 10 seconds
        }
        setScore(score + xpEarned);
      }

      if (currentQuestion < gameState.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(10);
        setQuestionStartTime(Date.now());
      } else {
        const finalScore = score + xpEarned;
        alert(`Game Over! Final XP: ${finalScore}`);
        router.push('/dashboard');
      }
    }
  };

  const handleScrambleSubmit = (answer: string) => {
    if (answer.toUpperCase() === gameState.questions[currentQuestion].correct) {
      setScore(score + 10);
    }
    if (currentQuestion < gameState.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Game Over! Final Score: ${score}`);
      router.push('/dashboard');
    }
  };

  if (loading) return <div className="w-full h-screen bg-black flex items-center justify-center text-green-500">Loading Game...</div>;

  const gameNames: Record<number, string> = {
    1: 'Bible Trivia',
    2: 'Word Scramble',
    3: 'Memory Match',
    4: 'Quiz Master',
    5: 'Typing Race',
    6: 'Number Puzzle',
    7: 'Flappy Bird',
    8: 'Snake Game',
    9: 'Puzzle Master',
    10: 'Reaction Time',
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-500">{gameNames[gameId]}</h1>
          <div className="flex gap-4 items-center">
            <div className="text-xl text-red-500">XP: {score}</div>
            {(gameState?.type === 'trivia' || gameState?.type === 'quiz') && (
              <div className={`text-xl font-bold px-3 py-1 rounded ${timeLeft <= 3 ? 'bg-red-600 text-white' : 'bg-green-600 text-black'}`}>
                ⏱️ {timeLeft}s
              </div>
            )}
            <Link href="/dashboard">
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
                Back
              </button>
            </Link>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-zinc-900 border-2 border-green-500 p-8 rounded-lg">
          {gameState?.type === 'trivia' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-green-400">Question {currentQuestion + 1} of {gameState.questions.length}</p>
                <p className={`text-lg font-bold ${timeLeft <= 3 ? 'text-red-500' : 'text-green-500'}`}>Time: {timeLeft}s</p>
              </div>
              <h2 className="text-2xl font-bold mb-6 text-red-500">{gameState.questions[currentQuestion].question}</h2>
              <div className="grid grid-cols-2 gap-4">
                {gameState.questions[currentQuestion].options.map((option: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="p-4 bg-green-600 hover:bg-green-700 text-black font-bold rounded border-2 border-red-600 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState?.type === 'quiz' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-green-400">Question {currentQuestion + 1} of {gameState.questions.length}</p>
                <p className={`text-lg font-bold ${timeLeft <= 3 ? 'text-red-500' : 'text-green-500'}`}>Time: {timeLeft}s</p>
              </div>
              <h2 className="text-2xl font-bold mb-6 text-red-500">{gameState.questions[currentQuestion].question}</h2>
              <div className="grid grid-cols-2 gap-4">
                {gameState.questions[currentQuestion].options.map((option: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="p-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded border-2 border-green-500 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState?.type === 'scramble' && (
            <ScrambleGame
              question={gameState.questions[currentQuestion]}
              questionNum={currentQuestion + 1}
              totalQuestions={gameState.questions.length}
              onSubmit={handleScrambleSubmit}
            />
          )}

          {gameState?.type === 'memory' && (
            <MemoryGame cards={gameState.cards} />
          )}

          {gameState?.type === 'typing' && (
            <TypingRaceGame onGameEnd={() => router.push('/dashboard')} />
          )}

          {gameState?.type === 'puzzle' && (
            <div className="text-center py-12">
              <p className="text-2xl text-green-500 mb-4">Number Puzzle - Coming Soon!</p>
              <p className="text-green-400">Solve mathematical puzzles</p>
            </div>
          )}

          {gameState?.type === 'flappy' && (
            <div className="text-center py-12">
              <p className="text-2xl text-green-500 mb-4">Flappy Bird Clone - Coming Soon!</p>
              <p className="text-green-400">Avoid the obstacles</p>
            </div>
          )}

          {gameState?.type === 'snake' && (
            <div className="text-center py-12">
              <p className="text-2xl text-green-500 mb-4">Snake Game - Coming Soon!</p>
              <p className="text-green-400">Collect the food</p>
            </div>
          )}

          {gameState?.type === 'puzzle2' && (
            <div className="text-center py-12">
              <p className="text-2xl text-green-500 mb-4">Puzzle Master - Coming Soon!</p>
              <p className="text-green-400">Solve complex puzzles</p>
            </div>
          )}

          {gameState?.type === 'reaction' && (
            <ReactionTimeGame onGameEnd={() => router.push('/dashboard')} />
          )}
        </div>
      </div>
    </div>
  );
}

function ScrambleGame({ question, questionNum, totalQuestions, onSubmit }: any) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <div>
      <p className="text-green-400 mb-4">Question {questionNum} of {totalQuestions}</p>
      <p className="text-green-400 mb-2">Hint: {question.hint}</p>
      <p className="text-4xl font-bold mb-6 text-red-500 tracking-widest">{question.scrambled}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type the unscrambled word"
        className="w-full px-4 py-2 bg-zinc-800 border-2 border-green-500 text-white rounded mb-4 focus:outline-none focus:border-red-600"
      />
      <button
        onClick={handleSubmit}
        className="w-full p-4 bg-green-600 hover:bg-green-700 text-black font-bold rounded border-2 border-red-600 transition"
      >
        Submit Answer
      </button>
    </div>
  );
}

function MemoryGame({ cards: initialCards }: any) {
  const [cards, setCards] = useState(initialCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const handleCardClick = (id: number) => {
    if (flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = cards.find((c: any) => c.id === newFlipped[0]);
      const card2 = cards.find((c: any) => c.id === newFlipped[1]);

      if (card1.value === card2.value) {
        setMatched([...matched, newFlipped[0], newFlipped[1]]);
      }
      setTimeout(() => setFlipped([]), 600);
    }
  };

  return (
    <div>
      <p className="text-green-400 mb-4">Matched: {matched.length / 2} / 4</p>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card: any) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`p-8 text-4xl rounded border-2 transition ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? 'bg-green-600 border-red-600'
                : 'bg-red-600 border-green-500'
            }`}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? card.value : '?'}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypingRaceGame({ onGameEnd }: any) {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');
  const [userInput, setUserInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const [time, setTime] = useState(60);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    if (!gameActive || time <= 0) return;

    const timer = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          setGameActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, time]);

  useEffect(() => {
    if (gameActive) {
      const words = userInput.trim().split(/\s+/).length;
      const minutes = (60 - time) / 60 || 0.01;
      setWpm(Math.round(words / minutes));
    }
  }, [userInput, time, gameActive]);

  return (
    <div>
      <p className="text-green-400 mb-2">Time: {time}s | WPM: {wpm}</p>
      <p className="text-lg mb-4 text-red-500">{text}</p>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={!gameActive}
        placeholder="Start typing here..."
        className="w-full h-32 px-4 py-2 bg-zinc-800 border-2 border-green-500 text-white rounded mb-4"
      />
      {!gameActive && (
        <div className="text-center">
          <p className="text-2xl text-green-500 font-bold">Game Over! WPM: {wpm}</p>
          <button onClick={onGameEnd} className="mt-4 px-6 py-2 bg-red-600 rounded">
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

function ReactionTimeGame({ onGameEnd }: any) {
  const [gameStarted, setGameStarted] = useState(false);
  const [boxGreen, setBoxGreen] = useState(false);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startGame = () => {
    setGameStarted(true);
    setReactionTime(null);
    setTimeout(() => {
      setBoxGreen(true);
      setStartTime(Date.now());
    }, Math.random() * 3000 + 1000);
  };

  const handleClick = () => {
    if (boxGreen && startTime) {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setBoxGreen(false);
    }
  };

  return (
    <div className="text-center">
      {!gameStarted && (
        <button
          onClick={startGame}
          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-black font-bold rounded text-lg"
        >
          Start Test
        </button>
      )}

      {gameStarted && !reactionTime && (
        <>
          <p className="text-green-400 mb-4">Wait for the green box...</p>
          <button
            onClick={handleClick}
            className={`w-32 h-32 rounded transition ${
              boxGreen ? 'bg-green-500 cursor-pointer' : 'bg-red-600 cursor-not-allowed'
            }`}
          />
        </>
      )}

      {reactionTime && (
        <div>
          <p className="text-2xl text-green-500 font-bold mb-4">Your reaction time: {reactionTime}ms</p>
          <button
            onClick={onGameEnd}
            className="px-6 py-2 bg-red-600 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
