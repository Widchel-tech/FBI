import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Fingerprint, LayoutDashboard, FileText, Users, BarChart3, 
  LogOut, Search, DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import { getLevelColor } from '../lib/utils';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function OwnerUsersPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/owner/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/owner/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-mono text-sm uppercase tracking-widest transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            <Link
              to="/owner/users"
              className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800 font-mono text-sm uppercase tracking-widest"
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
                Players
              </h1>
              <p className="text-zinc-500 font-mono text-sm mt-1">
                {users.length} registered players
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by username or email..."
                className="bg-zinc-900 border-zinc-800 rounded-none text-white pl-10 h-10"
                data-testid="search-users"
              />
            </div>
          </div>

          {/* Users Table */}
          {loading ? (
            <div className="text-center py-12 text-zinc-500">
              <div className="font-mono text-sm">Loading players...</div>
            </div>
          ) : (
            <div className="border border-zinc-800 bg-zinc-900/30">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 font-mono text-xs text-zinc-500 tracking-widest uppercase">
                <div className="col-span-3">Username</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Level</div>
                <div className="col-span-2">Career Points</div>
                <div className="col-span-2">Joined</div>
              </div>

              {/* Table Rows */}
              {filteredUsers.map((user) => (
                <div 
                  key={user.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 last:border-b-0 items-center hover:bg-zinc-900/50 transition-colors"
                  data-testid={`user-row-${user.id}`}
                >
                  <div className="col-span-3">
                    <span className="text-white font-heading uppercase">{user.username}</span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-zinc-400 text-sm">{user.email}</span>
                  </div>
                  <div className="col-span-2">
                    <span className={`font-mono text-sm ${getLevelColor(user.level)}`}>
                      LVL {user.level}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-white font-heading">{user.career_points || 0}</span>
                    <span className="text-zinc-500 text-sm ml-1">CP</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-zinc-500 font-mono text-sm">
                      {formatDate(user.created_at)}
                    </span>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="p-8 text-center text-zinc-500">
                  <Users className="w-8 h-8 mx-auto mb-3 text-zinc-700" />
                  <p>{searchQuery ? 'No players found' : 'No players yet'}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
