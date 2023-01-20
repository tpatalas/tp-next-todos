import { Todos } from '@lib/types';
import { TypesDataButton } from '@lib/types/typesData';
import { atomFilterSelected } from '@states/comboBoxes';
import { selectorSelectedLabels } from '@states/labels';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { ICON_FILTER_LIST, ICON_FILTER_LIST_OFF } from './materialSymbols';

/**
 * TypesDataButton
 **/

// combobox
export const useDataButtonComboboxFilterLabel = (_id: Todos['_id']): TypesDataButton => {
  const isFilterOn = useRecoilValue(atomFilterSelected(_id));
  const resetFilter = useResetRecoilState(atomFilterSelected(_id));
  const selectedLabels = useRecoilValue(selectorSelectedLabels(_id));

  useEffect(() => {
    if (selectedLabels.length === 0 && isFilterOn) return resetFilter();
  }, [resetFilter, isFilterOn, selectedLabels]);

  const data = {
    path: isFilterOn ? ICON_FILTER_LIST_OFF : ICON_FILTER_LIST,
    color: 'fill-gray-400',
    padding: 'p-1',
    isDisabled: selectedLabels.length === 0 && true,
    tooltip: isFilterOn ? 'show all labels' : 'show selected labels',
  };
  return data;
};
