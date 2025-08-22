import styled from 'styled-components';
import { Grid } from '@flexisaf/flexibull2';
import { Dispatch, SetStateAction } from 'react';
import { curriculums } from 'utils/constants';

interface CurriculumSelectorProps {
  selectedCurriculum: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
  setSelectedCurriculum: Dispatch<
    SetStateAction<'NUC' | 'NBTE' | 'NCCE' | 'OTHERS'>
  >;
}

const SelectCurriculum = ({
  selectedCurriculum,
  setSelectedCurriculum,
}: CurriculumSelectorProps) => {
  return (
    <Container>
      <FormGroup>
        <Label required>CURRICULUM TYPE</Label>
        <InstructionText>
          Choose a curriculum type that applies to you
        </InstructionText>
        <Grid
          default="repeat(3, 1fr)"
          md="1fr"
          style={{ alignItems: 'stretch' }}
        >
          {curriculums.map((curriculum) => (
            <CurriculumCard
              key={curriculum.value}
              isSelected={selectedCurriculum === curriculum.value}
              onClick={() => setSelectedCurriculum(curriculum.value)}
            >
              <CardHeader>
                <CardTitle>{curriculum.label}</CardTitle>
              </CardHeader>
              <CardDescription>{curriculum.description}</CardDescription>
            </CurriculumCard>
          ))}
        </Grid>
      </FormGroup>
    </Container>
  );
};

const Container = styled.div`
  margin: 10px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  margin-top: -20px;
`;

const Label = styled.label<{ required?: boolean }>`
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 0.99em;
  text-transform: uppercase;
  color: #1a202c;
  ${(props) =>
    props.required &&
    `
    &::after {
      content: ' *';
      color: #e53e3e;
    }
  `}
`;

const InstructionText = styled.p`
  font-size: 14px;
  color: #000000cc;
  margin-top: 4px;
  margin-bottom: 10px;
`;

const CurriculumCard = styled.div<{ isSelected: boolean }>`
  border: 1px solid ${(props) => (props.isSelected ? '#1D4ED8' : '#CBD5E4')};
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  height: 56px;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => (props.isSelected ? '#2998EC14' : '#fff')};
`;

const CardHeader = styled.div`
  margin-bottom: 5px;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #202020;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 12px;
  color: #202020;
  font-weight: 400;
`;

export default SelectCurriculum;
