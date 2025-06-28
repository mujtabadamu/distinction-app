import { Text, Grid } from '@flexisaf/flexibull2';
import {
  FooterWrapper,
  CompanyInfoWrapper,
  CompanyInfo,
  CompanyLogo,
  FooterText,
  CompanyLinksWrapper,
  LinkWrapper,
  LinkHeader,
  Link,
  Border,
  CopyWrightWrapper,
  SocialLinksWrapper,
} from '../../styles/landing/footer.styles';
import ContentContainer from './contentContainer';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterWrapper>
      <ContentContainer>
        <>
          <CompanyInfoWrapper>
            <CompanyInfo>
              <>
                <CompanyLogo />
                <FooterText>
                  Distinction is a product of FlexiSAF Edusoft limited
                </FooterText>
              </>
              <FooterText>
                UK: 167-169 Great Portland Street, 5th Floor, London, W1W 5PF{' '}
                <br />
              </FooterText>
              <FooterText>
                Dubai: R5 – 011 Cluster R, Retail Level, Jumeirah Lake Towers,
                Dubai, UAE. <br />
              </FooterText>
              <FooterText>
                Abuja: No. 3 Egbedi Close, off Samuel Ladoke Akintola Boulevard,
                Garki 2, Abuja, Nigeria. <br />
              </FooterText>
              <Grid
                default="max-content max-content"
                sm="max-content max-content"
              >
                <FooterText>Give us a call:</FooterText>
                <Grid default="1fr">
                  <Text bold color="#fff">
                    +234 902 703 290
                  </Text>
                  <Text bold color="#fff">
                    +234 901 650 3074
                  </Text>
                  <Text bold color="#fff">
                    +44 758 810 1637
                  </Text>
                </Grid>
              </Grid>
              <FooterText>
                Or send an email:{' '}
                <a
                  href="mailto:support@distinction.ng"
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  <Text bold color="#fff">
                    distinction@flexisaf.com
                  </Text>
                </a>
              </FooterText>
            </CompanyInfo>

            <CompanyLinksWrapper>
              <LinkWrapper>
                <LinkHeader>Company</LinkHeader>
                <Link href="https://www.flexisaf.com/company">About Us</Link>
                <Link href="https://www.flexisaf.com/contact">Contact Us</Link>
              </LinkWrapper>

              <LinkWrapper>
                <LinkHeader>Resources</LinkHeader>
                <Link href="https://www.flexisaf.com/company">FAQs</Link>
                <Link href="https://www.flexisaf.com/company">Sitemap</Link>
              </LinkWrapper>

              <LinkWrapper>
                <LinkHeader>Legal</LinkHeader>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms-service">Terms of Service</Link>
              </LinkWrapper>
            </CompanyLinksWrapper>
          </CompanyInfoWrapper>
        </>
        <Border />
        <CopyWrightWrapper>
          <FooterText size="14px">
            ©{new Date().getFullYear()} FlexiSAF. All rights reserved.
          </FooterText>
          <SocialLinksWrapper>
            <Link href="https://www.facebook.com/flexisaf/">
              <FaFacebookF />
            </Link>
            <Link href="https://twitter.com/flexisaf">
              <FaTwitter />
            </Link>
            <Link href="https://www.linkedin.com/company/flexisafedusoftlimited/">
              <FaLinkedinIn />
            </Link>
            <Link href="https://www.instagram.com/flexisaf/">
              <FaInstagram />
            </Link>
          </SocialLinksWrapper>
        </CopyWrightWrapper>
      </ContentContainer>
    </FooterWrapper>
  );
};

export default Footer;
