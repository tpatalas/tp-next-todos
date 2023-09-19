import { SectionContent } from '@/section/sectionContent';
import { SectionHeader } from '@/section/sectionHeader';
import { SectionHero } from '@/section/sectionHero';
import { SectionStartToday } from '@/section/sectionStartToday';
import { styleDividerY } from '@/ui/divider/divider.styles';
import { DividerY } from '@/ui/divider/dividerY';

const Home = () => {
  return (
    <>
      <SectionHero />
      <SectionHeader />
      <SectionContent />
      <SectionStartToday />
      <DividerY style={styleDividerY()} />
    </>
  );
};

export default Home;
