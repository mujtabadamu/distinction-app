/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Assistant } from '../models/Assistant';
import type { ChatRequest } from '../models/ChatRequest';
import type { NewThreadRequest } from '../models/NewThreadRequest';
import type { ResponseBodyEmitter } from '../models/ResponseBodyEmitter';
import type { Session } from '../models/Session';
import type { Thread } from '../models/Thread';
import type { ThreadDto } from '../models/ThreadDto';
import type { WelcomeMessageDto } from '../models/WelcomeMessageDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AssistantService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static chatMessage1({
        threadId,
        requestBody,
    }: {
        threadId: string,
        requestBody: ChatRequest,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assistant/thread/{threadId}/chat',
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
     * @returns ResponseBodyEmitter OK
     * @throws ApiError
     */
    public static chatStreamMessage({
        threadId,
        requestBody,
    }: {
        threadId: string,
        requestBody: ChatRequest,
    }): CancelablePromise<ResponseBodyEmitter> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assistant/thread/{threadId}/chat-stream',
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
     * @returns ThreadDto OK
     * @throws ApiError
     */
    public static newThread({
        requestBody,
    }: {
        requestBody: NewThreadRequest,
    }): CancelablePromise<ThreadDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assistant/thread/new-thread',
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
    public static getWelcomeMessage1({
        paperName,
    }: {
        paperName: string,
    }): CancelablePromise<WelcomeMessageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assistant/welcome',
            query: {
                'paperName': paperName,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Thread OK
     * @throws ApiError
     */
    public static getThreads(): CancelablePromise<Array<Thread>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assistant/threads',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Thread OK
     * @throws ApiError
     */
    public static getThread({
        threadId,
    }: {
        threadId: string,
    }): CancelablePromise<Thread> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assistant/thread/{threadId}',
            path: {
                'threadId': threadId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteThread1({
        threadId,
    }: {
        threadId: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/assistant/thread/{threadId}',
            path: {
                'threadId': threadId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns Session OK
     * @throws ApiError
     */
    public static getMessages1({
        threadId,
        limit = 20,
        order = true,
    }: {
        threadId: string,
        limit?: number,
        order?: boolean,
    }): CancelablePromise<Array<Session>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assistant/thread/{threadId}/sessions',
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
     * @returns Assistant OK
     * @throws ApiError
     */
    public static getChatBotAssistant1(): CancelablePromise<Assistant> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assistant/assistant',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
