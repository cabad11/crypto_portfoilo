'use client';

import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { usePortfolio } from './usePortfolio';
import COINGECKO_ID_MAP from '@/constants/coingeckoIdMap';

export type Period = '1d' | '7d' | '30d' | '90d';

interface HistoryPoint {
  date: string
  value: number
}

export const DAYS_MAP: Record<Period, number> = {
  '1d': 1,
  '7d': 7,
  '30d': 30,
  '90d': 90,
};

export function usePortfolioHistory(period: Period = '7d') {
  const { data, isLoading } = usePortfolio();

  const historyQueries = useQueries({
    queries: (data?.assets || [])
      .filter(asset => asset.balance > 0.0001)
      .map(asset => ({
        queryKey: ['coingecko-history', asset.symbol, period],
        queryFn: async () => {
          const id = COINGECKO_ID_MAP[asset.symbol];
          if (!id) return null;

          const days = DAYS_MAP[period];
          const res = await fetch(
            `/api/coingecko/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
          );
          if (!res.ok) return null;
          const json = await res.json();

          return {
            symbol: asset.symbol,
            history: json.prices.map(([ts, price]: [number, number]) => ({
              date: new Date(ts).toISOString(),
              price,
            })),
          };
        },
        enabled: !!data && !isLoading,
        staleTime: 5 * 60 * 1000,
      })),
  });

  const history = useMemo<HistoryPoint[]>(() => {
    if (isLoading || !data || historyQueries.length === 0) return [];

    const validHistories = historyQueries
      .map(q => q.data)
      .filter(Boolean) as { symbol: string, history: { date: string, price: number }[] }[];

    if (validHistories.length === 0) return [];

    const points: HistoryPoint[] = [];

    for (let i = 0; i < DAYS_MAP[period]; i++) {
      let totalValue = 0;

      validHistories.forEach((item) => {
        const point = item.history[i] || item.history[item.history.length - 1];
        if (point) {
          totalValue += point.price * data.assets.find(a => a.symbol === item.symbol)!.balance;
        }
      });

      points.push({
        date: validHistories[0].history[i]?.date || new Date().toISOString(),
        value: Number(totalValue.toFixed(2)),
      });
    }

    return points;
  }, [data, isLoading, historyQueries]);

  const isHistoryLoading = historyQueries.some(q => q.isLoading);

  return { history, isLoading: isLoading || isHistoryLoading };
}
