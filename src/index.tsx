import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { NotificationProvider } from './contexts/Notification';
const root = createRoot(document.body);

root.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
