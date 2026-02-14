import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Fingerprint, LayoutDashboard, FileText, Users, BarChart3, 
  LogOut, Download, TrendingUp, DollarSign, CreditCard
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function OwnerAnalyticsPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchAnalytics();
    }
  }, [token]);

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, leaderboardRes] = await Promise.all([
        axios.get(`${API_URL}/owner/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/owner/analytics/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setAnalytics(analyticsRes.data);
      setLeaderboard(leaderboardRes.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = async () => {
    try {
      const response = await axios.get(`${API_URL}/owner/analytics/export`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const blob = new Blob([response.data.csv_data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analytics_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Export downloaded');
    } catch (error) {
      toast.error('Export failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/owner/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/30 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link to="/owner/dashboard" className="flex items-center gap-3">
            <Fingerprint className="w-6 h-6 text-white" />
            <span className="font-heading text-lg tracking-widest text-white">CASE FILES</span>
          </Link>
          <div className="mt-2 font-mono text-xs text-red-500">OWNER PORTAL</div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link
              to="/owner/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/owner/cases"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <FileText className="w-4 h-4" />
              Cases
            </Link>
            <Link
              to="/owner/analytics"
              className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800 font-mono text-sm uppercase tracking-widest"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            <Link
              to="/owner/users"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <Users className="w-4 h-4" />
              Players
            </Link>
            <Link
              to="/owner/revenue"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <DollarSign className="w-4 h-4" />
              Revenue
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span className="font-mono text-xs uppercase tracking-widest">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl text-white uppercase tracking-wide">
                Analytics
              </h1>
              <p className="text-zinc-500 font-mono text-sm mt-1">
                Platform performance metrics
              </p>
            </div>
            <Button
              onClick={exportCSV}
              variant="outline"
              className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-none uppercase tracking-widest text-xs"
              data-testid="export-csv-btn"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-zinc-500">
              <div className="font-mono text-sm">Loading analytics...</div>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 border border-zinc-800 bg-zinc-900/30">
                  <Users className="w-5 h-5 text-blue-500 mb-4" />
                  <div className="font-heading text-3xl text-white">{analytics?.total_players || 0}</div>
                  <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">
                    Total Players
                  </div>
                </div>
                <div className="p-6 border border-zinc-800 bg-zinc-900/30">
                  <TrendingUp className="w-5 h-5 text-emerald-500 mb-4" />
                  <div className="font-heading text-3xl text-white">{analytics?.active_today || 0}</div>
                  <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">
                    Active Today
                  </div>
                </div>
                <div className="p-6 border border-zinc-800 bg-zinc-900/30">
                  <FileText className="w-5 h-5 text-purple-500 mb-4" />
                  <div className="font-heading text-3xl text-white">{analytics?.total_sessions || 0}</div>
                  <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">
                    Total Sessions
                  </div>
                </div>
                <div className="p-6 border border-zinc-800 bg-zinc-900/30">
                  <CreditCard className="w-5 h-5 text-amber-500 mb-4" />
                  <div className="font-heading text-3xl text-white">{analytics?.active_subscriptions || 0}</div>
                  <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">
                    Subscribers
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Completion Rate */}
                <div className="p-6 border border-zinc-800 bg-zinc-900/30">
                  <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-4">
                    Completion Rate
                  </div>
                  <div className="flex items-end gap-4">
                    <div className="font-heading text-5xl text-white">
                      {analytics?.completion_rate || 0}%
                    </div>
                    <div className="text-zinc-500 text-sm mb-2">
                      of started cases completed
                    </div>
                  </div>
                  <div className="mt-4 h-4 bg-zinc-800">
                    <div 
                      className="h-full bg-emerald-500 transition-all"
                      style={{ width: `${analytics?.completion_rate || 0}%` }}
                    />
                  </div>
                </div>

                {/* Ending Distribution */}
                <div className="p-6 border border-zinc-800 bg-zinc-900/30">
                  <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-4">
                    Ending Distribution
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-emerald-500 font-mono text-sm">CLOSED (GOOD)</span>
                        <span className="text-white font-heading">
                          {analytics?.ending_distribution?.closed || 0}
                        </span>
                      </div>
                      <div className="h-3 bg-zinc-800">
                        <div 
                          className="h-full bg-emerald-500"
                          style={{
                            width: `${((analytics?.ending_distribution?.closed || 0) / 
                              ((analytics?.ending_distribution?.closed || 0) + (analytics?.ending_distribution?.compromised || 0) || 1)) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-red-500 font-mono text-sm">COMPROMISED (BAD)</span>
                        <span className="text-white font-heading">
                          {analytics?.ending_distribution?.compromised || 0}
                        </span>
                      </div>
                      <div className="h-3 bg-zinc-800">
                        <div 
                          className="h-full bg-red-500"
                          style={{
                            width: `${((analytics?.ending_distribution?.compromised || 0) / 
                              ((analytics?.ending_distribution?.closed || 0) + (analytics?.ending_distribution?.compromised || 0) || 1)) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="border border-zinc-800 bg-zinc-900/30">
                <div className="p-4 border-b border-zinc-800">
                  <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
                    Top Players Leaderboard
                  </span>
                </div>
                <div className="divide-y divide-zinc-800">
                  {leaderboard.slice(0, 10).map((player, index) => (
                    <div 
                      key={player.id}
                      className="grid grid-cols-12 gap-4 p-4 items-center"
                    >
                      <div className="col-span-1 text-zinc-500 font-mono">
                        #{index + 1}
                      </div>
                      <div className="col-span-5 text-white font-heading uppercase">
                        {player.username}
                      </div>
                      <div className="col-span-3 text-zinc-400 font-mono text-sm">
                        LVL {player.level} • {player.level_title}
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-white font-heading">{player.career_points}</span>
                        <span className="text-zinc-500 text-sm ml-1">CP</span>
                      </div>
                    </div>
                  ))}
                  {leaderboard.length === 0 && (
                    <div className="p-8 text-center text-zinc-500">
                      No players yet
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
