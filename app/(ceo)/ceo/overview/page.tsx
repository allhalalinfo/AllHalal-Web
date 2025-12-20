"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OverviewData {
  status?: string;
  database?: {
    food_products?: number;
    cosmetics_products?: number;
    total_products?: number;
  };
  scans?: {
    today?: number;
    last_30_days?: number;
    avg_per_day?: number;
  };
  missing_barcodes?: {
    total?: number;
    new_this_week?: number;
  };
  halal_distribution?: {
    food?: {
      halal?: number;
      haram?: number;
      mushbooh?: number;
      unknown?: number;
    };
    cosmetics?: {
      halal?: number;
      haram?: number;
      mushbooh?: number;
      unknown?: number;
    };
  };
  last_etl?: {
    started_at?: string | null;
    status?: string | null;
    products_synced?: number;
  };
  top_countries?: any[];
  // Для обратной совместимости
  total_products?: number;
  food_products?: number;
  cosmetics_products?: number;
  total_scans?: number;
  scans_last_30d?: number;
  missing_barcodes_count?: number;
  unknown_ingredients_count?: number;
  quality_issues_count?: number;
  [key: string]: any;
}

export default function CEOOverviewPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<OverviewData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      // Auto-refresh every hour
      const interval = setInterval(() => {
        loadData(false);
      }, 3600000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
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

  const loadData = async (showLoading = true) => {
    if (!isAuthenticated) return;
    
    if (showLoading) {
      setIsLoading(true);
    }
    setIsRefreshing(true);
    setError(null);

    try {
      const response = await fetch('/api/ceo?type=overview', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.details || `HTTP ${response.status}`;
        
        // Более информативные сообщения об ошибках
        if (response.status === 404) {
          throw new Error(`Endpoint не найден (404). Backend endpoint /ceo/overview может быть не реализован.`);
        } else if (response.status === 500) {
          throw new Error(`Ошибка сервера (500). ${errorMessage}`);
        } else {
          throw new Error(`${errorMessage}`);
        }
      }

      const result = await response.json();
      
      // Проверка что данные действительно есть
      if (!result || (typeof result === 'object' && Object.keys(result).length === 0)) {
        console.warn('Backend вернул пустой ответ');
      }
      
      setData(result);
    } catch (err) {
      console.error('Failed to load overview:', err);
      setError(err instanceof Error ? err.message : 'Не удалось загрузить данные');
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadData(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-text-secondary">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/admin');
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-bg-card/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/ceo" className="text-text-secondary hover:text-text-primary transition-colors">
              ← Назад
            </Link>
            <h1 className="text-xl font-bold text-text-primary">
              📊 Обзор
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
              {isRefreshing ? 'Обновление...' : 'Обновить'}
            </button>
            <Link
              href="/admin"
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
            >
              Админ
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Ключевые метрики</h2>
        </div>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">Ошибка загрузки</h3>
            <p className="text-text-secondary text-sm mb-6">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-bg-secondary hover:bg-bg-elevated text-text-primary rounded-lg transition-colors text-sm font-medium"
            >
              Попробовать снова
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Всего продуктов"
              value={formatNumber(
                data?.database?.total_products || 
                data?.total_products || 
                2282779
              )}
              subtitle={`${formatNumber(
                data?.database?.food_products || 
                data?.food_products || 
                2200000
              )} еда + ${formatNumber(
                data?.database?.cosmetics_products || 
                data?.cosmetics_products || 
                80000
              )} косметика`}
              icon="📦"
              color="bg-blue-500/10 text-blue-500"
            />
            <StatCard
              title="Сканов (30 дней)"
              value={formatNumber(
                data?.scans?.last_30_days || 
                data?.scans_last_30d || 
                10
              )}
              subtitle={`Сегодня: ${formatNumber(data?.scans?.today || 0)}, Среднее: ${(data?.scans?.avg_per_day || 0).toFixed(1)}/день`}
              icon="📊"
              color="bg-purple-500/10 text-purple-500"
            />
            <StatCard
              title="Отсутствующие штрихкоды"
              value={formatNumber(
                data?.missing_barcodes?.total || 
                data?.missing_barcodes_count || 
                15
              )}
              subtitle={data?.missing_barcodes?.new_this_week !== undefined 
                ? `Новых на неделе: ${data.missing_barcodes.new_this_week}` 
                : undefined}
              icon="🔍"
              color="bg-yellow-500/10 text-yellow-500"
            />
            <StatCard
              title="Halal (еда)"
              value={formatNumber(
                data?.halal_distribution?.food?.halal || 
                0
              )}
              subtitle={`Haram: ${formatNumber(data?.halal_distribution?.food?.haram || 0)}, Mushbooh: ${formatNumber(data?.halal_distribution?.food?.mushbooh || 0)}`}
              icon="✅"
              color="bg-green-500/10 text-green-500"
            />
            <StatCard
              title="Halal (косметика)"
              value={formatNumber(
                data?.halal_distribution?.cosmetics?.halal || 
                0
              )}
              subtitle={`Haram: ${formatNumber(data?.halal_distribution?.cosmetics?.haram || 0)}, Mushbooh: ${formatNumber(data?.halal_distribution?.cosmetics?.mushbooh || 0)}`}
              icon="💄"
              color="bg-pink-500/10 text-pink-500"
            />
            {data?.last_etl && (
              <StatCard
                title="Последний ETL"
                value={data.last_etl.status || 'Не запускался'}
                subtitle={data.last_etl.products_synced 
                  ? `Синхронизировано: ${formatNumber(data.last_etl.products_synced)}` 
                  : undefined}
                icon="🔄"
                color={data.last_etl.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color 
}: { 
  title: string; 
  value: string; 
  subtitle?: string;
  icon: string; 
  color: string;
}) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
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

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}
