import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ActionIcon, Container, Group } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useThemeStore } from '../store/useThemeStore';

function RootComponent() {
  const { colorScheme, toggleColorScheme } = useThemeStore();

  return (
    <>
      <Container size="xl" py="xl">
        <Group justify="flex-end" mb="md">
          <ActionIcon
            variant="default"
            size="lg"
            onClick={toggleColorScheme}
            aria-label="Toggle color scheme"
          >
            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Group>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
