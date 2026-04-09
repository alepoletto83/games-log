import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ActionIcon, Button, Container, Group } from '@mantine/core';
import { IconSun, IconMoon, IconTrophy } from '@tabler/icons-react';
import { useThemeStore } from '../store/useThemeStore';

function RootComponent() {
  const { colorScheme, toggleColorScheme } = useThemeStore();

  return (
    <>
      <Container size="xl" py="xl">
        <Group justify="flex-end" mb="md">
          <Button
            component={Link}
            to="/ranking"
            variant="light"
            color="violet"
            leftSection={<IconTrophy size={18} />}
          >
            Ranking
          </Button>
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
