import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Container,
  Grid,
  Card,
  TextInput,
  Button,
  Group,
  Title,
  Stack,
  Text,
  Skeleton,
  Image,
  Badge,
} from '@mantine/core';
import { IconSearch, IconDeviceGamepad2, IconPlayerPlay } from '@tabler/icons-react';
import { useDebouncedValue } from '@tanstack/react-pacer';
import { GameCard } from '../components/GameCard';
import { BacklogItem } from '../components/BacklogItem';
import { useGameSearch } from '../hooks/useGameSearch';
import { useState } from 'react';
import { useBacklog } from '../hooks/useBacklog';

export const Route = createFileRoute('/')({
  component: Homepage,
});

function Homepage() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchInput, { wait: 400 });
  const { addGame, activeBacklog, playingGames, removeGame, isLoadingBacklog } = useBacklog();

  const { isLoading, data } = useGameSearch(debouncedSearch);

  const games = data ?? [];

  return (
    <Container size="xl" py="xl">
      {/* Header */}
      <Group mb="xl">
        <IconDeviceGamepad2 size={40} color="var(--mantine-color-violet-6)" />
        <Title order={1}>Gamer Log</Title>
      </Group>

      {playingGames.length > 0 && (
        <Stack mb="xl" gap="md">
          <Group gap="xs">
            <IconPlayerPlay size={22} color="var(--mantine-color-violet-6)" />
            <Title order={3}>Jogando agora</Title>
            <Badge color="violet" variant="light">
              {playingGames.length}
            </Badge>
          </Group>
          <Grid>
            {playingGames.map((game) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={game.id}>
                <Card shadow="sm" padding={0} radius="md" withBorder>
                  <Group wrap="nowrap" gap={0} align="stretch">
                    <Image
                      src={game.background_image || 'https://placehold.co/120x120'}
                      w={120}
                      h={120}
                      style={{ objectFit: 'cover' }}
                    />
                    <Stack justify="space-between" p="sm" style={{ flex: 1, minWidth: 0 }}>
                      <Text fw={600} lineClamp={2}>
                        {game.name}
                      </Text>
                      <Button
                        component={Link}
                        to="/backlog/$id"
                        params={{ id: String(game.id) }}
                        size="xs"
                        variant="light"
                        color="violet"
                        leftSection={<IconPlayerPlay size={14} />}
                      >
                        Continuar
                      </Button>
                    </Stack>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      )}

      <Grid gutter="xl">
        {/* ==========================================
            LADO ESQUERDO: Busca e Resultados
            ========================================== */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Group mb="lg" align="flex-end">
            <TextInput
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)}
              placeholder="Ex: The Witcher 3, Elden Ring..."
              leftSection={<IconSearch size={18} />}
              style={{ flex: 1 }}
              size="md"
            />
          </Group>

          {isLoading && (
            <Grid>
              {Array.from({ length: 4 }).map((_, i) => (
                <Grid.Col span={{ base: 12, sm: 6 }} key={i}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Skeleton height={160} radius={0} />
                    </Card.Section>
                    <Skeleton height={16} mt="md" width="70%" />
                    <Skeleton height={36} mt="md" radius="md" />
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          {!isLoading && (
            <Grid>
              {games.map((game) => (
                <Grid.Col span={{ base: 12, sm: 6 }} key={game.id}>
                  <GameCard
                    id={game.id}
                    title={game.name}
                    imageUrl={game.background_image}
                    rating={game.rating}
                    onAddClick={() => addGame(game)}
                  />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Grid.Col>

        {/* ==========================================
            LADO DIREITO: Sidebar do Backlog
            ========================================== */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Meu Backlog ({activeBacklog.length})
            </Title>

            {isLoadingBacklog && (
              <Stack gap="sm">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Group key={i} wrap="nowrap">
                    <Skeleton height={40} width={40} radius="sm" />
                    <Skeleton height={14} style={{ flex: 1 }} />
                  </Group>
                ))}
              </Stack>
            )}

            {!isLoadingBacklog && (
              <Stack gap="sm">
                {activeBacklog.map((game) => (
                  <BacklogItem
                    key={game.id}
                    id={game.id}
                    title={game.name}
                    thumbnailUrl={game.background_image}
                    onRemoveClick={() => removeGame(game.id)}
                  />
                ))}
              </Stack>
            )}

            {!isLoadingBacklog && activeBacklog.length === 0 && (
              <Text c="dimmed" size="sm">
                Nenhum jogo adicionado ainda.
              </Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
