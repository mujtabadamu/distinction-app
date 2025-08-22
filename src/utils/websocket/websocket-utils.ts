// WebSocket shared constants and utilities
import urls from 'utils/config';

export const WS_URL = `${urls.API_BASE_URL}/ws`;
export const RECONNECT_DELAY = 2000;
export const MAX_RECONNECT_ATTEMPTS = 3;
