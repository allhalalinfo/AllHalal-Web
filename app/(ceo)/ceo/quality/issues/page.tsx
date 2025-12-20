"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface QualityIssuesData {
  status?: string;
  issues?: {
    missing_ingredients?: {
      food?: number;
      cosmetics?: number;
    };
    missing_halal_status?: {
      food?: number;
      cosmetics?: number;
    };
    suspicious_short_ingredients?: {
      food?: number;
      cosmetics?: number;
      description?: string;
    };
  };
  recommendations?: string[];
}

// Старый формат для обратной совместимости
interface QualityIssue {
  barcode: string;
  product_name?: string;
  issue_type?: string;
  issue_description?: string;
  ingredients_length?: number;
  created_at?: string;
}

export default function CEOQualityIssuesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<QualityIssuesData | null>(null);
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
      const response = await fetch('/api/ceo?type=quality-issues', {
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
      // Backend возвращает объект с категориями проблем
      setData(result);
    } catch (err) {
      console.error('Failed to load quality issues:', err);
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
              ⚠️ Проблемы качества
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Проблемы качества данных</h2>
          <p className="text-text-secondary">Статистика по проблемам качества данных в базе</p>
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
            {/* Статистика по категориям проблем */}
            {data.issues && (
              <div className="grid md:grid-cols-3 gap-6">
                {data.issues.missing_ingredients && (
                  <div className="bg-bg-card border border-border rounded-xl p-6">
                    <div className="text-3xl mb-4">📝</div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Отсутствующие ингредиенты</h3>
                    <div className="space-y-2">
                      {data.issues.missing_ingredients.food !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Еда:</span>
                          <span className="text-text-primary font-medium">{formatNumber(data.issues.missing_ingredients.food)}</span>
                        </div>
                      )}
                      {data.issues.missing_ingredients.cosmetics !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Косметика:</span>
                          <span className="text-text-primary font-medium">{formatNumber(data.issues.missing_ingredients.cosmetics)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {data.issues.missing_halal_status && (
                  <div className="bg-bg-card border border-border rounded-xl p-6">
                    <div className="text-3xl mb-4">❓</div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Отсутствует статус Halal</h3>
                    <div className="space-y-2">
                      {data.issues.missing_halal_status.food !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Еда:</span>
                          <span className="text-text-primary font-medium">{formatNumber(data.issues.missing_halal_status.food)}</span>
                        </div>
                      )}
                      {data.issues.missing_halal_status.cosmetics !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Косметика:</span>
                          <span className="text-text-primary font-medium">{formatNumber(data.issues.missing_halal_status.cosmetics)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {data.issues.suspicious_short_ingredients && (
                  <div className="bg-bg-card border border-border rounded-xl p-6">
                    <div className="text-3xl mb-4">⚠️</div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Подозрительно короткие ингредиенты</h3>
                    {data.issues.suspicious_short_ingredients.description && (
                      <p className="text-xs text-text-muted mb-4">{data.issues.suspicious_short_ingredients.description}</p>
                    )}
                    <div className="space-y-2">
                      {data.issues.suspicious_short_ingredients.food !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Еда:</span>
                          <span className="text-text-primary font-medium">{formatNumber(data.issues.suspicious_short_ingredients.food)}</span>
                        </div>
                      )}
                      {data.issues.suspicious_short_ingredients.cosmetics !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Косметика:</span>
                          <span className="text-text-primary font-medium">{formatNumber(data.issues.suspicious_short_ingredients.cosmetics)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Рекомендации */}
            {data.recommendations && data.recommendations.length > 0 && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">💡 Рекомендации</h3>
                <ul className="list-disc list-inside space-y-2">
                  {data.recommendations.filter(r => r).map((rec, idx) => (
                    <li key={idx} className="text-text-secondary text-sm">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', { 
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
