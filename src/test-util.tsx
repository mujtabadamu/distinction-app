import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import studentPapers from './redux/studentPapers/reducer';

// Create a function to configure test store with all necessary reducers
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      studentPapers: studentPapers,
      // Add other reducers your component needs
    },
    preloadedState,
  });
};

// Custom render function that includes Redux provider and other providers that might be needed
function renderWithProviders(
  ui: ReactNode,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Re-export everything
export * from '@testing-library/react';
export { renderWithProviders as render };
