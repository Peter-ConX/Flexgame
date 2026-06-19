export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Who built the ark?',
    options: ['Moses', 'Noah', 'Abraham', 'David'],
    correct: 1,
    category: 'Old Testament',
    difficulty: 'easy',
  },
  {
    id: 2,
    question: 'What is the first book of the Bible?',
    options: ['Exodus', 'Genesis', 'Leviticus', 'Numbers'],
    correct: 1,
    category: 'Books of the Bible',
    difficulty: 'easy',
  },
  {
    id: 3,
    question: 'How many disciples did Jesus have?',
    options: ['10', '11', '12', '13'],
    correct: 2,
    category: 'New Testament',
    difficulty: 'easy',
  },
  {
    id: 4,
    question: 'Who betrayed Jesus?',
    options: ['Peter', 'Judas', 'Thomas', 'John'],
    correct: 1,
    category: 'New Testament',
    difficulty: 'easy',
  },
  {
    id: 5,
    question: 'What city did the walls fall after marching around it?',
    options: ['Jerusalem', 'Jericho', 'Bethlehem', 'Nazareth'],
    correct: 1,
    category: 'Old Testament',
    difficulty: 'medium',
  },
  {
    id: 6,
    question: 'Who interpreted Pharaoh\'s dreams?',
    options: ['Moses', 'Joshua', 'Joseph', 'Jacob'],
    correct: 2,
    category: 'Old Testament',
    difficulty: 'medium',
  },
  {
    id: 7,
    question: 'Which prophet confronted King Ahab on Mount Carmel?',
    options: ['Elisha', 'Elijah', 'Jeremiah', 'Isaiah'],
    correct: 1,
    category: 'Prophets',
    difficulty: 'hard',
  },
  {
    id: 8,
    question: 'Who was the first king of Israel?',
    options: ['David', 'Solomon', 'Saul', 'Rehoboam'],
    correct: 2,
    category: 'Kings',
    difficulty: 'medium',
  },
  {
    id: 9,
    question: 'How many plagues did God send to Egypt?',
    options: ['7', '8', '9', '10'],
    correct: 3,
    category: 'Old Testament',
    difficulty: 'hard',
  },
  {
    id: 10,
    question: 'On which mountain was Jesus transfigured?',
    options: ['Mount Sinai', 'Mount Carmel', 'Mount Tabor', 'Mount of Olives'],
    correct: 2,
    category: 'New Testament',
    difficulty: 'hard',
  },
];

export function getShuffledQuestions(): Question[] {
  return questions.sort(() => Math.random() - 0.5);
}

export function getQuestionById(id: number): Question | undefined {
  return questions.find((q) => q.id === id);
}

export default questions;
