import { MantineProvider, createTheme } from '@mantine/core';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useThemeStore } from './store/useThemeStore';

const theme = createTheme({ primaryColor: 'violet' });

export function App() {
  const colorScheme = useThemeStore((s) => s.colorScheme);

  return (
    <MantineProvider forceColorScheme={colorScheme} theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
