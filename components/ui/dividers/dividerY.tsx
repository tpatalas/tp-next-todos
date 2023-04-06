import { classNames } from '@stateLogics/utils';

type Props = { options?: Partial<{ height: string; thickness: string; color: string }> };

export const DividerY = ({ options }: Props) => {
  const {
    height = 'h-8/10',
    thickness = 'divide-x-2',
    color = 'divide-slate-800/10',
  } = options || {};

  return (
    <div className={classNames('grid w-4 grid-cols-2', height, thickness, color)}>
      <div className='w-1' />
      <div className='w-1' />
    </div>
  );
};
