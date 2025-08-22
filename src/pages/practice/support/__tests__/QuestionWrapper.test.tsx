import { render, screen, fireEvent } from '../../../../test-util';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import QuestionWrapper from '../QuestionWrapper';
import { Question } from 'generated/index';
// import { TextArea, Checkbox } from '@flexisaf/flexibull2';

// Mock the QuestionFeedbackModal component
vi.mock('../modals/QuestionFeedback', () => ({
  default: () => <div data-testid="feedback-modal" />,
}));

// Mock hooks that are used in the component
vi.mock('../../../hooks/bookmarks/useQuestionBookmark', () => ({
  default: () => ({
    bookmarks: [],
    bookmarkQuestion: vi.fn(),
    removeQuestionBookmark: vi.fn(),
  }),
}));

vi.mock('../../../hooks/general/useAudioGet', () => ({
  default: () => ({
    loadingAudio: false,
    audio: { audioUrl: null, audioId: null },
  }),
}));

vi.mock('../../../hooks/general/useSectionGetImage', () => ({
  default: () => ({
    imageSrc: null,
    imageLoad: false,
    errorImage: null,
  }),
}));

vi.mock('html-react-parser', () => ({
  default: (content: string) => content, // Add type annotation for content
}));

// Mock MathJax components
vi.mock('better-react-mathjax', () => ({
  MathJaxContext: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ), // Add type annotation for children
  MathJax: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ), // Add type annotation for children
}));

// Mock MathContent
vi.mock('components/practice/drawers', () => ({
  MathContent: ({ content }: { content: string }) => (
    <div data-testid="math-content">{content}</div>
  ), // Add type annotation for content
}));

const createMockQuestion = (
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT'
): Question => ({
  id: '1',
  type,
  text: 'What is 2 + 2?',
  answerOptions: [
    { id: '1', text: '3', isCorrect: false },
    { id: '2', text: '4', isCorrect: true },
    { id: '3', text: '5', isCorrect: false },
  ],
  tags: [''],
  questionNumber: 1,
  topic: 'maths',
  imageUrl: '',
  solution: '',
  section: {
    content: '',
    id: '',
    imageUrl: '',
    title: '',
    multimediaFile: null,
  },
});

const mockSingleChoiceQuestion = createMockQuestion('SINGLE_CHOICE');
const mockMultipleChoiceQuestion = createMockQuestion('MULTIPLE_CHOICE');
const mockShortTextQuestion = createMockQuestion('SHORT_TEXT');
const mockLongTextQuestion = createMockQuestion('LONG_TEXT');

