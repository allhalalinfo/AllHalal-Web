"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface GrowthData {
  status?: string;
  scans_last_30_days?: Array<{
    date: string;
    scans: number;
  }>;
  products_added_last_30_days?: Array<{
    date: string;
    products: number;
  }>;
}

export default function CEOGrowthStatsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GrowthData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
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

  const loadData = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setIsRefreshing(true);
    setError(null);

    try {
      const response = await fetch('/api/ceo?type=stats-growth', {
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

      const result = await response.json();
      // Backend возвращает объект с полями scans_last_30_days и products_added_last_30_days
      setData(result);
    } catch (err) {
      console.error('Failed to load growth stats:', err);
      setError(err instanceof Error ? err.message : 'Не удалось загрузить данные');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadData();
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
      <header className="bg-bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-bg-card/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/ceo" className="text-text-secondary hover:text-text-primary transition-colors">
              ← Назад
            </Link>
            <h1 className="text-xl font-bold text-text-primary">
              📈 Графики роста
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

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">Визуализация роста данных</h2>
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
        ) : !data ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-text-secondary">Загрузка данных...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Scans Chart */}
            {data.scans_last_30_days && data.scans_last_30_days.length > 0 && (
              <div className="bg-bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  📊 Сканы за последние 30 дней
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  {data.scans_last_30_days.slice(-6).map((item, idx) => (
                    <div key={idx} className="bg-bg-secondary rounded-lg p-3 text-center">
                      <div className="text-xs text-text-muted mb-1">
                        {new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}
                      </div>
                      <div className="text-xl font-bold text-text-primary">{item.scans}</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-text-secondary">
                  Всего сканов за 30 дней: {data.scans_last_30_days.reduce((sum, item) => sum + item.scans, 0)}
                </div>
              </div>
            )}

            {/* Products Added Chart */}
            {data.products_added_last_30_days && data.products_added_last_30_days.length > 0 && (
              <div className="bg-bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  📦 Продукты добавленные за последние 30 дней
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  {data.products_added_last_30_days.slice(-6).map((item, idx) => (
                    <div key={idx} className="bg-bg-secondary rounded-lg p-3 text-center">
                      <div className="text-xs text-text-muted mb-1">
                        {new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}
                      </div>
                      <div className="text-xl font-bold text-text-primary">{item.products}</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-text-secondary">
                  Всего продуктов добавлено за 30 дней: {data.products_added_last_30_days.reduce((sum, item) => sum + item.products, 0)}
                </div>
              </div>
            )}

            {/* Placeholder для графиков */}
            {(!data.scans_last_30_days || data.scans_last_30_days.length === 0) && 
             (!data.products_added_last_30_days || data.products_added_last_30_days.length === 0) && (
              <div className="bg-bg-card border border-border rounded-xl p-6">
                <div className="text-center py-12 text-text-secondary">
                  <div className="text-4xl mb-4">📈</div>
                  <p>Нет данных для отображения</p>
                  <p className="text-xs text-text-muted mt-2">
                    Данные появятся после накопления статистики
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
