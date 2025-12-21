"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TableInfo {
  name: string;
  schema?: string;
  row_count?: number;
  size_mb?: number;
  description?: string;
}

export default function CEOTablesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'name' | 'rows' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedSchemas, setExpandedSchemas] = useState<Set<string>>(new Set());

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
      const response = await fetch('/api/ceo?type=tables', {
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
      
      // Backend возвращает объект с schemas: { admin: [...], common: [...], ... }
      // Нужно преобразовать в плоский массив таблиц
      if (result.schemas && typeof result.schemas === 'object') {
        const allTables: TableInfo[] = [];
        
        // Проходим по всем схемам и собираем все таблицы
        Object.keys(result.schemas).forEach((schemaName) => {
          const schemaTables = result.schemas[schemaName];
          if (Array.isArray(schemaTables)) {
            schemaTables.forEach((table: any) => {
              // Преобразуем размер из строки "24 kB" в число MB
              let sizeMb: number | undefined;
              if (table.size) {
                const sizeStr = table.size.toString().toLowerCase();
                if (sizeStr.includes('mb')) {
                  sizeMb = parseFloat(sizeStr.replace('mb', '').trim());
                } else if (sizeStr.includes('kb')) {
                  sizeMb = parseFloat(sizeStr.replace('kb', '').trim()) / 1024;
                } else if (sizeStr.includes('gb')) {
                  sizeMb = parseFloat(sizeStr.replace('gb', '').trim()) * 1024;
                } else if (sizeStr.includes('bytes')) {
                  sizeMb = parseFloat(sizeStr.replace('bytes', '').trim()) / (1024 * 1024);
                }
              }
              
              allTables.push({
                name: table.name,
                schema: schemaName, // Сохраняем схему отдельно
                row_count: table.rows,
                size_mb: sizeMb,
                description: table.description || `${schemaName} schema`,
              });
            });
          }
        });
        
        setTables(allTables);
      } else if (Array.isArray(result)) {
        setTables(result);
      } else if (result.tables) {
        setTables(result.tables);
      } else {
        setTables([]);
      }
    } catch (err) {
      console.error('Failed to load tables:', err);
      setError(err instanceof Error ? err.message : 'Не удалось загрузить данные');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  // Группировка таблиц по схемам
  const groupedTables = useMemo(() => {
    const groups: Record<string, TableInfo[]> = {};
    tables.forEach(table => {
      const schema = table.schema || 'unknown';
      if (!groups[schema]) {
        groups[schema] = [];
      }
      groups[schema].push(table);
    });
    return groups;
  }, [tables]);

  // Фильтрация и сортировка
  const filteredAndSortedTables = useMemo(() => {
    let filtered = tables.filter(table => {
      const searchLower = searchQuery.toLowerCase();
      const fullName = `${table.schema}.${table.name}`.toLowerCase();
      return fullName.includes(searchLower) || 
             table.name.toLowerCase().includes(searchLower) ||
             (table.schema && table.schema.toLowerCase().includes(searchLower));
    });

    filtered.sort((a, b) => {
      let aVal: any, bVal: any;
      
      if (sortBy === 'name') {
        aVal = `${a.schema}.${a.name}`.toLowerCase();
        bVal = `${b.schema}.${b.name}`.toLowerCase();
      } else if (sortBy === 'rows') {
        aVal = a.row_count || 0;
        bVal = b.row_count || 0;
      } else { // size
        aVal = a.size_mb || 0;
        bVal = b.size_mb || 0;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });

    return filtered;
  }, [tables, searchQuery, sortBy, sortOrder]);

  // Группировка отфильтрованных таблиц
  const filteredGroupedTables = useMemo(() => {
    const groups: Record<string, TableInfo[]> = {};
    filteredAndSortedTables.forEach(table => {
      const schema = table.schema || 'unknown';
      if (!groups[schema]) {
        groups[schema] = [];
      }
      groups[schema].push(table);
    });
    return groups;
  }, [filteredAndSortedTables]);

  const toggleSchema = (schema: string) => {
    const newExpanded = new Set(expandedSchemas);
    if (newExpanded.has(schema)) {
      newExpanded.delete(schema);
    } else {
      newExpanded.add(schema);
    }
    setExpandedSchemas(newExpanded);
  };

  // Автоматически разворачиваем все схемы при первой загрузке
  useEffect(() => {
    if (tables.length > 0 && expandedSchemas.size === 0) {
      const allSchemas = new Set(Object.keys(groupedTables));
      setExpandedSchemas(allSchemas);
    }
  }, [tables, groupedTables]);

  const handleSort = (column: 'name' | 'rows' | 'size') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
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

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="bg-bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-bg-card/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/ceo" className="text-text-secondary hover:text-text-primary transition-colors">
              ← Назад
            </Link>
            <h1 className="text-xl font-bold text-text-primary">
              🗄️ Таблицы БД
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
          <h2 className="text-2xl font-bold text-text-primary mb-4">Все таблицы базы данных</h2>
          
          {/* Поиск и статистика */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Поиск по названию таблицы или схеме..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
            <div className="text-sm text-text-secondary flex items-center gap-4">
              <span>Всего: <strong className="text-text-primary">{tables.length}</strong> таблиц</span>
              {searchQuery && (
                <span>Найдено: <strong className="text-text-primary">{filteredAndSortedTables.length}</strong></span>
              )}
            </div>
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
        ) : tables.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🗄️</div>
            <p className="text-text-secondary">Нет данных о таблицах</p>
          </div>
        ) : searchQuery ? (
          // Плоский список при поиске
          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-secondary">
                    <th 
                      className="text-left py-4 px-6 text-text-secondary font-medium cursor-pointer hover:text-text-primary transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      Таблица {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th 
                      className="text-right py-4 px-6 text-text-secondary font-medium cursor-pointer hover:text-text-primary transition-colors"
                      onClick={() => handleSort('rows')}
                    >
                      Строк {sortBy === 'rows' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th 
                      className="text-right py-4 px-6 text-text-secondary font-medium cursor-pointer hover:text-text-primary transition-colors"
                      onClick={() => handleSort('size')}
                    >
                      Размер {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Схема</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedTables.map((table, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-bg-secondary transition-colors">
                      <td className="py-4 px-6 text-text-primary font-medium font-mono">
                        {table.schema && <span className="text-text-muted">{table.schema}.</span>}
                        {table.name}
                      </td>
                      <td className="py-4 px-6 text-right text-text-primary">
                        {table.row_count !== undefined ? formatNumber(table.row_count) : 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-right text-text-secondary">
                        {table.size_mb !== undefined ? `${table.size_mb.toFixed(2)} MB` : 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        {table.schema && (
                          <span className="px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-500">
                            {table.schema}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Группировка по схемам
          <div className="space-y-4">
            {Object.keys(filteredGroupedTables).sort().map((schema) => {
              const schemaTables = filteredGroupedTables[schema];
              const isExpanded = expandedSchemas.has(schema);
              const totalRows = schemaTables.reduce((sum, t) => sum + (t.row_count || 0), 0);
              const totalSize = schemaTables.reduce((sum, t) => sum + (t.size_mb || 0), 0);

              return (
                <div key={schema} className="bg-bg-card border border-border rounded-xl overflow-hidden">
                  {/* Заголовок схемы */}
                  <button
                    onClick={() => toggleSchema(schema)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-bg-secondary transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{isExpanded ? '📂' : '📁'}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">{schema}</h3>
                        <p className="text-sm text-text-secondary">
                          {schemaTables.length} таблиц • {formatNumber(totalRows)} строк • {totalSize.toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <span className="text-text-muted">{isExpanded ? '▼' : '▶'}</span>
                  </button>

                  {/* Таблицы схемы */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-bg-secondary">
                              <th 
                                className="text-left py-3 px-6 text-text-secondary font-medium cursor-pointer hover:text-text-primary transition-colors"
                                onClick={() => handleSort('name')}
                              >
                                Таблица {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                              </th>
                              <th 
                                className="text-right py-3 px-6 text-text-secondary font-medium cursor-pointer hover:text-text-primary transition-colors"
                                onClick={() => handleSort('rows')}
                              >
                                Строк {sortBy === 'rows' && (sortOrder === 'asc' ? '↑' : '↓')}
                              </th>
                              <th 
                                className="text-right py-3 px-6 text-text-secondary font-medium cursor-pointer hover:text-text-primary transition-colors"
                                onClick={() => handleSort('size')}
                              >
                                Размер {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {schemaTables.map((table, idx) => (
                              <tr key={idx} className="border-b border-border/50 hover:bg-bg-secondary transition-colors">
                                <td className="py-3 px-6 text-text-primary font-medium font-mono">
                                  {table.name}
                                </td>
                                <td className="py-3 px-6 text-right text-text-primary">
                                  {table.row_count !== undefined ? formatNumber(table.row_count) : 'N/A'}
                                </td>
                                <td className="py-3 px-6 text-right text-text-secondary">
                                  {table.size_mb !== undefined ? `${table.size_mb.toFixed(2)} MB` : 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
