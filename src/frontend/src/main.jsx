import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css'; // This is the new way to import CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Set up the page router */}
    <BrowserRouter>
      {/* Set up the UI library */}
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);