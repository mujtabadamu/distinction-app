import '@testing-library/jest-dom';
import '@testing-library/react';
import { flexibullMocks } from 'mocks/flexibullMock';
import { vi } from 'vitest';

vi.stubGlobal('crypto', {
  randomUUID: () => 'mock-uuid',
});

vi.mock('utils/config', () => ({
  default: {
    API_BASE_URL: 'http://mocked-api-url.com',
  },
}));

vi.mock('generated/core/request', () => ({
  urls: { API_BASE_URL: 'http://mocked-api-url.com' },
}));

// Mock navigator.clipboard
if (!navigator.clipboard) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  navigator.clipboard = {};
}
navigator.clipboard.writeText = vi.fn();

// Mock window.open
if (!window.open) {
  window.open = vi.fn();
}

// Mock clipboard copy and window open
vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(vi.fn());
vi.spyOn(window, 'open').mockImplementation(vi.fn());

// Mock flexibull components
vi.mock('@flexisaf/flexibull2', () => ({
  ...flexibullMocks,
  Notify: vi.fn(),
}));
