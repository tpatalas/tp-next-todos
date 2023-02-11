import { Button as NetworkStatusReadOnlyButton } from '@buttons/button';
import { optionsButtonNetworkStatus, optionsSvgNetworkStatus } from '@data/dataOptions';
import { atomNetworkStatusEffect } from '@states/misc';
import dynamic from 'next/dynamic';
import { Fragment as NetworkStatusFragment } from 'react';
import { useRecoilValue } from 'recoil';

const SvgIcon = dynamic(() => import('components/icons/svgIcon').then((mod) => mod.SvgIcon), { ssr: false });

export const NetworkStatus = () => {
  const isOnline = useRecoilValue(atomNetworkStatusEffect);

  return (
    <NetworkStatusFragment>
      {!isOnline && (
        <div className='text-red-500'>
          <NetworkStatusReadOnlyButton options={optionsButtonNetworkStatus}>
            <SvgIcon options={optionsSvgNetworkStatus} />
          </NetworkStatusReadOnlyButton>
        </div>
      )}
    </NetworkStatusFragment>
  );
};
