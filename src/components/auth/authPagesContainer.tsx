import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Theme from '../../utils/theme';
import { Layout } from '@flexisaf/flexibull2';
import ContentContainer from '../landing/contentContainer';
import { NavBarContainer, Logo } from '../../styles/landing/navBar.style';
import { AuthWrapper } from '../../styles/auth/auth.styles';
import { defaultVariant } from '../../styles/common/animationVariants.motion';
import { ANIMATE_ONCE } from '../../utils/constants';

interface Props {
  children: ReactNode;
  showLogo?: boolean;
}

const AuthPagesContainer = ({ children, showLogo = true }: Props) => {
  return (
    <Layout theme={Theme}>
      <ContentContainer>
        {showLogo && (
          <NavBarContainer>
            <div style={{ marginRight: 'auto', marginLeft: 'auto' }}>
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </NavBarContainer>
        )}
        <AuthWrapper
          variants={defaultVariant}
          animate="visible"
          initial="hidden"
          viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
        >
          {children}
        </AuthWrapper>
      </ContentContainer>
    </Layout>
  );
};

export default AuthPagesContainer;
