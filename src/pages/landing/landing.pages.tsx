import {
  Section,
  Section2,
} from '../../styles/landing/contentContainer.styles';

import NavBar from '../../components/landing/navBar.component';
import HeroSection from '../../components/landing/heroSection.components';
import FeaturesSection from '../../components/landing/featuresSection.components';
import Card from '../../components/landing/cardSection';
import Create_and_Earn from '../../components/landing/create&earn';
import Footer from '../../components/landing/footer.components';

const homePageLinks = [
  { link: '#home', name: 'Home' },
  { link: '#features', name: 'Features' },
  { link: '#benefits', name: 'Benefits' },
  { link: '/resource', name: 'Resource' },
  { link: '/quizathon', name: 'Quizathon' },
];
const Landing = () => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <header>
        <NavBar navLinks={homePageLinks} />
      </header>
      <main>
        <Section id="home">
          <HeroSection />
        </Section>
        <Section id="quizathon" style={{ marginBottom: '0' }}>
          <Create_and_Earn />
        </Section>
        <Section id="features">
          <FeaturesSection />
        </Section>
        <Section2 id="benefits">
          <Card />
        </Section2>
        {/* <Section id="create-and-earn" style={{ marginBottom: '0' }}>
          <Create_and_Earn />
        </Section> */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Landing;
