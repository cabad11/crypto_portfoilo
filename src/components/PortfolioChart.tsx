'use client';
import { usePortfolio } from '@/hooks/usePortfolio';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolioHistory, Period, DAYS_MAP } from '@/hooks/usePortfolioHistory';
import { useState } from 'react';
import RefreshButton from './ui/RefreshButton';

const PortfolioChart = () => {
  const [period, setPeriod] = useState<Period>('7d');
  const { data, refresh } = usePortfolio();
  const history = usePortfolioHistory(period);
  const isLoading = false;
  const isPositive = data ? data.change24h >= 0 : true;
  return (
    <div className="card-standard">
      <RefreshButton onClick={refresh} />
      <div className="mb-4">
        <p className="text-sm text-standard opacity-70 mb-1 md:mb-2">Total Portfolio Value</p>
        {isLoading
          ? (<div className="skeleton-loader w-48 h-10" />)
          : (
              <div className="flex items-baseline text-xl md:text-5xl font-bold text-standard">
                $
                {data?.totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <div className={`flex items-center gap-1.5 mt-3 text-xs md:text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {data?.change24h as number > 0 ? '↑' : '↓'}
                  {' '}
                  {Math.abs(data?.change24h as number).toFixed(2)}
                  % (24h)
                </div>
              </div>
            )}
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96 -mx-6 md:-mx-3 text-xs md:text-sm">
        {isLoading
          ? (<div className="skeleton-loader w-full h-full rounded-2xl" />)
          : (
              <>
                <div className="flex items-center justify-end gap-3">
                  {Object.keys(DAYS_MAP).map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p as Period)}
                      className={`px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm rounded-lg  font-medium transition ${
                        period === p
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {p === 'all' ? 'All Time' : p.toUpperCase()}
                    </button>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={history.history}
                    margin={{ top: 10, right: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-800" />
                    <XAxis dataKey="date" tickFormatter={v => new Date(v).toLocaleDateString('en', { weekday: 'short' })} stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
      </div>
    </div>
  );
};

export default PortfolioChart;
