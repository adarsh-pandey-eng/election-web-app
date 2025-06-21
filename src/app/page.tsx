"use client";
import React, { useEffect, useState } from "react";

interface Candidate {
  id: number;
  name: string;
  photo?: string;
  symbol?: string;
  votes: number;
}

export default function VotingPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchCandidates = async () => {
    const res = await fetch("/api/candidates");
    const data = await res.json();
    setCandidates(data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleVote = async (id: number) => {
    setLoading(true);
    await fetch("/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchCandidates();
    setSuccess(true);
    setLoading(false);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Vote for Your Candidate</h1>
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="flex flex-col items-center bg-white shadow rounded p-4"
          >
            {c.photo && <img src={c.photo} alt={c.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full border mb-3 object-cover" />}
            <div className="font-semibold text-base md:text-lg mb-2 text-center">{c.name}</div>
            {c.symbol && <img src={c.symbol} alt="symbol" className="w-6 h-6 md:w-8 md:h-8 mb-3" />}
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:opacity-50 text-sm md:text-base w-full"
              onClick={() => handleVote(c.id)}
              disabled={loading || success}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
      {success && (
        <div className="fixed inset-0 bg-black opacity-90 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg mx-4">
            <div className="text-green-600 font-semibold text-lg md:text-xl text-center">Your vote has been casted. Please wait voting will be resumed soon</div>
          </div>
        </div>
      )}
    </main>
  );
}
