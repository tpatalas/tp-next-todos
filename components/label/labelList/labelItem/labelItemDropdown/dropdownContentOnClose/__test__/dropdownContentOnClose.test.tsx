import { DATA_DEMO_LABELS } from '@label/label.data';
import { Labels } from '@label/label.types';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen, waitFor } from '@testing-library/react';
import { mockedLabelItem } from '__mock__/label';
import { DropdownContentOnClose } from '..';
import { UserSessionEffect } from '@user/userSessionGroupEffect/userSessionEffect';

describe('DropdownContentOnClose', () => {
  const renderWithDropdownContentOnClose = (mockedLabelItem: Labels) => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(
      <>
        <DropdownContentOnClose label={mockedLabelItem} />
        <UserSessionEffect />
      </>,
      options,
    );
  };

  it('should not render the todoCount number when mockedLabelItem is used', async () => {
    const { container } = renderWithDropdownContentOnClose(mockedLabelItem);

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      const todoCount = screen.queryByText('1');
      expect(todoCount).not.toBeInTheDocument();
    });
  });

  it('should render the todoCount number when demoLabelItem is used', async () => {
    const demoLabelId = '201';
    const demoLabelItem = DATA_DEMO_LABELS.find((label) => label._id === demoLabelId) || ({} as Labels);
    const { container } = renderWithDropdownContentOnClose(demoLabelItem);
    const demoTodoCount = demoLabelItem.title_id?.length as number;
    const demoTodoCountString = demoTodoCount.toString() || '';
    const demoTodoCountControl = demoTodoCount + 1;

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      const todoCount = screen.queryByText(demoTodoCountString);
      expect(todoCount).toBeInTheDocument();
    });

    await waitFor(() => {
      const todoCount = screen.queryByText(demoTodoCountControl);
      expect(todoCount).not.toBeInTheDocument();
    });
  });
});
