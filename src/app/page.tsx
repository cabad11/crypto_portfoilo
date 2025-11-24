import PortfolioChart from '@/components/PortfolioChart';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="p-4 lg:p-8 max-w-7xl mx-auto w-full">
        <PortfolioChart />
        {/* <div className="mt-8">
          <h3 className="text-lg font-semibold text-standard mb-4">Your Assets</h3>
          <PortfolioGrid />
        </div> */}
      </main>
    </div>
  );
}
