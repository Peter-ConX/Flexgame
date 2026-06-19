export interface Player {
  id: string;
  name: string;
  score: number;
  answers: number[];
  isHost: boolean;
  joinedAt: number;
}

export interface Room {
  code: string;
  host: string;
  players: Player[];
  status: 'waiting' | 'playing' | 'finished';
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
}

export function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function generatePlayerId(): string {
  return `player_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export function createRoom(): Room {
  const code = generateRoomCode();
  const playerId = generatePlayerId();

  const room: Room = {
    code,
    host: playerId,
    players: [
      {
        id: playerId,
        name: 'You',
        score: 0,
        answers: [],
        isHost: true,
        joinedAt: Date.now(),
      },
    ],
    status: 'waiting',
    createdAt: Date.now(),
  };

  localStorage.setItem(`room_${code}`, JSON.stringify(room));
  localStorage.setItem('currentRoomCode', code);
  localStorage.setItem('currentPlayerId', playerId);

  return room;
}

export function joinRoom(code: string): Room | null {
  const roomData = localStorage.getItem(`room_${code}`);
  if (!roomData) return null;

  const room: Room = JSON.parse(roomData);
  const playerId = generatePlayerId();

  const newPlayer: Player = {
    id: playerId,
    name: `Player ${room.players.length + 1}`,
    score: 0,
    answers: [],
    isHost: false,
    joinedAt: Date.now(),
  };

  room.players.push(newPlayer);
  localStorage.setItem(`room_${code}`, JSON.stringify(room));
  localStorage.setItem('currentRoomCode', code);
  localStorage.setItem('currentPlayerId', playerId);

  return room;
}

export function getRoom(code: string): Room | null {
  const roomData = localStorage.getItem(`room_${code}`);
  return roomData ? JSON.parse(roomData) : null;
}

export function updateRoom(code: string, room: Room): void {
  localStorage.setItem(`room_${code}`, JSON.stringify(room));
}

export function updatePlayerAnswer(
  code: string,
  playerId: string,
  questionIndex: number,
  answerIndex: number
): void {
  const room = getRoom(code);
  if (!room) return;

  const player = room.players.find((p) => p.id === playerId);
  if (!player) return;

  player.answers[questionIndex] = answerIndex;
  updateRoom(code, room);
}

export function updatePlayerScore(
  code: string,
  playerId: string,
  score: number
): void {
  const room = getRoom(code);
  if (!room) return;

  const player = room.players.find((p) => p.id === playerId);
  if (player) {
    player.score = score;
    updateRoom(code, room);
  }
}

export function finishGame(code: string): void {
  const room = getRoom(code);
  if (!room) return;

  room.status = 'finished';
  room.finishedAt = Date.now();
  updateRoom(code, room);
}

export function getRanking(code: string): Player[] {
  const room = getRoom(code);
  if (!room) return [];

  return [...room.players].sort((a, b) => b.score - a.score);
}

export function deleteRoom(code: string): void {
  localStorage.removeItem(`room_${code}`);
}
