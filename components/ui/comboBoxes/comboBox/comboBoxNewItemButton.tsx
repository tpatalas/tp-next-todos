import { IconButton } from '@buttons/iconButton';
import { ICON_ADD } from '@data/materialSymbols';
import { Types } from '@lib/types';

type Props = Pick<Types, 'onClick'> & Partial<Pick<Types, 'menuButtonContent'>>;

export const ComboBoxNewItemButton = ({ menuButtonContent, onClick }: Props) => {
  const options = { path: ICON_ADD, size: 'h-6 w-6', width: 'w-full', borderRadius: 'rounded-lg' };
  return (
    <div className='p-2'>
      <IconButton
        options={options}
        menuButtonContent={menuButtonContent}
        onClick={onClick}
      />
    </div>
  );
};
