import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Container } from '@mantine/core';

export const Route = createRootRoute({
  component: () => (
    <>
      <Container size="xl" py="xl">
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  ),
});
