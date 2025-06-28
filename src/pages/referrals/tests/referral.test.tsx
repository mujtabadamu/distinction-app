import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import Referrals from '../index';

vi.mock('react-icons/fa', () => ({
  FaInstagram: () => <span>Instagram</span>,
  FaFacebookSquare: () => <span>Facebook</span>,
  FaWhatsapp: () => <span>WhatsApp</span>,
  FaSpinner: () => <span>Spinner</span>,
}));

vi.mock('react-icons/fa6', () => ({
  FaXTwitter: () => <span>Twitter</span>,
}));

vi.mock('react-icons/ri', () => ({
  RiLinkedinLine: () => <span>LinkedIn</span>,
}));

const mockSendInvite = vi.fn();
vi.mock('../hooks/useReferrals', () => ({
  default: vi.fn(() => ({
    isLoadingReferrals: false,
    referrals: { items: [] },
    setSearchText: vi.fn(),
    page: 1,
    setPage: vi.fn(),
    pageOptions: [],
    setOffset: vi.fn(),
    setLimit: vi.fn(),
    limit: 10,
    isLoadingReferralCode: false,
    getReferralCode: vi.fn(),
    referralCode: { referralCode: 'TEST123' },
    referralStats: {
      totalReferrals: 0,
      totalEarnings: 0,
      totalClaimed: 0,
      totalUnclaimed: 0,
    },
    isLoadingReferralStats: false,
    getReferralStats: vi.fn(),
    sendInvite: mockSendInvite,
    isSendingInvitation: false,
  })),
}));

const mockStore = configureStore({
  reducer: {
    user: (state = { currentUser: { id: 'mockUserId' } }) => state,
  },
});

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
  });
  vi.spyOn(window, 'open').mockImplementation(() => null);
  vi.spyOn(console, 'error').mockImplementation(() => vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('should share referral link on social media when respective buttons are clicked', async () => {
  render(
    <Provider store={mockStore}>
      <Referrals />
    </Provider>
  );

  const instagramButton = screen.getByText('Instagram');
  const facebookButton = screen.getByText('Facebook');
  const whatsappButton = screen.getByText('WhatsApp');
  const twitterButton = screen.getByText('Twitter');
  const linkedinButton = screen.getByText('LinkedIn');

  await act(async () => {
    await userEvent.click(instagramButton);
  });
  expect(navigator.clipboard.writeText).toHaveBeenCalled();

  await act(async () => {
    await userEvent.click(facebookButton);
  });
  expect(window.open).toHaveBeenCalledWith(
    expect.stringContaining('facebook.com'),
    '_blank'
  );

  await act(async () => {
    await userEvent.click(whatsappButton);
  });
  expect(window.open).toHaveBeenCalledWith(
    expect.stringContaining('wa.me'),
    '_blank'
  );

  await act(async () => {
    await userEvent.click(twitterButton);
  });
  expect(window.open).toHaveBeenCalledWith(
    expect.stringContaining('twitter.com'),
    '_blank'
  );

  await act(async () => {
    await userEvent.click(linkedinButton);
  });
  expect(window.open).toHaveBeenCalledWith(
    expect.stringContaining('linkedin.com'),
    '_blank'
  );
});

it('should send an email invite when valid email is provided', async () => {
  render(
    <Provider store={mockStore}>
      <Referrals />
    </Provider>
  );

  const emailInput = screen.getByPlaceholderText('Enter email address');
  const sendButton = screen.getByText('Send Invite');

  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.click(sendButton);

  await waitFor(() => {
    expect(mockSendInvite).toHaveBeenCalledWith('test@example.com');
  });
});

it('should show an error when invalid email is provided', async () => {
  render(
    <Provider store={mockStore}>
      <Referrals />
    </Provider>
  );
  const emailInput = screen.getByPlaceholderText('Enter email address');
  const sendButton = screen.getByText('Send Invite');

  await userEvent.type(emailInput, 'invalid-email');
  await userEvent.click(sendButton);

  expect(emailInput).toHaveAttribute('aria-invalid', 'true');
});

it('should copy the referral link to clipboard when button is clicked', async () => {
  const { getByText } = render(
    <Provider store={mockStore}>
      <Referrals />
    </Provider>
  );
  const copyButton = getByText('Copy link');

  await userEvent.click(copyButton);

  await waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('https://dashboard.distinction.app/register?ref=')
    );
  });
});

it('should show an error when copying the referral link fails', async () => {
  const mockClipboardWriteText = vi
    .fn()
    .mockRejectedValue(new Error('Copy failed'));
  Object.assign(navigator, {
    clipboard: {
      writeText: mockClipboardWriteText,
    },
  });

  const { getByText } = render(
    <Provider store={mockStore}>
      <Referrals />
    </Provider>
  );
  const copyButton = getByText('Copy link');

  await userEvent.click(copyButton);

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      'Could not copy text: ',
      expect.any(Error)
    );
  });
});

it('should show an error when sharing the referral link on social media fails', async () => {
  const mockClipboardWriteText = vi
    .fn()
    .mockRejectedValue(new Error('Share failed'));
  Object.assign(navigator, {
    clipboard: {
      writeText: mockClipboardWriteText,
    },
  });

  const { getByText } = render(
    <Provider store={mockStore}>
      <Referrals />
    </Provider>
  );
  const shareButton = getByText('Instagram');

  await userEvent.click(shareButton);

  expect(mockClipboardWriteText).toHaveBeenCalled();
  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      'Could not copy text: ',
      expect.any(Error)
    );
  });
});
