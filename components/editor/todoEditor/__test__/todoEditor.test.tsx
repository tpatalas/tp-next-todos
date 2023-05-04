import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { screen } from '@testing-library/dom';
import { TodoEditors } from '..';

const titlePlaceholder = 'Todo Name';
const descriptionPlaceholder = 'Write your Note';

describe('TodoEditor', () => {
  const renderWithTodoEditor = () => {
    const options = { session: null };
    return renderWithRecoilRootAndSession(<TodoEditors />, options);
  };

  it('should contain the placeholders', async () => {
    const { container } = renderWithTodoEditor();

    const placeholderTitle = await screen.findByText(titlePlaceholder);
    const placeholderDescription = await screen.findByText(descriptionPlaceholder);

    expect(container).toBeInTheDocument();
    expect(placeholderTitle).toBeInTheDocument();
    expect(placeholderDescription).toBeInTheDocument();
  });
  // Slate does not render Recoil state updates when manually updating
  // Recoil values within a testing environment.
  // As a result, other tests, such as rendering conditional placeholders,
  // will be conducted in the integration tests of other components.
});
