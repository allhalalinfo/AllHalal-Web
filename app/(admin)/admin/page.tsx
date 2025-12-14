"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if cookie exists (simplified check)
      const hasCookie = document.cookie.includes('admin_session');
      setIsAuthenticated(hasCookie);
    } catch (err) {
      console.error('Auth check error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setIsAuthenticated(true);
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setPassword("");
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-bg-card border border-border rounded-2xl p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                🔐 Admin Access
              </h1>
              <p className="text-text-secondary text-sm">
                Enter password to access admin panel
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Back to home */}
            <div className="mt-6 text-center">
              <a href="/" className="text-sm text-text-muted hover:text-primary transition-colors">
                ← Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard (after login)
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-text-primary">
              AllHalal Admin
            </h1>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Connected
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="btn btn-secondary text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Admin Dashboard
          </h2>
          <p className="text-text-secondary mb-8">
            Backend integration in progress...
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <StatCard 
              title="Products" 
              value="2.27M" 
              color="bg-blue-500/10 text-blue-500"
              icon="📦"
            />
            <StatCard 
              title="Halal" 
              value="46.6%" 
              color="bg-green-500/10 text-green-500"
              icon="✅"
            />
            <StatCard 
              title="API Scans" 
              value="15.2K" 
              color="bg-purple-500/10 text-purple-500"
              icon="📊"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, color, icon }: { title: string; value: string; color: string; icon: string }) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-6">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-text-primary mb-1">{value}</div>
      <div className="text-sm text-text-secondary">{title}</div>
    </div>
  );
}
