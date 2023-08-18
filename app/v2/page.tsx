import { SectionContent } from '@/section/sectionContent';
import { SectionHeader } from '@/section/sectionHeader';
import { SectionHero } from '@/section/sectionHero';
import { SectionStartToday } from '@/section/sectionStartToday';

const Home = () => {
  return (
    <>
      <SectionHero />
      <SectionHeader />
      <SectionContent />
      <SectionStartToday />
    </>
  );
};

export default Home;
