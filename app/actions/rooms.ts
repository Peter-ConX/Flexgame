'use server'

import { db } from '@/lib/db'
import { rooms, players } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function createRoom(username: string) {
  const code = generateRoomCode()
  const hostId = uuidv4()

  // Create room
  const newRoom = await db.insert(rooms).values({
    code,
    hostId,
    hostName: username,
    status: 'waiting',
  }).returning()

  // Add host as first player
  const newPlayer = await db.insert(players).values({
    roomCode: code,
    playerName: username,
    isHost: true,
  }).returning()

  return {
    code,
    hostId,
    playerId: newPlayer[0].id,
  }
}

export async function joinRoom(code: string, username: string) {
  // Check if room exists
  const room = await db.select().from(rooms).where(eq(rooms.code, code.toUpperCase())).limit(1)

  if (room.length === 0) {
    return null
  }

  // Add player to room
  const newPlayer = await db.insert(players).values({
    roomCode: code.toUpperCase(),
    playerName: username,
    isHost: false,
  }).returning()

  return {
    code: code.toUpperCase(),
    playerId: newPlayer[0].id,
  }
}

export async function getRoomPlayers(code: string) {
  const roomPlayers = await db
    .select()
    .from(players)
    .where(eq(players.roomCode, code.toUpperCase()))

  return roomPlayers
}

export async function updatePlayerScore(playerId: string, score: number) {
  await db.update(players).set({ score }).where(eq(players.id, playerId))
}

export async function updatePlayerAnswers(playerId: string, answers: any[]) {
  await db.update(players).set({ answers: JSON.stringify(answers) }).where(eq(players.id, playerId))
}

export async function getRoomData(code: string) {
  const roomData = await db.select().from(rooms).where(eq(rooms.code, code.toUpperCase())).limit(1)
  const roomPlayers = await db
    .select()
    .from(players)
    .where(eq(players.roomCode, code.toUpperCase()))

  if (roomData.length === 0) {
    return null
  }

  return {
    code: roomData[0].code,
    hostId: roomData[0].hostId,
    status: roomData[0].status,
    players: roomPlayers.map((p) => ({
      id: p.id,
      name: p.playerName,
      score: p.score,
      answers: typeof p.answers === 'string' ? JSON.parse(p.answers) : p.answers,
      isHost: p.isHost,
    })),
  }
}

export async function finishGame(code: string) {
  await db.update(rooms).set({ status: 'finished' }).where(eq(rooms.code, code.toUpperCase()))
}

export async function getRanking(code: string) {
  const roomPlayers = await db
    .select()
    .from(players)
    .where(eq(players.roomCode, code.toUpperCase()))

  return roomPlayers
    .map((p) => ({
      id: p.id,
      name: p.playerName,
      score: p.score,
    }))
    .sort((a, b) => b.score - a.score)
}
