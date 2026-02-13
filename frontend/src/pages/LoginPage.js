import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Fingerprint, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Authentication successful');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col noise-overlay">
      {/* Header */}
      <nav className="p-6 md:p-8">
        <Link to="/" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-xs tracking-widest uppercase">Back to HQ</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Fingerprint className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-3xl text-white tracking-widest uppercase">
              Agent Login
            </h1>
            <p className="text-zinc-500 text-sm mt-2 font-mono">
              // SECURE AUTHENTICATION REQUIRED
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-950/30 border border-red-900/50 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400 uppercase tracking-widest text-xs">
                Agent Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-900 border-zinc-800 focus:border-zinc-600 rounded-none h-12 text-white placeholder:text-zinc-600 font-mono"
                placeholder="agent@fbi.gov"
                required
                data-testid="email-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-400 uppercase tracking-widest text-xs">
                Access Code
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-900 border-zinc-800 focus:border-zinc-600 rounded-none h-12 text-white placeholder:text-zinc-600 font-mono"
                placeholder="••••••••"
                required
                data-testid="password-input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-zinc-200 rounded-none uppercase tracking-widest font-bold text-sm h-12"
              data-testid="login-submit-btn"
            >
              {loading ? 'Authenticating...' : 'Access System'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">
              New to the Bureau?{' '}
              <Link to="/register" className="text-white hover:underline" data-testid="register-link">
                Request Clearance
              </Link>
            </p>
          </div>

          {/* Decorative */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <div className="font-mono text-xs text-zinc-600 text-center">
              <span className="text-emerald-600">&gt;</span> SECURE CONNECTION ESTABLISHED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
