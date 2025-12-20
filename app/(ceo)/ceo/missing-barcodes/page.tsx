"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MissingBarcode {
  barcode: string;
  request_count?: number; // Backend использует request_count вместо scan_count
  last_requested?: string; // Backend использует last_requested вместо last_scan
  first_requested?: string;
  product_type?: string;
}

export default function CEOMissingBarcodesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [barcodes, setBarcodes] = useState<MissingBarcode[]>([]);
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
      const response = await fetch('/api/ceo?type=missing-barcodes', {
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
      // Backend возвращает объект с полем missing_barcodes
      setBarcodes(result.missing_barcodes || result.barcodes || (Array.isArray(result) ? result : []));
    } catch (err) {
      console.error('Failed to load missing barcodes:', err);
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
              🔍 Отсутствующие штрихкоды
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
            <h2 className="text-2xl font-bold text-text-primary mb-2">Продукты для добавления</h2>
            <p className="text-text-secondary">Штрихкоды, которые были отсканированы, но отсутствуют в базе данных</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-text-primary">{formatNumber(barcodes.length)}</div>
            <div className="text-sm text-text-secondary">штрихкодов</div>
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
        ) : barcodes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-text-secondary">Все штрихкоды найдены в базе данных</p>
          </div>
        ) : (
          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-secondary">
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Штрихкод</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Тип продукта</th>
                    <th className="text-right py-4 px-6 text-text-secondary font-medium">Количество запросов</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Первый запрос</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Последний запрос</th>
                  </tr>
                </thead>
                <tbody>
                  {barcodes.map((item, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-bg-secondary transition-colors">
                      <td className="py-4 px-6 text-text-primary font-mono font-medium">{item.barcode}</td>
                      <td className="py-4 px-6 text-text-primary">
                        {item.product_type ? (
                          <span className="px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-500">
                            {item.product_type}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="py-4 px-6 text-right text-text-primary">
                        {item.request_count !== undefined ? formatNumber(item.request_count) : '-'}
                      </td>
                      <td className="py-4 px-6 text-text-secondary text-sm">
                        {item.first_requested ? formatDate(item.first_requested) : '-'}
                      </td>
                      <td className="py-4 px-6 text-text-secondary text-sm">
                        {item.last_requested ? formatDate(item.last_requested) : '-'}
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
