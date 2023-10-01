import { SectionContent } from '@/section/sectionContent';
import { SectionFooterNavigation } from '@/section/sectionFooterNavigation';
import { SectionHeader } from '@/section/sectionHeader';
import { SectionHero } from '@/section/sectionHero';
import { SectionStartToday } from '@/section/sectionStartToday';
import { styleDividerY } from '@/ui/divider/divider.styles';
import { DividerY } from '@/ui/divider/dividerY';

const Home = () => {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <SectionHero />
      <SectionHeader />
      <SectionContent />
      <SectionStartToday />
      <DividerY style={styleDividerY()} />
      <SectionFooterNavigation />
    </div>
  );
};

export default Home;
