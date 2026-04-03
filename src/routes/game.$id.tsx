import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Container,
  Image,
  Title,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Loader,
  Card,
} from '@mantine/core';
import { IconArrowLeft, IconWorld } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getGameByID } from '../api/gameService';
import { useBacklog } from '../hooks/useBacklog';

export const Route = createFileRoute('/game/$id')({
  component: GameDetailPage,
});

function GameDetailPage() {
  const { id } = Route.useParams();
  const gameId = Number(id);
  const { addGame, gameBacklog, removeGame } = useBacklog();

  const { data: game, isLoading } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGameByID(gameId),
  });

  const isInBacklog = gameBacklog.some((g) => g.id === gameId);

  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Loader color="violet" size="lg" />
      </Container>
    );
  }

  if (!game) {
    return (
      <Container size="md" py="xl">
        <Text>Jogo não encontrado.</Text>
        <Button component={Link} to="/" mt="md" variant="light" color="violet">
          Voltar
        </Button>
      </Container>
    );
  }

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
        Voltar
      </Button>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={game.background_image || 'https://placehold.co/600x400?text=Sem+Imagem'}
            height={300}
            alt={game.name}
          />
        </Card.Section>

        <Stack mt="lg" gap="md">
          <Group justify="space-between" align="center">
            <Title order={2}>{game.name}</Title>
            <Badge color="violet" variant="light" size="lg">
              Nota: {game.rating}
            </Badge>
          </Group>

          {game.genres && game.genres.length > 0 && (
            <Group gap="xs">
              {game.genres.map((genre) => (
                <Badge key={genre.id} variant="outline" color="gray">
                  {genre.name}
                </Badge>
              ))}
            </Group>
          )}

          {game.platforms && game.platforms.length > 0 && (
            <Group gap="xs">
              {game.platforms.map((p) => (
                <Badge key={p.platform.id} variant="dot" color="violet">
                  {p.platform.name}
                </Badge>
              ))}
            </Group>
          )}

          {game.description && (
            <Text
              size="sm"
              c="dimmed"
              dangerouslySetInnerHTML={{ __html: game.description }}
            />
          )}

          {game.website && (
            <Button
              component="a"
              href={game.website}
              target="_blank"
              variant="light"
              color="gray"
              leftSection={<IconWorld size={18} />}
            >
              Website
            </Button>
          )}

          <Button
            color={isInBacklog ? 'red' : 'violet'}
            fullWidth
            radius="md"
            onClick={() => {
              if (isInBacklog) {
                removeGame(game.id);
              } else {
                addGame(game);
              }
            }}
          >
            {isInBacklog ? 'Remover do Backlog' : 'Adicionar ao Backlog'}
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}
