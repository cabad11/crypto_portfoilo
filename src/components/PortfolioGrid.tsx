'use client'

import { usePortfolio } from '@/hooks/usePortfolio'
import { PortfolioCard } from './PortfolioCard'

export function PortfolioGrid() {
  const { data, isLoading } = usePortfolio()

  if (isLoading) return <GridSkeleton />

  const assets = data?.assets ?? []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <PortfolioCard key={asset.id} asset={asset} />
      ))}
    </div>
  )