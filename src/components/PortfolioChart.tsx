'use client';
import { usePortfolio } from '@/hooks/usePortfolio';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolioHistory, Period, DAYS_MAP } from '@/hooks/usePortfolioHistory';
import { useState } from 'react';

const PortfolioChart = () => {
  const [period, setPeriod] = useState<Period>('7d');
  const { data, isLoading, refresh } = usePortfolio();
  const history = usePortfolioHistory(period);
  const isPositive = data ? data.change24h >= 0 : true;
  return (
    <div className="background-standard ring-standard rounded-3xl p-8 shadow-lg">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-sm text-interactive opacity-80">Total Portfolio Value</p>
          {isLoading
            ? (<div className="skeleton-loader w-48 h-10 mt-2" />)
            : (
                <h2 className="flex text-5xl font-bold text-standard mt-2">
                  $
                  {data?.totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <div className={`flex items-center gap-1.5 mt-3 text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {data?.change24h as number > 0 ? '↑' : '↓'}
                    {' '}
                    {Math.abs(data?.change24h as number).toFixed(2)}
                    % (24h)
                  </div>
                  <span className="iconify material-symbols-light--refresh w-16 h-16 ml-4 cursor-pointer text-interactive" onClick={refresh} />
                </h2>
              )}
        </div>
      </div>

      <div className="">
        {isLoading
          ? (<div className="skeleton-loader w-full h-full" />)
          : (
              <>
                <div className="flex items-center justify-end gap-3 mt-6">
                  {Object.keys(DAYS_MAP).map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p as Period)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        period === p
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {p === 'all' ? 'All Time' : p.toUpperCase()}
                    </button>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={history.history} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
