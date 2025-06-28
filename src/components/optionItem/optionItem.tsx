import { useState, useRef } from 'react';
import { Box, RadioButton, Checkbox } from '@flexisaf/flexibull2';
import { OptionInput } from './styles';
import Theme from '../../utils/theme';
import TinyEditor from '../tinyEditor/tinyEditor';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { IOption } from '../../pages/CreateEarn/modals/questionEditor';

interface OptionItemProps {
  option: IOption;
  editOption: (option: { id: string; text: string; correct: boolean }) => void;
  deleteOption: (id: string) => void;
  disableDelete: boolean;
  setCorrectOption: () => void;
  isCorrectOption: boolean;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  questionType: string;
}

export const OptionItem = ({
  option,
  editOption,
  deleteOption,
  disableDelete,
  setCorrectOption,
  isCorrectOption,
  provided,
  snapshot,
  questionType,
}: OptionItemProps) => {
  const [description, setDescription] = useState(option.text || '');
  const editorRef = useRef(null);

  return (
    <Box
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      snapshot={snapshot}
      {...provided?.dragHandleProps}
      display="flex"
      style={{
        alignItems: 'start',

        display: 'flex',
        flexDirection: 'column',

        margin: '10px 0',
        ...provided?.draggableProps.style,
      }}
    >
      {questionType === 'SINGLE_CHOICE' && (
        <RadioButton
          checked={isCorrectOption}
          onChange={(e: { target: { checked: boolean } }) => {
            if (e.target.checked) {
              setCorrectOption();
            }
          }}
          label="Correct answer"
        />
      )}

      {questionType === 'MULTIPLE_CHOICE' && (
        <Checkbox
          label="Correct answer"
          checked={isCorrectOption}
          onChange={(e: { target: { checked: boolean } }) => {
            if (e.target.checked) {
              setCorrectOption();
            }
          }}
        />
      )}

      <OptionInput>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <i className="saf-braille" style={{ color: Theme.PrimaryGrey }} />
          <button
            disabled={disableDelete}
            onClick={() => deleteOption(option.id)}
            style={{
              opacity: disableDelete ? 0.5 : 1,
              cursor: disableDelete ? 'default' : 'pointer',
            }}
          >
            <i className="saf-trash" style={{ fontSize: '18px' }} />
          </button>
        </div>
        <TinyEditor
          editorRef={editorRef}
          value={description}
          showMenuBar={false}
          height={200}
          onBlur={() => {
            editOption({
              ...option,
              text: description,
              correct: option?.correct || false,
            });
          }}
          onChange={(value) => {
            setDescription(value);
            editOption({
              ...option,
              text: description,
              correct: option?.correct || false,
            });
          }}
          toolbarItems="tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | bold underline italic"
          controlled={true}
        />
      </OptionInput>
    </Box>
  );
};
