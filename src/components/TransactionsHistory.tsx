'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useTransactionHistory } from '@/hooks/useTransactionsHistory';
import RefreshButton from './ui/RefreshButton';
import ChainSelect from './ui/ChainSelect';
import { CHAINS } from '@/constants/chains';
import clsx from 'clsx';

export function TransactionHistory() {
  const { address, isConnected } = useAccount();
  const [chain, setChain] = useState(CHAINS[0]);
  const { data, refresh, isLoading } = useTransactionHistory(chain.id);
  console.log(data);
  if (!isConnected) return null;

  return (
    <div className="card-standard">
      <RefreshButton onClick={refresh} />
      <ChainSelect chain={chain} onChange={setChain} />
      <div className="max-h-96 overflow-y-auto">
        {isLoading
          && (
            <div className="p-8 text-center">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 skeleton-loader rounded-xl" />
              ))}
            </div>
          )}
        {data?.pages.length === 0
          ? (
              <p className="p-8 text-center text-interactive opacity-70">No transactions yet</p>
            )
          : (
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {/* {data?.pages.map((tx) => {
                  const isOutgoing = tx.from.toLowerCase() === address?.toLowerCase();
                  const explorer = CHAINS.find(chain => chain.id === tx.chainId)?.blockExplorers.default.url || 'https://etherscan.io';

                  return (
                    <div key={tx.hash} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${isOutgoing ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                            <span className={clsx('iconify material-symbols-light--arrow-right-alt w-5 h-5 text-red-600 dark:text-red-400 transform-gpu',
                              isOutgoing ? 'text-red-600 dark:text-red-400 rotate-90' : 'text-green-600 dark:text-green-400 -rotate-90')}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-standard">
                              {isOutgoing ? 'Sent' : 'Received'}
                              {' '}
                              ETH
                            </p>
                            <p className="text-sm text-interactive opacity-70">
                              {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className={`font-semibold ${isOutgoing ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                            {isOutgoing ? '-' : '+'}
                            {(Number(tx.value) / 1e18).toFixed(6)}
                            {' '}
                            ETH
                          </p>
                          <Link
                            href={`${explorer}/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-interactive opacity-70 hover:opacity-100 flex items-center gap-1 mt-1"
                          >
                            View
                            {' '}
                            <span className="iconify material-symbols-light--arrow-outward-rounded w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })} */}
              </div>
            )}
      </div>
    </div>
  );
}

export default TransactionHistory;
