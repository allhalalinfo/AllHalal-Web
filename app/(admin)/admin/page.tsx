"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface StatsData {
  database?: {
    total_products?: number;
    halal_percentage?: number;
    haram_count?: number;
    mushbooh_count?: number;
    last_updated?: string;
    // Real backend format
    products?: {
      food?: number;
      cosmetics?: number;
      total?: number;
    };
    halal_status?: {
      halal?: number;
      haram?: number;
      mushbooh?: number;
      invalid?: number;
      unknown?: number;
    };
  };
  etl?: {
    last_run?: string;
    status?: string;
    products_processed?: number;
    errors?: number;
  };
  api?: {
    total_scans?: number;
    scans_today?: number;
    scans_this_week?: number;
    unique_users?: number;
  };
  health?: {
    status?: string;
    database_connected?: boolean;
    api_uptime?: number;
    version?: string;
    // Real backend format
    timestamp?: string;
    checks?: {
      database?: {
        status?: string;
        response_time_ms?: number;
        products?: {
          total?: number;
        };
      };
      redis?: {
        status?: string;
        uptime_hours?: number;
      };
      memory?: {
        status?: string;
        percent_used?: number;
      };
      cpu?: {
        status?: string;
        percent?: number;
      };
      disk?: {
        status?: string;
        percent_used?: number;
        total_gb?: number;
        used_gb?: number;
        free_gb?: number;
      };
    };
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'etl' | 'api' | 'health'>('overview');

  // Check if already authenticated and load stats
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
      // Refresh stats every 30 seconds
      const interval = setInterval(loadStats, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, activeTab]);

  const checkAuth = async () => {
    try {
      // Check authentication via API (httpOnly cookies are not accessible from JS)
      const response = await fetch('/api/admin/check', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.authenticated === true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Auth check error:', err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    if (!isAuthenticated) return;
    
    setStatsLoading(true);
    setStatsError(null);

    try {
      // Determine which endpoint to call based on active tab
      const endpointMap: Record<string, string> = {
        overview: '?type=all',
        database: '?type=database',
        etl: '?type=etl',
        api: '?type=api',
        health: '?type=health',
      };

      const endpoint = endpointMap[activeTab] || '?type=all';
      const response = await fetch(`/api/admin/stats${endpoint}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Transform backend data format to match our interface
      const transformedData: StatsData = {
        database: data.database || (data.products ? {
          products: data.products,
          halal_status: data.halal_status,
          total_products: data.products?.total,
          halal_percentage: data.halal_status && data.products?.total 
            ? (data.halal_status.halal / data.products.total * 100) 
            : undefined,
          haram_count: data.halal_status?.haram,
          mushbooh_count: data.halal_status?.mushbooh,
        } : undefined),
        etl: data.etl,
        api: data.api,
        health: data.health || (data.status ? {
          status: data.status,
          checks: data.checks,
          database_connected: data.checks?.database?.status === 'healthy' || data.checks?.database?.status === 'ok',
          api_uptime: data.checks?.redis?.uptime_hours ? data.checks.redis.uptime_hours * 3600 : undefined,
        } : undefined),
      };
      
      setStats(transformedData);
    } catch (err) {
      console.error('Failed to load stats:', err);
      setStatsError(err instanceof Error ? err.message : 'Failed to load statistics');
    } finally {
      setStatsLoading(false);
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
        body: JSON.stringify({ password, rememberMe }),
        credentials: 'include',
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-text-secondary">Loading...</div>
        </div>
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

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-bg-secondary text-primary focus:ring-primary focus:ring-2 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-text-secondary cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      <header className="bg-bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-bg-card/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-text-primary">
              AllHalal Admin
            </h1>
            <span className="px-3 py-1.5 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
              ✓ Connected
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-border">
          <nav className="flex gap-1">
            {(['overview', 'database', 'etl', 'api', 'health'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-all border-b-2 rounded-t-lg ${
                  activeTab === tab
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats Content */}
        {statsLoading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading statistics...</p>
          </div>
        ) : statsError ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">Failed to Load Stats</h3>
            <p className="text-text-secondary text-sm mb-6">{statsError}</p>
            <button
              onClick={loadStats}
              className="px-6 py-2 bg-bg-secondary hover:bg-bg-elevated text-text-primary rounded-lg transition-colors text-sm font-medium"
            >
              Retry
            </button>
            <p className="text-xs text-text-muted mt-6">
              Make sure NEXT_PUBLIC_BACKEND_URL is configured and backend is running.
            </p>
          </div>
        ) : (
          <DashboardContent stats={stats} activeTab={activeTab} />
        )}
      </main>
    </div>
  );
}

function DashboardContent({ stats, activeTab }: { stats: StatsData | null; activeTab: string }) {
  if (!stats) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">📊</div>
        <p className="text-text-secondary">No statistics available</p>
        <p className="text-text-muted text-sm mt-2">
          Backend may not be configured or endpoints are not available.
        </p>
      </div>
    );
  }

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={formatNumber(stats.database?.total_products || stats.database?.products?.total)}
            color="bg-blue-500/10 text-blue-500"
            icon="📦"
            subtitle={stats.database?.last_updated ? `Updated: ${formatDate(stats.database.last_updated)}` : undefined}
          />
          <StatCard
            title="Halal Percentage"
            value={stats.database?.halal_percentage 
              ? `${stats.database.halal_percentage.toFixed(1)}%`
              : (stats.database?.halal_status?.halal && stats.database?.products?.total
                ? `${((stats.database.halal_status.halal / stats.database.products.total) * 100).toFixed(1)}%`
                : 'N/A')}
            color="bg-green-500/10 text-green-500"
            icon="✅"
            subtitle={stats.database?.halal_status?.halal 
              ? `${formatNumber(stats.database.halal_status.halal)} halal products`
              : undefined}
          />
          <StatCard
            title="API Scans"
            value={formatNumber(stats.api?.total_scans)}
            color="bg-purple-500/10 text-purple-500"
            icon="📊"
            subtitle={stats.api?.scans_today ? `${formatNumber(stats.api.scans_today)} today` : undefined}
          />
          <StatCard
            title="System Status"
            value={stats.health?.status === 'healthy' ? 'Healthy' : stats.health?.status || 'Unknown'}
            color={stats.health?.status === 'healthy' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
            icon={stats.health?.status === 'healthy' ? '💚' : '⚠️'}
            subtitle={stats.health?.version ? `v${stats.health.version}` : undefined}
          />
        </div>

        {/* Additional Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            title="Haram Products"
            value={formatNumber(stats.database?.haram_count || stats.database?.halal_status?.haram)}
            color="bg-red-500/10 text-red-500"
            icon="❌"
          />
          <StatCard
            title="Mushbooh Products"
            value={formatNumber(stats.database?.mushbooh_count || stats.database?.halal_status?.mushbooh)}
            color="bg-yellow-500/10 text-yellow-500"
            icon="⚠️"
          />
          <StatCard
            title="Unique Users"
            value={formatNumber(stats.api?.unique_users)}
            color="bg-indigo-500/10 text-indigo-500"
            icon="👥"
            subtitle={stats.api?.scans_this_week ? `${formatNumber(stats.api.scans_this_week)} this week` : undefined}
          />
        </div>

        {/* ETL Status */}
        {stats.etl && (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              🔄 ETL Status
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-text-secondary mb-1">Last Run</div>
                <div className="text-text-primary font-medium">
                  {stats.etl.last_run ? formatDate(stats.etl.last_run) : 'Never'}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Status</div>
                <div className={`font-medium ${stats.etl.status === 'success' ? 'text-green-500' : stats.etl.status === 'error' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {stats.etl.status || 'Unknown'}
                </div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Products Processed</div>
                <div className="text-text-primary font-medium">
                  {formatNumber(stats.etl.products_processed)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'database') {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={formatNumber(stats.database?.total_products || stats.database?.products?.total)}
            color="bg-blue-500/10 text-blue-500"
            icon="📦"
          />
          <StatCard
            title="Halal"
            value={stats.database?.halal_percentage 
              ? `${stats.database.halal_percentage.toFixed(1)}%`
              : (stats.database?.halal_status?.halal && stats.database?.products?.total
                ? `${((stats.database.halal_status.halal / stats.database.products.total) * 100).toFixed(1)}%`
                : 'N/A')}
            color="bg-green-500/10 text-green-500"
            icon="✅"
          />
          <StatCard
            title="Haram"
            value={formatNumber(stats.database?.haram_count || stats.database?.halal_status?.haram)}
            color="bg-red-500/10 text-red-500"
            icon="❌"
          />
          <StatCard
            title="Mushbooh"
            value={formatNumber(stats.database?.mushbooh_count || stats.database?.halal_status?.mushbooh)}
            color="bg-yellow-500/10 text-yellow-500"
            icon="⚠️"
          />
        </div>
        {stats.database?.last_updated && (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <div className="text-sm text-text-secondary">Last Updated</div>
            <div className="text-text-primary font-medium">{formatDate(stats.database.last_updated)}</div>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'api') {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Scans"
            value={formatNumber(stats.api?.total_scans)}
            color="bg-purple-500/10 text-purple-500"
            icon="📊"
          />
          <StatCard
            title="Scans Today"
            value={formatNumber(stats.api?.scans_today)}
            color="bg-blue-500/10 text-blue-500"
            icon="📅"
          />
          <StatCard
            title="Scans This Week"
            value={formatNumber(stats.api?.scans_this_week)}
            color="bg-indigo-500/10 text-indigo-500"
            icon="📈"
          />
          <StatCard
            title="Unique Users"
            value={formatNumber(stats.api?.unique_users)}
            color="bg-green-500/10 text-green-500"
            icon="👥"
          />
        </div>
      </div>
    );
  }

  if (activeTab === 'etl') {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <StatCard
            title="Last Run"
            value={stats.etl?.last_run ? formatDate(stats.etl.last_run) : 'Never'}
            color="bg-blue-500/10 text-blue-500"
            icon="🕐"
          />
          <StatCard
            title="Status"
            value={stats.etl?.status || 'Unknown'}
            color={stats.etl?.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
            icon={stats.etl?.status === 'success' ? '✅' : '⚠️'}
          />
          <StatCard
            title="Products Processed"
            value={formatNumber(stats.etl?.products_processed)}
            color="bg-purple-500/10 text-purple-500"
            icon="📦"
          />
          <StatCard
            title="Errors"
            value={formatNumber(stats.etl?.errors)}
            color={stats.etl?.errors && stats.etl.errors > 0 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}
            icon={stats.etl?.errors && stats.etl.errors > 0 ? '❌' : '✅'}
          />
        </div>
      </div>
    );
  }

  if (activeTab === 'health') {
    const healthStatus = stats.health?.status || stats.health?.checks?.database?.status || 'Unknown';
    const dbStatus = stats.health?.checks?.database?.status || (stats.health?.database_connected ? 'healthy' : 'error');
    const dbConnected = dbStatus === 'healthy' || dbStatus === 'ok' || stats.health?.database_connected;
    const uptimeHours = stats.health?.checks?.redis?.uptime_hours || (stats.health?.api_uptime ? stats.health.api_uptime / 3600 : undefined);
    
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <StatCard
            title="Status"
            value={healthStatus === 'healthy' ? 'Healthy' : healthStatus === 'unhealthy' ? 'Unhealthy' : healthStatus}
            color={healthStatus === 'healthy' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
            icon={healthStatus === 'healthy' ? '💚' : '⚠️'}
          />
          <StatCard
            title="Database"
            value={dbConnected ? 'Connected' : 'Disconnected'}
            color={dbConnected ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}
            icon={dbConnected ? '✅' : '❌'}
            subtitle={stats.health?.checks?.database?.response_time_ms ? `${stats.health.checks.database.response_time_ms}ms` : undefined}
          />
          <StatCard
            title="Uptime"
            value={uptimeHours ? `${uptimeHours.toFixed(1)}h` : 'N/A'}
            color="bg-blue-500/10 text-blue-500"
            icon="⏱️"
            subtitle={stats.health?.checks?.redis?.status ? `Redis: ${stats.health.checks.redis.status}` : undefined}
          />
          <StatCard
            title="Memory"
            value={stats.health?.checks?.memory?.percent_used ? `${stats.health.checks.memory.percent_used.toFixed(1)}%` : 'N/A'}
            color={stats.health?.checks?.memory?.percent_used && stats.health.checks.memory.percent_used < 80 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
            icon="💾"
            subtitle={stats.health?.checks?.memory?.status || undefined}
          />
        </div>
        
        {/* Additional Health Info */}
        {stats.health?.checks && (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">System Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {stats.health.checks.cpu && (
                <div>
                  <div className="text-text-secondary mb-1">CPU Usage</div>
                  <div className="text-text-primary font-medium">{stats.health.checks.cpu.percent?.toFixed(1)}%</div>
                </div>
              )}
              {stats.health.checks.disk && (
                <div>
                  <div className="text-text-secondary mb-1">Disk Usage</div>
                  <div className="text-text-primary font-medium">{stats.health.checks.disk.percent_used?.toFixed(1)}%</div>
                </div>
              )}
              {stats.health.checks.redis && (
                <div>
                  <div className="text-text-secondary mb-1">Redis</div>
                  <div className="text-text-primary font-medium">{stats.health.checks.redis.status}</div>
                </div>
              )}
              {stats.health.timestamp && (
                <div>
                  <div className="text-text-secondary mb-1">Last Check</div>
                  <div className="text-text-primary font-medium">{formatDate(stats.health.timestamp)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function StatCard({ 
  title, 
  value, 
  color, 
  icon, 
  subtitle 
}: { 
  title: string; 
  value: string; 
  color: string; 
  icon: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-text-primary mb-2">{value}</div>
      <div className="text-sm font-medium text-text-secondary">{title}</div>
      {subtitle && (
        <div className="text-xs text-text-muted mt-3 pt-3 border-t border-border">{subtitle}</div>
      )}
    </div>
  );
}

function formatNumber(num: number | undefined): string {
  if (num === undefined || num === null) return 'N/A';
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
}

function formatUptime(seconds: number | undefined): string {
  if (!seconds) return 'N/A';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
