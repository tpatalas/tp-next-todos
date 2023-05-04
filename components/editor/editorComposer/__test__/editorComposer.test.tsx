import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RecoilState } from 'recoil';
import { EditorComposer } from '..';
import { CATCH } from '@constAssertions/misc';
import { atomCatch } from '@states/misc';
import mockRouter from 'next-router-mock';
import { PATH_APP } from '@constAssertions/data';

type Props<T> = { node?: RecoilState<T>; state?: T; isAutoFocus?: boolean };

describe('EditorComposer', () => {
  const renderWithEditorComposer = <T,>({ node, state, isAutoFocus }: Props<T>) => {
    const options = { session: null, node: node, state: state };
    return renderWithRecoilRootAndSession(
      <EditorComposer
        titleName='title'
        placeholder='Todo name'
        isAutoFocus={isAutoFocus}
        todo={undefined}
      />,
      options,
    );
  };

  const renderWithQueryElement = async <T,>({ node, state, isAutoFocus }: Props<T>) => {
    const { container } = renderWithEditorComposer({ node: node, state: state, isAutoFocus: isAutoFocus });
    const updatedTodo = 'Updated Todo item';
    const editable = await screen.findByText(/Todo name/i);
    const editableInput = await screen.findByRole('textbox');

    return { container, updatedTodo, editable, editableInput };
  };

  it('should render placeholder', async () => {
    const { container, editable } = await renderWithQueryElement({});

    expect(container).toBeInTheDocument();

    await waitFor(() => expect(editable).toBeInTheDocument());
  });

  it('should render updated input', async () => {
    const { container, editable, updatedTodo } = await renderWithQueryElement({});

    expect(container).toBeInTheDocument();
    expect(editable).toBeInTheDocument();
    expect(editable.textContent).toContain('Todo name');

    fireEvent.input(editable, { target: { textContent: updatedTodo } });

    await waitFor(() => expect(editable.textContent).toContain(updatedTodo));
  });

  it('should update the input with keybinding', async () => {
    const { container, editable, updatedTodo } = await renderWithQueryElement({});

    expect(container).toBeInTheDocument();
    expect(editable).toBeInTheDocument();
    expect(editable.textContent).toContain('Todo name');

    const updatedInput = screen.queryByText(updatedTodo);
    expect(updatedInput).not.toBeInTheDocument();

    fireEvent.input(editable, { target: { textContent: updatedTodo } });

    await waitFor(() => expect(editable.textContent).toContain(updatedTodo));

    fireEvent.keyDown(editable, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      const string = screen.queryByText(updatedTodo);
      expect(string).toBeInTheDocument();
    });
  });

  it('should autoFocus when isAutoFocus prop is true', async () => {
    const { container, editableInput } = await renderWithQueryElement({ isAutoFocus: true });

    expect(container).toBeInTheDocument();
    await waitFor(() => expect(editableInput).toHaveFocus());
  });

  it('should not autoFocus when isAutoFocus prop is false', async () => {
    const { container, editableInput } = await renderWithQueryElement({ isAutoFocus: false });

    expect(container).toBeInTheDocument();
    await waitFor(() => expect(editableInput).not.toHaveFocus());
  });

  it('should not autoFocus when confirmation modal is open while isAutoFocus is set to true', async () => {
    const { container, editableInput } = await renderWithQueryElement({
      node: atomCatch(CATCH.confirmModal),
      state: true,
      isAutoFocus: true,
    });

    expect(container).toBeInTheDocument();
    await waitFor(() => expect(editableInput).not.toHaveFocus());
  });

  it('should not autoFocus when routed to Complete while isAutoFocus is set to true', async () => {
    mockRouter.push(PATH_APP['completed']);

    const { container, editableInput } = await renderWithQueryElement({ isAutoFocus: true });

    expect(container).toBeInTheDocument();
    expect(mockRouter).toMatchObject({ pathname: PATH_APP['completed'] });
    await waitFor(() => expect(editableInput).not.toHaveFocus());
  });
});
