import Dexie, { type Table } from 'dexie';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string; // Stored locally (plain text for simplicity in this mock, but in real apps you'd hash)
  createdAt: Date;
}

export class NexusDB extends Dexie {
  users!: Table<User>;

  constructor() {
    super('NexusPulseDB');
    this.version(1).stores({
      users: '++id, email' // Primary key id, indexed by email
    });
  }
}

export const db = new NexusDB();
