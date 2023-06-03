import { STYLE_COLORS } from '@data/stylePreset';
import { Labels } from '@label/label.types';

export const mockedLabelItem: Labels = {
  _id: '9999',
  name: 'test-label',
  title_id: ['1', '3', '7', '2'],
  color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
};
