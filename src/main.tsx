import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';

import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';
import './assets/fonts/fontello/css/saf.css';
import { store, persistor } from './store/store';
import App from './App';
import './index.css';
import 'antd/dist/reset.css';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Theme from './utils/theme';
import SessionExpirationModal from 'pages/auth/sessionExpirationModal';

const tagManagerArgs = {
  gtmId: 'GTM-WTL29ZQ',
};

TagManager.initialize(tagManagerArgs);

const isDevelopment =
  process.env.REACT_APP_ENV ?? process.env.NODE_ENV === 'development';

Sentry.init({
  dsn: 'https://9dd4206fe1e1a7c9afadd9aa182dbafd@o4509371883782144.ingest.us.sentry.io/4509371950956544',
  // Enable PII data collection// Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events sendDefaultPii: true,
  environment:
    process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? 'development',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: isDevelopment ? 1.0 : 0.2,
  replaysSessionSampleRate: isDevelopment ? 1.0 : 0.1,
  replaysOnErrorSampleRate: 1.0,
  // Configure error sampling
  beforeSend(event) {
    // Don't send events in development unless explicitly enabled
    if (isDevelopment && !process.env.REACT_APP_ENABLE_SENTRY_DEV) {
      return null;
    }
    return event;
  },
  // Set maximum breadcrumbs
  maxBreadcrumbs: 50,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: Theme.PrimaryColor,
              },
            }}
          >
            <App />
            <SessionExpirationModal />
          </ConfigProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