describe('QuestionWrapper Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockProps = {
    activeQuestionNumber: 1,
    totalQuestions: 10,
    question: mockSingleChoiceQuestion,
    setShowQuestionsDrawer: vi.fn(),
    onSelectAnswerOption: vi.fn(),
    studentPaperId: '123',
    answerOption: { questionId: '1', answerText: '', answerOptionIds: [] },
    mode: 'real' as const,
    isBack: false,
    duration: 400,
  };

  it('renders the question text', () => {
    render(<QuestionWrapper {...mockProps} />);
    const questionText = screen.getByTestId('math-content');
    expect(questionText).toBeInTheDocument();
  });

  it('handles single choice selection', () => {
    render(<QuestionWrapper {...mockProps} />);
    const option = screen.getByTestId('option-1'); // Target the input element
    fireEvent.click(option); // Simulate click
    expect(mockProps.onSelectAnswerOption).toHaveBeenCalledWith(
      1,
      {
        answerOptionIds: ['1'],
        questionId: '1',
      },
      'SINGLE_CHOICE'
    );
  });

  it('handles multiple choice selection', () => {
    // Create a fresh copy of props for this test
    const multipleChoiceProps = {
      ...mockProps,
      question: mockMultipleChoiceQuestion,
      // Initialize with empty answerOptionIds
      answerOption: { questionId: '1', answerText: '', answerOptionIds: [] },
    };

    const { rerender } = render(<QuestionWrapper {...multipleChoiceProps} />);

    // Select first option
    const option1 = screen.getByTestId('option-1');
    fireEvent.click(option1);

    // Verify first option selection
    expect(multipleChoiceProps.onSelectAnswerOption).toHaveBeenCalledWith(
      1,
      {
        answerOptionIds: ['1'],
        questionId: '1',
      },
      'MULTIPLE_CHOICE'
    );

    // Reset mock and update props to simulate first selection happened
    vi.resetAllMocks();

    // Rerender with updated props (as if the parent component updated the props)
    const updatedProps = {
      ...multipleChoiceProps,
      answerOption: { questionId: '1', answerText: '', answerOptionIds: ['1'] },
    };

    rerender(<QuestionWrapper {...updatedProps} />);

    // Now select the second option
    const option2 = screen.getByTestId('option-2');
    fireEvent.click(option2);

    // Verify both options are now selected
    expect(updatedProps.onSelectAnswerOption).toHaveBeenCalledWith(
      1,
      {
        answerOptionIds: ['1', '2'],
        questionId: '1',
      },
      'MULTIPLE_CHOICE'
    );
  });

  it('handles deselection in multiple choice', () => {
    // Start with option 1 already selected
    const multipleChoiceProps = {
      ...mockProps,
      question: mockMultipleChoiceQuestion,
      answerOption: { questionId: '1', answerText: '', answerOptionIds: ['1'] },
    };

    render(<QuestionWrapper {...multipleChoiceProps} />);

    // Deselect option 1 by clicking it again
    const option1 = screen.getByTestId('option-1');
    fireEvent.click(option1);

    // Verify the option was removed from answerOptionIds
    expect(multipleChoiceProps.onSelectAnswerOption).toHaveBeenCalledWith(
      1,
      {
        answerOptionIds: [], // Empty array as we deselected the only selected option
        questionId: '1',
      },
      'MULTIPLE_CHOICE'
    );
  });

  it('handles selecting all options in multiple choice', () => {
    // Start with no options selected
    const multipleChoiceProps = {
      ...mockProps,
      question: mockMultipleChoiceQuestion,
      answerOption: { questionId: '1', answerText: '', answerOptionIds: [] },
    };

    const { rerender } = render(<QuestionWrapper {...multipleChoiceProps} />);

    // Select option 1
    const option1 = screen.getByTestId('option-1');
    fireEvent.click(option1);

    // Update props to simulate selection
    const propsAfterOption1 = {
      ...multipleChoiceProps,
      answerOption: { questionId: '1', answerText: '', answerOptionIds: ['1'] },
    };

    vi.resetAllMocks();
    rerender(<QuestionWrapper {...propsAfterOption1} />);

    // Select option 2
    const option2 = screen.getByTestId('option-2');
    fireEvent.click(option2);

    // Update props to simulate selection
    const propsAfterOption2 = {
      ...multipleChoiceProps,
      answerOption: {
        questionId: '1',
        answerText: '',
        answerOptionIds: ['1', '2'],
      },
    };

    vi.resetAllMocks();
    rerender(<QuestionWrapper {...propsAfterOption2} />);

    // Select option 3
    const option3 = screen.getByTestId('option-3');
    fireEvent.click(option3);

    // Verify all options are selected
    expect(propsAfterOption2.onSelectAnswerOption).toHaveBeenCalledWith(
      1,
      {
        answerOptionIds: ['1', '2', '3'],
        questionId: '1',
      },
      'MULTIPLE_CHOICE'
    );
  });

  it('handles short text input', () => {
    const updatedProps = { ...mockProps, question: mockShortTextQuestion };
    render(<QuestionWrapper {...updatedProps} />);
    const textArea = screen.getByTestId('textarea');
    fireEvent.change(textArea, { target: { value: 'Test answer' } });
    expect(textArea).toBeInTheDocument();
  });

  it('handles long text input', () => {
    const updatedProps = { ...mockProps, question: mockLongTextQuestion };
    render(<QuestionWrapper {...updatedProps} />);
    const textArea = screen.getByTestId('textarea');
    fireEvent.change(textArea, { target: { value: 'Long test answer' } });
    expect(textArea).toBeInTheDocument();
  });

  it('displays appropriate label for multiple choice questions', () => {
    const multipleChoiceProps = {
      ...mockProps,
      question: mockMultipleChoiceQuestion,
    };

    render(<QuestionWrapper {...multipleChoiceProps} />);

    const multipleChoiceLabel = screen.getByText('Multiple Choice');
    const instructionText = screen.getByText('Select All That Apply');

    expect(multipleChoiceLabel).toBeInTheDocument();
    expect(instructionText).toBeInTheDocument();
  });

  it('displays appropriate label for single choice questions', () => {
    render(<QuestionWrapper {...mockProps} />);

    const singleChoiceLabel = screen.getByText('Single Choice');
    const instructionText = screen.getByText('Select The Correct Option');

    expect(singleChoiceLabel).toBeInTheDocument();
    expect(instructionText).toBeInTheDocument();
  });
});
