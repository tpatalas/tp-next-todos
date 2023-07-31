import { render, screen, waitFor } from '@testing-library/react';
import { SectionContentText } from '..';
import { PropsSectionContentText } from '@/section/section.types';
import { sectionContentTextContents } from '@/section/section.consts';

describe('SectionContentText', () => {
  const renderWithSectionContentText = ({ title, subTitle, content, _id }: PropsSectionContentText) =>
    render(
      <SectionContentText
        _id={_id}
        title={title}
        subTitle={subTitle}
        content={content}
      />,
    );

  it('should render the props titles properly', () => {
    const { container } = renderWithSectionContentText({
      _id: null,
      title: sectionContentTextContents.spotlight.title,
      subTitle: sectionContentTextContents.spotlight.subTitle,
      content: sectionContentTextContents.spotlight.content,
    });
    Object.values(sectionContentTextContents.spotlight).forEach(async (value) => {
      await waitFor(() => {
        const text = screen.queryByText(value);
        expect(text).toBeInTheDocument();
      });
    });

    expect(container).toBeInTheDocument();
  });
});
