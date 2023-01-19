import { atom } from 'recoil';
import { Descendant, Node } from 'slate';

/**
 * Atoms
 * */
export const atomEditorSerialize = atom({
  key: 'atomEditorSerialize',
  default: (nodes: Descendant[]) => {
    return nodes.map((n) => Node.string(n)).join('\n');
  },
});

export const atomEditorDeserialize = atom({
  key: 'atomEditorDeserialize',
  default: (string: string) => {
    if (typeof string !== 'undefined') {
      return string.split('\n').map((line) => {
        return {
          children: [{ text: line }],
        };
      });
    }
  },
});
