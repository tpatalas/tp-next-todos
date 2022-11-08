import { renderWithRecoilRoot } from '@lib/utils';
import { atomTodoModalOpen } from '@states/atoms';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RecoilValue, snapshot_UNSTABLE } from 'recoil';
import { LayoutApp } from '../layoutApp';

describe('LayoutApp', () => {
  beforeEach(() => {
    renderWithRecoilRoot(
      <LayoutApp>
        <></>
      </LayoutApp>,
    );
  });

  it('should open todoModal disable the button', async () => {
    const buttonComponent = await screen.findByText(/Create Todo/i);
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).not.toBeDisabled();

    fireEvent.click(buttonComponent);
    await waitFor(() => expect(buttonComponent).toBeDisabled());
  });

  it('should open todoModal set the recoil`s `atomTodoModal(undefined)` to true', () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot_UNSTABLE().getLoadable(p).valueOrThrow();
    expect(get(atomTodoModalOpen(undefined))).toBe(false);
    expect(get(atomTodoModalOpen(undefined))).not.toBe(true);

    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(atomTodoModalOpen(undefined), true));
    expect(testSnapshot.getLoadable(atomTodoModalOpen(undefined)).valueOrThrow()).toBe(true);
    expect(testSnapshot.getLoadable(atomTodoModalOpen(1)).valueOrThrow()).toBe(false);
  });
});
