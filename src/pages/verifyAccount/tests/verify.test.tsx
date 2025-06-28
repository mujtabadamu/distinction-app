import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import VerifyProfile from '../components/VerifyProfile';
import MatriculationScreen from '../components/MatriculationScreen';

const mockGetValidateStudent = vi.fn();
const mockSetSteps = vi.fn();
const renderComponent = (props = {}) => {
  return render(
    <BrowserRouter>
      <MatriculationScreen
        steps={1}
        setSteps={mockSetSteps}
        getValidateStudent={mockGetValidateStudent}
        error={''}
        loadingValidateStudent={false}
        studentValidated={null}
        {...props}
      />
    </BrowserRouter>
  );
};

describe('MatriculationScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  mockGetValidateStudent.mockImplementation(async (matriculationNumber, cb) => {
    if (!matriculationNumber) return;
    cb();
  });

  it('should validate input length and show error for short matriculation numbers', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText('--- --- ---');
    const submitButton = screen.getByText('Proceed');

    await userEvent.type(input, '12345');
    fireEvent.click(submitButton);
    expect(mockGetValidateStudent).not.toHaveBeenCalled();
  });

  it('should call getValidateStudent with correct argument and move to next step', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText('--- --- ---');
    const submitButton = screen.getByText('Proceed');

    await userEvent.type(input, '123456');
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(mockGetValidateStudent).toHaveBeenCalledWith(
        '123456',
        expect.any(Function)
      );
    });
    await waitFor(() => {
      expect(mockSetSteps).toHaveBeenCalledWith(2);
    });
  });

  it('should show error message when API returns an error', async () => {
    const { rerender } = renderComponent();
    const input = screen.getByPlaceholderText('--- --- ---');
    const submitButton = screen.getByText('Proceed');

    await userEvent.type(input, '12345');
    fireEvent.click(submitButton);
    rerender(
      <BrowserRouter>
        <MatriculationScreen
          steps={1}
          setSteps={mockSetSteps}
          getValidateStudent={mockGetValidateStudent}
          error="No student found"
          loadingValidateStudent={false}
          studentValidated={null}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/No student found/i)).toBeInTheDocument();
    expect(screen.getByText(/Retry/)).toBeInTheDocument();
  });
});

describe('VerifyProfile Component', () => {
  const mockStore = configureStore({
    reducer: {
      auth: (state = { isLoading: false }) => state,
    },
  });
  const mockRegistration = vi.fn();
  const mockSetActiveEmail = vi.fn();
  const mockSetSteps = vi.fn();
  const mockStudentValidated = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    matriculationNumber: '123456',
    school: { name: 'Test School' },
    department: { name: 'Test Department' },
    level: '300',
  };

  const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <VerifyProfile
            steps={1}
            isRegisteringUser={false}
            RegisterBulkUploadedUser={mockRegistration}
            setActiveEmail={mockSetActiveEmail}
            setSteps={mockSetSteps}
            studentValidated={mockStudentValidated}
          />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  mockRegistration.mockImplementation(async (cb) => {
    cb();
  });

  it('should display student information correctly', () => {
    renderComponent();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/123456/i)).toBeInTheDocument();
    expect(screen.getByText(/Test School/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Department/i)).toBeInTheDocument();
    expect(screen.getByText(/300 Level/i)).toBeInTheDocument();
  });

  it('should validate email input', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Submit');
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(emailInput).toHaveAttribute('error', 'Please enter a valid email');
    });

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid@email.com');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(emailInput).toHaveAttribute('error', 'Please enter a valid email');
    });
  });

  it('should validate password inputs', async () => {
    renderComponent();
    const passwordInput = screen.getByPlaceholderText('Min. 8 characters');
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Confirm your password'
    );
    const submitButton = screen.getByText('Submit');
    await userEvent.type(passwordInput, 'short');
    await userEvent.type(confirmPasswordInput, 'short');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute(
        'error',
        'password must have at least 8 characters'
      );
    });
    await userEvent.clear(passwordInput);
    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(passwordInput, 'ValidPass123!');
    await userEvent.type(confirmPasswordInput, 'DifferentPass123!');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(confirmPasswordInput).toHaveAttribute(
        'error',
        'Passwords do not match'
      );
    });
  });

  it('should validate phone input', async () => {
    renderComponent();
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    });
  });
});
