"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TopBrand {
  name: string; // Backend использует name вместо brand_name
  total_products?: number; // Backend использует total_products вместо product_count
  halal?: number; // Backend использует halal вместо halal_count
  haram?: number; // Backend использует haram вместо haram_count
  mushbooh?: number; // Backend использует mushbooh вместо mushbooh_count
  halal_percentage?: number; // Backend использует halal_percentage вместо percentage_halal
  // Для обратной совместимости
  brand_name?: string;
  product_count?: number;
  halal_count?: number;
  haram_count?: number;
  mushbooh_count?: number;
  percentage_halal?: number;
}

export default function CEOTopBrandsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<TopBrand[]>([]);
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
      const response = await fetch('/api/ceo?type=brands-top', {
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
      // Backend возвращает объект с полем brands
      setBrands(result.brands || result.top_brands || (Array.isArray(result) ? result : []));
    } catch (err) {
      console.error('Failed to load top brands:', err);
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
              🏆 Топ брендов
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
            <h2 className="text-2xl font-bold text-text-primary mb-2">Популярные бренды</h2>
            <p className="text-text-secondary">Бренды с наибольшим количеством продуктов</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-text-primary">{formatNumber(brands.length)}</div>
            <div className="text-sm text-text-secondary">брендов</div>
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
        ) : brands.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-text-secondary">Нет данных о брендах</p>
          </div>
        ) : (
          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-secondary">
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Бренд</th>
                    <th className="text-right py-4 px-6 text-text-secondary font-medium">Всего продуктов</th>
                    <th className="text-right py-4 px-6 text-text-secondary font-medium">Halal</th>
                    <th className="text-right py-4 px-6 text-text-secondary font-medium">Haram</th>
                    <th className="text-right py-4 px-6 text-text-secondary font-medium">Mushbooh</th>
                    <th className="text-right py-4 px-6 text-text-secondary font-medium">% Halal</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((brand, idx) => {
                    // Поддержка обоих форматов (backend и ожидаемого)
                    const brandName = brand.name || brand.brand_name || '-';
                    const totalProducts = brand.total_products || brand.product_count || 0;
                    const halal = brand.halal || brand.halal_count || 0;
                    const haram = brand.haram || brand.haram_count || 0;
                    const mushbooh = brand.mushbooh || brand.mushbooh_count || 0;
                    const halalPercentage = brand.halal_percentage || brand.percentage_halal;
                    
                    return (
                      <tr key={idx} className="border-b border-border/50 hover:bg-bg-secondary transition-colors">
                        <td className="py-4 px-6 text-text-primary font-medium">{brandName}</td>
                        <td className="py-4 px-6 text-right text-text-primary">
                          {formatNumber(totalProducts)}
                        </td>
                        <td className="py-4 px-6 text-right text-green-500">
                          {formatNumber(halal)}
                        </td>
                        <td className="py-4 px-6 text-right text-red-500">
                          {formatNumber(haram)}
                        </td>
                        <td className="py-4 px-6 text-right text-yellow-500">
                          {formatNumber(mushbooh)}
                        </td>
                        <td className="py-4 px-6 text-right text-text-primary font-medium">
                          {halalPercentage !== undefined 
                            ? `${halalPercentage.toFixed(1)}%` 
                            : '-'}
                        </td>
                      </tr>
                    );
                  })}
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
