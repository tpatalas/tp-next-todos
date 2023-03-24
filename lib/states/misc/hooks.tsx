import { PATHNAME } from '@constAssertions/data';
import { selectorFilterTodoIdsByPathname } from '@states/todos';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

export const useFilterTodoIdsWithPathname = () => {
  const router = useRouter();
  const app = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['app']));
  const urgent = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['urgent']));
  const important = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['important']));
  const showAll = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['showAll']));
  const completed = useRecoilValue(selectorFilterTodoIdsByPathname(PATHNAME['completed']));

  switch (router.asPath) {
    case PATHNAME['app']:
      return app;
    case PATHNAME['urgent']:
      return urgent;
    case PATHNAME['important']:
      return important;
    case PATHNAME['showAll']:
      return showAll;
    case PATHNAME['completed']:
      return completed;
    default:
      return app;
  }
};
