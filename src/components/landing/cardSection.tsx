import performance from '../../assets/icons/ocean-protocol.svg';
import simulation from '../../assets/icons/status-up.svg';
import learning from '../../assets/icons/teacher.svg';
import styled from 'styled-components';
import { SectionTitle, } from '../../styles/landing/featuresSection.styles';
import { motion } from 'framer-motion';
import { defaultVariant } from '../../styles/common/animationVariants.motion';
import { ANIMATE_ONCE } from '../../utils/constants';
import devices from '../../utils/devices';

export default function Card() {
    return (
        <div>
            <SectionTitle>
                Benefits
            </SectionTitle>
            <Flex
                variants={defaultVariant}
                whileInView="visible"
                initial="hidden"
                exit={{ opacity: 0 }}
                viewport={{ once: ANIMATE_ONCE, amount: 'some' }}
            >
                <StyledCard>
                    <ImgCard>
                        <img src={performance} alt="Performance Insights" width={30} height={30}/>
                    </ImgCard>
                    <h2 style={{fontWeight:'800',}}>Performance Insights</h2>
                </StyledCard>
                <StyledCard>
                    <ImgCard>
                        <img src={simulation} alt="Real Practice Simulation"/>
                    </ImgCard>
                    <h2 style={{fontWeight:'800',}}>Real Practice Simulation</h2>
                </StyledCard>
                <StyledCard>
                    <ImgCard>
                        <img src={learning} alt="Adaptive Learning"/>
                    </ImgCard>
                    <h2 style={{fontWeight:'800',}}>Adaptive Learning</h2>
                </StyledCard>
            </Flex>        
        </div>
    )
}


export const Flex = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 20px;
    gap: 20px;
    justify-items: center;
    text-align: center;

    @media ${devices.tablet} {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0;        
    }

    @media ${devices.laptop} {
        max-width: 80vw;
        margin: auto;
    }

    @media ${devices.desktop} {
        max-width: 60vw;
    }

`

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 14px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 95%;

    @media ${devices.tablet} {
        /* width: 323px; */
    h2 {
        text-align: center;
    }
  }
`

export const ImgCard = styled.div`
    display: flex;
    padding: 15px;
    background-color: #F2F4F5;
    border-radius: 100px;
    align-items: center;
`

// export const TitleWrapper = styled.h1`
//   font-size: ${fontSize.h1.size};
//   font-weight: 700;
//   color: ${Theme.PrimaryColor};
//   line-height: 156.52%;
//   text-align: center;

  

//   @media (min-width: 1024px) {
//     font-size: 2rem /* 32px */;
//   }

//   @media (min-width: 1280px) {
//     font-size: 2.5rem /* 40px */;
//   }
// `;