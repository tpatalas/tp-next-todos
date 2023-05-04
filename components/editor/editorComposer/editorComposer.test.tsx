import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { EditorComposer } from '.';

describe('EditorComposer', () => {
  const renderWithEditorComposer = (isAutoFocus?: boolean) => {
    const options = { session: null };
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

  const renderWithQueryElement = async (isAutoFocus?: boolean) => {
    const { container } = renderWithEditorComposer(isAutoFocus);
    const updatedTodo = 'Updated Todo item';
    const editable = await screen.findByText(/Todo name/i);
    const editableInput = await screen.findByRole('textbox');

    return { container, updatedTodo, editable, editableInput };
  };

  it('should render placeholder', async () => {
    const { container, editable } = await renderWithQueryElement();

    expect(container).toBeInTheDocument();

    await waitFor(() => expect(editable).toBeInTheDocument());
  });

  it('should render updated input', async () => {
    const { container, editable, updatedTodo } = await renderWithQueryElement();

    expect(container).toBeInTheDocument();
    expect(editable).toBeInTheDocument();
    expect(editable.textContent).toContain('Todo name');

    fireEvent.input(editable, { target: { textContent: updatedTodo } });

    await waitFor(() => expect(editable.textContent).toContain(updatedTodo));
  });

  it('should update the input with keybinding', async () => {
    const { container, editable, updatedTodo } = await renderWithQueryElement();

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
    const { container, editableInput } = await renderWithQueryElement(true);

    expect(container).toBeInTheDocument();
    await waitFor(() => expect(editableInput).toHaveFocus());
  });

  it('should not autoFocus when isAutoFocus prop is false', async () => {
    const { container, editableInput } = await renderWithQueryElement(false);

    expect(container).toBeInTheDocument();
    await waitFor(() => expect(editableInput).not.toHaveFocus());
  });
});
