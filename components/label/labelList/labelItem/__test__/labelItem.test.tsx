import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { atomNavigationOpen } from '@states/layouts';
import { fireEvent, waitFor } from '@testing-library/dom';
import { screen } from '@testing-library/react';
import { UserSessionEffect } from '@user/userSessionGroupEffect/userSessionEffect';
import { mockedLabelItem } from '__mock__/label';
import mockRouter from 'next-router-mock';
import { Suspense, useEffect } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';
import { LabelItem } from '..';
import { atomConfirmModalDelete, atomLabelModalOpen } from '@states/modals';
import { useInitialNavigation } from '@layout/layout.hooks';

jest.mock('@modals/labelModals/labelModal/itemLabelModal', () => ({
  ItemLabelModal: () => {
    const modalState = useRecoilValue(atomLabelModalOpen(mockedLabelItem._id));
    const modalStateWithText = modalState ? 'labelItemModal is visible' : null;
    return <div>{modalStateWithText}</div>;
  },
}));

jest.mock('@modals/confirmModal/deleteConfirmModal/deleteLabelConfirmModal', () => ({
  DeleteLabelConfirmModal: () => {
    const deleteModalState = useRecoilValue(atomConfirmModalDelete(mockedLabelItem._id));
    const deleteModalStateWithText = deleteModalState ? 'deleteModal is open' : null;
    return <div>{deleteModalStateWithText}</div>;
  },
}));

const InitialNavigationEffect = ({ isBreakpointMd }: { isBreakpointMd: boolean }) => {
  const setInitial = useInitialNavigation({ path: 'app' });
  const mockValue = isBreakpointMd;

  useEffect(() => {
    !mockValue && setInitial();
  }, [mockValue, setInitial]);
  return null;
};

describe('LabelItem', () => {
  const renderWithLabelItem = <T,>(node?: RecoilState<T>, isBreakpointMd?: boolean) => {
    const options = { session: null, node: node };
    return renderWithRecoilRootAndSession(
      <>
        <LabelItem label={mockedLabelItem} />
        <UserSessionEffect />
        <Suspense fallback={null}>
          <InitialNavigationEffect isBreakpointMd={isBreakpointMd ?? false} />
        </Suspense>
      </>,
      options,
    );
  };

  it('should render the mockedLabel name', async () => {
    const { container } = renderWithLabelItem();

    expect(container).toBeInTheDocument();
    await waitFor(() => {
      const labelName = screen.queryByText(mockedLabelItem.name);
      expect(labelName).toBeInTheDocument();
    });
  });

  it('should render the correct className based on the slug matched to the id of label', async () => {
    mockRouter.push('/');
    const matchedPath = `/app/label/${mockedLabelItem._id}`;
    const { container } = renderWithLabelItem();
    const divElement = screen.getByTestId('labelItem-testid');
    const baseClassName =
      'group relative flex w-full cursor-pointer flex-row items-center justify-between rounded-lg pr-[0.20rem]';
    const unmatchedSlugClassName = 'hover:bg-slate-200 hover:bg-opacity-80 ';
    const matchedSlugClassName = 'bg-blue-100 font-semibold text-opacity-80';

    expect(container).toBeInTheDocument();
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass(baseClassName);
    expect(divElement).toHaveClass(unmatchedSlugClassName);
    expect(divElement).not.toHaveClass(matchedSlugClassName);

    await waitFor(() => {
      mockRouter.push(matchedPath);
    });

    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass(baseClassName);
    expect(divElement).not.toHaveClass(unmatchedSlugClassName);
    expect(divElement).toHaveClass(matchedSlugClassName);
  });

  it('should name to the label id based slug when the label button is clicked', async () => {
    mockRouter.push('/');
    const expectedRoute = `/app/label/${mockedLabelItem._id}`;
    const { container } = renderWithLabelItem();
    const labelButton = screen.getByText(mockedLabelItem.name);

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      expect(labelButton).toBeInTheDocument();
    });

    expect(mockRouter).toMatchObject({ pathname: '/' });

    fireEvent.click(labelButton);

    expect(mockRouter).not.toMatchObject({ pathname: '/' });
    expect(mockRouter).toMatchObject({ pathname: expectedRoute });
  });

  it('should show active text when media query is above medium width, 768px', async () => {
    const layoutType = 'app';
    const { container } = renderWithLabelItem(atomNavigationOpen(layoutType), false);
    const labelButton = screen.getByText(mockedLabelItem.name);
    const navigationOpen = screen.getByText('active');

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      expect(labelButton).toBeInTheDocument();
    });
    expect(navigationOpen).toBeInTheDocument();
  });

  it('should render the LabelItemDropdown correctly', async () => {
    const { container } = renderWithLabelItem();
    const labelItemDropdownName = screen.getByText(mockedLabelItem.name);

    expect(container).toBeInTheDocument();
    await waitFor(() => {
      expect(labelItemDropdownName).toBeInTheDocument();
    });
  });

  it('should render the mocked ItemLabelModal correctly when modal is triggered to open', async () => {
    const { container } = renderWithLabelItem();
    const itemLabelModalText = 'labelItemModal is visible';
    const dropdownButton = screen.getByTestId('dropdown-svgIcon-testid');

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      expect(dropdownButton).toBeInTheDocument();
    });

    fireEvent.click(dropdownButton);

    const modalButton = await screen.findByText('Edit label');
    expect(modalButton).toBeInTheDocument();

    await waitFor(() => {
      const mockItemLabelModal = screen.queryByText(itemLabelModalText);
      expect(mockItemLabelModal).not.toBeInTheDocument();
    });

    fireEvent.click(modalButton);

    await waitFor(() => {
      const mockItemLabelModal = screen.queryByText(itemLabelModalText);
      expect(mockItemLabelModal).toBeInTheDocument();
    });
  });

  it('should render the mocked DeleteLabelConfirmModal correctly when modal is triggered to open', async () => {
    const deleteLabelConfirmModalText = 'deleteModal is open';
    const { container } = renderWithLabelItem();
    const dropdownButton = screen.getByTestId('dropdown-svgIcon-testid');

    expect(container).toBeInTheDocument();

    await waitFor(() => {
      expect(dropdownButton).toBeInTheDocument();
    });

    fireEvent.click(dropdownButton);

    const modalButton = await screen.findByText('Delete');
    expect(modalButton).toBeInTheDocument();

    await waitFor(() => {
      const mockItemLabelModal = screen.queryByText(deleteLabelConfirmModalText);
      expect(mockItemLabelModal).not.toBeInTheDocument();
    });

    fireEvent.click(modalButton);

    await waitFor(() => {
      const mockItemLabelModal = screen.queryByText(deleteLabelConfirmModalText);
      expect(mockItemLabelModal).toBeInTheDocument();
    });
  });
});
