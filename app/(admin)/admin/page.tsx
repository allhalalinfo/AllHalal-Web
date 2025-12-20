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
    // Old format (backward compatibility)
    total_scans?: number;
    scans_today?: number;
    scans_this_week?: number;
    unique_users?: number;
    // New format (from scan_logs)
    status?: 'active' | 'no_data' | 'not_configured';
    message?: string;
    total_scans_all_time?: number;
    today?: {
      total_scans?: number;
      unique_devices?: number;
    };
    last_24h?: {
      total_scans?: number;
      unique_devices?: number;
      found_products?: number;
      not_found?: number;
      avg_response_time_ms?: number;
      cache_hits?: number;
      cache_hit_rate_percent?: number;
    };
    last_7d?: {
      total_scans?: number;
      unique_devices?: number;
    };
    popular_products?: Array<{
      barcode: string;
      product_name: string;
      halal_status: 'halal' | 'haram' | 'mushbooh' | 'unknown';
      scan_count: number;
    }>;
    hourly_stats?: Array<{
      hour: string;
      scans: number;
      found: number;
      not_found: number;
      avg_response_ms: number;
    }>;
    halal_distribution?: Array<{
      status: 'halal' | 'haram' | 'mushbooh' | 'unknown';
      count: number;
    }>;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'etl' | 'api' | 'health' | 'geographic'>('overview');
  const [geoStats, setGeoStats] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check if already authenticated and load stats
  useEffect(() => {
    checkAuth();
  }, []);

  // Load stats on authentication and auto-refresh every hour
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Initial load
    loadStats();
    
    // Auto-refresh every hour (3600 seconds)
    const interval = setInterval(() => {
      loadStats();
      // Also refresh geographic stats if on that tab
      if (activeTab === 'geographic') {
        loadGeographicStats();
      }
    }, 3600000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Load geographic stats only when switching to geographic tab (if not already loaded)
  useEffect(() => {
    if (isAuthenticated && activeTab === 'geographic' && !geoStats) {
      loadGeographicStats();
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

  const loadStats = async (showLoading = true) => {
    if (!isAuthenticated) return;
    
    if (showLoading) {
      setStatsLoading(true);
    }
    setIsRefreshing(true);
    setStatsError(null);

    try {
      let data: any = {};
      
      // For overview, fetch database, health, and api separately (no 'all' endpoint exists)
      if (activeTab === 'overview') {
        const [dbResponse, healthResponse, apiResponse] = await Promise.allSettled([
          fetch('/api/admin/stats?type=database', { credentials: 'include', cache: 'no-store' }),
          fetch('/api/admin/stats?type=health', { credentials: 'include', cache: 'no-store' }),
          fetch('/api/admin/stats?type=api', { credentials: 'include', cache: 'no-store' }),
        ]);
        
        if (dbResponse.status === 'fulfilled' && dbResponse.value.ok) {
          data.database = await dbResponse.value.json();
        }
        if (healthResponse.status === 'fulfilled' && healthResponse.value.ok) {
          data.health = await healthResponse.value.json();
        }
        if (apiResponse.status === 'fulfilled' && apiResponse.value.ok) {
          data.api = await apiResponse.value.json();
        }
      } else {
        // For other tabs, fetch single endpoint
        const endpointMap: Record<string, string> = {
          database: '?type=database',
          etl: '?type=etl',
          api: '?type=api',
          health: '?type=health',
        };

        const endpoint = endpointMap[activeTab] || '?type=database';
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
          // For 500 errors (ETL, API endpoints), show graceful error
          if (response.status === 500) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Backend endpoint not available (500). ${errorData.details || ''}`);
          }
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        data = await response.json();
        
        // Wrap single endpoint response in appropriate key
        if (activeTab === 'database') {
          data = { database: data };
        } else if (activeTab === 'etl') {
          data = { etl: data };
        } else if (activeTab === 'api') {
          data = { api: data };
        } else if (activeTab === 'health') {
          data = { health: data };
        }
      }
      
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
      if (showLoading) {
        setStatsLoading(false);
      }
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    await loadStats(false);
    if (activeTab === 'geographic') {
      await loadGeographicStats();
    }
  };

  const loadGeographicStats = async () => {
    if (!isAuthenticated) return;
    
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/admin/stats?type=geographic', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        // Handle 404 - endpoint not implemented yet
        if (response.status === 404) {
          setGeoStats({ status: 'not_available', message: 'Geographic statistics endpoint is not available yet on backend.' });
          return;
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setGeoStats(data);
    } catch (err) {
      console.error('Failed to load geographic stats:', err);
      setGeoStats({ status: 'error', message: err instanceof Error ? err.message : 'Failed to load geographic statistics' });
    } finally {
      setIsRefreshing(false);
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
          
          <div className="flex items-center gap-3">
            <a
              href="/ceo"
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
              title="CEO Панель"
            >
              👔 CEO
            </a>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              title="Обновить данные"
            >
              <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
              {isRefreshing ? 'Обновление...' : 'Обновить'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-border">
          <nav className="flex gap-1 overflow-x-auto">
            {(['overview', 'database', 'etl', 'api', 'geographic', 'health'] as const).map((tab) => (
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
          <DashboardContent 
            stats={stats} 
            activeTab={activeTab} 
            geoStats={geoStats} 
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        )}
      </main>
    </div>
  );
}

function DashboardContent({ 
  stats, 
  activeTab, 
  geoStats, 
  onRefresh, 
  isRefreshing 
}: { 
  stats: StatsData | null; 
  activeTab: string; 
  geoStats?: any;
  onRefresh: () => void;
  isRefreshing: boolean;
}) {
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Обзор статистики</h2>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Обновить данные"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            {isRefreshing ? 'Обновление...' : 'Обновить'}
          </button>
        </div>
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
            value={formatNumber(stats.api?.total_scans_all_time || stats.api?.total_scans)}
            color="bg-purple-500/10 text-purple-500"
            icon="📊"
            subtitle={stats.api?.today?.total_scans 
              ? `${formatNumber(stats.api.today.total_scans)} today`
              : stats.api?.scans_today 
                ? `${formatNumber(stats.api.scans_today)} today`
                : undefined}
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
            value={formatNumber(stats.api?.last_24h?.unique_devices || stats.api?.today?.unique_devices || stats.api?.unique_users)}
            color="bg-indigo-500/10 text-indigo-500"
            icon="👥"
            subtitle={stats.api?.last_7d?.total_scans 
              ? `${formatNumber(stats.api.last_7d.total_scans)} this week`
              : stats.api?.scans_this_week 
                ? `${formatNumber(stats.api.scans_this_week)} this week`
                : undefined}
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Статистика базы данных</h2>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Обновить данные"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            {isRefreshing ? 'Обновление...' : 'Обновить'}
          </button>
        </div>
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
    // Handle new format from scan_logs
    if (stats.api?.status === 'no_data') {
      return (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">No Scan Data Yet</h3>
          <p className="text-text-secondary mb-4">{stats.api.message || 'Start scanning products to see statistics.'}</p>
          <p className="text-text-muted text-sm">Total scans: {formatNumber(stats.api.total_scans || 0)}</p>
        </div>
      );
    }

    if (stats.api?.status === 'not_configured') {
      return (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">API Logging Not Configured</h3>
          <p className="text-text-secondary">{stats.api.message || 'API scan logging is not configured on backend.'}</p>
        </div>
      );
    }

    // New format with detailed stats
    const apiStats = stats.api;
    const today = apiStats?.today;
    const last24h = apiStats?.last_24h;
    const last7d = apiStats?.last_7d;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Статистика API</h2>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Обновить данные"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            {isRefreshing ? 'Обновление...' : 'Обновить'}
          </button>
        </div>
        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Scans (All Time)"
            value={formatNumber(apiStats?.total_scans_all_time || apiStats?.total_scans)}
            color="bg-purple-500/10 text-purple-500"
            icon="📊"
          />
          <StatCard
            title="Scans Today"
            value={formatNumber(today?.total_scans || apiStats?.scans_today)}
            color="bg-blue-500/10 text-blue-500"
            icon="📅"
            subtitle={today?.unique_devices ? `${formatNumber(today.unique_devices)} unique devices` : undefined}
          />
          <StatCard
            title="Scans Last 7 Days"
            value={formatNumber(last7d?.total_scans || apiStats?.scans_this_week)}
            color="bg-indigo-500/10 text-indigo-500"
            icon="📈"
            subtitle={last7d?.unique_devices ? `${formatNumber(last7d.unique_devices)} unique devices` : undefined}
          />
          <StatCard
            title="Unique Devices (24h)"
            value={formatNumber(last24h?.unique_devices || apiStats?.unique_users)}
            color="bg-green-500/10 text-green-500"
            icon="👥"
          />
        </div>

        {/* Detailed 24h Stats */}
        {last24h && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Found Products"
              value={formatNumber(last24h.found_products)}
              color="bg-green-500/10 text-green-500"
              icon="✅"
            />
            <StatCard
              title="Not Found"
              value={formatNumber(last24h.not_found)}
              color="bg-red-500/10 text-red-500"
              icon="❌"
            />
            <StatCard
              title="Avg Response Time"
              value={last24h.avg_response_time_ms ? `${last24h.avg_response_time_ms}ms` : 'N/A'}
              color="bg-yellow-500/10 text-yellow-500"
              icon="⏱️"
            />
            <StatCard
              title="Cache Hit Rate"
              value={last24h.cache_hit_rate_percent ? `${last24h.cache_hit_rate_percent.toFixed(1)}%` : 'N/A'}
              color="bg-cyan-500/10 text-cyan-500"
              icon="💾"
              subtitle={last24h.cache_hits ? `${formatNumber(last24h.cache_hits)} hits` : undefined}
            />
          </div>
        )}

        {/* Popular Products */}
        {apiStats?.popular_products && apiStats.popular_products.length > 0 && (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              🔥 Popular Products (Last 24h)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-text-secondary font-medium">Barcode</th>
                    <th className="text-left py-2 text-text-secondary font-medium">Product Name</th>
                    <th className="text-left py-2 text-text-secondary font-medium">Halal Status</th>
                    <th className="text-right py-2 text-text-secondary font-medium">Scans</th>
                  </tr>
                </thead>
                <tbody>
                  {apiStats.popular_products.map((product, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-bg-secondary transition-colors">
                      <td className="py-3 text-text-primary font-mono text-xs">{product.barcode}</td>
                      <td className="py-3 text-text-primary">{product.product_name || 'N/A'}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.halal_status === 'halal' ? 'bg-green-500/10 text-green-500' :
                          product.halal_status === 'haram' ? 'bg-red-500/10 text-red-500' :
                          product.halal_status === 'mushbooh' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-gray-500/10 text-gray-500'
                        }`}>
                          {product.halal_status}
                        </span>
                      </td>
                      <td className="py-3 text-right text-text-primary font-medium">{formatNumber(product.scan_count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Halal Distribution */}
        {apiStats?.halal_distribution && apiStats.halal_distribution.length > 0 && (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              📊 Halal Status Distribution (Last 24h)
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {apiStats.halal_distribution.map((dist, idx) => (
                <div key={idx} className="text-center p-4 rounded-lg bg-bg-secondary">
                  <div className={`text-2xl font-bold mb-1 ${
                    dist.status === 'halal' ? 'text-green-500' :
                    dist.status === 'haram' ? 'text-red-500' :
                    dist.status === 'mushbooh' ? 'text-yellow-500' :
                    'text-gray-500'
                  }`}>
                    {formatNumber(dist.count)}
                  </div>
                  <div className="text-sm text-text-secondary capitalize">{dist.status}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hourly Stats (Simple List) */}
        {apiStats?.hourly_stats && apiStats.hourly_stats.length > 0 && (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              📈 Hourly Statistics (Last 24h)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {apiStats.hourly_stats.slice(0, 8).map((hour, idx) => {
                const hourDate = new Date(hour.hour);
                const hourStr = hourDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={idx} className="p-3 rounded-lg bg-bg-secondary">
                    <div className="text-xs text-text-muted mb-1">{hourStr}</div>
                    <div className="text-lg font-bold text-text-primary">{formatNumber(hour.scans)}</div>
                    <div className="text-xs text-text-secondary mt-1">
                      {formatNumber(hour.found)} found, {formatNumber(hour.not_found)} not found
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      Avg: {hour.avg_response_ms}ms
                    </div>
                  </div>
                );
              })}
            </div>
            {apiStats.hourly_stats.length > 8 && (
              <p className="text-xs text-text-muted mt-4 text-center">
                Showing first 8 hours of {apiStats.hourly_stats.length} total
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'etl') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Статистика ETL</h2>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Обновить данные"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            {isRefreshing ? 'Обновление...' : 'Обновить'}
          </button>
        </div>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Состояние системы</h2>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Обновить данные"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            {isRefreshing ? 'Обновление...' : 'Обновить'}
          </button>
        </div>
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

  if (activeTab === 'geographic') {
    if (!geoStats) {
      return (
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading geographic statistics...</p>
        </div>
      );
    }

    if (geoStats.status === 'no_data') {
      return (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">No Geographic Data Yet</h3>
          <p className="text-text-secondary">{geoStats.message || 'Start scanning products to see geographic statistics.'}</p>
        </div>
      );
    }

    if (geoStats.status === 'not_available' || geoStats.status === 'error') {
      return (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            {geoStats.status === 'not_available' ? 'Endpoint Not Available' : 'Error Loading Data'}
          </h3>
          <p className="text-text-secondary mb-4">{geoStats.message}</p>
          {geoStats.status === 'not_available' && (
            <p className="text-xs text-text-muted">
              The geographic statistics endpoint is not yet implemented on backend. 
              Contact backend team to add <code className="bg-bg-secondary px-2 py-1 rounded">/admin/stats/geographic</code> endpoint.
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Географическая статистика</h2>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Обновить данные"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            {isRefreshing ? 'Обновление...' : 'Обновить'}
          </button>
        </div>
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            title="Total Countries"
            value={formatNumber(geoStats.total_countries)}
            color="bg-blue-500/10 text-blue-500"
            icon="🌍"
          />
          <StatCard
            title="Countries (30d)"
            value={formatNumber(geoStats.last_30_days?.length || 0)}
            color="bg-indigo-500/10 text-indigo-500"
            icon="📊"
          />
          <StatCard
            title="Top Country Today"
            value={geoStats.today_top?.[0]?.country_name || 'N/A'}
            color="bg-green-500/10 text-green-500"
            icon="🏆"
            subtitle={geoStats.today_top?.[0] ? `${formatNumber(geoStats.today_top[0].scan_count)} scans` : undefined}
          />
        </div>

        {/* Last 30 Days Table */}
        {geoStats.last_30_days && geoStats.last_30_days.length > 0 && (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              🌍 Geographic Distribution (Last 30 Days)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-text-secondary font-medium">Country</th>
                    <th className="text-right py-3 text-text-secondary font-medium">Scans</th>
                    <th className="text-right py-3 text-text-secondary font-medium">Devices</th>
                    <th className="text-right py-3 text-text-secondary font-medium">Found</th>
                  </tr>
                </thead>
                <tbody>
                  {geoStats.last_30_days.map((country: any, idx: number) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-bg-secondary transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getCountryFlag(country.country_code)}</span>
                          <div>
                            <div className="text-text-primary font-medium">{country.country_name}</div>
                            <div className="text-xs text-text-muted font-mono">{country.country_code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right text-text-primary font-medium">{formatNumber(country.scan_count)}</td>
                      <td className="py-3 text-right text-text-secondary">{formatNumber(country.unique_devices)}</td>
                      <td className="py-3 text-right text-text-secondary">{formatNumber(country.found_products)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Today Top Countries */}
        {geoStats.today_top && geoStats.today_top.length > 0 && (
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              📅 Top Countries Today
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {geoStats.today_top.slice(0, 10).map((country: any, idx: number) => (
                <div key={idx} className="p-4 rounded-lg bg-bg-secondary text-center">
                  <div className="text-2xl mb-2">{getCountryFlag(country.country_code)}</div>
                  <div className="text-sm font-medium text-text-primary mb-1">{country.country_name}</div>
                  <div className="text-lg font-bold text-primary">{formatNumber(country.scan_count)}</div>
                  <div className="text-xs text-text-muted mt-1">scans</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function getCountryFlag(countryCode: string): string {
  // Convert country code to flag emoji
  // Example: "RU" -> "🇷🇺", "US" -> "🇺🇸"
  if (!countryCode || countryCode.length !== 2) return '🌍';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
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
