/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatBotAssistantView } from '../models/ChatBotAssistantView';
import type { ChatBotNewMessageRequest } from '../models/ChatBotNewMessageRequest';
import type { CustomMessageDto } from '../models/CustomMessageDto';
import type { WelcomeMessageDto } from '../models/WelcomeMessageDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatBotService {
    /**
     * @returns CustomMessageDto OK
     * @throws ApiError
     */
    public static getMessages({
        threadId,
        limit = 20,
        order = 'desc',
    }: {
        threadId: string,
        limit?: number,
        order?: string,
    }): CancelablePromise<Array<CustomMessageDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chatbot/thread/{threadId}/messages',
            path: {
                'threadId': threadId,
            },
            query: {
                'limit': limit,
                'order': order,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CustomMessageDto OK
     * @throws ApiError
     */
    public static chatMessage({
        threadId,
        requestBody,
    }: {
        threadId: string,
        requestBody: ChatBotNewMessageRequest,
    }): CancelablePromise<CustomMessageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chatbot/thread/{threadId}/messages',
            path: {
                'threadId': threadId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CustomMessageDto OK
     * @throws ApiError
     */
    public static newChat({
        requestBody,
    }: {
        requestBody: ChatBotNewMessageRequest,
    }): CancelablePromise<CustomMessageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/chatbot/thread/new-chat',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns WelcomeMessageDto OK
     * @throws ApiError
     */
    public static getWelcomeMessage({
        paperId,
    }: {
        paperId: string,
    }): CancelablePromise<WelcomeMessageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chatbot/welcome',
            query: {
                'paperId': paperId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ChatBotAssistantView OK
     * @throws ApiError
     */
    public static getChatBotAssistant(): CancelablePromise<ChatBotAssistantView> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/chatbot/assistant',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteThread({
        threadId,
    }: {
        threadId: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/chatbot/thread/{threadId}',
            path: {
                'threadId': threadId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
