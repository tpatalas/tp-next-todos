import { SvgIcon } from '@icon/svgIcon';
import { optionsLabelItemRouteMatched, optionsLabelItemRouteUnmatched } from '@label/label.consts';
import { TypesLabel } from '@label/label.types';

type Props = { matchedSlug: boolean } & Pick<TypesLabel, 'label'>;

export const LabelItemButtonContent = ({ matchedSlug, label }: Props) => {
  return (
    <div className='flex w-full flex-row  px-2 py-2'>
      <SvgIcon options={matchedSlug ? optionsLabelItemRouteMatched : optionsLabelItemRouteUnmatched} />
      <div className='max-w-[10.7rem] truncate pl-2 text-gray-600 group-hover:text-gray-900'>
        {label.name}
      </div>
    </div>
  );
};
