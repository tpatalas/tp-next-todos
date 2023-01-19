/**
 * atom
 **/

import { atomFamily } from 'recoil';

// Todo Modal
export const atomTodoModalOpen = atomFamily({
  key: 'atomTodoModalOpen',
  default: false,
});

export const atomTodoModalMini = atomFamily({
  key: 'atomTodoModalMini',
  default: false,
});

export const atomTodoModalMax = atomFamily({
  key: 'atomTodoModalMax',
  default: false,
});

// Label Modal
export const atomLabelModalOpen = atomFamily({
  key: 'atomLabelModalOpen',
  default: false,
});

// Confirm Modal
export const atomConfirmModalDiscard = atomFamily({
  key: 'atomConfirmModalDiscard',
  default: false,
});

export const atomConfirmModalDelete = atomFamily({
  key: 'atomConfirmModalDelete',
  default: false,
});
