'use client';

import Image from 'next/image';

type Asset = {
  id: string
  name: string
  symbol: string
  balance: number
  value: number
  change24h: number
  icon: string
};

export function PortfolioCard({ asset }: { asset: Asset }) {
  const isPositive = asset.change24h >= 0;

  return (
    <div className="background-standard ring-standard rounded-3xl p-6 shadow hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4 mb-5">
        <Image src={asset.icon} alt={asset.symbol} width={48} height={48} className="rounded-full" />
        <div>
          <h3 className="font-semibold text-standard">{asset.name}</h3>
          <p className="text-sm text-interactive opacity-70">{asset.symbol}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold text-standard">
          $
          {asset.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-interactive">
          {asset.balance.toLocaleString()}
          {' '}
          {asset.symbol}
        </p>
        <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}
          {asset.change24h.toFixed(2)}
          %
        </p>
      </div>
    </div>
  );
}
