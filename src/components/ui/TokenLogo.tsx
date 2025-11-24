import Image from 'next/image';
import { mainnet, polygon, arbitrum, base, optimism, bsc, avalanche, gnosis, fantom, zksync } from 'wagmi/chains';

enum SourceType {
  ICONIFY,
  IMAGE_URL,
}
type LogoSource = { path: string, type: SourceType };
const TOKEN_LOGO_MAP: Record<string, LogoSource> = {
  WETH: { path: 'eth', type: SourceType.ICONIFY },
  WBTC: { path: 'bitcoin', type: SourceType.ICONIFY },
  ARB: { path: 'arbitrum-one', type: SourceType.ICONIFY },
  POL: { path: 'polygon', type: SourceType.ICONIFY },
  OP: { path: 'optimism', type: SourceType.ICONIFY },
  FTM: { path: 'fantom', type: SourceType.ICONIFY },
  LINK: { path: 'link', type: SourceType.ICONIFY },
  AAVE: { path: 'aave', type: SourceType.ICONIFY },
  UNI: { path: 'uni', type: SourceType.ICONIFY },
  MKR: { path: 'mkr', type: SourceType.ICONIFY },
  LDO: { path: 'ldo', type: SourceType.ICONIFY },
  USDC: { path: 'usdc', type: SourceType.ICONIFY },
  USDT: { path: 'usdt', type: SourceType.ICONIFY },
  DAI: { path: 'DAI', type: SourceType.ICONIFY },

  BASE: { path: '/icons/base.png', type: SourceType.IMAGE_URL },
  xDAI: { path: '/icons/xdai.png', type: SourceType.IMAGE_URL },
};

const CHAIN_ID_LOGO_MAP: Record<string, LogoSource> = {
  [mainnet.id]: { path: 'eth', type: SourceType.ICONIFY },
  [polygon.id]: { path: 'polygon', type: SourceType.ICONIFY },
  [arbitrum.id]: { path: 'arbitrum-one', type: SourceType.ICONIFY },
  [base.id]: { path: '/icons/base.png', type: SourceType.IMAGE_URL },
  [optimism.id]: { path: 'optimism', type: SourceType.ICONIFY },
  [bsc.id]: { path: 'bnb', type: SourceType.ICONIFY },
  [avalanche.id]: { path: 'avax', type: SourceType.ICONIFY },
  [gnosis.id]: { path: 'gnosis', type: SourceType.ICONIFY },
  [fantom.id]: { path: 'fantom', type: SourceType.ICONIFY },
  [zksync.id]: { path: 'zksync', type: SourceType.ICONIFY },
};

const TokenLogoSource = ({ source, size }: { source: LogoSource | string, size: number }) => {
  if (typeof source === 'string') {
    return <div className={`flex-center w-${size} h-${size} rounded-full bg-gray-400 dark:bg-gray-200`}>{source}</div>;
  }
  return source.type === SourceType.IMAGE_URL
    ? <Image src={source.path} width={size} height={size} alt="tokenIcon" />
    : <span className={`iconify  w-${size} h-${size} token-branded--${source.path}`} />;
};

export const TokenLogo: React.FC<{ symbol: string, size?: number, chainId: number }> = ({ symbol, size = 32 }) => {
  const isImageUrl = TOKEN_LOGO_MAP[symbol]?.type === SourceType.IMAGE_URL;
  return (
    <div className={`w-${size} h-${size} relative`}>
      <TokenLogoSource source={TOKEN_LOGO_MAP[symbol]} size={size} />

    </div>
  );
};
