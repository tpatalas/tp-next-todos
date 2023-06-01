import { Labels } from '@label/label.types';
import { Types } from '@lib/types';
import { DeleteLabelConfirmModal } from '@modals/confirmModal/deleteConfirmModal/deleteLabelConfirmModal';
import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { mockedLabelItem } from '__mock__/label';
import { Suspense } from 'react';
import { LabelItemDropdown } from '..';
import { LabelItem } from '../..';

type Props = Types['menuContentOnClose'];

const mockDeleteFunction = jest.fn();

jest.mock('../..', () => ({
  LabelItem: ({ label }: { label: Labels }) => <div>{label.name}</div>,
}));

jest.mock('@modals/confirmModal/deleteConfirmModal/deleteLabelConfirmModal', () => ({
  DeleteLabelConfirmModal: () => <button onClick={() => mockDeleteFunction()}>Delete item</button>,
}));

describe('LabelItemDropdown', () => {
  const renderWithLabelItemDropdown = (menuContentOnClose?: Props) => {
    return renderWithRecoilRootAndSession(
      <>
        <LabelItemDropdown
          label={mockedLabelItem}
          options={{}} // currently LabelItemDropdown only has CSS effect as option
          menuContentOnClose={menuContentOnClose}
        />
        <LabelItem label={mockedLabelItem} />
        <Suspense fallback={null}>
          {/* <ItemLabelModal label={mockedLabelItem} /> */}
          <DeleteLabelConfirmModal label={mockedLabelItem} />
        </Suspense>
      </>,
      { session: null },
    );
  };

  it('should not initially render the dropdown menu', () => {
    const { container } = renderWithLabelItemDropdown();
    const editLabel = screen.queryByText(/Edit label/i);
    const deleteLabel = screen.queryByText('Delete');
    const dropdownIcon = screen.getByTestId('svgIcon-testid');

    expect(container).toBeInTheDocument();
    expect(editLabel).not.toBeInTheDocument();
    expect(deleteLabel).not.toBeInTheDocument();
    expect(dropdownIcon).toBeInTheDocument();
  });

  it('should render the dropdown menu on clicking the dropdown icon', async () => {
    const { container } = renderWithLabelItemDropdown();
    const dropdownIcon = screen.getByTestId('svgIcon-testid');

    expect(container).toBeInTheDocument();
    expect(dropdownIcon).toBeInTheDocument();

    fireEvent.click(dropdownIcon);

    await waitFor(() => {
      const deleteLabel = screen.queryByText('Delete');
      expect(deleteLabel).toBeInTheDocument();
    });

    await waitFor(() => {
      const editLabel = screen.queryByText(/Edit label/i);
      expect(editLabel).toBeInTheDocument();
    });
  });

  it('should render the mocked labelItem correctly', async () => {
    const { container } = renderWithLabelItemDropdown();
    const labelItem = screen.getByText('test-label');

    expect(container).toBeInTheDocument();
    expect(labelItem).toBeInTheDocument();
  });

  it('should mockDelete function is called when Delete button for labelItem is clicked', () => {
    const { container } = renderWithLabelItemDropdown();
    const dropdownIcon = screen.getByTestId('svgIcon-testid');
    const labelItem = screen.getByText('test-label');

    expect(container).toBeInTheDocument();
    expect(labelItem).toBeInTheDocument();

    fireEvent.click(dropdownIcon);

    const deleteLabel = screen.getByText('Delete');
    expect(deleteLabel).toBeInTheDocument();

    fireEvent.click(deleteLabel);

    const confirmDeleteButton = screen.getByText('Delete item');
    expect(confirmDeleteButton).toBeInTheDocument();

    fireEvent.click(confirmDeleteButton);

    expect(mockDeleteFunction).toHaveBeenCalled();
  });
});
