import { PATH_IMAGE_APP } from '@constAssertions/data';
import { TypesPathnameImage } from '@lib/types';

export const DATA_PATHNAME_IMAGE: TypesPathnameImage[] = [
  {
    path: PATH_IMAGE_APP['focus'],
    alt: 'Placeholder image of focus',
    title: "Todos for today's focus",
    description:
      "Today's focus auto-selects important todos based on your priorities and capacity. Stay motivated and achieve your daily goals with increased productivity.",
  },
  {
    path: PATH_IMAGE_APP['urgent'],
    alt: 'Placeholder image of urgent',
    title: 'Your urgent todos',
    description: 'Prioritize time-sensitive todos that require immediate attention.',
  },
  {
    path: PATH_IMAGE_APP['important'],
    alt: 'Placeholder image of important',
    title: 'Your important todos',
    description: 'Identify todos that are crucial to your long-term goals and success.',
  },
  {
    path: PATH_IMAGE_APP['showAll'],
    alt: 'Placeholder image of showall',
    title: 'All uncompleted todos',
    description:
      'This is a complete list of all your todos, including those that have not yet been completed. Keep track of your progress here.',
  },
  {
    path: PATH_IMAGE_APP['completed'],
    alt: 'Placeholder image of completed',
    title: 'Your completed todos',
    description:
      'While there are no completed todos yet, every step counts towards achieving your goals.',
  },
  {
    path: PATH_IMAGE_APP['label'],
    alt: 'Placeholder image of label',
    title: 'Your labeled todos',
    description:
      'Organize your todos by using labels to keep track of your progress and priorities.',
  },
];
