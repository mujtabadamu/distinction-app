import { Box, Text } from "@flexisaf/flexibull2"
import styled from 'styled-components';
import {  generateRandomColor } from "../../utils/helpers";
import devices from "../../utils/devices";
import { useNavigate } from "react-router-dom";


interface Props {
  CourseTitle: string,
  recommendedPracticeId:string
}
const RecommendedPracticeCard = ({ CourseTitle,recommendedPracticeId }: Props) => {
  const navigate = useNavigate()
  return (
    <Container>
      <Capital>
          {CourseTitle.charAt(0).toUpperCase()}
      </Capital>
      <div>
        <Text size="15px"  style={{color:'#72777A'}}>
          {CourseTitle}
        </Text>
        <h2
         className="start-practice" 
         onClick={() => navigate("/new-practice", { state: { data: {CourseTitle,recommendedPracticeId} } })}
        >Start Practice</h2>
      </div>
    </Container>
  )
}

const Container = styled(Box)`
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 0 0 80%;

  & .start-practice {
    color: #1d4ed8;
    font-size: 10px;
    margin-top: 0.5rem;
    font-weight: 700;
    cursor: pointer;

    @media ${devices.tablet} {
      font-size: 13px;
    }
  }
  @media ${devices.tablet} {
    flex: 0 0 30%;
  }
  
`;

const Capital = styled.div`
padding:1rem;
width:50px;
font-size:14px;
color:white;
border-radius:5px;
text-align:center;
font-weight:700;
background-color:${generateRandomColor}
`
export default RecommendedPracticeCard