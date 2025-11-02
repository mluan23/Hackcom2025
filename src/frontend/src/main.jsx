import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { App } from './App';
import '@mantine/core/styles.css';

// 1. Get the key from the .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

// 2. We create this component to use the useNavigate hook
// from react-router-dom, which Clerk needs.
function ClerkApp() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <MantineProvider defaultColorScheme="auto">
        <App />
      </MantineProvider>
    </ClerkProvider>
  );
}

// 3. Your app is now wrapped in all the necessary providers
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkApp />
    </BrowserRouter>
  </React.StrictMode>
);