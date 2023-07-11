import { Button as NetworkStatusReadOnlyButton } from '@buttons/button';
import { optionsButtonNetworkStatus } from '@options/button';
import { optionsSvgNetworkStatus } from '@options/svg';
import { atomEffectNetworkStatus } from '@states/atomEffects/misc';
import dynamic from 'next/dynamic';
import { Fragment as NetworkStatusFragment } from 'react';
import { useRecoilValue } from 'recoil';

const SvgIcon = dynamic(() => import('@icon/svgIcon').then((mod) => mod.SvgIcon));

export const NetworkStatus = () => {
  const isOnline = useRecoilValue(atomEffectNetworkStatus);

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
