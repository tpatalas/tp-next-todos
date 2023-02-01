import { IconButton } from '@buttons/iconButton';
import { ICON_ADD } from '@data/materialSymbols';
import { Types } from '@lib/types';

type Props = Pick<Types, 'onClick'> & Partial<Pick<Types, 'headerContents'>>;

export const ComboBoxNewItemButton = ({ headerContents, onClick }: Props) => {
  return (
    <div className='p-2'>
      <IconButton
        data={{
          path: ICON_ADD,
          size: 'h-6 w-6',
          width: 'w-full',
          borderRadius: 'rounded-lg',
        }}
        headerContents={headerContents}
        onClick={onClick}
      />
    </div>
  );
};
