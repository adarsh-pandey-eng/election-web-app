import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

const db = new Database('election.db');

export async function GET() {
  const candidates = db.prepare('SELECT * FROM candidates').all();
  return NextResponse.json(candidates);
}

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Missing candidate id' }, { status: 400 });
  }
  const stmt = db.prepare('UPDATE candidates SET votes = votes + 1 WHERE id = ?');
  const info = stmt.run(id);
  if (info.changes === 0) {
    return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
  }
  const candidate = db.prepare('SELECT * FROM candidates WHERE id = ?').get(id);
  return NextResponse.json(candidate);
} 