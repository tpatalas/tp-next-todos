import { renderWithRecoilRootAndSession } from '@stateLogics/utils/testUtils';
import { ContentText } from '..';
import { mockRef } from '__mock__/react/mockUseRef';
import { screen } from '@testing-library/react';
import { PropsContentText } from '@components/section/section.types';

const mockContentText = {
  title: 'Mock title content for testing',
  subTitle: 'Mock subTitle content for testing',
  content: 'Mock content for testing',
};

type TypesContentText = Omit<PropsContentText, 'scrollRef'>;

jest.mock('..', () => ({
  ContentText: ({ title, subTitle, content }: TypesContentText) => (
    <div>
      <div>{title}</div>
      <div>{subTitle}</div>
      <div>{content}</div>
    </div>
  ),
}));

describe('ContentText', () => {
  const renderWithContentText = ({ title, subTitle, content }: TypesContentText) => {
    return renderWithRecoilRootAndSession(
      <ContentText
        title={title}
        subTitle={subTitle}
        content={content}
        scrollRef={mockRef.div}
      />,
    );
  };

  it('should render the proper contents texts passed as props when scrollRef is triggered', async () => {
    const { container } = renderWithContentText({
      title: mockContentText.title,
      subTitle: mockContentText.subTitle,
      content: mockContentText.content,
    });
    const titleText = await screen.findByText(mockContentText.title);
    const subTitleText = await screen.findByText(mockContentText.subTitle);
    const contentText = await screen.findByText(mockContentText.content);

    expect(container).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(subTitleText).toBeInTheDocument();
    expect(contentText).toBeInTheDocument();
  });
});
