import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft, Medal, Crown, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getLevelColor } from '../lib/utils';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LeaderboardPage() {
  const { token, user } = useAuth();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlayers(response.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Crown className="w-5 h-5 text-amber-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-zinc-400" />;
    if (index === 2) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="text-zinc-500 font-mono w-5 text-center">{index + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-zinc-950 noise-overlay">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs tracking-widest uppercase">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="font-heading text-4xl text-white tracking-widest uppercase">
            Leaderboard
          </h1>
          <p className="text-zinc-500 font-mono text-sm mt-2">
            // TOP AGENTS BY CAREER POINTS
          </p>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div className="text-center py-12 text-zinc-500">
            <div className="font-mono text-sm">Loading rankings...</div>
          </div>
        ) : (
          <div className="border border-zinc-800 bg-zinc-900/30">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 font-mono text-xs text-zinc-500 tracking-widest uppercase">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Agent</div>
              <div className="col-span-3">Level</div>
              <div className="col-span-3 text-right">Career Points</div>
            </div>

            {/* Rows */}
            {players.map((player, index) => (
              <div 
                key={player.id}
                className={`grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 last:border-b-0 items-center transition-colors ${
                  player.id === user?.id ? 'bg-emerald-500/5' : 'hover:bg-zinc-900/50'
                }`}
                data-testid={`leaderboard-row-${index}`}
              >
                <div className="col-span-1 flex items-center">
                  {getRankIcon(index)}
                </div>
                <div className="col-span-5">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-heading uppercase">
                      {player.username}
                    </span>
                    {player.id === user?.id && (
                      <span className="font-mono text-xs text-emerald-500">(YOU)</span>
                    )}
                  </div>
                </div>
                <div className="col-span-3">
                  <span className={`font-mono text-sm ${getLevelColor(player.level)}`}>
                    LVL {player.level} • {player.level_title}
                  </span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="font-heading text-lg text-white">
                    {player.career_points}
                  </span>
                  <span className="text-zinc-500 text-sm ml-1">CP</span>
                </div>
              </div>
            ))}

            {players.length === 0 && (
              <div className="p-8 text-center text-zinc-500">
                <Star className="w-8 h-8 mx-auto mb-3 text-zinc-700" />
                <p>No agents ranked yet</p>
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 p-4 border border-zinc-800 bg-zinc-900/20">
          <div className="font-mono text-xs text-zinc-500 mb-3">LEVEL TIERS</div>
          <div className="grid grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-zinc-400 text-sm font-heading">LVL 1</div>
              <div className="text-zinc-600 text-xs font-mono">ANALYST</div>
              <div className="text-zinc-700 text-xs">0-49 CP</div>
            </div>
            <div>
              <div className="text-emerald-500 text-sm font-heading">LVL 2</div>
              <div className="text-zinc-600 text-xs font-mono">FIELD AGENT</div>
              <div className="text-zinc-700 text-xs">50-119 CP</div>
            </div>
            <div>
              <div className="text-blue-500 text-sm font-heading">LVL 3</div>
              <div className="text-zinc-600 text-xs font-mono">SPECIAL AGENT</div>
              <div className="text-zinc-700 text-xs">120-219 CP</div>
            </div>
            <div>
              <div className="text-purple-500 text-sm font-heading">LVL 4</div>
              <div className="text-zinc-600 text-xs font-mono">PROFILER</div>
              <div className="text-zinc-700 text-xs">220-349 CP</div>
            </div>
            <div>
              <div className="text-amber-500 text-sm font-heading">LVL 5</div>
              <div className="text-zinc-600 text-xs font-mono">TASK FORCE</div>
              <div className="text-zinc-700 text-xs">350+ CP</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
