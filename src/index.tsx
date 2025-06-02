import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { NotificationProvider } from './contexts/Notification';
import { CmtSpeechProvider } from './contexts/commentSpeech';
const root = createRoot(document.body);

root.render(
  <NotificationProvider>
    <CmtSpeechProvider>
      <App />
    </CmtSpeechProvider>
  </NotificationProvider>
);
