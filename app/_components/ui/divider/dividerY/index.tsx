import { PropsDividerY } from '../divider.types';

export const DividerY = ({ style }: PropsDividerY) => {
  return (
    <div
      className={style}
      data-testid='dividerY-testid'
    >
      <div className='w-1' />
      <div className='w-1' />
    </div>
  );
};
