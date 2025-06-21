import React from 'react';

interface Candidate {
  id: number;
  name: string;
  photo: string;
  symbol: string;
  votes: number;
}

async function getCandidates(): Promise<Candidate[]> {
  const res = await fetch('http://localhost:3000/api/candidates', { cache: 'no-store' });
  return res.json();
}

export default async function VotesPage() {
  const candidates = await getCandidates();
  candidates.sort((a, b) => b.votes - a.votes);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Votes Result</h1>
      <div className="w-full max-w-2xl">
        {candidates.map((c) => (
          <div key={c.id} className="flex items-center justify-between bg-white shadow rounded p-4 mb-4">
            <div className="flex items-center gap-4">
              {c.photo && <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-full border" />}
              <div>
                <div className="font-semibold">{c.name}</div>
                {c.symbol && <img src={c.symbol} alt="symbol" className="w-6 h-6 mt-1" />}
              </div>
            </div>
            <div className="text-xl font-bold">{c.votes} votes</div>
          </div>
        ))}
      </div>
    </main>
  );
} 