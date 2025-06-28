/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChatRequest = {
    paperName?: string;
    topics?: string;
    curriculum?: string;
    useCase?: 'QUESTION_GENERATION' | 'FLASHCARD_GENERATION' | 'KEYPOINT_GENERATION' | 'WELCOME_MESSAGE' | 'TITLE_GEN' | 'CHATBOT_RESPONSE' | 'QA_SUGGESTION';
    prompt?: string;
    context?: string;
    paperId?: string;
};

