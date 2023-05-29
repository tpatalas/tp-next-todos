import { STYLE_COLORS } from '@data/stylePreset';
import { Labels } from './label.types';

export const DATA_DEMO_LABELS: Labels[] = [
  {
    _id: '201',
    name: 'Personal',
    title_id: ['1', '5', '7', '3'],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
  {
    _id: '202',
    name: 'Work',
    title_id: ['2', '4'],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
  {
    _id: '203',
    name: 'Family',
    title_id: ['3', '6', '8', '1', '10', '1'],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
  {
    _id: '204',
    name: 'Hobby',
    title_id: ['1', '2', '3'],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
  {
    _id: '205',
    name: 'Health',
    title_id: [],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
  {
    _id: '206',
    name: 'Travel',
    title_id: ['9', '10', '8', '7', '5', '6', '3', '2', '4'],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
  {
    _id: '207',
    name: 'Finance',
    title_id: ['1', '3', '5', '7', '9', '6', '4', '8'],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
  {
    _id: '208',
    name: 'Education',
    title_id: [],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
  {
    _id: '209',
    name: 'Entertainment',
    title_id: ['2', '4', '6', '8', '10', '7', '1'],
    color: STYLE_COLORS[Math.floor(Math.random() * STYLE_COLORS.length)],
  },
];
