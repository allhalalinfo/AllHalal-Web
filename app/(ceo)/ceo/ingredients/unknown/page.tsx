"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UnknownIngredient {
  ingredient_name?: string; // Backend использует ingredient_name
  ingredient?: string; // Для обратной совместимости
  product_count?: number;
  first_seen?: string;
  last_seen?: string;
}

interface UnknownIngredientsResponse {
  status?: string;
  total?: number;
  limit?: number;
  unknown_ingredients?: UnknownIngredient[];
}

export default function CEOUnknownIngredientsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<UnknownIngredientsResponse | null>(null);
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
      const response = await fetch('/api/ceo?type=ingredients-unknown', {
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
      // Backend возвращает объект с полем unknown_ingredients
      setData(result);
    } catch (err) {
      console.error('Failed to load unknown ingredients:', err);
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
              ❓ Неизвестные ингредиенты
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
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Ингредиенты требующие анализа</h2>
            <p className="text-text-secondary">Ингредиенты, которые не определены как halal/haram/mushbooh</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-text-primary">{formatNumber(data?.total || 0)}</div>
            <div className="text-sm text-text-secondary">ингредиентов</div>
          </div>
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
        ) : (!data.unknown_ingredients || data.unknown_ingredients.length === 0) ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-text-secondary">Все ингредиенты определены</p>
            <p className="text-text-muted text-sm mt-2">
              Всего проверено: {formatNumber(data.total || 0)} ингредиентов
            </p>
          </div>
        ) : (
          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border bg-bg-secondary">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">
                  Показано {data.unknown_ingredients.length} из {formatNumber(data.total || 0)}
                </span>
                {data.limit && (
                  <span className="text-text-muted">Лимит: {data.limit}</span>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-secondary">
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Ингредиент</th>
                    <th className="text-right py-4 px-6 text-text-secondary font-medium">Продуктов</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Первый раз</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Последний раз</th>
                  </tr>
                </thead>
                <tbody>
                  {data.unknown_ingredients.map((item, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-bg-secondary transition-colors">
                      <td className="py-4 px-6 text-text-primary font-medium">
                        {item.ingredient_name || item.ingredient || '-'}
                      </td>
                      <td className="py-4 px-6 text-right text-text-primary">
                        {item.product_count !== undefined ? formatNumber(item.product_count) : '-'}
                      </td>
                      <td className="py-4 px-6 text-text-secondary text-sm">
                        {item.first_seen ? formatDate(item.first_seen) : '-'}
                      </td>
                      <td className="py-4 px-6 text-text-secondary text-sm">
                        {item.last_seen ? formatDate(item.last_seen) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
