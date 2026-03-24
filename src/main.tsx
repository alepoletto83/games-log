import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider, createTheme } from '@mantine/core';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import '@mantine/core/styles.css';

const theme = createTheme({ primaryColor: 'violet' });
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
