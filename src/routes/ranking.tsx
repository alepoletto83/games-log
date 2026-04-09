import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Container,
  Title,
  Text,
  Group,
  Card,
  Image,
  Badge,
  Stack,
  Button,
} from '@mantine/core';
import { IconArrowLeft, IconTrophy } from '@tabler/icons-react';
import { useBacklog } from '../hooks/useBacklog';

export const Route = createFileRoute('/ranking')({
  component: RankingPage,
});

function RankingPage() {
  const { finishedGames } = useBacklog();

  return (
    <Container size="md" py="xl">
      <Button
        component={Link}
        to="/"
        variant="subtle"
        color="violet"
        leftSection={<IconArrowLeft size={18} />}
        mb="lg"
      >
        Back
      </Button>

      <Group mb="xl">
        <IconTrophy size={36} color="#7950f2" />
        <Title order={1}>My Ranking</Title>
      </Group>

      {finishedGames.length === 0 && (
        <Text c="dimmed">No finished games yet. Complete some games to see your ranking!</Text>
      )}

      <Stack gap="md">
        {finishedGames.map((game, index) => (
          <Card
            key={game.id}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Group wrap="nowrap">
              <Text size="xl" fw={900} c="violet" w={40} ta="center">
                #{index + 1}
              </Text>
              <Image
                src={game.background_image || 'https://placehold.co/80x80'}
                w={80}
                h={80}
                radius="md"
              />
              <Stack gap={4} style={{ flex: 1 }}>
                <Text fw={600} size="lg">
                  {game.name}
                </Text>
                {game.description && (
                  <Text size="sm" c="dimmed" lineClamp={2}>
                    {game.description}
                  </Text>
                )}
              </Stack>
              <Stack align="center" gap={4}>
                <Badge
                  size="xl"
                  variant="filled"
                  color={getRatingColor(game.user_rating)}
                >
                  {game.user_rating != null ? `${game.user_rating}/10` : 'N/A'}
                </Badge>
                {game.finished_at && (
                  <Text size="xs" c="dimmed">
                    {game.finished_at}
                  </Text>
                )}
              </Stack>
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

function getRatingColor(rating: number | null): string {
  if (rating == null) return 'gray';
  if (rating >= 8) return 'green';
  if (rating >= 6) return 'yellow';
  if (rating >= 4) return 'orange';
  return 'red';
}
