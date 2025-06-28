import styled from 'styled-components';
import { CardSelector, Grid } from '@flexisaf/flexibull2';
import { Dispatch, SetStateAction } from 'react';
import { curriculums } from 'utils/constants';
interface CurriculumSelectorProps {
  selectedCurriculum: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS';
  setSelectedCurriculum: Dispatch<
    SetStateAction<'NUC' | 'NBTE' | 'NCCE' | 'OTHERS'>
  >;
}
const CurriculumSelector = ({
  selectedCurriculum,
  setSelectedCurriculum,
}: CurriculumSelectorProps) => {
  const handleCurriculumChange = (
    value: 'NUC' | 'NBTE' | 'NCCE' | 'OTHERS'
  ) => {
    setSelectedCurriculum(value);
  };
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
            <CardSelector
              name="curriculumType"
              value={curriculum.value}
              key={curriculum.value}
              view="label"
              onChange={() => handleCurriculumChange(curriculum.value)}
              checked={selectedCurriculum === curriculum.value}
              label={curriculum.label}
              type="radio"
              description={curriculum.description}
              style={{ display: 'contents' }}
            />
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
`;
const Label = styled.label<{ required?: boolean }>`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
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
  font-size: 16px;
  color: #000000cc;
  margin-top: 4px;
  margin-bottom: 24px;
`;

export default CurriculumSelector;
