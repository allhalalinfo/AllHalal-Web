"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RecentProduct {
  barcode: string;
  name?: string; // Backend использует name вместо product_name
  product_name?: string; // Для обратной совместимости
  brand?: string;
  halal_status?: 'halal' | 'haram' | 'mushbooh' | 'unknown';
  added_at?: string; // Backend использует added_at вместо added_date
  added_date?: string; // Для обратной совместимости
  category?: string;
}

interface RecentProductsResponse {
  status?: string;
  product_type?: string;
  products?: RecentProduct[];
}

export default function CEORecentProductsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RecentProductsResponse | null>(null);
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
      const response = await fetch('/api/ceo?type=products-recent', {
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
      // Backend возвращает объект с полем products
      setData(result);
    } catch (err) {
      console.error('Failed to load recent products:', err);
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
              🆕 Недавние продукты
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
            <h2 className="text-2xl font-bold text-text-primary mb-2">Последние добавленные продукты</h2>
            <p className="text-text-secondary">
              Недавно добавленные продукты в базу данных
              {data?.product_type && (
                <span className="ml-2 px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-500">
                  {data.product_type}
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-text-primary">
              {formatNumber(data?.products?.length || 0)}
            </div>
            <div className="text-sm text-text-secondary">продуктов</div>
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
            <div className="text-4xl mb-4">📦</div>
            <p className="text-text-secondary">Загрузка данных...</p>
          </div>
        ) : (!data.products || data.products.length === 0) ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-text-secondary">Нет недавних продуктов</p>
          </div>
        ) : (
          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-secondary">
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Штрихкод</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Название</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Бренд</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Статус</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Дата добавления</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((product, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-bg-secondary transition-colors">
                      <td className="py-4 px-6 text-text-primary font-mono text-xs">{product.barcode}</td>
                      <td className="py-4 px-6 text-text-primary">
                        {product.name || product.product_name || '-'}
                      </td>
                      <td className="py-4 px-6 text-text-secondary">{product.brand || '-'}</td>
                      <td className="py-4 px-6">
                        {product.halal_status && (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            product.halal_status === 'halal' ? 'bg-green-500/10 text-green-500' :
                            product.halal_status === 'haram' ? 'bg-red-500/10 text-red-500' :
                            product.halal_status === 'mushbooh' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-gray-500/10 text-gray-500'
                          }`}>
                            {product.halal_status}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-text-secondary text-sm">
                        {(product.added_at || product.added_date) ? formatDate(product.added_at || product.added_date || '') : '-'}
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
