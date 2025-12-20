"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CEOPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      router.push('/admin');
    } catch (err) {
      console.error('Logout error:', err);
    }
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

  const ceoSections = [
    {
      id: 'overview',
      title: 'Обзор',
      description: 'Главная страница с ключевыми метриками',
      icon: '📊',
      href: '/ceo/overview',
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    },
    {
      id: 'tables',
      title: 'Таблицы БД',
      description: 'Все таблицы базы данных',
      icon: '🗄️',
      href: '/ceo/tables',
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    },
    {
      id: 'missing-barcodes',
      title: 'Отсутствующие штрихкоды',
      description: 'Продукты для добавления',
      icon: '🔍',
      href: '/ceo/missing-barcodes',
      color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    },
    {
      id: 'ingredients-unknown',
      title: 'Неизвестные ингредиенты',
      description: 'Ингредиенты требующие анализа',
      icon: '❓',
      href: '/ceo/ingredients/unknown',
      color: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    },
    {
      id: 'products-recent',
      title: 'Недавние продукты',
      description: 'Последние добавленные продукты',
      icon: '🆕',
      href: '/ceo/products/recent',
      color: 'bg-green-500/10 text-green-500 border-green-500/20'
    },
    {
      id: 'stats-growth',
      title: 'Графики роста',
      description: 'Визуализация роста данных',
      icon: '📈',
      href: '/ceo/stats/growth',
      color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
    },
    {
      id: 'brands-top',
      title: 'Топ брендов',
      description: 'Популярные бренды',
      icon: '🏆',
      href: '/ceo/brands/top',
      color: 'bg-pink-500/10 text-pink-500 border-pink-500/20'
    },
    {
      id: 'quality-issues',
      title: 'Проблемы качества',
      description: '170K продуктов с подозрительными данными',
      icon: '⚠️',
      href: '/ceo/quality/issues',
      color: 'bg-red-500/10 text-red-500 border-red-500/20'
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-bg-card/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-text-primary">
              👔 CEO Панель
            </h1>
            <span className="px-3 py-1.5 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
              ✓ Подключено
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
            >
              Админ панель
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
            >
              Выход
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Добро пожаловать в CEO Панель
          </h2>
          <p className="text-text-secondary">
            Управление и анализ данных AllHalal
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ceoSections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className={`bg-bg-card border-2 ${section.color} rounded-xl p-6 hover:scale-105 transition-all hover:shadow-lg cursor-pointer group`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {section.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {section.description}
              </p>
              <div className="mt-4 text-xs text-text-muted flex items-center gap-1">
                Открыть →
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-text-primary mb-2">
              2.28M
            </div>
            <div className="text-sm text-text-secondary">
              Всего продуктов (2.2M еда + 80K косметика)
            </div>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-text-primary mb-2">
              10
            </div>
            <div className="text-sm text-text-secondary">
              Сканов за 30 дней
            </div>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-text-primary mb-2">
              170K
            </div>
            <div className="text-sm text-text-secondary">
              Продуктов с проблемами качества
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
