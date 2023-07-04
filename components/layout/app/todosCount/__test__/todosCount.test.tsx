import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { TodosCount } from '..';
import { UserSessionEffect } from '@user/userSessionGroupEffect/userSessionEffect';
import { screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { DATA_DEMO } from '@collections/demo';
import { DATA_DEMO_LABELS } from '@label/label.data';
import { PropsTodosCount } from '@layout/layout.types';
import { Labels } from '@label/label.types';

describe('TodosCount', () => {
  const renderWithTodosCount = ({ pathname, label }: PropsTodosCount) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <Suspense>
          <TodosCount
            pathname={pathname}
            label={label}
          />
        </Suspense>
        <UserSessionEffect />
      </>,
      options,
    );
  };

  const urgentPriority = 1;
  const todosCountOnAppRoute = DATA_DEMO.filter((item) => item.priorityLevel === urgentPriority).length;
  const labelPersonalName = 'Personal';
  const labelPersonal = DATA_DEMO_LABELS.find((label) => label.name === labelPersonalName) ?? ({} as Labels);
  const todosCountLabelPersonal = labelPersonal.title_id?.length ?? 0;

  it('should render the correct todosCount based on the the appropriate pathname when userSession is null', async () => {
    const { container } = renderWithTodosCount({ pathname: '/app/urgent' });

    expect(container).toBeInTheDocument();
    await waitFor(() => {
      const todosCount = screen.queryByText(todosCountOnAppRoute);
      expect(todosCount).toBeInTheDocument();
    });
  });

  it('should not render any todosCount if pathname is not under the /app such as root path', async () => {
    renderWithTodosCount({ pathname: '/' });

    await waitFor(() => {
      const todosCount = screen.queryByText(todosCountOnAppRoute);
      expect(todosCount).toBeNull();
    });
  });

  it('should render correct number of todoCount on the matched label', async () => {
    renderWithTodosCount({ pathname: '/app/label', label: labelPersonal });

    await waitFor(() => {
      const todosCount = screen.queryByText(todosCountLabelPersonal);
      expect(todosCount).toBeInTheDocument();
    });
  });
});
