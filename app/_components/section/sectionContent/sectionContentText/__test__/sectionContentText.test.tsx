import { render, screen, waitFor } from '@testing-library/react';
import { SectionContentText } from '..';
import { PropsSectionContentText } from '@/section/section.types';
import { sectionContents } from '@/section/section.consts';

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
      title: sectionContents.spotlight.title,
      subTitle: sectionContents.spotlight.subTitle,
      content: sectionContents.spotlight.content,
    });
    Object.values(sectionContents.spotlight).forEach(async (value) => {
      await waitFor(() => {
        const text = screen.queryByText(value);
        expect(text).toBeInTheDocument();
      });
    });

    expect(container).toBeInTheDocument();
  });
});
