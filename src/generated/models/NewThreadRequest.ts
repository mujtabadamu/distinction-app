/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NewThreadRequest = {
    paperName?: string;
    topics?: string;
    curriculum?: string;
    useCase?: 'QUESTION_GENERATION' | 'FLASHCARD_GENERATION' | 'KEYPOINT_GENERATION' | 'WELCOME_MESSAGE' | 'TITLE_GEN' | 'CHATBOT_RESPONSE' | 'QA_SUGGESTION';
    prompt?: string;
    paperId?: string;
};

