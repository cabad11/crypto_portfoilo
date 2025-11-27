'use client';
import { CHAINS } from '@/constants/chains';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

import { NetworkLogo } from './TokenLogo';
import { ChangeEvent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChainSelect = ({ chain, onChange }: { chain: any, onChange: (chain: any) => void }) => {
  return (
    <div className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-standard focus:outline-none focus:ring-2 focus:ring-blue-500">
      <Listbox value={chain} onChange={onChange}>
        <ListboxButton className="w-full flex items-center gap-3">
          <NetworkLogo chainId={chain.id} size={32} />
          {chain.name}
        </ListboxButton>
        <ListboxOptions anchor="bottom">
          {CHAINS.map(chain => (
            <ListboxOption key={chain.id} value={chain} className="w-full flex items-center gap-3">
              <NetworkLogo chainId={chain.id} size={32} />
              {chain.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default ChainSelect;
