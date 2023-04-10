import { PATH_APP } from '@constAssertions/data';
import { Labels, Todos } from '@lib/types';
import { selectorSessionLabels } from '@states/atomEffects/labels';
import { selectorSessionTodoItem, atomSelectorTodoItem } from '@states/atomEffects/todos';
import { atomLabelNew, atomSelectorLabelItem } from '@states/labels';
import { atomTodoModalMini, atomTodoModalOpen } from '@states/modals';
import { atomTodoNew, selectorFilterTodoIdsByPathname } from '@states/todos';
import equal from 'fast-deep-equal/react';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { RecoilState, RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';

export const useFilterTodoIdsWithPathname = () => {
  const router = useRouter();
  const app = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['app']));
  const urgent = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['urgent']));
  const important = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['important']));
  const showAll = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['showAll']));
  const completed = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['completed']));

  switch (router.asPath) {
    case PATH_APP['app']:
      return app;
    case PATH_APP['urgent']:
      return urgent;
    case PATH_APP['important']:
      return important;
    case PATH_APP['showAll']:
      return showAll;
    case PATH_APP['completed']:
      return completed;
    default:
      return app;
  }
};

export const useGetWithRecoilCallback = () => {
  return useRecoilCallback(({ snapshot }) => <T,>(p: RecoilValue<T>) => {
    return snapshot.getLoadable(p).getValue();
  });
};

// Conditional Check
// Description: These hooks are using `useRecoilSnapshot` intentionally to trigger re-render
// the component. As useRecoilCallback or useRecoilTransaction does not trigger any re-rendering
// useRecoilSnap is the right hook to check the state of atom.

export const useConditionCheckCreateModalOpen = () => {
  const todoModalOpen = useRecoilValue(atomTodoModalOpen(undefined));
  const todoModalMiniOpen = useRecoilValue(atomTodoModalMini(undefined));
  return todoModalOpen || todoModalMiniOpen;
};

export const useConditionCheckTodoTitleEmpty = () => {
  const newTodo = useRecoilValue(atomTodoNew);
  return typeof newTodo.title === 'undefined' || newTodo.title.trim() === '';
};

export const useConditionCheckLabelTitleEmpty = () => {
  const newTodo = useRecoilValue(atomLabelNew);
  return typeof newTodo.name === 'undefined' || newTodo.name.trim() === '';
};

export const useConditionCompareTodoItemsEqual = (_id: Todos['_id']) => {
  if (typeof _id === 'undefined') return;
  const todoItem = useRecoilValue(selectorSessionTodoItem(_id));
  const selectorTodoItem = useRecoilValue(atomSelectorTodoItem(_id));
  const todoItemCompletedEqual = equal(todoItem.completed, selectorTodoItem.completed);
  // Disable update button if completed
  return !todoItemCompletedEqual ? true : equal(todoItem, selectorTodoItem);
};

export const useConditionCompareLabelItemsEqual = (_id: Labels['_id']) => {
  if (typeof _id === 'undefined') return;
  const labels = useRecoilValue(selectorSessionLabels);
  const labelItem = labels.find((label) => label._id === _id) || ({} as Labels);
  const labelItemCompare = useRecoilValue(atomSelectorLabelItem(_id));
  return equal(labelItem, labelItemCompare);
};

// recoil test observer: required to observe state change on unit test
export const RecoilObserver = <T,>({
  node,
  onChange,
}: {
  node: RecoilState<T>;
  onChange: (value: T) => void;
}) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

export const useNextQuery = ({ path, key }: { path?: string; key?: string }) => {
  if ((path && key) || (!path && !key)) throw new Error('Only "path" or "key" can be provided');
  const router = useRouter();
  const pathRegex = path && `${path}/(.*)(&|$)`;
  const keyRegex = key && `[&?]${key}=(.*?)(&|$)`;
  const pathOrKey = (pathRegex || keyRegex) as string;

  const value = useMemo(() => {
    if (path && router.pathname === path) {
      return path;
    }

    const match = router.asPath.match(new RegExp(pathOrKey));
    if (!match) return undefined;
    return decodeURIComponent(match[1]);
  }, [path, pathOrKey, router.asPath, router.pathname]);

  return value;
};

export const useHorizontalScrollPosition = (ref: RefObject<HTMLDivElement>) => {
  const [leftPosition, setLeftPosition] = useState(-1);
  const [rightPosition, setRightPosition] = useState(-1);
  const [isOverflow, setIsOverflow] = useState(false);

  const initialOverflown = ref.current && ref.current.scrollWidth > 300;

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      const overScrollWidth = currentRef.clientWidth < currentRef.scrollWidth;
      const overflown = overScrollWidth || (initialOverflown as boolean);
      setIsOverflow(overflown);
    }

    const handleScroll = () => {
      if (currentRef) {
        const scrollWidth = currentRef.scrollWidth - currentRef.clientWidth;
        const rightPosition = scrollWidth && scrollWidth - currentRef.scrollLeft;
        setLeftPosition(ref.current.scrollLeft);
        setRightPosition(rightPosition as number);
      }
    };

    ref.current && ref.current.addEventListener('scroll', handleScroll);
    return () => {
      currentRef && currentRef.removeEventListener('scroll', handleScroll);
    };
  }, [initialOverflown, ref]);

  return { leftPosition, rightPosition, isOverflow };
};

export const useVerticalScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export const useCompareToQueryLabels = () => {
  return useRecoilCallback(({ snapshot }) => (compare: Labels[]) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    return compare.filter((label) => {
      return !get(selectorSessionLabels).find((queryLabel) => equal(label, queryLabel));
    });
  });
};
