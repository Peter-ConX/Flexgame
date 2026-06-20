import { pgTable, varchar, integer, boolean, timestamp, uuid, jsonb, serial } from 'drizzle-orm/pg-core'

export const rooms = pgTable('rooms', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 6 }).notNull().unique(),
  hostId: uuid('host_id').notNull(),
  hostName: varchar('host_name', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('waiting'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const players = pgTable('players', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomCode: varchar('room_code', { length: 6 }).notNull().references(() => rooms.code, { onDelete: 'cascade' }),
  playerName: varchar('player_name', { length: 255 }).notNull(),
  score: integer('score').default(0),
  isHost: boolean('is_host').default(false),
  joinedAt: timestamp('joined_at').defaultNow(),
  answers: jsonb('answers').default([]),
})

export type Room = typeof rooms.$inferSelect
export type Player = typeof players.$inferSelect
