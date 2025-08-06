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

  // Determine layout based on number of candidates
  const useCardLayout = candidates.length <= 8;

  const renderCardLayout = () => (
    <div className={`grid gap-6 justify-center ${
      candidates.length <= 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' :
      candidates.length <= 6 ? 'grid-cols-2 md:grid-cols-3' :
      'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    } max-w-6xl`}>
      {candidates.map((c) => (
        <div
          key={c.id}
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
        >
          {c.photo && (
            <img 
              src={c.photo} 
              alt={c.name} 
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gray-200 mb-4 object-cover" 
            />
          )}
          <div className="font-semibold text-lg md:text-xl mb-2 text-center text-gray-800">{c.name}</div>
          {c.symbol && (
            <img 
              src={c.symbol} 
              alt="symbol" 
              className="w-8 h-8 md:w-10 md:h-10 mb-4" 
            />
          )}
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-base font-medium w-full transition-colors"
            onClick={() => handleVote(c.id)}
            disabled={loading || success}
          >
            Vote
          </button>
        </div>
      ))}
    </div>
  );

  const renderListLayout = () => {
    // Calculate optimal number of columns based on candidate count
    const getColumnCount = () => {
      if (candidates.length <= 12) return 1;
      if (candidates.length <= 20) return 2;
      if (candidates.length <= 30) return 3;
      return 4;
    };

    const columnCount = getColumnCount();
    const itemsPerColumn = Math.ceil(candidates.length / columnCount);

    // Split candidates into columns
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
      const start = i * itemsPerColumn;
      const end = start + itemsPerColumn;
      columns.push(candidates.slice(start, end));
    }

    return (
      <div className="w-full max-w-7xl">
        <div className={`grid gap-4 ${
          columnCount === 1 ? 'grid-cols-1' :
          columnCount === 2 ? 'grid-cols-1 lg:grid-cols-2' :
          columnCount === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {column.map((c, index) => (
                <div
                  key={c.id}
                  className={`flex items-center justify-between p-3 hover:bg-gray-50 transition-colors ${
                    index !== column.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {c.photo && (
                      <img 
                        src={c.photo} 
                        alt={c.name} 
                        className="w-10 h-10 rounded-full border border-gray-200 object-cover flex-shrink-0" 
                      />
                    )}
                    {c.symbol && (
                      <img 
                        src={c.symbol} 
                        alt="symbol" 
                        className="w-6 h-6 flex-shrink-0" 
                      />
                    )}
                    <div className="font-medium text-base text-gray-800 truncate flex-1">{c.name}</div>
                  </div>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors flex-shrink-0 ml-2 text-sm"
                    onClick={() => handleVote(c.id)}
                    disabled={loading || success}
                  >
                    Vote
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
          Vote for Your Candidate
        </h1>
        <div className="text-center mb-6">
          <span className="bg-white px-4 py-2 rounded-full shadow text-gray-600 font-medium">
            {candidates.length} Candidates
          </span>
        </div>
        
        {useCardLayout ? renderCardLayout() : renderListLayout()}
      </div>
      
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl mx-4 max-w-md">
            <div className="text-green-600 font-semibold text-lg md:text-xl text-center">
              Your vote has been cast successfully! Please wait, voting will be resumed soon.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
