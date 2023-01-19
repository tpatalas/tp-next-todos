import { Button as NetworkStatusReadOnlyButton } from '@buttons/button';
import { dataButtonNetworkStatus, dataSvgNetworkStatus } from '@data/dataObjects';
import { atomNetworkStatusEffect } from '@states/misc';
import dynamic from 'next/dynamic';
import { Fragment as NetworkStatusFragment } from 'react';
import { useRecoilValue } from 'recoil';

const SvgIcon = dynamic(() => import('components/icons/svgIcon').then((mod) => mod.SvgIcon));

export const NetworkStatus = () => {
  const isOnline = useRecoilValue(atomNetworkStatusEffect);

  return (
    <NetworkStatusFragment>
      {!isOnline && (
        <div className='text-red-500'>
          <NetworkStatusReadOnlyButton data={dataButtonNetworkStatus}>
            <SvgIcon data={dataSvgNetworkStatus} />
          </NetworkStatusReadOnlyButton>
        </div>
      )}
    </NetworkStatusFragment>
  );
};
